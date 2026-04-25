def format_data(raw):
    return {
        "typing_speed": raw.get("typing_speed", 0),
        "mouse_speed": raw.get("mouse_speed", 0),
        "idle_time": raw.get("idle_time", 0),
        "copy_paste_count": raw.get("copy_paste_count", 0)
    }