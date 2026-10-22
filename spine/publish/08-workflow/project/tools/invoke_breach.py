"""Call the breach alert's logic as the Functions host would, with the
Event Grid event from the intraday job (functions/breach_alert/sample_event
.json). The host itself, Event Grid and Service Bus are not run here."""
import json
import sys
import textwrap

sys.path.insert(0, 'functions/breach_alert')
from message import alert_for  # noqa: E402

event = json.load(open('functions/breach_alert/sample_event.json'))
print(f"in:  {event['eventType']} for {event['subject']}")
alert = alert_for(event['data'])
print('out: to the queue breach-alerts')
for field in ('officer', 'group_id', 'deal_id', 'reservation'):
    print(f'  {field:12}{alert[field]}')
print(textwrap.fill(alert['text'], 76, initial_indent='  text        ',
                    subsequent_indent=' ' * 14))
