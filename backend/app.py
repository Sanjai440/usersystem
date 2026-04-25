# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from pymongo import MongoClient
# import bcrypt

# app = Flask(__name__)
# CORS(app)

# client = MongoClient("mongodb://localhost:27017/")
# db = client["userDB"]

# users_collection = db["users"]
# training_collection = db["training_data"]

# def calculate_features(data):
#     keystrokes = data.get("keystrokes", [])
#     mouse_data = data.get("mouseData", [])
#     words = data.get("words", 0)
#     time_taken = data.get("timeTaken", 1)

#     wpm = words / (time_taken / 60) if time_taken > 0 else 0

#     hold_times = [
#         k.get("holdTime", 0)
#         for k in keystrokes
#         if k.get("type") == "up"
#     ]
#     avg_hold = sum(hold_times) / len(hold_times) if hold_times else 0

#     intervals = [
#         k.get("delayFromLastKey", 0)
#         for k in keystrokes
#         if k.get("type") == "down"
#     ]
#     avg_interval = sum(intervals) / len(intervals) if intervals else 0

#     return {
#         "wpm": round(wpm, 2),
#         "avgHoldTime": round(avg_hold, 2),
#         "avgInterval": round(avg_interval, 2),
#         "mouseActivity": len(mouse_data)
#     }

# @app.route('/register', methods=['POST'])
# def register():
#     try:
#         data = request.get_json()

#         if not data:
#             return jsonify({"status": "fail"})

#         username = data.get("username")
#         email = data.get("email")
#         password = data.get("password")

#         existing = users_collection.find_one({
#             "$or": [{"username": username}, {"email": email}]
#         })

#         if existing:
#             return jsonify({"status": "exists"})

#         hashed_password = bcrypt.hashpw(
#             password.encode("utf-8"),
#             bcrypt.gensalt()
#         )

#         users_collection.insert_one({
#             "username": username,
#             "email": email,
#             "password": hashed_password
#         })

#         return jsonify({"status": "saved"})

#     except Exception as e:
#         print("REGISTER ERROR:", e)
#         return jsonify({"status": "error"})

# @app.route('/login', methods=['POST'])
# def login():
#     try:
#         data = request.get_json()
#         if not data:
#             return jsonify({"status": "fail"})
#         username = data.get("username")
#         password = data.get("password")
#         user = users_collection.find_one({"username": username})

#         if not user:
#             return jsonify({"status": "fail"})

#         stored_password = user.get("password")

#         if not stored_password:
#             return jsonify({"status": "fail"})

#         # SAFE TYPE FIX
#         if isinstance(stored_password, str):
#             stored_password = stored_password.encode("utf-8")

#         if not bcrypt.checkpw(
#             password.encode("utf-8"),
#             stored_password
#         ):
#             return jsonify({"status": "fail"})

#         return jsonify({
#             "status": "success",
#             "userId": str(user["_id"])
#         })

#     except Exception as e:
#         print("LOGIN ERROR:", e)
#         return jsonify({"status": "error"})

# @app.route('/forgot-password', methods=['POST'])
# def forgot_password():
#     try:
#         data = request.get_json()
#         if not data:
#             return jsonify({"status": "fail"})
#         email = data.get("email")
#         new_password = data.get("newPassword")
#         user = users_collection.find_one({"email": email})
#         if not user:
#             return jsonify({"status": "fail"})
#         hashed_password = bcrypt.hashpw(
#             new_password.encode("utf-8"),
#             bcrypt.gensalt()
#         )
#         users_collection.update_one(
#             {"email": email},
#             {"$set": {"password": hashed_password}}
#         )
#         return jsonify({"status": "success"})
#     except Exception as e:
#         print("FORGOT PASSWORD ERROR:", e)
#         return jsonify({"status": "error"})


# @app.route('/training-data', methods=['POST'])
# def training_data():
#     try:
#         data = request.get_json()
#         if not data:
#             return jsonify({"status": "fail"})

#         print("📥 Training Data:", data.get("userId"))
#         features = calculate_features(data)
#         final_data = {**data, **features}
#         training_collection.insert_one(final_data)

#         return jsonify({
#             "status": "saved",
#             "features": features
#         })
#     except Exception as e:
#         print("TRAINING ERROR:", e)
#         return jsonify({"status": "error"})
# if __name__ == "__main__":
#     app.run(debug=True, port=5000)

















# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from pymongo import MongoClient
# import bcrypt

# app = Flask(__name__)
# CORS(app)

# client = MongoClient("mongodb://localhost:27017/")
# db = client["userDB"]

# users_collection = db["users"]
# training_collection = db["training_data"]


# # ================= FEATURES =================
# def calculate_features(data):
#     keystrokes = data.get("keystrokes", [])
#     mouse_data = data.get("mouseData", [])
#     words = data.get("words", 0)
#     time_taken = data.get("timeTaken", 1)

#     wpm = (words / (time_taken / 60)) if time_taken > 0 else 0

#     hold_times = [
#         k.get("holdTime", 0)
#         for k in keystrokes
#         if k.get("type") == "up"
#     ]
#     avg_hold = sum(hold_times) / len(hold_times) if hold_times else 0

#     intervals = [
#         k.get("delayFromLastKey", 0)
#         for k in keystrokes
#         if k.get("type") == "down"
#     ]
#     avg_interval = sum(intervals) / len(intervals) if intervals else 0

#     return {
#         "wpm": round(wpm, 2),
#         "avgHoldTime": round(avg_hold, 2),
#         "avgInterval": round(avg_interval, 2),
#         "mouseActivity": len(mouse_data)
#     }


# # ================= REGISTER =================
# @app.route('/register', methods=['POST'])
# def register():
#     try:
#         data = request.get_json()

#         username = data.get("username")
#         email = data.get("email")
#         password = data.get("password")

#         if not username or not email or not password:
#             return jsonify({"status": "fail", "msg": "missing fields"})

#         existing = users_collection.find_one({
#             "$or": [{"username": username}, {"email": email}]
#         })

#         if existing:
#             return jsonify({"status": "exists"})

#         hashed_password = bcrypt.hashpw(
#             password.encode("utf-8"),
#             bcrypt.gensalt()
#         )

#         users_collection.insert_one({
#             "username": username,
#             "email": email,
#             "password": hashed_password
#         })

#         return jsonify({"status": "success"})

#     except Exception as e:
#         print("REGISTER ERROR:", e)
#         return jsonify({"status": "error"})


# # ================= LOGIN =================
# @app.route('/login', methods=['POST'])
# def login():
#     try:
#         data = request.get_json()

#         username = data.get("username")
#         password = data.get("password")

#         if not username or not password:
#             return jsonify({"status": "fail"})

#         user = users_collection.find_one({"username": username})

#         if not user:
#             return jsonify({"status": "fail"})

#         stored_password = user.get("password")

