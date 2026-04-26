# from services.compare_behavior import compare
# from services.threshold_engine import evaluate

# def authenticate(baseline, current):

#     distance = compare(baseline, current)
#     status = evaluate(distance)

#     return {
#         "distance": distance,
#         "status": status
#     }














# from pymongo import MongoClient
# from services.compare_behavior import compare
# from services.threshold_engine import evaluate

# # ================= DB CONNECTION =================
# client = MongoClient("mongodb://localhost:27017/")
# db = client["userDB"]

# training_collection = db["training_data"]
# analysis_collection = db["analysis_results"]

# # ================= AUTHENTICATION =================
# def authenticate(user_id, current):

#     try:
#         # 🔥 1. FETCH BASELINE (TRAINING DATA)
#         baseline = training_collection.find_one({"userId": user_id})

#         if not baseline:
#             return {
#                 "status": "NO_BASELINE_FOUND",
#                 "message": "User training data not found"
#             }

#         # 🔥 2. COMPARE BASELINE VS CURRENT (Module 3 output)
#         distance = compare(baseline, current)

#         # 🔥 3. THRESHOLD EVALUATION
#         status = evaluate(distance)

#         # 🔥 4. STORE RESULT IN DB
#         analysis_collection.insert_one({
#             "userId": user_id,
#             "distance": distance,
#             "status": status
#         })

#         # 🔥 5. RETURN RESULT TO MODULE 3 / API
#         return {
#             "status": "SUCCESS",
#             "distance": distance,
#             "result": status
#         }

#     except Exception as e:
#         return {
#             "status": "ERROR",
#             "message": str(e)
#         }







# def authenticate(user_id, current):

#     try:
#         baseline = training_collection.find_one({"userId": user_id})

#         if not baseline:
#             return {
#                 "status": "NO_BASELINE_FOUND"
#             }

#         # ⚠️ remove Mongo _id
#         baseline.pop("_id", None)

#         distance = compare(baseline, current)

#         status = evaluate(distance)

#         analysis_collection.insert_one({
#             "userId": user_id,
#             "distance": distance,
#             "status": status
#         })

#         return {
#             "status": status,
#             "distance": distance
#         }

#     except Exception as e:
#         return {
#             "status": "ERROR",
#             "message": str(e)
#         }




# from pymongo import MongoClient
# from services.compare_behavior import compare
# from services.threshold_engine import evaluate

# # ================= DB CONNECTION =================
# client = MongoClient("mongodb://127.0.0.1:27017/")
# db = client["keystrokeAI_DB"]

# training_collection = db["training_data"]
# analysis_collection = db["analysis_results"]


# # ================= AUTHENTICATION =================
# def authenticate(user_id, current):
#     try:
#         # 🔥 1. FETCH LATEST BASELINE DATA
#         data = training_collection.find_one(
#             {"user_id": user_id},
#             sort=[("timestamp", -1)]  # latest record
#         )

#         if not data:
#             return {
#                 "status": "NO_BASELINE_FOUND"
#             }

#         # 🔥 2. EXTRACT ONLY FEATURES
#         baseline = data.get("features", {})

#         if not baseline:
#             return {
#                 "status": "INVALID_BASELINE_DATA"
#             }

#         # 🔥 3. COMPARE
#         distance = compare(baseline, current)

#         # 🔥 4. THRESHOLD DECISION
#         status = evaluate(distance)

#         # 🔥 5. STORE RESULT
#         analysis_collection.insert_one({
#             "user_id": user_id,
#             "distance": distance,
#             "status": status
#         })

#         # 🔥 6. RETURN RESULT
#         return {
#             "status": status,
#             "distance": distance
#         }

#     except Exception as e:
#         print("AUTH ERROR:", e)
#         return {
#             "status": "ERROR",
#             "message": str(e)
#         }

















# from pymongo import MongoClient
# from services.compare_behavior import compare
# from services.threshold_engine import evaluate
# from utils.preprocess import normalize

# client = MongoClient("mongodb://127.0.0.1:27017/")
# db = client["keystrokeAI_DB"]

# training_collection = db["training_data"]
# analysis_collection = db["analysis_results"]

# def authenticate(user_id, current):
#     try:
#         # 🔥 FETCH BASELINE
#         data = training_collection.find_one(
#             {"user_id": user_id},
#             sort=[("timestamp", -1)]
#         )

#         if not data:
#             return {"status": "NO_BASELINE"}

#         baseline = data.get("features", {})

#         if not baseline:
#             return {"status": "INVALID_BASELINE"}

#         # 🔥 NORMALIZE
#         baseline = normalize(baseline)
#         current = normalize(current)

#         # 🔥 COMPARE
#         distance = compare(baseline, current)

#         # 🔥 DECISION
#         status = evaluate(distance)

#         # 🔥 SAVE RESULT
#         analysis_collection.insert_one({
#             "user_id": user_id,
#             "distance": distance,
#             "status": status
#         })

#         return {
#             "status": status,
#             "distance": distance
#         }

#     except Exception as e:
#         print("AUTH ERROR:", e)
#         return {"status": "ERROR", "message": str(e)}











