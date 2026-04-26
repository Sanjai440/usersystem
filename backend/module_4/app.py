# from flask import Flask, request, jsonify
# from flask_cors import CORS

# from services.authentication import authenticate

# app = Flask(__name__)
# CORS(app)

# @app.route("/api/compare", methods=["POST"])
# def compare_api():
#     try:
#         data = request.json

#         user_id = data.get("userId")
#         features = data.get("features")

#         if not user_id or not features:
#             return jsonify({"error": "Missing data"}), 400

#         # 🔥 CALL MAIN AI LOGIC
#         result = authenticate(user_id, features)

#         return jsonify(result)

#     except Exception as e:
#         print("MODULE 4 ERROR:", e)
#         return jsonify({"error": str(e)}), 500


# @app.route("/")
# def home():
#     return "🧠 Module 4 AI Engine Running"


# if __name__ == "__main__":
#     print("🧠 Module 4 running on http://127.0.0.1:5001")
#     app.run(port=5001, debug=True)















from flask import Flask, request, jsonify
from flask_cors import CORS

from services.authentication import authenticate
from integration.module3_connector import get_current_behavior

app = Flask(__name__)
CORS(app)

# @app.route("/api/compare", methods=["POST"])
# def compare_api():
#     try:
#         data = request.json
#         user_id = data.get("userId")

#         if not user_id:
#             return jsonify({"error": "userId required"}), 400

#         # 🔥 GET CURRENT DATA FROM MODULE 3
#         current = get_current_behavior(user_id)

#         # 🔥 MAIN AI LOGIC
#         result = authenticate(user_id, current)

#         return jsonify(result)

#     except Exception as e:
#         print("ERROR:", e)
#         return jsonify({"error": str(e)}), 500









@app.route("/api/compare", methods=["POST"])
def compare_api():
    try:
        data = request.json
        user_id = data.get("userId")

        if not user_id:
            return jsonify({"status": "error", "message": "userId required"}), 400

        # 🔥 get data from Module 3 connector
        current = get_current_behavior(user_id)

        # 🔥 AI authentication logic
        result = authenticate(user_id, current)

        return jsonify(result)

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500









@app.route("/")
def home():
    return "🧠 Module 4 Running"

if __name__ == "__main__":
    print("Running on http://127.0.0.1:5001")
    app.run(port=5001, debug=True)