# def get_current_behavior():
#     return {
#         "typing_speed": 45,
#         "mouse_speed": 300,
#         "idle_time": 4,
#         "copy_paste": 2,
#         "window_switch": 3
#     }








# import requests

# def get_current_behavior(user_id):
#     try:
#         response = requests.get(
#             f"http://localhost:5000/api/fraud/processed/{user_id}"
#         )

#         return response.json()

#     except Exception as e:
#         print("ERROR:", e)
#         return {
#             "typing_speed": 0,
#             "mouse_speed": 0,
#             "idle_time": 0,
#             "copy_paste": 0,
#             "window_switch": 0
#         }








# import requests

# def get_current_behavior(user_id):
#     try:
#         res = requests.get(f"http://127.0.0.1:5000/api/fraud/processed/{user_id}")
#         return res.json()
#     except Exception as e:
#         print("Module3 Error:", e)
#         return {
#             "typing_speed": 0,
#             "mouse_speed": 0,
#             "idle_time": 0,
#             "copy_paste": 0,
#             "window_switch": 0
#         }




# import requests

# # ================= FIXED URL (MODULE 4 instead of 5000) =================
# MODULE4_URL = "http://127.0.0.1:5001/api/compare"


# def get_current_behavior(user_id):
#     try:
#         # 🚀 CALL MODULE 4 (NOT MODULE 1)
#         res = requests.post(
#             MODULE4_URL,
#             json={"userId": user_id},
#             timeout=3
#         )

#         return res.json()

#     except Exception as e:
#         print("Module3 Error:", e)

#         return {
#             "status": "error",
#             "typing_speed": 0,
#             "mouse_speed": 0,
#             "idle_time": 0,
#             "copy_paste": 0,
#             "window_switch": 0
#         }




















# import requests

# # ================= FIXED URL (MODULE 4) =================
# MODULE4_URL = "http://127.0.0.1:5001/api/compare"


# def get_current_behavior(user_id):
#     try:
#         # 🚀 CALL MODULE 4 (SIAMESE BACKEND)
#         res = requests.post(
#             MODULE4_URL,
#             json={"userId": user_id},
#             timeout=(3, 10)   # ✅ FIX: connect=3s, read=10s
#         )

#         # 🔥 SAFE RESPONSE CHECK
#         try:
#             return res.json()
#         except:
#             return {
#                 "status": "error",
#                 "message": "Invalid JSON response from backend"
#             }

#     except Exception as e:
#         print("Module3 Error:", e)

#         return {
#             "status": "error",
#             "typing_speed": 0,
#             "mouse_speed": 0,
#             "idle_time": 0,
#             "copy_paste": 0,
#             "window_switch": 0
#         }






def get_current_behavior(user_id):
    """
    This should return LIVE exam behavior data
    (coming from frontend or memory, NOT HTTP call)
    """

    return {
        "typing_speed": 2.8,
        "avg_hold_time": 69,
        "avg_delay": 355,
        "total_keys": 66,
        "idle_time": 12.5
    }