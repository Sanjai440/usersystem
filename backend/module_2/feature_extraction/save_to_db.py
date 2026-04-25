# from pymongo import MongoClient

# client = MongoClient("mongodb://localhost:27017/")
# db = client["auth_system"]
# collection = db["training_features"]

# def save_features(user_id, features):
#     data = {
#         "user_id": user_id,
#         "features": features
#     }
#     collection.insert_one(data)











# from pymongo import MongoClient

# client = MongoClient("mongodb://localhost:27017/")
# db = client["auth_system"]
# collection = db["training_features"]

# def save_features(user_id, features):
#     data = {
#         "user_id": user_id,
#         "features": features
#     }

#     result = collection.insert_one(data)
#     return str(result.inserted_id)








# from pymongo import MongoClient

# client = MongoClient("mongodb://127.0.0.1:27017/")

# # ✅ USE EXISTING DB
# db = client["behaviorDB"]

# # collection inside behaviorDB
# collection = db["training_features"]

# def save_features(user_id, features):
#     data = {
#         "user_id": user_id,
#         "features": features
#     }

#     result = collection.insert_one(data)

#     print("✅ Saved to behaviorDB")
#     print("🆔 ID:", result.inserted_id)

#     return str(result.inserted_id)






# from pymongo import MongoClient

# # ✅ ONE DB ONLY (your project DB)
# client = MongoClient("mongodb://127.0.0.1:27017/")
# db = client["keystrokeAI_DB"]
# collection = db["training_data"]

# def save_features(user_id, features):
#     data = {
#         "user_id": user_id,
#         "features": features
#     }

#     result = collection.insert_one(data)

#     print("✅ Saved to MongoDB")
#     print("🆔 ID:", result.inserted_id)

#     return str(result.inserted_id)








# from pymongo import MongoClient

# client = MongoClient("mongodb://127.0.0.1:27017/")
# db = client["keystrokeAI_DB"]
# collection = db["training_data"]

# def save_features(user_id, features):
#     collection.insert_one({
#         "user_id": user_id,
#         "features": features
#     })





# from pymongo import MongoClient

# client = MongoClient("mongodb://127.0.0.1:27017/")
# db = client["keystrokeAI_DB"]
# collection = db["training_data"]

# def save_features(user_id, features):
#     data = {
#         "user_id": user_id,
#         "features": features
#     }

#     result = collection.insert_one(data)
#     print("🔥 SAVED:", result.inserted_id)
#     return result.inserted_id














# from pymongo import MongoClient
# from datetime import datetime

# # Mongo connection
# client = MongoClient("mongodb://127.0.0.1:27017/")
# db = client["keystrokeAI_DB"]
# collection = db["training_data"]

# def save_features(user_id, features):
#     try:
#         if not user_id:
#             raise ValueError("user_id is required")

#         data = {
#             "user_id": user_id,
#             "features": features,
#             "timestamp": datetime.utcnow()
#         }

#         result = collection.insert_one(data)

#         print("🔥 SAVED SUCCESS:", result.inserted_id)
#         return result.inserted_id

#     except Exception as e:
#         print("❌ DB SAVE ERROR:", str(e))
#         return None










# from pymongo import MongoClient
# from datetime import datetime

# # MongoDB connection
# client = MongoClient("mongodb://127.0.0.1:27017/")
# db = client["keystrokeAI_DB"]
# collection = db["training_data"]

# def save_features(user_id, features):
#     try:
#         print("🔥 SAVE FUNCTION CALLED")

#         if not user_id:
#             raise ValueError("user_id is required")

#         data = {
#             "user_id": user_id,
#             "features": features,
#             "timestamp": datetime.utcnow()
#         }

#         result = collection.insert_one(data)

#         print("🔥 SAVED SUCCESS:", result.inserted_id)
#         return str(result.inserted_id)

#     except Exception as e:
#         print("❌ DB SAVE ERROR:", str(e))
#         return None












# from pymongo import MongoClient
# from datetime import datetime

# # MongoDB connection
# client = MongoClient("mongodb://127.0.0.1:27017/")
# db = client["keystrokeAI_DB"]
# collection = db["training_data"]

# def save_features(user_id, features):
#     try:
#         print("🔥 SAVE FUNCTION CALLED")

#         if not user_id:
#             raise ValueError("user_id is required")

#         data = {
#             "user_id": user_id,
#             "features": features,
#             "timestamp": datetime.utcnow()
#         }

#         result = collection.insert_one(data)

#         print("🔥 SAVED SUCCESS:", result.inserted_id)
#         return str(result.inserted_id)

#     except Exception as e:
#         print("❌ DB ERROR:", str(e))
#         return None












from pymongo import MongoClient
from datetime import datetime

# MongoDB connection
client = MongoClient("mongodb://127.0.0.1:27017/")
db = client["keystrokeAI_DB"]
collection = db["training_data"]

def save_features(user_id, features):
    try:
        print("🔥 DB SAVE TRIGGERED")

        data = {
            "user_id": user_id,
            "features": features,
            "timestamp": datetime.utcnow()
        }

        result = collection.insert_one(data)

        print("🔥 SAVED SUCCESS:", str(result.inserted_id))
        return str(result.inserted_id)

    except Exception as e:
        print("❌ DB ERROR HANDLED:", str(e))
        return None