#         if not stored_password:
#             return jsonify({"status": "fail"})

#         if isinstance(stored_password, str):
#             stored_password = stored_password.encode("utf-8")

#         if not bcrypt.checkpw(password.encode("utf-8"), stored_password):
#             return jsonify({"status": "fail"})

#         return jsonify({
#             "status": "success",
#             "userId": str(user["_id"])
#         })

#     except Exception as e:
#         print("LOGIN ERROR:", e)
#         return jsonify({"status": "error"})


# # ================= FORGOT PASSWORD =================
# @app.route('/forgot-password', methods=['POST'])
# def forgot_password():
#     try:
#         data = request.get_json()

#         email = data.get("email")
#         new_password = data.get("newPassword")

#         if not email or not new_password:
#             return jsonify({"status": "fail"})

#         user = users_collection.find_one({"email": email})

#         if not user:
#             return jsonify({"status": "fail"})

#         hashed_password = bcrypt.hashpw(
#             new_password.encode("utf-8"),
#             bcrypt.gensalt()
#         )

#         users_collection.update_one(
#             {"email": email},
#             {"$set": {"password": hashed_password}}
#         )

#         return jsonify({"status": "success"})

#     except Exception as e:
#         print("FORGOT PASSWORD ERROR:", e)
#         return jsonify({"status": "error"})


# # ================= TRAINING DATA =================
# @app.route('/training-data', methods=['POST'])
# def training_data():
#     try:
#         data = request.get_json()

#         if not data:
#             return jsonify({"status": "fail"})

#         print("📥 Training Data received")

#         features = calculate_features(data)
#         final_data = {**data, **features}

#         training_collection.insert_one(final_data)

#         return jsonify({
#             "status": "saved",
#             "features": features
#         })

#     except Exception as e:
#         print("TRAINING ERROR:", e)
#         return jsonify({"status": "error"})


# # ================= SERVER =================
# if __name__ == "__main__":
#     app.run(debug=True, port=5001)













# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from pymongo import MongoClient

# app = Flask(__name__)
# CORS(app)

# client = MongoClient("mongodb://localhost:27017/")
# db = client["userDB"]

# training_collection = db["training_data"]


# # ================= FEATURES =================
# def calculate_features(data):
#     keystrokes = data.get("keystrokes", [])
#     mouse_data = data.get("mouseData", [])
#     words = data.get("words", 0)
#     time_taken = data.get("timeTaken", 1)

#     wpm = (words / (time_taken / 60)) if time_taken > 0 else 0

#     hold_times = [k.get("holdTime", 0) for k in keystrokes if k.get("type") == "up"]
#     avg_hold = sum(hold_times) / len(hold_times) if hold_times else 0

#     intervals = [k.get("delayFromLastKey", 0) for k in keystrokes if k.get("type") == "down"]
#     avg_interval = sum(intervals) / len(intervals) if intervals else 0

#     return {
#         "wpm": round(wpm, 2),
#         "avgHoldTime": round(avg_hold, 2),
#         "avgInterval": round(avg_interval, 2),
#         "mouseActivity": len(mouse_data)
#     }


# # ================= TRAINING DATA =================
# @app.route('/training-data', methods=['POST'])
# def training_data():
#     try:
#         data = request.get_json()

#         features = calculate_features(data)
#         final_data = {**data, **features}

#         training_collection.insert_one(final_data)

#         return jsonify({
#             "status": "saved",
#             "features": features
#         })

#     except Exception as e:
#         print("TRAINING ERROR:", e)
#         return jsonify({"status": "error"})


# # ================= SERVER =================
# if __name__ == "__main__":
#     app.run(debug=True, port=5001)
























# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from pymongo import MongoClient
# import bcrypt

# app = Flask(__name__)
# CORS(app)

# client = MongoClient("mongodb://localhost:27017/")
# db = client["userDB"]

# users_collection = db["users"]
# training_collection = db["training_data"]


# # ================= FEATURES =================
# def calculate_features(data):
#     keystrokes = data.get("keystrokes", [])
#     mouse_data = data.get("mouseData", [])
#     words = data.get("words", 0)
#     time_taken = data.get("timeTaken", 1)

#     wpm = words / (time_taken / 60) if time_taken > 0 else 0

#     hold_times = [k.get("holdTime", 0) for k in keystrokes if k.get("type") == "up"]
#     avg_hold = sum(hold_times) / len(hold_times) if hold_times else 0

#     intervals = [k.get("delayFromLastKey", 0) for k in keystrokes if k.get("type") == "down"]
#     avg_interval = sum(intervals) / len(intervals) if intervals else 0

#     return {
#         "wpm": round(wpm, 2),
#         "avgHoldTime": round(avg_hold, 2),
#         "avgInterval": round(avg_interval, 2),
#         "mouseActivity": len(mouse_data)
#     }


# # ================= REGISTER =================
# @app.route('/register', methods=['POST'])
# def register():
#     try:
#         data = request.get_json()

#         if not data:
#             return jsonify({"status": "fail"})

#         username = data.get("username")
#         email = data.get("email")
#         password = data.get("password")

#         if not username or not email or not password:
#             return jsonify({"status": "fail"})

#         existing = users_collection.find_one({
#             "$or": [{"username": username}, {"email": email}]
#         })

#         if existing:
#             return jsonify({"status": "exists"})

#         hashed_password = bcrypt.hashpw(
#             password.encode("utf-8"),
#             bcrypt.gensalt()
#         )

#         users_collection.insert_one({
#             "username": username,
#             "email": email,
#             "password": hashed_password
#         })

#         # 🔥 FIXED HERE (saved → success)
#         return jsonify({"status": "success"})

#     except Exception as e:
#         print("REGISTER ERROR:", e)
#         return jsonify({"status": "error"})


# # ================= LOGIN =================
# @app.route('/login', methods=['POST'])
# def login():
#     try:
#         data = request.get_json()
#         if not data:
#             return jsonify({"status": "fail"})

#         username = data.get("username")
#         password = data.get("password")

#         user = users_collection.find_one({"username": username})

#         if not user:
#             return jsonify({"status": "fail"})

#         stored_password = user.get("password")

#         if isinstance(stored_password, str):
#             stored_password = stored_password.encode("utf-8")

#         if not bcrypt.checkpw(password.encode("utf-8"), stored_password):
#             return jsonify({"status": "fail"})

#         return jsonify({
#             "status": "success",
#             "userId": str(user["_id"])
#         })

#     except Exception as e:
#         print("LOGIN ERROR:", e)
#         return jsonify({"status": "error"})


# # ================= FORGOT PASSWORD =================
# @app.route('/forgot-password', methods=['POST'])
# def forgot_password():
#     try:
#         data = request.get_json()

#         if not data:
#             return jsonify({"status": "fail"})

#         email = data.get("email")
#         new_password = data.get("newPassword")

