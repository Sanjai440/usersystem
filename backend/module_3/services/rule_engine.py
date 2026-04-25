def apply_rules(features):
    risk = 0

    if features["copy_paste"] > 3:
        risk += 30

    if features["idle_time"] > 5:
        risk += 25

    if features["typing_speed"] < 20:
        risk += 20

    return risk