# from services.compare_behavior import compare
# from services.threshold_engine import evaluate

# def authenticate(baseline, current):

#     distance = compare(baseline, current)
#     status = evaluate(distance)

#     return {
#         "distance": distance,
#         "status": status
#     }














from pymongo import MongoClient
from services.compare_behavior import compare
from services.threshold_engine import evaluate

# ================= DB CONNECTION =================
client = MongoClient("mongodb://localhost:27017/")
db = client["userDB"]

training_collection = db["training_data"]
analysis_collection = db["analysis_results"]

# ================= AUTHENTICATION =================
def authenticate(user_id, current):

    try:
        # 🔥 1. FETCH BASELINE (TRAINING DATA)
        baseline = training_collection.find_one({"userId": user_id})

        if not baseline:
            return {
                "status": "NO_BASELINE_FOUND",
                "message": "User training data not found"
            }

        # 🔥 2. COMPARE BASELINE VS CURRENT (Module 3 output)
        distance = compare(baseline, current)

        # 🔥 3. THRESHOLD EVALUATION
        status = evaluate(distance)

        # 🔥 4. STORE RESULT IN DB
        analysis_collection.insert_one({
            "userId": user_id,
            "distance": distance,
            "status": status
        })

        # 🔥 5. RETURN RESULT TO MODULE 3 / API
        return {
            "status": "SUCCESS",
            "distance": distance,
            "result": status
        }

    except Exception as e:
        return {
            "status": "ERROR",
            "message": str(e)
        }