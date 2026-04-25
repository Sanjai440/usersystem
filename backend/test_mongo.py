from pymongo import MongoClient

client = MongoClient("mongodb://127.0.0.1:27017/")
db = client["keystrokeAI_DB"]

result = db.training_data.insert_one({"test": "working"})
print("Inserted ID:", result.inserted_id)