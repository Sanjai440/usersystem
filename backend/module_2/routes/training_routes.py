# module_2/routes/training_routes.py

from flask import Blueprint, request, jsonify
import os, json

training_bp = Blueprint("training", __name__)

BASE_PATH = os.path.dirname(__file__)

@training_bp.route("/save-training", methods=["POST"])
def save_training():

    data = request.json

    keyboard_dir = os.path.join(BASE_PATH, "keyboard_tracking")
    mouse_dir = os.path.join(BASE_PATH, "mouse_tracking")

    os.makedirs(keyboard_dir, exist_ok=True)
    os.makedirs(mouse_dir, exist_ok=True)

    with open(os.path.join(keyboard_dir, "key_events.json"), "w") as f:
        json.dump(data.get("keystrokes", []), f)

    with open(os.path.join(mouse_dir, "mouse_events.json"), "w") as f:
        json.dump(data.get("mouseData", []), f)

    return jsonify({"status": "saved in module_2"})
    