#         user = users_collection.find_one({"email": email})

#         if not user:
#             return jsonify({"status": "fail"})

#         hashed_password = bcrypt.hashpw(
#             new_password.encode("utf-8"),
#             bcrypt.gensalt()
#         )

#         users_collection.update_one(
#             {"email": email},
#             {"$set": {"password": hashed_password}}
#         )

#         return jsonify({"status": "success"})

#     except Exception as e:
#         print("FORGOT PASSWORD ERROR:", e)
#         return jsonify({"status": "error"})


# # ================= TRAINING DATA =================
# @app.route('/training-data', methods=['POST'])
# def training_data():
#     try:
#         data = request.get_json()

#         if not data:
#             return jsonify({"status": "fail"})

#         print("📥 Training Data:", data.get("userId"))

#         features = calculate_features(data)
#         final_data = {**data, **features}

#         training_collection.insert_one(final_data)

#         return jsonify({
#             "status": "success",
#             "features": features
#         })

#     except Exception as e:
#         print("TRAINING ERROR:", e)
#         return jsonify({"status": "error"})


# # ================= SERVER =================
# if __name__ == "__main__":
#     app.run(debug=True, port=5000)














# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from pymongo import MongoClient
# import bcrypt

# app = Flask(__name__)
# CORS(app)

# client = MongoClient("mongodb://localhost:27017/")
# db = client["userDB"]

# users_collection = db["users"]
# training_collection = db["training_data"]


# # ================= FEATURES =================
# def calculate_features(data):
#     keystrokes = data.get("keystrokes", [])
#     mouse_data = data.get("mouseData", [])
#     words = data.get("words", 0)
#     time_taken = data.get("timeTaken", 1)

#     wpm = words / (time_taken / 60) if time_taken > 0 else 0

#     hold_times = [k.get("holdTime", 0) for k in keystrokes if k.get("type") == "up"]
#     avg_hold = sum(hold_times) / len(hold_times) if hold_times else 0

#     intervals = [k.get("delayFromLastKey", 0) for k in keystrokes if k.get("type") == "down"]
#     avg_interval = sum(intervals) / len(intervals) if intervals else 0

#     return {
#         "wpm": round(wpm, 2),
#         "avgHoldTime": round(avg_hold, 2),
#         "avgInterval": round(avg_interval, 2),
#         "mouseActivity": len(mouse_data)
#     }


# # ================= REGISTER =================
# @app.route('/register', methods=['POST'])
# def register():
#     try:
#         data = request.get_json()

#         if not data:
#             return jsonify({"status": "fail"})

#         username = data.get("username")
#         email = data.get("email")
#         password = data.get("password")

#         if not username or not email or not password:
#             return jsonify({"status": "fail"})

#         existing = users_collection.find_one({
#             "$or": [{"username": username}, {"email": email}]
#         })

#         if existing:
#             return jsonify({"status": "exists"})

#         hashed_password = bcrypt.hashpw(
#             password.encode("utf-8"),
#             bcrypt.gensalt()
#         ).decode("utf-8")   # ✅ FIX HERE

#         users_collection.insert_one({
#             "username": username,
#             "email": email,
#             "password": hashed_password
#         })

#         return jsonify({"status": "success"})

#     except Exception as e:
#         print("REGISTER ERROR:", e)
#         return jsonify({"status": "error"})


# # ================= LOGIN =================
# @app.route('/login', methods=['POST'])
# def login():
#     try:
#         data = request.get_json()

#         if not data:
#             return jsonify({"status": "fail"})

#         username = data.get("username")
#         password = data.get("password")

#         user = users_collection.find_one({"username": username})

#         if not user:
#             return jsonify({"status": "fail"})

#         stored_password = user.get("password")

#         if not bcrypt.checkpw(
#             password.encode("utf-8"),
#             stored_password.encode("utf-8")   # ✅ FIX HERE
#         ):
#             return jsonify({"status": "fail"})

#         return jsonify({
#             "status": "success",
#             "userId": str(user["_id"])
#         })

#     except Exception as e:
#         print("LOGIN ERROR:", e)
#         return jsonify({"status": "error"})


# # ================= FORGOT PASSWORD (FIXED) =================
# @app.route('/forgot-password', methods=['POST'])
# def forgot_password():
#     try:
#         data = request.get_json()

#         if not data:
#             return jsonify({"status": "fail"})

#         email = data.get("email")
#         new_password = data.get("newPassword")

#         if not email or not new_password:
#             return jsonify({"status": "fail"})

#         user = users_collection.find_one({"email": email})

#         if not user:
#             return jsonify({"status": "fail"})

#         hashed_password = bcrypt.hashpw(
#             new_password.encode("utf-8"),
#             bcrypt.gensalt()
#         ).decode("utf-8")   # ✅ FIX HERE

#         users_collection.update_one(
#             {"email": email},
#             {"$set": {"password": hashed_password}}
#         )

#         return jsonify({"status": "success"})

#     except Exception as e:
#         print("FORGOT PASSWORD ERROR:", e)
#         return jsonify({"status": "error"})


# # ================= TRAINING DATA =================
# @app.route('/training-data', methods=['POST'])
# def training_data():
#     try:
#         data = request.get_json()

#         if not data:
#             return jsonify({"status": "fail"})

#         features = calculate_features(data)
#         final_data = {**data, **features}

#         training_collection.insert_one(final_data)

#         return jsonify({
#             "status": "success",
#             "features": features
#         })

#     except Exception as e:
#         print("TRAINING ERROR:", e)
#         return jsonify({"status": "error"})


# # ================= SERVER =================
# if __name__ == "__main__":
#     app.run(debug=True, port=5000)

















# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from pymongo import MongoClient
# import bcrypt

# app = Flask(__name__)
# CORS(app)

# client = MongoClient("mongodb://localhost:27017/")
# db = client["userDB"]

# users_collection = db["users"]
# training_collection = db["training_data"]


# # ================= REGISTER =================
# @app.route('/register', methods=['POST'])
# def register():
#     try:
#         data = request.get_json()

#         print("🔥 REGISTER API HIT:", data)   # ✅ DEBUG ADDED

#         if not data:
#             return jsonify({"status": "fail"})

#         username = data.get("username")
#         email = data.get("email")
#         password = data.get("password")

#         if not username or not email or not password:
#             return jsonify({"status": "fail"})

#         existing = users_collection.find_one({
#             "$or": [{"username": username}, {"email": email}]
#         })

#         if existing:
#             return jsonify({"status": "exists"})

#         hashed_password = bcrypt.hashpw(
#             password.encode("utf-8"),
#             bcrypt.gensalt()
#         ).decode("utf-8")

#         result = users_collection.insert_one({
#             "username": username,
#             "email": email,
#             "password": hashed_password
#         })

#         print("✅ INSERTED ID:", result.inserted_id)   # ✅ CONFIRM SAVE

