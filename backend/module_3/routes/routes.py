# from flask import Blueprint, request, jsonify
# import requests

# module3_bp = Blueprint("module3", __name__)

# # 👉 Module 4 URL (AI Engine)
# MODULE4_URL = "http://127.0.0.1:5001/api/compare"


# @module3_bp.route("/process", methods=["POST"])
# def process_features():
#     try:
#         data = request.json

#         # 🟢 receive from Module 2
#         user_id = data.get("userId")
#         features = data.get("features")
#         data_type = data.get("type", "exam")

#         # ⚙️ STEP 1: validate
#         if not user_id or not features:
#             return jsonify({
#                 "status": "error",
#                 "message": "Missing data"
#             }), 400

#         # ⚙️ STEP 2: prepare payload for Module 4
#         payload = {
#             "userId": user_id,
#             "features": features,
#             "type": data_type
#         }

#         # 🚀 STEP 3: send to Module 4 (AI Engine)
#         response = requests.post(MODULE4_URL, json=payload)

#         result = response.json()

#         # 📤 return final result back
#         return jsonify({
#             "status": "processed by module 3",
#             "module4_result": result
#         }), 200

#     except Exception as e:
#         print("🔥 MODULE 3 ERROR:", e)
#         return jsonify({"error": str(e)}), 500 




from flask import Blueprint, request, jsonify
import requests
import sys
import os

# ================= PATH FIX =================
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

module3_bp = Blueprint("module3", __name__)

# 👉 Module 4 URL (AI Engine)
MODULE4_URL = "http://127.0.0.1:5001/api/compare"


@module3_bp.route("/process", methods=["POST"])
def process_features():
    try:
        data = request.json

        # 🟢 receive from Module 2
        user_id = data.get("userId")
        features = data.get("features")
        data_type = data.get("type", "exam")

        # ⚙️ STEP 1: validate
        if not user_id or not features:
            return jsonify({
                "status": "error",
                "message": "Missing data"
            }), 400

        # ⚙️ STEP 2: prepare payload for Module 4
        payload = {
            "userId": user_id,
            "features": features,
            "type": data_type
        }

        # 🚀 STEP 3: send to Module 4 (AI Engine)
        try:
            response = requests.post(
                MODULE4_URL,
                json=payload,
                timeout=10   # ✅ FIX: prevents hanging
            )
            result = response.json()

        except requests.exceptions.RequestException as e:
            return jsonify({
                "status": "error",
                "message": "Module 4 not reachable",
                "error": str(e)
            }), 500

        # 📤 return final result back
        return jsonify({
            "status": "processed by module 3",
            "module4_result": result
        }), 200

    except Exception as e:
        print("🔥 MODULE 3 ERROR:", e)
        return jsonify({"error": str(e)}), 500