# def get_baseline(user_id):

#     return {
#         "typing_speed": 50,
#         "mouse_speed": 280,
#         "idle_time": 3,
#         "copy_paste": 1,
#         "window_switch": 2
#     }



from pymongo import MongoClient

client = MongoClient("mongodb://127.0.0.1:27017/")
db = client["keystrokeAI_DB"]
collection = db["training_data"]

def get_baseline(user_id):
    data = collection.find_one({"user_id": user_id})

    if not data:
        return None

    # 🔥 IMPORTANT: extract only features
    baseline = data.get("features", {})

    return baseline