# def authenticate(user_id, current):
#     try:
#         print("Incoming user_id:", user_id)

#         data = training_collection.find_one(
#             {"userId": user_id},   # ✅ FIXED
#             sort=[("timestamp", -1)]
#         )

#         print("DB DATA:", data)

#         if not data:
#             return {"status": "NO_BASELINE"}

#         baseline = data.get("features", {})
#         print("BASELINE:", baseline)

    







# def authenticate(user_id, current):
#     try:
#         print("Incoming user_id:", user_id)

#         # 🔥 FETCH FROM DB
#         data = training_collection.find_one(
#             {"userId": user_id},
#             sort=[("timestamp", -1)]
#         )

#         print("DB DATA:", data)

#         if not data:
#             return {"status": "NO_BASELINE"}

#         # 🔥 BASELINE
#         baseline = data.get("features", {})
#         print("BASELINE:", baseline)

#         if not baseline:
#             return {"status": "INVALID_BASELINE"}

#         # 🔥 NORMALIZE
#         from utils.preprocess import normalize
#         baseline = normalize(baseline)
#         current = normalize(current)

#         print("CURRENT:", current)

#         # 🔥 COMPARE
#         from services.compare_behavior import compare
#         distance = compare(baseline, current)

#         print("DISTANCE:", distance)

#         # 🔥 THRESHOLD
#         from services.threshold_engine import evaluate
#         status = evaluate(distance)

#         print("FINAL STATUS:", status)

#         # 🔥 SAVE RESULT
#         analysis_collection.insert_one({
#             "userId": user_id,
#             "distance": distance,
#             "status": status
#         })

#         # 🔥 RETURN TO UI
#         return {
#             "status": status,
#             "distance": distance
#         }

#     except Exception as e:
#         print("AUTH ERROR:", e)
#         return {
#             "status": "ERROR",
#             "message": str(e)
#         }







# from db import training_collection, analysis_collection


# def authenticate(user_id, current):
#     try:
#         print("Incoming user_id:", user_id)

#         # 🔥 FETCH FROM DB (latest record)
#         data = training_collection.find_one(
#             {"userId": user_id},
#             sort=[("timestamp", -1)]
#         )

#         print("DB DATA:", data)

#         if not data:
#             return {"status": "NO_BASELINE"}

#         # 🔥 BASELINE
#         baseline = data.get("features", {})
#         print("BASELINE:", baseline)

#         if not baseline:
#             return {"status": "INVALID_BASELINE"}

#         # 🔥 NORMALIZE
#         from utils.preprocess import normalize

#         baseline = normalize(baseline)
#         current = normalize(current)

#         print("CURRENT:", current)

#         # 🔥 COMPARE
#         from services.compare_behavior import compare

#         distance = compare(baseline, current)

#         print("DISTANCE:", distance)

#         # 🔥 THRESHOLD
#         from services.threshold_engine import evaluate

#         status = evaluate(distance)

#         print("FINAL STATUS:", status)

#         # 🔥 SAVE RESULT
#         analysis_collection.insert_one({
#             "userId": user_id,
#             "distance": distance,
#             "status": status
#         })

#         # 🔥 RETURN TO UI
#         return {
#             "status": status,
#             "distance": distance
#         }

#     except Exception as e:
#         print("AUTH ERROR:", e)
#         return {
#             "status": "ERROR",
#             "message": str(e)
#         }




















from db import training_collection, analysis_collection


def authenticate(user_id, current):
    try:
        print("Incoming user_id:", user_id)

        # 🔥 FIX: support both formats safely
        data = training_collection.find_one(
            {
                "$or": [
                    {"user_id": user_id},
                    {"userId": user_id}
                ]
            },
            sort=[("timestamp", -1)]
        )

        print("DB DATA:", data)

        # ❌ NO DATA CASE (IMPORTANT FIX)
        if not data:
            print("⚠️ No training data found")
            return {
                "status": "NO_BASELINE",
                "message": "Training data not found for this user"
            }

        # 🔥 BASELINE
        baseline = data.get("features", {})
        print("BASELINE:", baseline)

        if not baseline:
            return {
                "status": "INVALID_BASELINE",
                "message": "Features missing in DB"
            }

        # 🔥 NORMALIZE
        from utils.preprocess import normalize

        baseline = normalize(baseline)
        current = normalize(current)

        print("CURRENT:", current)

        # 🔥 COMPARE
        from services.compare_behavior import compare

        distance = compare(baseline, current)

        print("DISTANCE:", distance)

        # 🔥 THRESHOLD
        from services.threshold_engine import evaluate

        status = evaluate(distance)

        print("FINAL STATUS:", status)

        # 🔥 SAVE RESULT
        analysis_collection.insert_one({
            "user_id": user_id,
            "distance": distance,
            "status": status
        })

        # 🔥 RESPONSE
        return {
            "status": status,
            "distance": distance
        }

    except Exception as e:
        print("AUTH ERROR:", e)
        return {
            "status": "ERROR",
            "message": str(e)
        }