#         return jsonify({"status": "success"})

#     except Exception as e:
#         print("REGISTER ERROR:", e)
#         return jsonify({"status": "error"})


# # ================= LOGIN =================
# @app.route('/login', methods=['POST'])
# def login():
#     try:
#         data = request.get_json()

#         if not data:
#             return jsonify({"status": "fail"})

#         username = data.get("username")
#         password = data.get("password")

#         user = users_collection.find_one({"username": username})

#         if not user:
#             return jsonify({"status": "fail"})

#         stored_password = user.get("password")

#         if not bcrypt.checkpw(
#             password.encode("utf-8"),
#             stored_password.encode("utf-8")
#         ):
#             return jsonify({"status": "fail"})

#         return jsonify({
#             "status": "success",
#             "userId": str(user["_id"])
#         })

#     except Exception as e:
#         print("LOGIN ERROR:", e)
#         return jsonify({"status": "error"})


# # ================= FORGOT PASSWORD =================
# @app.route('/forgot-password', methods=['POST'])
# def forgot_password():
#     try:
#         data = request.get_json()

#         print("🔁 FORGOT PASSWORD HIT:", data)   # ✅ DEBUG

#         if not data:
#             return jsonify({"status": "fail"})

#         email = data.get("email")
#         new_password = data.get("newPassword")

#         if not email or not new_password:
#             return jsonify({"status": "fail"})

#         user = users_collection.find_one({"email": email})

#         if not user:
#             return jsonify({"status": "fail"})

#         hashed_password = bcrypt.hashpw(
#             new_password.encode("utf-8"),
#             bcrypt.gensalt()
#         ).decode("utf-8")

#         users_collection.update_one(
#             {"email": email},
#             {"$set": {"password": hashed_password}}
#         )

#         print("✅ PASSWORD UPDATED FOR:", email)   # ✅ CONFIRM

#         return jsonify({"status": "success"})

#     except Exception as e:
#         print("FORGOT PASSWORD ERROR:", e)
#         return jsonify({"status": "error"})


# # ================= TRAINING DATA =================
# @app.route('/training-data', methods=['POST'])
# def training_data():
#     try:
#         data = request.get_json()

#         if not data:
#             return jsonify({"status": "fail"})

#         training_collection.insert_one(data)

#         print("📥 TRAINING SAVED")   # DEBUG

#         return jsonify({"status": "success"})

#     except Exception as e:
#         print("TRAINING ERROR:", e)
#         return jsonify({"status": "error"})


# # ================= SERVER =================
# if __name__ == "__main__":
#     print("🚀 SERVER STARTED ON 5000")
#     app.run(debug=True, port=5000)












# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from pymongo import MongoClient
# import bcrypt

# app = Flask(__name__)
# CORS(app)

# # ================= DB =================
# client = MongoClient("mongodb://localhost:27017/")
# db = client["userDB"]

# users_collection = db["users"]
# training_collection = db["training_data"]


# # ================= REGISTER =================
# @app.route('/register', methods=['POST'])
# def register():
#     try:
#         data = request.get_json()

#         print("🔥 REGISTER HIT:", data)

#         if not data:
#             return jsonify({"status": "fail"})

#         username = data.get("username")
#         email = data.get("email")
#         password = data.get("password")

#         if not username or not email or not password:
#             return jsonify({"status": "fail"})

#         # check existing user
#         existing = users_collection.find_one({
#             "$or": [{"username": username}, {"email": email}]
#         })

#         if existing:
#             return jsonify({"status": "exists"})

#         # hash password
#         hashed_password = bcrypt.hashpw(
#             password.encode("utf-8"),
#             bcrypt.gensalt()
#         ).decode("utf-8")

#         # insert user
#         result = users_collection.insert_one({
#             "username": username,
#             "email": email,
#             "password": hashed_password
#         })

#         print("✅ SAVED ID:", result.inserted_id)

#         return jsonify({"status": "success"})

#     except Exception as e:
#         print("REGISTER ERROR:", e)
#         return jsonify({"status": "error"})


# # ================= LOGIN =================
# @app.route('/login', methods=['POST'])
# def login():
#     try:
#         data = request.get_json()

#         if not data:
#             return jsonify({"status": "fail"})

#         username = data.get("username")
#         password = data.get("password")

#         user = users_collection.find_one({"username": username})

#         if not user:
#             return jsonify({"status": "not_found"})

#         stored_password = user.get("password")

#         if isinstance(stored_password, str):
#             stored_password = stored_password.encode("utf-8")

#         if not bcrypt.checkpw(
#             password.encode("utf-8"),
#             stored_password
#         ):
#             return jsonify({"status": "wrong_password"})

#         return jsonify({
#             "status": "success",
#             "userId": str(user["_id"]),
#             "username": user["username"]
#         })

#     except Exception as e:
#         print("LOGIN ERROR:", e)
#         return jsonify({"status": "error"})


# # ================= FORGOT PASSWORD =================
# @app.route('/forgot-password', methods=['POST'])
# def forgot_password():
#     try:
#         data = request.get_json()

#         print("🔁 FORGOT HIT:", data)

#         if not data:
#             return jsonify({"status": "fail"})

#         email = data.get("email")
#         new_password = data.get("newPassword")

#         if not email or not new_password:
#             return jsonify({"status": "fail"})

#         user = users_collection.find_one({"email": email})

#         if not user:
#             return jsonify({"status": "not_found"})

#         hashed_password = bcrypt.hashpw(
#             new_password.encode("utf-8"),
#             bcrypt.gensalt()
#         ).decode("utf-8")

#         users_collection.update_one(
#             {"email": email},
#             {"$set": {"password": hashed_password}}
#         )

#         print("✅ PASSWORD UPDATED:", email)

#         return jsonify({"status": "success"})

#     except Exception as e:
#         print("FORGOT ERROR:", e)
#         return jsonify({"status": "error"})


# # ================= TRAINING DATA =================
# @app.route('/training-data', methods=['POST'])
# def training_data():
#     try:
#         data = request.get_json()

#         if not data:
#             return jsonify({"status": "fail"})

#         training_collection.insert_one(data)

#         print("📥 TRAINING SAVED")

#         return jsonify({"status": "success"})

#     except Exception as e:
#         print("TRAINING ERROR:", e)
#         return jsonify({"status": "error"})


# # ================= SERVER =================
# if __name__ == "__main__":
#     print("🚀 SERVER RUNNING ON http://localhost:5000")
#     app.run(debug=True, port=5000)




















# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from pymongo import MongoClient
# import bcrypt

# app = Flask(__name__)
# CORS(app)

# # ================= DB =================
# client = MongoClient("mongodb://localhost:27017/")
# db = client["userDB"]

# users_collection = db["users"]
# training_collection = db["training_data"]


# # ================= REGISTER =================
# @app.route('/register', methods=['POST'])
# def register():
#     try:
#         data = request.get_json()

