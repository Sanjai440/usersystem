# import json

# def get_clean_data():
#     try:
#         with open("../../module-2-behavior-capture/keyboard_tracking/key_events.json") as f:
#             keyboard = json.load(f)

#         with open("../../module-2-behavior-capture/mouse_tracking/mouse_events.json") as f:
#             mouse = json.load(f)

#         return {
#             "typing_speed": 45,
#             "mouse_speed": 300,
#             "idle_time": 4,
#             "copy_paste_count": 2
#         }

#     except:
#         return {
#             "typing_speed": 0,
#             "mouse_speed": 0,
#             "idle_time": 0,
#             "copy_paste_count": 0
#         }











import json
import os

BASE_PATH = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "../../module_2")
)

def get_clean_data():
    try:
        keyboard_path = os.path.join(
            BASE_PATH,
            "keyboard_tracking/key_events.json"
        )

        mouse_path = os.path.join(
            BASE_PATH,
            "mouse_tracking/mouse_events.json"
        )

        with open(keyboard_path) as f:
            keyboard = json.load(f)

        with open(mouse_path) as f:
            mouse = json.load(f)

        # 👉 Example feature processing (replace later with real logic)
        return {
            "typing_speed": 45,
            "mouse_speed": 300,
            "idle_time": 4,
            "copy_paste_count": 2
        }

    except Exception as e:
        print("ERROR:", e)
        return {
            "typing_speed": 0,
            "mouse_speed": 0,
            "idle_time": 0,
            "copy_paste_count": 0
        }