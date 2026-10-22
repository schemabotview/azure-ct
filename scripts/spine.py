#!/usr/bin/env python3
"""Replay every spine step and compare its terminal transcript with what the commands really print.

The spine is the course's one project, `risk-on-azure`, kept as real files: one snapshot per step in
spine/<course>/<step>/project/. Each step's session.txt is the terminal pane a scene shows — `$ `
lines are commands, everything else is their output. Scenes import these files with Vite's `?raw`,
so a frame can only show what this script has replayed.

  python3 scripts/spine.py            check every step (exit 1 on any difference)
  python3 scripts/spine.py --write    re-run every step and rewrite its session.txt / captures
  python3 scripts/spine.py start/05   only the steps whose path starts with an argument

There is no Azure subscription behind the course. Each step runs the real tools — the Azure CLI, the
Bicep CLI, the Azure SDKs for Python, psql — against FRESH local emulators: Azurite for Storage (and,
when a step asks for them, Microsoft's Event Hubs, Service Bus and Cosmos DB emulators, and the local
PostgreSQL 16 cluster). What a pane shows is emulated Azure behaviour, labelled as such on screen,
and never presented as Azure's own output. Azure's control plane (Resource Manager) has no emulator:
a command that needs it fails exactly as it does without a login, and a frame shows that or a
model-checked file instead (scripts/check-azure.py).

Each step is replayed in a fresh temp copy named risk-on-azure inside a temp "home", by ONE bash
process per command with state carried over, so `cd`, `source` and exported variables persist as in
a real terminal. Temp paths are rewritten to /home/priya/risk-on-azure, the path the frames show.

What makes a replay deterministic — all of it about the MACHINE, never the commands:
  - The Python side is installed once from pinned files: the SDKs and libfaketime into
    .spine-cache/sdk from spine/requirements.txt, the Azure CLI into .spine-cache/cli from
    spine/requirements-cli.txt (it pins older SDKs, so it gets its own environment and only `az`
    goes on PATH); Azurite once into .spine-cache/azurite (AZURITE below); the Bicep CLI once
    into .spine-cache/bicep from its NuGet package (BICEP below). A step's .venv, when it asks for
    one, borrows that site-packages through a .pth file.
  - The clock is FROZEN by libfaketime for Azurite and for every command: it starts at the step's
    `time` (default 2026-10-13 22:30:00 UTC) and does not move, so a Last-Modified, an ETag Azurite
    derives from the time and a signed SAS come out the same on every run. A step whose `time` starts
    with `@` has a ticking clock instead (it starts there and runs).
  - Azurite serves the platform's own storage accounts, `stwgriskprod` and `stwgriskdev`, with a fixed
    emulator key, on 127.0.0.1:10000-10002 — the addresses `env.sh` names. In OUTPUT, those addresses
    become the endpoints the same account has on Azure (https://stwgriskprod.blob.core.windows.net, …)
    — except on a line that sets AZURE_STORAGE_CONNECTION_STRING, which is shown as written.
  - A random GUID in output (a request id, a client request id) becomes a stable one derived from the
    step and its order of appearance; a GUID written in the project or the step's settings is left
    alone. Nothing else in an output is edited.

A step's home/ folder, if any, is copied into the temp home first.

step.json (all keys optional):
  {"project": "name"}           the folder's name (default risk-on-azure): Course 2's demo is not the spine
  {"venv": true}                create .venv (borrowing the SDKs) and start with it activated
  {"env": true}                 `source env.sh` silently before the session, as a learner's shell would have
  {"setup": ["cmd", ...]}       run first, silently, in the project (state a frame needs but does not show being made)
  {"time": "2026-10-13 22:30:00"}  the frozen clock's start (`@…` for a ticking clock, `real` for the
                                machine's own: a step that talks to a Docker emulator, whose clock is real)
  {"azurite": false}            do not start Azurite (a step that touches no storage)
  {"postgres": ["tradebook"]}   fresh databases on the local PostgreSQL 16 cluster, dropped after
  {"capture": ["path", ...]}    files the session creates that a scene shows; saved to captured/
  eventhubs.json / servicebus.json   start that Microsoft emulator (Docker) with this config, beside the step
  {"columns": 100}              the pane's width: 84 in an IDE frame's terminal (default), 100 in a map frame's side pane
"""
import base64
import hashlib
import json
import os
import re
import shutil
import socket
import subprocess
import sys
import tempfile
import time
import urllib.request
import uuid
import zipfile
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
ROOT = REPO / 'spine'
CACHE = REPO / '.spine-cache'
SHOWN_HOME = '/home/priya'
PROJECT = 'risk-on-azure'
AZURITE = '3.37.0'
BICEP = '0.48.1'
# Azure CLI extensions the course's commands use, pinned; installed into .spine-cache/cli-extensions.
CLI_EXTENSIONS = {'datafactory': '1.0.4', 'databricks': '1.3.2'}
CLOCK = '2026-10-13 22:30:00'
ACCOUNTS = ['stwgriskprod', 'stwgriskdev']
# Azurite's key for the accounts: fixed so a SharedKey signature and a SAS repeat. Not a secret — it
# exists only in the emulator; env.sh says so.
ACCOUNT_KEY = base64.b64encode(b'woodgrove-emulator-key-not-a-secret').decode()
PORTS = {'blob': 10000, 'queue': 10001, 'table': 10002}
MARK = '__SPINE_MARK__'
# The terminal pane's width in characters (src/scenes/ide.ts): output is wrapped there, as a real
# terminal of that width wraps it, and COLUMNS tells the tools that do their own layout.
COLUMNS = 84
GUID = re.compile(r'\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b', re.I)


