from flask import Blueprint, jsonify
# from services.fraud_detection import detect_fraud
from module_3.services.fraud_detection import detect_fraud

fraud_bp = Blueprint("fraud", __name__)

@fraud_bp.route("/check", methods=["POST"])
def check_fraud():
    result = detect_fraud()
    return jsonify(result)