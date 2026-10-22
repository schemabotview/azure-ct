"""Verification-level guard for every code card in the Azure course.

The course has no Azure subscription behind it, so "every result on screen came from a real run" —
the rule the SQL and Spark repos hold — cannot be the rule here. Instead every code card DECLARES how
it was verified, in its filename, after a middle dot:

    exposure.py · runs locally
    lake.bicep · model-checked
    storage.StorageAccount.json · model-checked
    resource-id.txt · doc-cited
    sketch.txt · illustrative

and this script proves the declaration is true. A card with no level, or an unknown one, fails —
unless it IS a spine file, byte for byte (`replayed`): scripts/spine.py has already run it.

  runs locally    a `.py` card is executed with the project's SDK environment; it must exit 0, and
                  if the scene holds a code node with id `<id>-out`, that node's text must equal the
                  program's stdout. A `.sql` card runs in a fresh database on the local PostgreSQL 16
                  cluster and must equal its `<id>-out` card (errors included).
  emulated        behaviour from an emulator. Emulators need a running service, so an emulated card
                  must come from the spine (and is then `replayed`); a stand-alone one fails.
  model-checked   checked against Azure's own definitions, offline:
                    `.bicep`   compiled and linted by the Bicep CLI, which type-checks every resource
                               and property against Azure's published API definitions; any warning
                               or error fails.
                    `.sh`      parses with `bash -n`, and every `az …` line is put to the Azure CLI's
                               own argument parser (its command table, every parameter): a command
                               that would need a sign-in passes, one the parser rejects fails.
                    `<package>.<Model>.json`   a resource body or response: every key, at every
                               depth, is a member of that model in the Azure SDK for Python
                               (`azure-mgmt-<package>`), the code generated from Azure's REST specs.
                    policy `.json` (has "policyRule")   an Azure Policy definition: if/then, a known
                               effect, field conditions well-formed.
                    role `.json` (has "assignableScopes")   a custom role: actions in
                               Provider/type/operation form, data actions apart from actions.
                    other `.json`   valid JSON.
  doc-cited       not executable; the scene file must carry a `// source: https://…` comment.
  illustrative    nothing is checked. Reported, so the count of unverified cards stays visible.

Hidden verifications: every `verify/**/*.py` runs and must exit 0.

Run: npm run check:azure   (the environments are built by scripts/spine.py and below)
"""

from __future__ import annotations

import json
import os
import re
import shlex
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CACHE = ROOT / ".spine-cache"
SDK_PY = CACHE / "sdk" / "bin" / "python"
CHECK_PY = CACHE / "check" / "bin" / "python"
AZ = CACHE / "cli" / "bin" / "az"
BICEP = CACHE / "bicep" / "bicep"

LEVELS = {"runs locally", "model-checked", "emulated", "doc-cited", "illustrative"}
# Commands that change or read the CLI itself, not Azure: nothing to put to the parser.
CUSTOMISATIONS = {"login", "logout", "bicep", "config", "extension", "upgrade", "version", "interactive", "init", "find", "feedback", "survey"}
# What the CLI prints when it REJECTS a command line (as opposed to wanting a sign-in to run it).
PARSE_ERRORS = ("unrecognized arguments", "is misspelled or not recognized", "the following arguments are required",
                "expected one argument", "invalid choice", "is not in the", "argument --", "usage error")
POLICY_EFFECTS = {"deny", "audit", "append", "modify", "deployifnotexists", "auditifnotexists", "disabled", "denyaction", "manual"}

problems: list[str] = []
tally: dict[str, int] = {lvl: 0 for lvl in LEVELS | {"replayed"}}
notes: list[str] = []


def load_scenes() -> dict:
    out = subprocess.run(["node", "scripts/dump-scenes.mjs"], cwd=ROOT, capture_output=True, text=True)
    if out.returncode:
        sys.exit(f"✗ could not load scenes:\n{out.stderr}")
    return json.loads(out.stdout)


def walk(nodes):
    for n in nodes:
        yield n
        yield from walk(n.get("children") or [])


def scene_source(scene_id: str) -> str:
    for f in (ROOT / "src/scenes").rglob("*.ts"):
        text = f.read_text()
        if re.search(rf"(?:id:\s*'|(?:mapFrame|ideFrame)\(\s*'){re.escape(scene_id)}'", text):
            return text
    return ""


