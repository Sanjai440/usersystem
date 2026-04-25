# def get_current_behavior():
#     return {
#         "typing_speed": 45,
#         "mouse_speed": 300,
#         "idle_time": 4,
#         "copy_paste": 2,
#         "window_switch": 3
#     }








import requests

def get_current_behavior(user_id):
    try:
        response = requests.get(
            f"http://localhost:5000/api/fraud/processed/{user_id}"
        )

        return response.json()

    except Exception as e:
        print("ERROR:", e)
        return {
            "typing_speed": 0,
            "mouse_speed": 0,
            "idle_time": 0,
            "copy_paste": 0,
            "window_switch": 0
        }