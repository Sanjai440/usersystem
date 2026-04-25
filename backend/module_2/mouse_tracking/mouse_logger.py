import json
from datetime import datetime

def log_mouse(event_type, data):
    record = {
        "event": event_type,
        "data": data,
        "timestamp": str(datetime.now())
    }

    with open("mouse_events.json", "a") as f:
        f.write(json.dumps(record) + "\n")