# --- az lines, put to the CLI's own parser -----------------------------------------------------------
_az_seen: dict[str, str | None] = {}


def az_verdict(words: list[str]) -> str | None:
    """None if the CLI's parser accepts the command line, else its complaint. Runs with an empty
    config dir and no credentials: a valid command stops at 'please run az login' (or at missing
    storage credentials) before sending anything."""
    key = " ".join(words)
    if key in _az_seen:
        return _az_seen[key]
    with tempfile.TemporaryDirectory() as home:
        env = {"PATH": "/usr/bin:/bin", "HOME": home, "AZURE_CONFIG_DIR": home, "AZURE_CORE_COLLECT_TELEMETRY": "false",
               "AZURE_CORE_SURVEY_MESSAGE": "false", "AZURE_EXTENSION_USE_DYNAMIC_INSTALL": "no", "AZURE_CORE_NO_COLOR": "true",
               "AZURE_EXTENSION_DIR": str(CACHE / "cli-extensions")}
        r = subprocess.run([str(AZ), *words[1:]], env=env, capture_output=True, text=True, timeout=120, stdin=subprocess.DEVNULL)
    err = (r.stderr or "").strip()
    verdict = None
    if r.returncode and any(p in err for p in PARSE_ERRORS):
        verdict = err.splitlines()[0][:300]
    elif r.returncode and "extension" in err and "not installed" in err:
        verdict = "EXTENSION"
    _az_seen[key] = verdict
    return verdict


def check_az(where: str, text: str) -> None:
    joined = re.sub(r"\\\n\s*", " ", text)
    for raw in joined.splitlines():
        line = raw.strip().removeprefix("$ ").removeprefix("> ").strip()
        if line.startswith("#"):
            continue
        # command substitutions, innermost first: an az inside one is checked on its own
        candidates = []
        while (inner := re.search(r"\$\(([^()]*)\)", line)):
            candidates.append(inner.group(1))
            line = line[:inner.start()] + "x" + line[inner.end():]
        candidates.append(line)
        for part in candidates:
            found = re.search(r"(?:^|\|\s*|&&\s*|;\s*)\s*(az\s[^|;&]*)", part)
            if found:
                check_az_command(where, found.group(1))


def check_az_command(where: str, cmd: str) -> None:
    cmd = cmd.split(" #", 1)[0]
    cmd = re.sub(r"\"?\$(?:@|\{@[^}]*\})\"?", "", cmd)  # a function's remaining arguments: none
    cmd = re.sub(r"\$\{[^}]*\}|\$\w+", "x", cmd)
    try:
        words = shlex.split(cmd)
    except ValueError:
        problems.append(f"{where}: cannot split `{cmd}`")
        return
    if len(words) < 2 or words[1] in CUSTOMISATIONS:
        notes.append(f"{where}: `az {' '.join(words[1:2])}` changes the CLI itself, not checked")
        return
    verdict = az_verdict(words)
    if verdict == "EXTENSION":
        notes.append(f"{where}: `{' '.join(words[:3])}` is a CLI extension, not installed offline; not checked")
    elif verdict:
        problems.append(f"{where}: the Azure CLI rejects `{' '.join(words[:6])}…`: {verdict}")


def check_bash(where: str, text: str) -> None:
    """Every shell card must at least parse: `bash -n` catches a broken continuation or quote."""
    body = "\n".join(l[2:] if l.startswith(("$ ", "> ")) else l for l in text.split("\n"))
    r = subprocess.run(["bash", "-n"], input=body, capture_output=True, text=True)
    if r.returncode:
        problems.append(f"{where}: bash -n: {r.stderr.strip()}")


# --- Bicep ----------------------------------------------------------------------------------------------
def check_bicep(where: str, text: str, path: Path | None = None) -> None:
    """Build and lint with the Bicep CLI. A spine file is checked in place, so its modules resolve."""
    with tempfile.TemporaryDirectory() as d:
        target = path if path else Path(d) / "card.bicep"
        if not path:
            target.write_text(text)
        for verb in ("build", "lint"):
            args = [str(BICEP), verb, str(target)] + (["--stdout"] if verb == "build" else [])
            r = subprocess.run(args, capture_output=True, text=True, timeout=180)
            findings = [l for l in r.stderr.splitlines() if re.search(r"\b(Warning|Error)\b", l)]
            if r.returncode or findings:
                for f in findings or [r.stderr.strip()[:300]]:
                    problems.append(f"{where}: bicep {verb}: {f.split(' : ', 1)[-1][:300]}")
                return


