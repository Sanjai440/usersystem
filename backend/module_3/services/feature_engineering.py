def extract_features(data):
    return {
        "typing_speed": data.get("typing_speed", 0),
        "mouse_speed": data.get("mouse_speed", 0),
        "idle_time": data.get("idle_time", 0),
        "copy_paste": data.get("copy_paste_count", 0)
    }