def environment(name: str, requirements: Path) -> Path:
    """A Python environment under .spine-cache, built once from a pinned requirements file."""
    stamp = CACHE / name / 'requirements.txt'
    if not stamp.exists() or stamp.read_text() != requirements.read_text():
        shutil.rmtree(CACHE / name, ignore_errors=True)
        subprocess.run([sys.executable, '-m', 'venv', str(CACHE / name)], check=True)
        subprocess.run([str(CACHE / name / 'bin' / 'pip'), 'install', '-q', '--disable-pip-version-check', '-r', str(requirements)], check=True)
        shutil.copy(requirements, stamp)
    return CACHE / name


def tools() -> Path:
    """The SDKs the project's own Python uses (spine/requirements.txt), and libfaketime."""
    return environment('sdk', ROOT / 'requirements.txt')


def cli() -> Path:
    """A folder holding only `az`: the Azure CLI lives in its own environment
    (spine/requirements-cli.txt) because it pins older SDKs than the project's code uses, and only
    its entry point goes on PATH, so `python3` in a session is never the CLI's interpreter."""
    env = environment('cli', ROOT / 'requirements-cli.txt')
    folder = CACHE / 'bin'
    folder.mkdir(exist_ok=True)
    link = folder / 'az'
    if not link.exists():
        link.symlink_to(env / 'bin' / 'az')
    extensions = CACHE / 'cli-extensions'
    stamp = extensions / 'versions.json'
    if not stamp.exists() or json.loads(stamp.read_text()) != CLI_EXTENSIONS:
        shutil.rmtree(extensions, ignore_errors=True)
        extensions.mkdir()
        with tempfile.TemporaryDirectory() as home:
            for name, version in CLI_EXTENSIONS.items():
                subprocess.run([str(link), 'extension', 'add', '--name', name, '--version', version, '--only-show-errors'], check=True,
                               env={'PATH': '/usr/bin:/bin', 'HOME': home, 'AZURE_EXTENSION_DIR': str(extensions)})
        stamp.write_text(json.dumps(CLI_EXTENSIONS))
    return folder


def azurite() -> Path:
    """The pinned Azurite, installed once with npm into its own folder (never the repo's package.json)."""
    folder = CACHE / 'azurite'
    stamp = folder / 'version'
    if not stamp.exists() or stamp.read_text() != AZURITE:
        shutil.rmtree(folder, ignore_errors=True)
        folder.mkdir(parents=True)
        (folder / 'package.json').write_text('{"name": "spine-azurite", "private": true}\n')
        subprocess.run(['npm', 'install', '--silent', '--no-audit', '--no-fund', f'azurite@{AZURITE}'], cwd=folder, check=True)
        stamp.write_text(AZURITE)
    return folder / 'node_modules' / '.bin' / 'azurite'


