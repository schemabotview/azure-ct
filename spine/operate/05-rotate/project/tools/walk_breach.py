"""Walk the breach workflow's orchestrator with stand-in answers: a tiny
replacement for the Durable Functions runtime that plays each activity and
timer instantly. The orchestrator's own code runs unchanged."""
import sys
from datetime import datetime, timedelta

sys.path.insert(0, 'functions/breach_workflow')
from orchestrator import breach_workflow  # noqa: E402

START = datetime(2026, 10, 14, 15, 30, 10)


class Task:
    def __init__(self, name, at, result=None):
        self.name, self.at, self.result = name, at, result

    def cancel(self):
        pass


class Context:
    def __init__(self, alert, answers):
        self.alert, self.answers, self.now = alert, answers, START

    def get_input(self):
        return self.alert

    current_utc_datetime = property(lambda self: self.now)

    def call_activity(self, name, data):
        minutes, result = self.answers.get(name, (0, 'done'))
        return Task(name, self.now + timedelta(minutes=minutes), result)

    def create_timer(self, at):
        return Task('30-minute timer', at)

    def task_any(self, tasks):
        return Task('first of', None, min(tasks, key=lambda t: t.at))


def walk(title, answers):
    print(title)
    ctx = Context({'deal_id': 'LC-2044', 'reservation': 'req-c41e'}, answers)
    run = breach_workflow(ctx)
    task = next(run)
    try:
        while True:
            done = task.result if task.name == 'first of' else task
            ctx.now = max(ctx.now, done.at)
            print(f'  {ctx.now:%H:%M}  {done.name}: {done.result or "fired"}')
            task = run.send(done if task.name == 'first of' else done.result)
    except StopIteration as end:
        print(f'  -> {end.value}')


walk('the officer approves at 15:42', {'ask_officer': (12, 'approve')})
walk('no answer; the head of credit rejects', {
    'ask_officer': (45, 'approve'), 'ask_head_of_credit': (8, 'reject')})
