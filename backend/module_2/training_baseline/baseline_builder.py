import json

def save_baseline(user, features):
    data = {
        "user": user,
        "baseline": features
    }

    with open("user_profile.json", "w") as f:
        json.dump(data, f, indent=4)