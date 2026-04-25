import json
from datetime import datetime

def log_key(event):
    data = {
        "event": event,
        "timestamp": str(datetime.now())
    }

    with open("key_events.json", "a") as f:
        f.write(json.dumps(data) + "\n")