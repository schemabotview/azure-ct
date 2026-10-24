"""The breach alert: an Azure Function on the Flex Consumption plan. Event
Grid delivers each LimitBreached event from the intraday job; the function
writes the credit officer's message to the Service Bus queue breach-alerts,
where the breach workflow picks it up. All its logic is in message.py."""
import json

import azure.functions as func

from message import alert_for

app = func.FunctionApp()


@app.event_grid_trigger(arg_name='event')
@app.service_bus_queue_output(arg_name='alert', queue_name='breach-alerts',
                              connection='ServiceBus')
def breach_alert(event: func.EventGridEvent, alert: func.Out[str]) -> None:
    alert.set(json.dumps(alert_for(event.get_json())))
