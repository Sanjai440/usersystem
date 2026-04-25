# from flask import Blueprint, request, jsonify
# # from integration.module2_connector import get_clean_data
# # from module_2.module2_connector import get_clean_data
# from module_3.integration.module2_connector import get_clean_data

# behavior_bp = Blueprint("behavior", __name__)

# @behavior_bp.route("/receive", methods=["POST"])
# def receive_behavior():
#     data = request.json

#     return jsonify({
#         "status": "received",
#         "data": data
#     })


# @behavior_bp.route("/from-module2", methods=["GET"])
# def from_module2():
#     data = get_clean_data()
#     return jsonify(data)






# from flask import Blueprint, request, jsonify
# from module_3.integration.module2_connector import send_to_module2

# behavior_bp = Blueprint("behavior", __name__)

# @behavior_bp.route("/receive", methods=["POST"])
# def receive_behavior():
#     try:
#         data = request.json

#         # 🔥 Send to Module 2
#         module2_result = send_to_module2(data)

#         return jsonify({
#             "status": "processed",
#             "module2_output": module2_result
#         }), 200

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500






# from flask import Blueprint, request, jsonify
# import json
# import os
# from module_3.integration.module2_connector import get_clean_data

# behavior_bp = Blueprint("behavior", __name__)

# BASE_PATH = os.path.abspath(
#     os.path.join(os.path.dirname(__file__), "../../module_2")
# )






# @behavior_bp.route("/receive", methods=["POST"])
# def receive_behavior():
#     try:
#         data = request.json

#         keyboard_dir = os.path.join(BASE_PATH, "keyboard_tracking")
#         mouse_dir = os.path.join(BASE_PATH, "mouse_tracking")

#         # ✅ Create folders if not exist
#         os.makedirs(keyboard_dir, exist_ok=True)
#         os.makedirs(mouse_dir, exist_ok=True)

#         keyboard_path = os.path.join(keyboard_dir, "key_events.json")
#         mouse_path = os.path.join(mouse_dir, "mouse_events.json")

#         with open(keyboard_path, "w") as f:
#             json.dump(data.get("keystrokes", []), f)

#         with open(mouse_path, "w") as f:
#             json.dump(data.get("mouseData", []), f)

#         features = get_clean_data()

#         return jsonify({
#             "status": "processed",
#             "features": features
#         }), 200

#     except Exception as e:
#         print("🔥 ERROR:", e)
#         return jsonify({"error": str(e)}), 500

















# from flask import Blueprint, request, jsonify
# import os
# import json

# from module_3.integration.module2_connector import get_clean_data

# behavior_bp = Blueprint("behavior", __name__)

# BASE_PATH = os.path.abspath(
#     os.path.join(os.path.dirname(__file__), "../../module_2")
# )

# @behavior_bp.route("/receive", methods=["POST"])
# def receive_behavior():
#     try:
#         data = request.json

#         keyboard_dir = os.path.join(BASE_PATH, "keyboard_tracking")
#         mouse_dir = os.path.join(BASE_PATH, "mouse_tracking")

#         os.makedirs(keyboard_dir, exist_ok=True)
#         os.makedirs(mouse_dir, exist_ok=True)

#         keyboard_path = os.path.join(keyboard_dir, "key_events.json")
#         mouse_path = os.path.join(mouse_dir, "mouse_events.json")

#         with open(keyboard_path, "w") as f:
#             json.dump(data.get("keystrokes", []), f)

#         with open(mouse_path, "w") as f:
#             json.dump(data.get("mouseData", []), f)

#         features = get_clean_data()

#         return jsonify({
#             "status": "processed",
#             "features": features
#         }), 200

#     except Exception as e:
#         print("🔥 ERROR:", e)
#         return jsonify({"error": str(e)}), 500














from flask import Blueprint, request, jsonify
import os
import json

from module_2.feature_extraction.extract_features import extract_features

behavior_bp = Blueprint("behavior", __name__)

BASE_PATH = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "../../module_2")
)

@behavior_bp.route("/receive", methods=["POST"])
def receive_behavior():
    try:
        data = request.json

        keyboard_dir = os.path.join(BASE_PATH, "keyboard_tracking")
        mouse_dir = os.path.join(BASE_PATH, "mouse_tracking")

        os.makedirs(keyboard_dir, exist_ok=True)
        os.makedirs(mouse_dir, exist_ok=True)

        keyboard_path = os.path.join(keyboard_dir, "key_events.json")
        mouse_path = os.path.join(mouse_dir, "mouse_events.json")

        # save raw events
        with open(keyboard_path, "w") as f:
            json.dump(data.get("keystrokes", []), f)

        with open(mouse_path, "w") as f:
            json.dump(data.get("mouseData", []), f)

        # ✅ FIX 1: get real data
        events = data.get("keystrokes", [])

        # ✅ FIX 2: get user_id from frontend
        user_id = data.get("userId")

        # ✅ FIX 3: CALL FEATURE EXTRACTION (THIS WAS MISSING)
        features = extract_features(events, user_id=user_id)

        return jsonify({
            "status": "processed",
            "features": features
        }), 200

    except Exception as e:
        print("🔥 ERROR:", e)
        return jsonify({"error": str(e)}), 500