# --- JSON: Azure SDK models, policies, roles ---------------------------------------------------------
MODEL_WALKER = r'''
import importlib, json, sys
pkg, model, text = sys.argv[1], sys.argv[2], sys.stdin.read()
mod = importlib.import_module(f"azure.mgmt.{pkg}.models")
cls = getattr(mod, model, None)
if cls is None:
    print(json.dumps([f"no model {model} in azure-mgmt-{pkg}"])); sys.exit()

def fields(c):
    """{json key: nested model class or None} for an SDK model, old (msrest) or new (TypeSpec)."""
    out = {}
    amap = getattr(c, "_attribute_map", None)
    if amap:
        for attr, spec in amap.items():
            key = spec["key"].replace("\\.", "\0")
            parts = [p.replace("\0", ".") for p in key.split(".")]
            t = spec["type"].strip("[]{}")
            sub = getattr(mod, t, None)
            node = out
            for p in parts[:-1]:
                node = node.setdefault(p, {})
                if not isinstance(node, dict):
                    break
            if isinstance(node, dict):
                node[parts[-1]] = sub
        return out
    # TypeSpec models: the field map is built on first instantiation; nested models are _class_type
    try:
        c()
    except Exception:
        pass
    def model_in(t, depth=0):
        """The model class inside a field's type: a list's element arrives wrapped in partials."""
        if isinstance(t, type):
            return t
        if depth < 4:
            for a in [getattr(t, "func", None), *getattr(t, "args", ())]:
                found = model_in(a, depth + 1)
                if found is not None and any(b.__name__ == "Model" and "model_base" in b.__module__ for b in found.__mro__):
                    return found
        return None

    for attr, f in (getattr(c, "_attr_to_rest_field", None) or {}).items():
        sub = model_in(getattr(f, "_class_type", None))
        is_model = isinstance(sub, type) and any(b.__name__ == "Model" and "model_base" in b.__module__ for b in sub.__mro__)
        # a dict of models (pipeline parameters) is a map: its keys are names, its values models
        out[f._rest_name] = (("map", sub) if "_deserialize_dict" in repr(getattr(f, "_type", "")) else sub) if is_model else None
    return out

def subtype(c, value):
    if not isinstance(value, dict):
        return c
    for disc, table in (getattr(c, "_subtype_map", None) or {}).items():
        name = table.get(value.get(disc))
        if name:
            return getattr(mod, name, c)
    if getattr(c, "__mapping__", None):
        try:
            c()
        except Exception:
            pass
        disc = next((f._rest_name for f in (getattr(c, "_attr_to_rest_field", None) or {}).values() if getattr(f, "_is_discriminator", False)), None)
        # the mapping is a tree (Activity -> Execution -> Copy): search it for the value
        todo = [c]
        while disc and todo:
            k = todo.pop()
            for key, sub in (k.__dict__.get("__mapping__") or {}).items():
                if key == value.get(disc):
                    return sub
                todo.append(sub)
    return c

bad = []
def check(value, spec, path):
    if isinstance(value, list):
        for i, v in enumerate(value):
            check(v, spec, f"{path}[{i}]")
        return
    if isinstance(spec, tuple) and isinstance(value, dict):
        for k, v in value.items():
            check(v, spec[1], f"{path}.{k}")
        return
    if isinstance(spec, type):
        spec = fields(subtype(spec, value))
    if not isinstance(value, dict) or spec is None:
        return
    if not spec:
        return  # a free-form map (tags, parameters)
    for k, v in value.items():
        if k not in spec:
            bad.append(f"{path}.{k} is not in the model")
        else:
            check(v, spec[k], f"{path}.{k}")
check(json.loads(text), cls, model)
print(json.dumps(bad))
'''