def bicep() -> Path:
    """The pinned Bicep CLI, from its NuGet package (the Azure CLI's own `az bicep install` downloads
    from GitHub releases, which this environment cannot reach)."""
    folder = CACHE / 'bicep'
    stamp = folder / 'version'
    if not stamp.exists() or stamp.read_text() != BICEP:
        shutil.rmtree(folder, ignore_errors=True)
        folder.mkdir(parents=True)
        pkg = 'azure.bicep.commandline.linux-x64'
        archive = folder / 'bicep.nupkg'
        urllib.request.urlretrieve(f'https://api.nuget.org/v3-flatcontainer/{pkg}/{BICEP}/{pkg}.{BICEP}.nupkg', archive)
        with zipfile.ZipFile(archive) as z:
            (folder / 'bicep').write_bytes(z.read('tools/bicep'))
        (folder / 'bicep').chmod(0o755)
        archive.unlink()
        stamp.write_text(BICEP)
    return folder


def faketime_env(venv: Path, start: str) -> dict:
    if start == 'real':  # a step beside an emulator whose clock cannot be faked
        return {}
    src = next(venv.glob('lib/python3*/site-packages/libfaketime/vendor/libfaketime/src'))
    return {'LD_LIBRARY_PATH': str(src), 'LD_PRELOAD': 'libfaketime.so.1', 'DONT_FAKE_MONOTONIC': '1',
            'FAKETIME_NO_CACHE': '1', 'FAKETIME_DISABLE_SHM': '1', 'FAKETIME': start}


def wait_port(port: int, what: str) -> None:
    for _ in range(300):
        try:
            with socket.create_connection(('127.0.0.1', port), timeout=0.2):
                return
        except OSError:
            time.sleep(0.05)
    raise SystemExit(f'{what} did not start on port {port} — is another replay running?')