#         print("🔥 REGISTER HIT:", data)

#         if not data:
#             return jsonify({"status": "fail"})

#         username = data.get("username")
#         email = data.get("email")
#         password = data.get("password")

#         if not username or not email or not password:
#             return jsonify({"status": "fail"})

#         existing = users_collection.find_one({
#             "$or": [{"username": username}, {"email": email}]
#         })

#         if existing:
#             return jsonify({"status": "exists"})

#         hashed_password = bcrypt.hashpw(
#             password.encode("utf-8"),
#             bcrypt.gensalt()
#         ).decode("utf-8")

#         # ✅ UPDATED (only change here)
#         result = users_collection.insert_one({
#             "username": username,
#             "email": email,
#             "password": hashed_password,
#             "trainingCompleted": False,
#             "examCompleted": False
#         })

#         print("✅ SAVED ID:", result.inserted_id)

#         return jsonify({"status": "success"})

#     except Exception as e:
#         print("REGISTER ERROR:", e)
#         return jsonify({"status": "error"})


# # ================= LOGIN =================
# @app.route('/login', methods=['POST'])
# def login():
#     try:
#         data = request.get_json()

#         if not data:
#             return jsonify({"status": "fail"})

#         username = data.get("username")
#         password = data.get("password")

#         user = users_collection.find_one({"username": username})

#         if not user:
#             return jsonify({"status": "not_found"})

#         stored_password = user.get("password")

#         if isinstance(stored_password, str):
#             stored_password = stored_password.encode("utf-8")

#         if not bcrypt.checkpw(
#             password.encode("utf-8"),
#             stored_password
#         ):
#             return jsonify({"status": "wrong_password"})

#         return jsonify({
#             "status": "success",
#             "userId": str(user["_id"]),
#             "username": user["username"],
#             "email": user["email"]   # ✅ ADD THIS

#         })

#     except Exception as e:
#         print("LOGIN ERROR:", e)
#         return jsonify({"status": "error"})


# # ================= FORGOT PASSWORD =================
# @app.route('/forgot-password', methods=['POST'])
# def forgot_password():
#     try:
#         data = request.get_json()

#         print("🔁 FORGOT HIT:", data)

#         if not data:
#             return jsonify({"status": "fail"})

#         email = data.get("email")
#         new_password = data.get("newPassword")

#         if not email or not new_password:
#             return jsonify({"status": "fail"})

#         user = users_collection.find_one({"email": email})

#         if not user:
#             return jsonify({"status": "not_found"})

#         hashed_password = bcrypt.hashpw(
#             new_password.encode("utf-8"),
#             bcrypt.gensalt()
#         ).decode("utf-8")

#         users_collection.update_one(
#             {"email": email},
#             {"$set": {"password": hashed_password}}
#         )

#         print("✅ PASSWORD UPDATED:", email)

#         return jsonify({"status": "success"})

#     except Exception as e:
#         print("FORGOT ERROR:", e)
#         return jsonify({"status": "error"})


# # ================= TRAINING DATA =================
# @app.route('/training-data', methods=['POST'])
# def training_data():
#     try:
#         data = request.get_json()

#         if not data:
#             return jsonify({"status": "fail"})

#         training_collection.insert_one(data)

#         print("📥 TRAINING SAVED")

#         return jsonify({"status": "success"})

#     except Exception as e:
#         print("TRAINING ERROR:", e)
#         return jsonify({"status": "error"})


# # ================= COMPLETE TRAINING =================
# @app.route('/complete-training', methods=['POST'])
# def complete_training():
#     try:
#         data = request.get_json()
#         user_id = data.get("userId")

#         if not user_id:
#             return jsonify({"status": "fail"})

#         from bson import ObjectId

#         users_collection.update_one(
#             {"_id": ObjectId(user_id)},
#             {"$set": {"trainingCompleted": True}}
#         )

#         return jsonify({"status": "training_completed"})

#     except Exception as e:
#         print("COMPLETE TRAINING ERROR:", e)
#         return jsonify({"status": "error"})


# # ================= USER STATUS =================
# @app.route('/user-status/<user_id>', methods=['GET'])
# def user_status(user_id):
#     try:
#         from bson import ObjectId

#         user = users_collection.find_one({"_id": ObjectId(user_id)})

#         if not user:
#             return jsonify({"status": "not_found"})

#         return jsonify({
#             "trainingCompleted": user.get("trainingCompleted", False),
#             "examCompleted": user.get("examCompleted", False)
#         })

#     except Exception as e:
#         print("STATUS ERROR:", e)
#         return jsonify({"status": "error"})


# # ================= SERVER =================
# if __name__ == "__main__":
#     print("🚀 SERVER RUNNING ON http://localhost:5000")
#     app.run(debug=True, port=5000)


































# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from pymongo import MongoClient
# import bcrypt
# from bson import ObjectId

# app = Flask(__name__)
# CORS(app)

# # ================= DB =================
# client = MongoClient("mongodb://localhost:27017/")
# db = client["userDB"]

# users_collection = db["users"]
# training_collection = db["training_data"]


# # ================= REGISTER =================
# @app.route('/register', methods=['POST'])
# def register():
#     try:
#         data = request.get_json()

#         print("🔥 REGISTER HIT:", data)

#         if not data:
#             return jsonify({"status": "fail"})

#         username = data.get("username")
#         email = data.get("email")
#         password = data.get("password")

#         if not username or not email or not password:
#             return jsonify({"status": "fail"})

#         existing = users_collection.find_one({
#             "$or": [{"username": username}, {"email": email}]
#         })

#         if existing:
#             return jsonify({"status": "exists"})

#         hashed_password = bcrypt.hashpw(
#             password.encode("utf-8"),
#             bcrypt.gensalt()
#         ).decode("utf-8")

#         result = users_collection.insert_one({
#             "username": username,
#             "email": email,
#             "password": hashed_password,
#             "trainingCompleted": False,
#             "examCompleted": False
#         })

#         print("✅ SAVED ID:", result.inserted_id)

#         return jsonify({"status": "success"})

#     except Exception as e:
#         print("REGISTER ERROR:", e)
#         return jsonify({"status": "error"})


# # ================= LOGIN =================
# @app.route('/login', methods=['POST'])
# def login():
#     try:
#         data = request.get_json()

#         if not data:
#             return jsonify({"status": "fail"})

#         username = data.get("username")
#         password = data.get("password")

#         user = users_collection.find_one({"username": username})

#         if not user:
#             return jsonify({"status": "not_registered"})

#         stored_password = user.get("password")

#         if isinstance(stored_password, str):
#             stored_password = stored_password.encode("utf-8")

#         if not bcrypt.checkpw(
#             password.encode("utf-8"),
#             stored_password
#         ):
#             return jsonify({"status": "wrong_password"})

