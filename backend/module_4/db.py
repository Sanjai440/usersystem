from pymongo import MongoClient

# ================= DB CONNECTION =================
client = MongoClient("mongodb://localhost:27017/")
db = client["keystrokeAI_DB"]

# ================= COLLECTION =================
training_collection = db["training_data"]
users_collection = db["users"]
analysis_collection = db["analysis_results"]