def start_azurite(venv: Path, config: dict, data: Path) -> subprocess.Popen:
    # a port already taken means a leftover Azurite from a killed replay: its data would leak in
    for port in PORTS.values():
        with socket.socket() as s:
            if s.connect_ex(('127.0.0.1', port)) == 0:
                raise SystemExit(f'port {port} is already in use — an Azurite left over from a killed replay?')
    env = {**os.environ, **faketime_env(venv, config.get('time', CLOCK)), 'AZURITE_ACCOUNTS': ';'.join(f'{a}:{ACCOUNT_KEY}' for a in ACCOUNTS)}
    server = subprocess.Popen([str(azurite()), '--silent', '--location', str(data), '--skipApiVersionCheck',
                               '--disableProductStyleUrl', '--loose'],
                              env=env, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    for port in PORTS.values():
        wait_port(port, 'Azurite')
    return server


# Microsoft's messaging emulators, in Docker, pinned. A step that has eventhubs.json or servicebus.json
# (the emulator's own Config.json format: the hubs or queues the step needs) gets a fresh emulator on
# the standard ports (AMQP 5672, Kafka 9092), which is what env.sh's connection strings name. Event
# Hubs keeps its checkpoints and metadata in its own Azurite; Service Bus keeps its state in SQL
# Server. Their clocks are the machine's, not the step's: a frame never prints an enqueued time.
EMULATORS = {
    'eventhubs': ('mcr.microsoft.com/azure-messaging/eventhubs-emulator:2.2.1', '/Eventhubs_Emulator/ConfigFiles/Config.json',
                  ['-p', '5672:5672', '-p', '9092:9092', '-p', '5300:5300']),
    'servicebus': ('mcr.microsoft.com/azure-messaging/servicebus-emulator:2.0.1', '/ServiceBus_Emulator/ConfigFiles/Config.json',
                   ['-p', '5672:5672', '-p', '5300:5300']),
}
EMULATOR_AZURITE = 'mcr.microsoft.com/azure-storage/azurite:3.35.0'
EMULATOR_SQL = 'mcr.microsoft.com/mssql/server:2022-CU26-ubuntu-22.04'
SQL_PASSWORD = 'Spine-emulator-1'  # the emulator's own database, inside a throwaway network


def start_messaging(step: Path) -> list[str]:
    """Start the emulators a step asks for; return the containers and network to remove after."""
    made: list[str] = []
    try:
        return _start_messaging(step, made)
    except BaseException:
        stop_messaging(made)
        raise


def _start_messaging(step: Path, made: list[str]) -> list[str]:
    for kind, (image, target, ports) in EMULATORS.items():
        config = step / f'{kind}.json'
        if not config.exists():
            continue
        net = f'spine-{kind}-{os.getpid()}'
        docker = lambda *a: subprocess.run(['docker', *a], check=True, capture_output=True, text=True)
        docker('network', 'create', net)
        made.append(f'network:{net}')
        if kind == 'eventhubs':
            docker('run', '-d', '--name', f'{net}-store', '--network', net, EMULATOR_AZURITE)
            backing = ['-e', f'BLOB_SERVER={net}-store', '-e', f'METADATA_SERVER={net}-store']
        else:
            docker('run', '-d', '--name', f'{net}-store', '--network', net, '-e', 'ACCEPT_EULA=Y',
                   '-e', f'MSSQL_SA_PASSWORD={SQL_PASSWORD}', EMULATOR_SQL)
            backing = ['-e', f'SQL_SERVER={net}-store', '-e', f'MSSQL_SA_PASSWORD={SQL_PASSWORD}']
        made.append(f'{net}-store')
        docker('run', '-d', '--name', net, '--network', net, *ports, '-v', f'{config.resolve()}:{target}:ro',
               '-e', 'ACCEPT_EULA=Y', *backing, image)
        made.append(net)
        for _ in range(150):
            state = subprocess.run(['docker', 'inspect', '-f', '{{.State.Running}}', net], capture_output=True, text=True)
            if state.stdout.strip() != 'true':
                log = subprocess.run(['docker', 'logs', net], capture_output=True, text=True)
                errors = [l for l in (log.stdout + log.stderr).splitlines() if 'rror' in l]
                raise SystemExit(f'{step}: the {kind} emulator stopped: {(errors or ["(no error logged)"])[0].strip()}')
            try:
                with urllib.request.urlopen('http://127.0.0.1:5300/health', timeout=2) as r:
                    if b'"healthy"' in r.read():
                        break
            except OSError:
                pass
            time.sleep(2)
        else:
            raise SystemExit(f'{step}: the {kind} emulator did not become healthy')
    return made


def stop_messaging(made: list[str]) -> None:
    for item in reversed(made):
        if item.startswith('network:'):
            subprocess.run(['docker', 'network', 'rm', item[8:]], capture_output=True)
        else:
            subprocess.run(['docker', 'rm', '-f', item], capture_output=True)


def postgres(databases: list[str], drop: bool = False) -> None:
    for db in databases:
        subprocess.run(['dropdb', '--if-exists', db], check=True, capture_output=True)
        if not drop:
            subprocess.run(['createdb', db], check=True, capture_output=True)


def commands(session: str, columns: int) -> list[tuple[str, list[str]]]:
    """The `$ ` lines of a transcript, each with the `> ` lines that continue it after a trailing
    backslash, as bash shows a continued command. A line longer than the pane was wrapped like any
    other, so a command line exactly `columns` long continues on the next line."""
    lines = session.splitlines()
    out: list[tuple[str, list[str]]] = []
    i = 0
    while i < len(lines):
        if not lines[i].startswith('$ '):
            i += 1
            continue
        typed = [lines[i]]
        if len(lines[i]) == columns and i + 1 < len(lines) and lines[i + 1].startswith('> '):
            raise SystemExit(f'a typed line exactly {columns} wide reads as wrapped — reword it:\n{lines[i]}')
        while len(lines[i]) == columns and i + 1 < len(lines):
            i += 1
            typed[-1] += lines[i]
        while typed[-1].rstrip().endswith('\\') and i + 1 < len(lines) and lines[i + 1].startswith('> '):
            i += 1
            typed.append(lines[i])
            while len(lines[i]) == columns and i + 1 < len(lines):
                i += 1
                typed[-1] += lines[i]
        out.append((typed[0][2:], [t[2:] for t in typed[1:]]))
        i += 1
    return out


def real_endpoints(output: str) -> str:
    """The emulator's address becomes the endpoint the same account has on Azure."""
    def fix(line: str) -> str:
        if 'AZURE_STORAGE_CONNECTION_STRING' in line:
            return line
        for kind, port in PORTS.items():
            for account in ACCOUNTS:
                line = line.replace(f'http://127.0.0.1:{port}/{account}', f'https://{account}.{kind}.core.windows.net')
        return line
    return '\n'.join(fix(l) for l in output.split('\n'))


def stable_guids(text: str, keep: set[str], step: str) -> str:
    """Random GUIDs become stable ones, numbered by first appearance; written-down GUIDs stay."""
    seen: dict[str, str] = {}

    def swap(m: re.Match) -> str:
        g = m.group(0)
        if g.lower() in keep:
            return g
        if g not in seen:
            seen[g] = str(uuid.UUID(hashlib.sha256(f'{step}#{len(seen)}'.encode()).hexdigest()[:32], version=4))
        return seen[g]
    return GUID.sub(swap, text)


def written_guids(step: Path) -> set[str]:
    found: set[str] = set()
    for f in step.rglob('*'):
        if f.is_file() and f.name != 'session.txt' and 'captured' not in f.parts:
            found |= {g.lower() for g in GUID.findall(f.read_text(errors='replace'))}
    return found


def replay(step: Path) -> tuple[str, dict[str, str]]:
    config = json.loads((step / 'step.json').read_text()) if (step / 'step.json').exists() else {}
    session = (step / 'session.txt').read_text()
    venv = tools()
    clock = config.get('time', CLOCK)
    with tempfile.TemporaryDirectory() as tmp:
        home = Path(tmp) / 'home'
        name = config.get('project', PROJECT)
        project = home / name
        home.mkdir()
        if (step / 'home').exists():
            shutil.copytree(step / 'home', home, dirs_exist_ok=True)
        if (step / 'project').exists():
            shutil.copytree(step / 'project', project)
        else:
            project.mkdir()
        env = {k: v for k, v in os.environ.items() if not k.startswith(('AZURE_', 'AZ_', 'VIRTUAL_ENV', 'PYTHON', 'PG'))}
        env.update({'HOME': str(home), 'NO_COLOR': '1', 'TERM': 'dumb', 'PS1': '', 'TZ': 'UTC', 'COLUMNS': str(config.get('columns', COLUMNS)),
                    'PIP_DISABLE_PIP_VERSION_CHECK': '1', 'PATH': f"{cli()}:{bicep()}:{venv / 'bin'}:/usr/bin:/bin",
                    'AZURE_CORE_COLLECT_TELEMETRY': 'false', 'AZURE_CORE_SURVEY_MESSAGE': 'false', 'AZURE_CORE_NO_COLOR': 'true',
                    'AZURE_CORE_ONLY_SHOW_ERRORS': 'false', 'AZURE_EXTENSION_DIR': str(CACHE / 'cli-extensions'),
                    'PGHOST': '/var/run/postgresql', 'PGUSER': 'root'})
        if config.get('venv'):
            subprocess.run([sys.executable, '-m', 'venv', '.venv'], cwd=project, check=True)
            site = next((project / '.venv' / 'lib').glob('python3*/site-packages'))
            borrowed = next(venv.glob('lib/python3*/site-packages'))
            (site / '_spine_base.pth').write_text(str(borrowed) + '\n')
            env['PATH'] = f"{project / '.venv' / 'bin'}:{env['PATH']}"
            env['VIRTUAL_ENV'] = str(project / '.venv')
        databases = config.get('postgres', [])
        postgres(databases)
        server = start_azurite(venv, config, Path(tmp) / 'azurite') if config.get('azurite', True) else None
        messaging: list[str] = []
        try:
            messaging = start_messaging(step)
            state = home / '.spine-state'
            prelude = 'source env.sh >/dev/null 2>&1\n' if config.get('env') else ''
            for cmd in config.get('setup', []):
                subprocess.run(['bash', '-c', prelude + cmd], cwd=project, env={**env, **faketime_env(venv, clock)},
                               check=True, capture_output=True)
            if prelude:
                subprocess.run(['bash', '-c', f'cd {project}\n{prelude}export -p > {state}'], env=env, check=True)
            cwd = project
            blocks: list[str] = []
            for first, more in commands(session, config.get('columns', COLUMNS)):
                cmd = '\n'.join([first, *more])
                script = f'cd {cwd!s}\n{{ {cmd}\n}} 2>&1\necho "{MARK}$PWD"\n'
                if state.exists():
                    script = state.read_text() + '\n' + script
                r = subprocess.run(['bash', '-c', script + f'export -p > {state}'], env={**env, **faketime_env(venv, clock)},
                                   capture_output=True, text=True)
                output, _, after = r.stdout.partition(MARK)
                # libfaketime's own semaphore warning is the replay's clock, never the command's output
                output = re.sub(r'^libfaketime: .*\n(?:tory\n)?', '', output, flags=re.M)
                if after:
                    cwd = Path(after.split('\n')[0])
                output = real_endpoints(output.rstrip('\n'))
                typed = '\n'.join([f'$ {first}', *(f'> {m}' for m in more)])
                width = config.get('columns', COLUMNS)
                if any(len(t) == width for t in typed.split('\n')):
                    raise SystemExit(f'{step}: a typed line exactly {width} wide reads as wrapped — reword it:\n{typed}')
                blocks.append(typed + (f'\n{output}' if output else ''))
            transcript = '\n'.join(blocks)
            captured = {n: (project / n).read_text() for n in config.get('capture', [])}
        finally:
            stop_messaging(messaging)
            if server:
                server.kill()
                server.wait()
            postgres(databases, drop=True)
    shown = f'{SHOWN_HOME}'
    fix = lambda s: s.replace(str(home), shown).replace(str(Path(tmp).resolve() / 'home'), shown)
    keep = written_guids(step)
    label = str(step.relative_to(ROOT))
    text = stable_guids(wrap(fix(transcript), config.get('columns', COLUMNS)).rstrip('\n') + '\n', keep, label)
    return text, {k: stable_guids(fix(v), keep, label) for k, v in captured.items()}


def wrap(text: str, columns: int) -> str:
    """Hard-wrap at the terminal pane's width, as a real terminal of that width does."""
    out = []
    for line in text.split('\n'):
        while len(line) > columns:
            out.append(line[:columns])
            line = line[columns:]
        out.append(line)
    return '\n'.join(out)


def main() -> int:
    write = '--write' in sys.argv
    only = [a for a in sys.argv[1:] if not a.startswith('--')]
    steps = sorted(p.parent for p in ROOT.glob('*/*/session.txt'))
    steps = [s for s in steps if not only or any(str(s.relative_to(ROOT)).startswith(o) for o in only)]
    problems = 0
    for step in steps:
        transcript, captured = replay(step)
        name = step.relative_to(ROOT)
        if write:
            (step / 'session.txt').write_text(transcript)
            for file, text in captured.items():
                target = step / 'captured' / file
                target.parent.mkdir(parents=True, exist_ok=True)
                target.write_text(text)
            print(f'wrote {name}')
            continue
        expected = (step / 'session.txt').read_text()
        if transcript != expected:
            problems += 1
            print(f'✗ {name}: the terminal pane differs from a real run')
            import difflib
            sys.stdout.writelines(difflib.unified_diff(expected.splitlines(True), transcript.splitlines(True), 'session.txt', 'real run'))
        for file, text in captured.items():
            if (step / 'captured' / file).read_text() != text:
                problems += 1
                print(f'✗ {name}: captured/{file} differs from a real run')
    if not write:
        print(f"{'✗' if problems else '✓'} {len(steps)} spine step(s) replayed, {problems} difference(s)")
    return 1 if problems else 0


if __name__ == '__main__':
    sys.exit(main())