def check_model(where: str, pkg: str, model: str, text: str) -> None:
    try:
        json.loads(text)
    except json.JSONDecodeError as e:
        problems.append(f"{where}: not valid JSON ({e})")
        return
    r = subprocess.run([str(CHECK_PY), "-c", MODEL_WALKER, pkg, model], input=text, capture_output=True, text=True, timeout=120)
    if r.returncode:
        problems.append(f"{where}: cannot load azure-mgmt-{pkg}: {r.stderr.strip()[-300:]}")
        return
    for b in json.loads(r.stdout):
        problems.append(f"{where}: {b}")


def check_json(where: str, text: str) -> None:
    try:
        doc = json.loads(text)
    except json.JSONDecodeError as e:
        problems.append(f"{where}: not valid JSON ({e})")
        return
    props = doc.get("properties", doc) if isinstance(doc, dict) else {}
    if isinstance(props, dict) and "policyRule" in props:
        rule = props["policyRule"]
        if set(rule) != {"if", "then"}:
            problems.append(f"{where}: policyRule must have exactly `if` and `then`, has {sorted(rule)}")
        effect = str(rule.get("then", {}).get("effect", ""))
        if not effect.startswith("[parameters(") and effect.lower() not in POLICY_EFFECTS:
            problems.append(f"{where}: unknown policy effect {effect!r}")
        check_conditions(where, rule.get("if", {}))
    if isinstance(props, dict) and "assignableScopes" in props:
        for perm in props.get("permissions", []):
            for kind in ("actions", "notActions", "dataActions", "notDataActions"):
                for a in perm.get(kind, []):
                    if a != "*" and not re.fullmatch(r"[A-Za-z]+\.[A-Za-z.]+(/[A-Za-z*]+)+|\*/[a-z]+", a):
                        problems.append(f"{where}: {kind} entry {a!r} is not Provider/type/operation")


def check_conditions(where: str, cond) -> None:
    if not isinstance(cond, dict):
        return
    logic = {"allOf", "anyOf", "not"} & set(cond)
    if logic:
        for k in logic:
            for c in cond[k] if isinstance(cond[k], list) else [cond[k]]:
                check_conditions(where, c)
        return
    if "field" not in cond and "value" not in cond and "count" not in cond:
        problems.append(f"{where}: a policy condition names no field, value or count: {cond}")


# --- running cards ---------------------------------------------------------------------------------------
def run_python(where: str, text: str, expected: str | None) -> None:
    with tempfile.TemporaryDirectory() as d:
        f = Path(d) / "card.py"
        f.write_text(text)
        r = subprocess.run([str(SDK_PY), "-I", str(f)], cwd=d, capture_output=True, text=True, timeout=120)
    if r.returncode:
        problems.append(f"{where}: exited {r.returncode}\n{r.stderr.strip()[-600:]}")
        return
    if expected is not None and r.stdout.rstrip() != expected.rstrip():
        problems.append(f"{where}: the output card does not match the program's real output\n"
                        f"--- card ---\n{expected.rstrip()}\n--- run ---\n{r.stdout.rstrip()}")


def run_sql(where: str, text: str, expected: str | None) -> None:
    """A `.sql` card runs in real PostgreSQL (the local 16 cluster), in a FRESH database created for
    this card and dropped after. Errors are part of the output."""
    import uuid

    db = "azurect_" + uuid.uuid4().hex[:10]
    env = {**os.environ, "PGHOST": "/var/run/postgresql", "PGUSER": os.environ.get("PGUSER", "root")}
    if subprocess.run(["createdb", db], capture_output=True, env=env).returncode:
        problems.append(f"{where}: cannot create a PostgreSQL database (is the local cluster running?)")
        return
    try:
        r = subprocess.run(["psql", "-X", "-q", "-d", db, "-P", "pager=off", "-v", "VERBOSITY=terse"],
                           input=text, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True, timeout=120, env=env)
    finally:
        subprocess.run(["dropdb", db], capture_output=True, env=env)
    if expected is not None and r.stdout.rstrip() != expected.rstrip():
        problems.append(f"{where}: the output card does not match PostgreSQL's real output\n"
                        f"--- card ---\n{expected.rstrip()}\n--- run ---\n{r.stdout.rstrip()}")


# --- spine files -------------------------------------------------------------------------------------------
_spine: dict[str, Path] | None = None


