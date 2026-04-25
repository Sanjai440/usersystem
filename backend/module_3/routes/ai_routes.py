from flask import Blueprint, jsonify
# from models.prediction import predict
from module_3.models.prediction import predict

ai_bp = Blueprint("ai", __name__)

@ai_bp.route("/predict", methods=["GET"])
def ai_predict():
    result = predict()
    return jsonify(result)