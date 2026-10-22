"""A deal's steps through the deal-steps queue: one session per deal, so its
steps are read in order; a resent step dropped by duplicate detection; and a
step that cannot be handled, retried until it is dead-lettered."""
import json
import os

from azure.servicebus import (ServiceBusClient, ServiceBusMessage,
                              ServiceBusSubQueue)

STEPS = [('LC-2041', 'booked'), ('LC-2041', 'documents-checked'),
         ('LC-2042', 'booked'), ('LC-2041', 'issued'),
         ('LC-2041', 'issued'),                 # the sender's retry
         ('LC-2042', 'issued')]                 # names no beneficiary


def handle(step):
    if step['step'] == 'issued' and step['deal'] == 'LC-2042':
        raise ValueError('no beneficiary on the deal')


with ServiceBusClient.from_connection_string(
        os.environ['SERVICEBUS_CONNECTION_STRING']) as bus:
    with bus.get_queue_sender('deal-steps') as sender:
        for deal, step in STEPS:
            sender.send_messages(ServiceBusMessage(
                json.dumps({'deal': deal, 'step': step}), session_id=deal,
                message_id=f'{deal}/{step}'))  # the same step, the same id
    print(f'sent {len(STEPS)} messages')

    for deal in ('LC-2041', 'LC-2042'):
        with bus.get_queue_receiver('deal-steps', session_id=deal,
                                    max_wait_time=3) as session:
            for message in session:
                step = json.loads(str(message))
                try:
                    handle(step)
                    session.complete_message(message)
                    print(f"{deal}  {step['step']:18}completed")
                except ValueError as e:
                    session.abandon_message(message)
                    print(f"{deal}  {step['step']:18}abandoned, delivery "
                          f'{message.delivery_count + 1}: {e}')

    dead = ServiceBusSubQueue.DEAD_LETTER
    with bus.get_queue_receiver('deal-steps', max_wait_time=3,
                                sub_queue=dead) as dlq:
        for message in dlq:
            print(f'dead-lettered: {message.message_id}, '
                  f'{message.dead_letter_reason}')
            dlq.complete_message(message)
