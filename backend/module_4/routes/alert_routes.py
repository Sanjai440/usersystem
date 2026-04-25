from flask import Blueprint, jsonify

alert_bp = Blueprint("alert", __name__)

@alert_bp.route("/send")
def send_alert():

    return jsonify({
        "status": "alert system active",
        "message": "Monitoring user behavior"
    })