def typing_speed(total_keys, time_seconds):
    if time_seconds == 0:
        return 0
    return (total_keys / time_seconds) * 60