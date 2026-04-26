from flask import Blueprint, jsonify
from services.authentication import authenticate
from integration.module3_connector import get_current_behavior
from integration.baseline_fetcher import get_baseline

auth_bp = Blueprint("auth", __name__)

# @auth_bp.route("/check/<user_id>")
# def check_user(user_id):

#     baseline = get_baseline(user_id)
#     current = get_current_behavior()

#     result = authenticate(baseline, current)

#     return jsonify({
#         "user_id": user_id,
#         "result": result
#     })



@auth_bp.route("/check/<user_id>")
def check_user(user_id):

    baseline = get_baseline(user_id)
    current = get_current_behavior(user_id)  # ✅ FIX

    result = authenticate(user_id, current)  # ✅ FIX

    return jsonify({
        "user_id": user_id,
        "result": result
    })