def spine_files() -> dict[str, Path]:
    global _spine
    if _spine is None:
        _spine = {}
        for f in sorted((ROOT / "spine").rglob("*")):
            if f.is_file() and "project" in f.parts:
                _spine.setdefault(f.read_text(errors="replace").rstrip("\n"), f)
    return _spine


def static_check(where: str, name: str, text: str, path: Path | None) -> None:
    """The checks a spine file's type allows without running it (the replay already ran it)."""
    if name.endswith(".sh"):
        check_bash(where, text)
        check_az(where, text)
    elif name.endswith(".bicep"):
        check_bicep(where, text, path)
    elif name.endswith(".json"):
        check_json(where, text)


def main() -> None:
    for need in (SDK_PY, CHECK_PY, AZ, BICEP):
        if not need.exists():
            sys.exit(f"✗ {need.relative_to(ROOT)} is missing — run `python3 scripts/spine.py` once, and "
                     f"`python3 -m venv .spine-cache/check && .spine-cache/check/bin/pip install -r scripts/requirements-check.txt`")
    scenes = load_scenes()
    for sid, scene in scenes.items():
        nodes = list(walk(scene["nodes"]))
        by_id = {n["id"]: n for n in nodes}
        for n in nodes:
            if n.get("kind") != "code":
                continue
            where = f"{sid}/{n['id']}"
            fname = n.get("filename") or ""
            if n["id"].endswith("-out") and n["id"][:-4] in by_id:
                continue  # an output card: checked through its program
            text = n["label"]
            if " · " not in fname:
                path = spine_files().get(text.rstrip("\n"))
                if path:
                    tally["replayed"] += 1
                    static_check(where, fname, text, path)
                else:
                    problems.append(f"{where}: filename '{fname}' declares no verification level (`name · level`) and is not a spine file")
                continue
            name, level = (s.strip() for s in fname.rsplit(" · ", 1))
            if level not in LEVELS:
                problems.append(f"{where}: unknown verification level '{level}' (one of {sorted(LEVELS)})")
                continue
            tally[level] += 1
            if level == "runs locally" and name.endswith(".sql"):
                out = by_id.get(n["id"] + "-out")
                run_sql(where, text, out["label"] if out else None)
            elif level == "runs locally":
                if not name.endswith(".py"):
                    problems.append(f"{where}: 'runs locally' needs a .py or .sql card, got {name}")
                    continue
                out = by_id.get(n["id"] + "-out")
                run_python(where, text, out["label"] if out else None)
            elif level == "emulated":
                problems.append(f"{where}: an emulated card must be a spine file (replayed by scripts/spine.py), not a stand-alone card")
            elif level == "model-checked":
                m = re.fullmatch(r"([a-z]+)\.([A-Z][A-Za-z0-9]+)\.json", name)
                if m:
                    check_model(where, m.group(1), m.group(2), text)
                elif name.endswith(".sh"):
                    check_bash(where, text)
                    check_az(where, text)
                elif name.endswith(".bicep"):
                    check_bicep(where, text)
                elif name.endswith(".json"):
                    check_json(where, text)
                else:
                    problems.append(f"{where}: nothing can model-check a '{name}' card")
            elif level == "doc-cited":
                if not re.search(r"//\s*source:\s*https://", scene_source(sid)):
                    problems.append(f"{where}: doc-cited, but scene '{sid}' has no `// source: https://…` comment")

    vdir = ROOT / "verify"
    hidden = sorted(vdir.rglob("*.py")) if vdir.exists() else []
    for f in hidden:
        r = subprocess.run([str(SDK_PY), "-I", str(f)], capture_output=True, text=True, timeout=300)
        if r.returncode:
            problems.append(f"{f.relative_to(ROOT)}: failed\n{(r.stdout + r.stderr).strip()[-800:]}")
    print("  " + "  ".join(f"{lvl}: {tally[lvl]}" for lvl in sorted(tally)) + f"  hidden verifications: {len(hidden)}")
    for n in notes:
        print("  · " + n)
    if problems:
        print(f"\n✗ {len(problems)} verification problem(s):", file=sys.stderr)
        for p in problems:
            print("  " + p, file=sys.stderr)
        sys.exit(1)
    print("✓ every code card's verification level holds")


main()
