"""The breach workflow as a Durable Functions orchestrator: ask the credit
officer, escalate after 30 minutes without an answer, and if the excess is
refused, undo what was done: release the reservation, tell the dealer.
Each step is an activity; the orchestrator only decides the order."""
from datetime import timedelta


def breach_workflow(context):
    alert = context.get_input()
    ask = context.call_activity('ask_officer', alert)
    deadline = context.create_timer(
        context.current_utc_datetime + timedelta(minutes=30))
    first = yield context.task_any([ask, deadline])
    if first == deadline:                     # no answer: escalate
        answer = yield context.call_activity('ask_head_of_credit', alert)
    else:
        deadline.cancel()
        answer = ask.result
    if answer == 'reject':                    # compensate, in order
        yield context.call_activity('release_reservation',
                                    alert['reservation'])
        yield context.call_activity('tell_dealer', alert)
    yield context.call_activity('record_decision',
                                {'deal': alert['deal_id'], 'answer': answer})
    return answer