#         # ✅ FIXED: EMAIL INCLUDED
#         return jsonify({
#             "status": "success",
#             "userId": str(user["_id"]),
#             "username": user["username"],
#             "email": user["email"]
#         })

#     except Exception as e:
#         print("LOGIN ERROR:", e)
#         return jsonify({"status": "error"})


# # ================= FORGOT PASSWORD =================
# @app.route('/forgot-password', methods=['POST'])
# def forgot_password():
#     try:
#         data = request.get_json()

#         print("🔁 FORGOT HIT:", data)

#         if not data:
#             return jsonify({"status": "fail"})

#         email = data.get("email")
#         new_password = data.get("newPassword")

#         if not email or not new_password:
#             return jsonify({"status": "fail"})

#         user = users_collection.find_one({"email": email})

#         if not user:
#             return jsonify({"status": "not_found"})

#         hashed_password = bcrypt.hashpw(
#             new_password.encode("utf-8"),
#             bcrypt.gensalt()
#         ).decode("utf-8")

#         users_collection.update_one(
#             {"email": email},
#             {"$set": {"password": hashed_password}}
#         )

#         print("✅ PASSWORD UPDATED:", email)

#         return jsonify({"status": "success"})

#     except Exception as e:
#         print("FORGOT ERROR:", e)
#         return jsonify({"status": "error"})


# # ================= TRAINING DATA =================
# @app.route('/training-data', methods=['POST'])
# def training_data():
#     try:
#         data = request.get_json()

#         if not data:
#             return jsonify({"status": "fail"})

#         training_collection.insert_one(data)

#         print("📥 TRAINING SAVED")

#         return jsonify({"status": "success"})

#     except Exception as e:
#         print("TRAINING ERROR:", e)
#         return jsonify({"status": "error"})


# # ================= COMPLETE TRAINING =================
# @app.route('/complete-training', methods=['POST'])
# def complete_training():
#     try:
#         data = request.get_json()
#         user_id = data.get("userId")

#         if not user_id:
#             return jsonify({"status": "fail"})

#         users_collection.update_one(
#             {"_id": ObjectId(user_id)},
#             {"$set": {"trainingCompleted": True}}
#         )

#         return jsonify({"status": "training_completed"})

#     except Exception as e:
#         print("COMPLETE TRAINING ERROR:", e)
#         return jsonify({"status": "error"})


# # ================= USER STATUS =================
# @app.route('/user-status/<user_id>', methods=['GET'])
# def user_status(user_id):
#     try:
#         user = users_collection.find_one({"_id": ObjectId(user_id)})

#         if not user:
#             return jsonify({"status": "not_found"})

#         return jsonify({
#             "trainingCompleted": user.get("trainingCompleted", False),
#             "examCompleted": user.get("examCompleted", False)
#         })

#     except Exception as e:
#         print("STATUS ERROR:", e)
#         return jsonify({"status": "error"})


# # ================= HOME =================
# @app.route("/")
# def home():
#     return "🚀 Backend is running fine"


# # ================= SERVER =================
# if __name__ == "__main__":
#     print("🚀 SERVER RUNNING ON http://localhost:5000")
#     app.run(debug=True, port=5000)


























# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from pymongo import MongoClient
# import bcrypt
# from bson import ObjectId

# # ================= MODULE 3 IMPORTS =================
# from module_3_backend_processing.routes.behavior_routes import behavior_bp
# from module_3_backend_processing.routes.fraud_routes import fraud_bp
# from module_3_backend_processing.routes.ai_routes import ai_bp

# app = Flask(__name__)
# CORS(app)

# # ================= DB =================
# client = MongoClient("mongodb://localhost:27017/")
# db = client["userDB"]

# users_collection = db["users"]
# training_collection = db["training_data"]

# # ================= MODULE 3 REGISTER =================
# app.register_blueprint(behavior_bp, url_prefix="/api/behavior")
# app.register_blueprint(fraud_bp, url_prefix="/api/fraud")
# app.register_blueprint(ai_bp, url_prefix="/api/ai")


# # ================= REGISTER =================
# @app.route('/register', methods=['POST'])
# def register():
#     try:
#         data = request.get_json()

#         if not data:
#             return jsonify({"status": "fail"})

#         username = data.get("username")
#         email = data.get("email")
#         password = data.get("password")

#         if not username or not email or not password:
#             return jsonify({"status": "fail"})

#         existing = users_collection.find_one({
#             "$or": [{"username": username}, {"email": email}]
#         })

#         if existing:
#             return jsonify({"status": "exists"})

#         hashed_password = bcrypt.hashpw(
#             password.encode("utf-8"),
#             bcrypt.gensalt()
#         ).decode("utf-8")

#         result = users_collection.insert_one({
#             "username": username,
#             "email": email,
#             "password": hashed_password,
#             "trainingCompleted": False,
#             "examCompleted": False
#         })

#         return jsonify({"status": "success"})

#     except Exception as e:
#         print("REGISTER ERROR:", e)
#         return jsonify({"status": "error"})


# # ================= LOGIN =================
# @app.route('/login', methods=['POST'])
# def login():
#     try:
#         data = request.get_json()

#         if not data:
#             return jsonify({"status": "fail"})

#         username = data.get("username")
#         password = data.get("password")

#         user = users_collection.find_one({"username": username})

#         if not user:
#             return jsonify({"status": "not_registered"})

#         stored_password = user.get("password")

#         if isinstance(stored_password, str):
#             stored_password = stored_password.encode("utf-8")

#         if not bcrypt.checkpw(
#             password.encode("utf-8"),
#             stored_password
#         ):
#             return jsonify({"status": "wrong_password"})

#         return jsonify({
#             "status": "success",
#             "userId": str(user["_id"]),
#             "username": user["username"],
#             "email": user["email"]
#         })

#     except Exception as e:
#         print("LOGIN ERROR:", e)
#         return jsonify({"status": "error"})


# # ================= FORGOT PASSWORD =================
# @app.route('/forgot-password', methods=['POST'])
# def forgot_password():
#     try:
#         data = request.get_json()

#         if not data:
#             return jsonify({"status": "fail"})

#         email = data.get("email")
#         new_password = data.get("newPassword")

#         if not email or not new_password:
#             return jsonify({"status": "fail"})

#         user = users_collection.find_one({"email": email})

#         if not user:
#             return jsonify({"status": "not_found"})

#         hashed_password = bcrypt.hashpw(
#             new_password.encode("utf-8"),
#             bcrypt.gensalt()
#         ).decode("utf-8")

#         users_collection.update_one(
#             {"email": email},
#             {"$set": {"password": hashed_password}}
#         )

#         return jsonify({"status": "success"})

#     except Exception as e:
#         print("FORGOT ERROR:", e)
#         return jsonify({"status": "error"})


# # ================= TRAINING DATA =================
# @app.route('/training-data', methods=['POST'])
# def training_data():
#     try:
#         data = request.get_json()

