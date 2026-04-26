from db import training_collection

def get_baseline(user_id):
    data = training_collection.find_one(
        {"user_id": user_id},
        sort=[("timestamp", -1)]
    )

    if not data:
        return None

    return data.get("features", {})