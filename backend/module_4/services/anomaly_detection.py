def detect_anomaly(data):
    score = 0

    if data.get("idle_time", 0) > 5:
        score += 1

    if data.get("copy_paste", 0) > 3:
        score += 1

    return score