#         if not data:
#             return jsonify({"status": "fail"})

#         training_collection.insert_one(data)

#         return jsonify({"status": "success"})

#     except Exception as e:
#         print("TRAINING ERROR:", e)
#         return jsonify({"status": "error"})


# # ================= COMPLETE TRAINING =================
# @app.route('/complete-training', methods=['POST'])
# def complete_training():
#     try:
#         data = request.get_json()
#         user_id = data.get("userId")

#         if not user_id:
#             return jsonify({"status": "fail"})

#         users_collection.update_one(
#             {"_id": ObjectId(user_id)},
#             {"$set": {"trainingCompleted": True}}
#         )

#         return jsonify({"status": "training_completed"})

#     except Exception as e:
#         print("COMPLETE TRAINING ERROR:", e)
#         return jsonify({"status": "error"})


# # ================= USER STATUS =================
# @app.route('/user-status/<user_id>', methods=['GET'])
# def user_status(user_id):
#     try:
#         user = users_collection.find_one({"_id": ObjectId(user_id)})

#         if not user:
#             return jsonify({"status": "not_found"})

#         return jsonify({
#             "trainingCompleted": user.get("trainingCompleted", False),
#             "examCompleted": user.get("examCompleted", False)
#         })

#     except Exception as e:
#         print("STATUS ERROR:", e)
#         return jsonify({"status": "error"})


# # ================= MODULE 3 ANALYSIS API =================
# @app.route('/analyze-user/<user_id>', methods=['GET'])
# def analyze_user(user_id):
#     try:
#         from module_3_backend_processing.services.fraud_detection import detect_fraud

#         result = detect_fraud()

#         return jsonify({
#             "userId": user_id,
#             "fraud_result": result
#         })

#     except Exception as e:
#         print("ANALYZE ERROR:", e)
#         return jsonify({"status": "error"})


# # ================= HOME =================
# @app.route("/")
# def home():
#     return "🚀 Backend is running fine with Module 3 integration"


# # ================= SERVER =================
# if __name__ == "__main__":
#     print("🚀 SERVER RUNNING ON http://localhost:5000")
#     app.run(debug=True, port=5000)

























# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from pymongo import MongoClient
# import bcrypt
# from bson import ObjectId
# from datetime import datetime

# # ================= MODULE 3 IMPORTS =================
# from module_3_backend_processing.routes.behavior_routes import behavior_bp
# from module_3_backend_processing.routes.fraud_routes import fraud_bp
# from module_3_backend_processing.routes.ai_routes import ai_bp

# app = Flask(__name__)
# CORS(app)

# # ================= DB =================
# client = MongoClient("mongodb://localhost:27017/")
# db = client["userDB"]

# users_collection = db["users"]
# training_collection = db["training_data"]

# # ⭐ NEW COLLECTION FOR ANALYSIS RESULTS
# analysis_collection = db["analysis_results"]

# # ================= MODULE 3 REGISTER =================
# app.register_blueprint(behavior_bp, url_prefix="/api/behavior")
# app.register_blueprint(fraud_bp, url_prefix="/api/fraud")
# app.register_blueprint(ai_bp, url_prefix="/api/ai")


# # ================= REGISTER =================
# @app.route('/register', methods=['POST'])
# def register():
#     try:
#         data = request.get_json()

#         if not data:
#             return jsonify({"status": "fail"})

#         username = data.get("username")
#         email = data.get("email")
#         password = data.get("password")

#         if not username or not email or not password:
#             return jsonify({"status": "fail"})

#         existing = users_collection.find_one({
#             "$or": [{"username": username}, {"email": email}]
#         })

#         if existing:
#             return jsonify({"status": "exists"})

#         hashed_password = bcrypt.hashpw(
#             password.encode("utf-8"),
#             bcrypt.gensalt()
#         ).decode("utf-8")

#         users_collection.insert_one({
#             "username": username,
#             "email": email,
#             "password": hashed_password,
#             "trainingCompleted": False,
#             "examCompleted": False
#         })

#         return jsonify({"status": "success"})

#     except Exception as e:
#         print("REGISTER ERROR:", e)
#         return jsonify({"status": "error"})


# # ================= LOGIN =================
# @app.route('/login', methods=['POST'])
# def login():
#     try:
#         data = request.get_json()

#         if not data:
#             return jsonify({"status": "fail"})

#         username = data.get("username")
#         password = data.get("password")

#         user = users_collection.find_one({"username": username})

#         if not user:
#             return jsonify({"status": "not_registered"})

#         stored_password = user.get("password")

#         if isinstance(stored_password, str):
#             stored_password = stored_password.encode("utf-8")

#         if not bcrypt.checkpw(password.encode("utf-8"), stored_password):
#             return jsonify({"status": "wrong_password"})

#         return jsonify({
#             "status": "success",
#             "userId": str(user["_id"]),
#             "username": user["username"],
#             "email": user["email"]
#         })

#     except Exception as e:
#         print("LOGIN ERROR:", e)
#         return jsonify({"status": "error"})


# # ================= FORGOT PASSWORD =================
# @app.route('/forgot-password', methods=['POST'])
# def forgot_password():
#     try:
#         data = request.get_json()

#         email = data.get("email")
#         new_password = data.get("newPassword")

#         user = users_collection.find_one({"email": email})

#         if not user:
#             return jsonify({"status": "not_found"})

#         hashed_password = bcrypt.hashpw(
#             new_password.encode("utf-8"),
#             bcrypt.gensalt()
#         ).decode("utf-8")

#         users_collection.update_one(
#             {"email": email},
#             {"$set": {"password": hashed_password}}
#         )

#         return jsonify({"status": "success"})

#     except Exception as e:
#         print("FORGOT ERROR:", e)
#         return jsonify({"status": "error"})


# # ================= TRAINING DATA =================
# @app.route('/training-data', methods=['POST'])
# def training_data():
#     try:
#         data = request.get_json()

#         training_collection.insert_one(data)

#         return jsonify({"status": "success"})

#     except Exception as e:
#         print("TRAINING ERROR:", e)
#         return jsonify({"status": "error"})


# # ================= COMPLETE TRAINING =================
# @app.route('/complete-training', methods=['POST'])
# def complete_training():
#     try:
#         data = request.get_json()
#         user_id = data.get("userId")

#         users_collection.update_one(
#             {"_id": ObjectId(user_id)},
#             {"$set": {"trainingCompleted": True}}
#         )

#         return jsonify({"status": "training_completed"})

#     except Exception as e:
#         print("COMPLETE TRAINING ERROR:", e)
#         return jsonify({"status": "error"})


# # ================= USER STATUS =================
# @app.route('/user-status/<user_id>', methods=['GET'])
# def user_status(user_id):
#     try:
#         user = users_collection.find_one({"_id": ObjectId(user_id)})

#         if not user:
#             return jsonify({"status": "not_found"})

#         return jsonify({
#             "trainingCompleted": user.get("trainingCompleted", False),
#             "examCompleted": user.get("examCompleted", False)
#         })

#     except Exception as e:
#         print("STATUS ERROR:", e)
#         return jsonify({"status": "error"})


# # ================= MODULE 3 ANALYSIS API (FULL UPDATED) =================
# @app.route('/analyze-user/<user_id>', methods=['GET'])
# def analyze_user(user_id):
#     try:
#         from module_3_backend_processing.services.fraud_detection import detect_fraud

#         # 🔥 Run fraud detection
#         result = detect_fraud(user_id)

#         # 🔥 Save to DB
#         analysis_collection.insert_one({
#             "user_id": user_id,
#             "result": result,
#             "timestamp": datetime.utcnow()
#         })

#         # 🔥 Response
#         return jsonify({
#             "status": "success",
#             "userId": user_id,
#             "risk_score": result.get("risk_score", 0),
#             "fraud_status": result.get("status", "UNKNOWN"),
#             "saved_to_db": True
#         })

#     except Exception as e:
#         print("ANALYZE ERROR:", e)
#         return jsonify({
#             "status": "error",
#             "message": str(e)
#         })


# # ================= HOME =================
# @app.route("/")
# def home():
#     return "🚀 Backend running with Module 2 + 3 + DB integration"


# # ================= SERVER =================
# if __name__ == "__main__":
#     print("🚀 SERVER RUNNING ON http://localhost:5000")
#     app.run(debug=True, port=5000)





















from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import bcrypt
from bson import ObjectId
from datetime import datetime

# ================= FIX: PATH HANDLING =================
import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# ================= MODULE 3 IMPORTS (FIXED) =================
from module_3.routes.behavior_routes import behavior_bp
from module_3.routes.fraud_routes import fraud_bp
from module_3.routes.ai_routes import ai_bp

from module_3.services.fraud_detection import detect_fraud

app = Flask(__name__)
CORS(app)

# ================= DB =================
# ================= DB =================
client = MongoClient("mongodb://localhost:27017/")
db = client["keystrokeAI_DB"]   # ← NEW DATABASE NAME

users_collection = db["users"]
training_collection = db["training_data"]
analysis_collection = db["analysis_results"]

# ================= REGISTER BLUEPRINTS =================
app.register_blueprint(behavior_bp, url_prefix="/api/behavior")
app.register_blueprint(fraud_bp, url_prefix="/api/fraud")
app.register_blueprint(ai_bp, url_prefix="/api/ai")


# ================= REGISTER =================
@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"status": "fail"})

        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        if not username or not email or not password:
            return jsonify({"status": "fail"})

        existing = users_collection.find_one({
            "$or": [{"username": username}, {"email": email}]
        })

        if existing:
            return jsonify({"status": "exists"})

        hashed_password = bcrypt.hashpw(
            password.encode("utf-8"),
            bcrypt.gensalt()
        ).decode("utf-8")

        users_collection.insert_one({
            "username": username,
            "email": email,
            "password": hashed_password,
            "trainingCompleted": False,
            "examCompleted": False
        })

        return jsonify({"status": "success"})

    except Exception as e:
        print("REGISTER ERROR:", e)
        return jsonify({"status": "error"})


# ================= LOGIN =================
@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"status": "fail"})

        username = data.get("username")
        password = data.get("password")

        user = users_collection.find_one({"username": username})

        if not user:
            return jsonify({"status": "not_registered"})

        stored_password = user.get("password")

        if isinstance(stored_password, str):
            stored_password = stored_password.encode("utf-8")

        if not bcrypt.checkpw(password.encode("utf-8"), stored_password):
            return jsonify({"status": "wrong_password"})

        return jsonify({
            "status": "success",
            "userId": str(user["_id"]),
            "username": user["username"],
            "email": user["email"]
        })

    except Exception as e:
        print("LOGIN ERROR:", e)
        return jsonify({"status": "error"})


# ================= FORGOT PASSWORD =================
@app.route('/forgot-password', methods=['POST'])
def forgot_password():
    try:
        data = request.get_json()

        email = data.get("email")
        new_password = data.get("newPassword")

        user = users_collection.find_one({"email": email})

        if not user:
            return jsonify({"status": "not_found"})

        hashed_password = bcrypt.hashpw(
            new_password.encode("utf-8"),
            bcrypt.gensalt()
        ).decode("utf-8")

        users_collection.update_one(
            {"email": email},
            {"$set": {"password": hashed_password}}
        )

        return jsonify({"status": "success"})

    except Exception as e:
        print("FORGOT ERROR:", e)
        return jsonify({"status": "error"})


# ================= TRAINING DATA =================
@app.route('/training-data', methods=['POST'])
def training_data():
    try:
        data = request.get_json()
        training_collection.insert_one(data)
        return jsonify({"status": "success"})
    except Exception as e:
        print("TRAINING ERROR:", e)
        return jsonify({"status": "error"})


# ================= COMPLETE TRAINING =================
@app.route('/complete-training', methods=['POST'])
def complete_training():
    try:
        data = request.get_json()
        user_id = data.get("userId")

        users_collection.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": {"trainingCompleted": True}}
        )

        return jsonify({"status": "training_completed"})

    except Exception as e:
        print("COMPLETE TRAINING ERROR:", e)
        return jsonify({"status": "error"})


# ================= USER STATUS =================
@app.route('/user-status/<user_id>', methods=['GET'])
def user_status(user_id):
    try:
        user = users_collection.find_one({"_id": ObjectId(user_id)})

        if not user:
            return jsonify({"status": "not_found"})

        return jsonify({
            "trainingCompleted": user.get("trainingCompleted", False),
            "examCompleted": user.get("examCompleted", False)
        })

    except Exception as e:
        print("STATUS ERROR:", e)
        return jsonify({"status": "error"})


# ================= ANALYSIS API =================
@app.route('/analyze-user/<user_id>', methods=['GET'])
def analyze_user(user_id):
    try:
        result = detect_fraud(user_id)

        analysis_collection.insert_one({
            "user_id": user_id,
            "result": result,
            "timestamp": datetime.utcnow()
        })

        return jsonify({
            "status": "success",
            "userId": user_id,
            "risk_score": result.get("risk_score", 0),
            "fraud_status": result.get("status", "UNKNOWN"),
            "saved_to_db": True
        })

    except Exception as e:
        print("ANALYZE ERROR:", e)
        return jsonify({
            "status": "error",
            "message": str(e)
        })


# ================= HOME =================
@app.route("/")
def home():
    return "🚀 Backend running with Module 2 + 3 + DB integration"


# ================= SERVER =================
if __name__ == "__main__":
    print("🚀 SERVER RUNNING ON http://localhost:5000")
    app.run(debug=True, port=5000)













