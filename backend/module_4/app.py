# from flask import Flask, request, jsonify
# from flask_cors import CORS

# from services.authentication import authenticate

# app = Flask(__name__)
# CORS(app)

# @app.route("/api/compare", methods=["POST"])
# def compare_api():
#     try:
#         data = request.json

#         user_id = data.get("userId")
#         features = data.get("features")

#         if not user_id or not features:
#             return jsonify({"error": "Missing data"}), 400

#         # 🔥 CALL MAIN AI LOGIC
#         result = authenticate(user_id, features)

#         return jsonify(result)

#     except Exception as e:
#         print("MODULE 4 ERROR:", e)
#         return jsonify({"error": str(e)}), 500


# @app.route("/")
# def home():
#     return "🧠 Module 4 AI Engine Running"


# if __name__ == "__main__":
#     print("🧠 Module 4 running on http://127.0.0.1:5001")
#     app.run(port=5001, debug=True)















# from flask import Flask, request, jsonify
# from flask_cors import CORS

# from services.authentication import authenticate
# from integration.module3_connector import get_current_behavior

# app = Flask(__name__)
# CORS(app)







# @app.route("/api/compare", methods=["POST"])
# def compare_api():
#     try:
#         data = request.json
#         user_id = data.get("userId")

#         if not user_id:
#             return jsonify({"error": "missing userId"}), 400

#         current = get_current_behavior(user_id)

#         # 🔥 prevent empty crash
#         if not current:
#             return jsonify({
#                 "status": "NO_DATA",
#                 "message": "No behavior data"
#             })

#         result = authenticate(user_id, current)
#         return jsonify(result)

#     except Exception as e:
#         return jsonify({
#             "status": "ERROR",
#             "message": str(e)
#         }), 500








# @app.route("/")
# def home():
#     return "🧠 Module 4 Running"

# if __name__ == "__main__":
#     print("Running on http://127.0.0.1:5001")
#     app.run(port=5001, debug=True)

























# from flask import Flask, request, jsonify
# from flask_cors import CORS

# from services.authentication import authenticate
# from integration.module3_connector import get_current_behavior

# app = Flask(__name__)
# CORS(app)









# @app.route("/api/compare", methods=["POST"])
# def compare_api():
#     try:
#         data = request.json
#         user_id = data.get("userId")

#         baseline = get_baseline(user_id)
#         current = get_current_behavior(user_id)

#         # 🔥 ADD THIS HERE (RIGHT AFTER current)
#         if not current or current.get("status") == "error":
#             return jsonify({
#                 "status": "NO_DATA",
#                 "message": "Invalid behavior data"
#             })

#         # continue normal flow
#         score = siamese_model.predict([baseline, current])

#         return jsonify({
#             "status": "OK",
#             "similarity": float(score)
#         })

#     except Exception as e:
#         return jsonify({
#             "status": "ERROR",
#             "message": str(e)
#         })


# @app.route("/")
# def home():
#     return "🧠 Module 4 Running"


# if __name__ == "__main__":
#     print("Running on http://127.0.0.1:5001")
#     app.run(port=5001, debug=True)












# from flask import Flask, request, jsonify
# from flask_cors import CORS

# from services.authentication import authenticate
# from integration.module3_connector import get_current_behavior
# from services.data_loader import get_baseline  # ✅ FIX 1

# from model.siamese_network import SiameseNetwork  # ✅ FIX 2
# import torch

# app = Flask(__name__)
# CORS(app)

# # load model once
# siamese_model = SiameseNetwork()
# siamese_model.eval()


# # 🔥 CLEAN FUNCTION
# def clean_features(data):
#     cleaned = {}
#     for k, v in data.items():
#         try:
#             cleaned[k] = float(v)
#         except:
#             cleaned[k] = 0.0
#     return cleaned


# @app.route("/api/compare", methods=["POST"])
# def compare_api():
#     try:
#         data = request.json
#         user_id = data.get("userId")

#         # -----------------------------
#         # GET DATA
#         # -----------------------------
#         baseline = get_baseline(user_id)
#         current = get_current_behavior(user_id)

#         # ❌ invalid checks
#         if not baseline or not current:
#             return jsonify({
#                 "status": "NO_DATA",
#                 "message": "Missing data"
#             })

#         if current.get("status") == "error":
#             return jsonify({
#                 "status": "NO_DATA",
#                 "message": "Invalid behavior data"
#             })

#         # -----------------------------
#         # CLEAN DATA
#         # -----------------------------
#         baseline = clean_features(baseline)
#         current = clean_features(current)

#         # convert to tensor
#         baseline = torch.tensor(list(baseline.values()), dtype=torch.float32)
#         current = torch.tensor(list(current.values()), dtype=torch.float32)

#         # -----------------------------
#         # SIAMESE MODEL
#         # -----------------------------
#         with torch.no_grad():
#             score = siamese_model(baseline, current)

#         return jsonify({
#             "status": "OK",
#             "similarity": float(score.item())
#         })

#     except Exception as e:
#         print("ERROR:", e)
#         return jsonify({
#             "status": "ERROR",
#             "message": str(e)
#         })


# @app.route("/")
# def home():
#     return "🧠 Module 4 Running"


# if __name__ == "__main__":
#     print("Running on http://127.0.0.1:5001")
#     app.run(port=5001, debug=True, threaded=True)






























# from flask import Flask, request, jsonify
# from flask_cors import CORS

# from services.authentication import authenticate
# from integration.module3_connector import get_current_behavior
# from services.data_loader import get_baseline

# from model.siamese_network import SiameseNetwork
# import torch

# app = Flask(__name__)
# CORS(app)

# # load model once
# siamese_model = SiameseNetwork()
# siamese_model.eval()


# # 🔥 CLEAN FUNCTION
# def clean_features(data):
#     cleaned = {}
#     for k, v in data.items():
#         try:
#             cleaned[k] = float(v)
#         except:
#             cleaned[k] = 0.0
#     return cleaned


# @app.route("/api/compare", methods=["POST"])
# def compare_api():
#     try:
#         data = request.json
#         user_id = data.get("userId")

#         # -----------------------------
#         # GET DATA
#         # -----------------------------
#         baseline = get_baseline(user_id)
#         current = get_current_behavior(user_id)

#         if not baseline or not current:
#             return jsonify({
#                 "status": "NO_DATA",
#                 "message": "Missing data"
#             })

#         if current.get("status") == "error":
#             return jsonify({
#                 "status": "NO_DATA",
#                 "message": "Invalid behavior data"
#             })

#         # -----------------------------
#         # CLEAN DATA
#         # -----------------------------
#         baseline = clean_features(baseline)
#         current = clean_features(current)

#         # ⚡ IMPORTANT: FIX FEATURE ORDER CONSISTENCY
#         keys = sorted(baseline.keys())

#         baseline_list = [baseline[k] for k in keys]
#         current_list = [current.get(k, 0.0) for k in keys]

#         # convert to tensor (ADD batch dimension for stability)
#         baseline_tensor = torch.tensor([baseline_list], dtype=torch.float32)
#         current_tensor = torch.tensor([current_list], dtype=torch.float32)

#         # -----------------------------
#         # SIAMESE MODEL
#         # -----------------------------
#         with torch.no_grad():
#             score = siamese_model(baseline_tensor, current_tensor)

#         return jsonify({
#             "status": "OK",
#             "similarity": float(score.item())
#         })

#     except Exception as e:
#         print("ERROR:", e)
#         return jsonify({
#             "status": "ERROR",
#             "message": str(e)
#         })


# @app.route("/")
# def home():
#     return "🧠 Module 4 Running"


# if __name__ == "__main__":
#     print("Running on http://127.0.0.1:5001")

#     # 🔥 STABLE RUN FOR ML + THREADING
#     app.run(
#         port=5001,
#         debug=False,
#         threaded=True,
#         use_reloader=False
#     )

















# from flask import Flask, request, jsonify
# from flask_cors import CORS

# from services.data_loader import get_baseline
# from integration.module3_connector import get_current_behavior

# from model.siamese_network import SiameseNetwork
# import torch
# import torch.nn.functional as F

# app = Flask(__name__)
# CORS(app)

# # -----------------------------
# # LOAD MODEL ONCE
# # -----------------------------
# siamese_model = SiameseNetwork(input_size=4)  # change to 5 if you add 5th feature
# siamese_model.eval()


# # -----------------------------
# # CLEAN FEATURES
# # -----------------------------
# def clean_features(data):
#     cleaned = {}
#     for k, v in data.items():
#         try:
#             cleaned[k] = float(v)
#         except:
#             cleaned[k] = 0.0
#     return cleaned


# @app.route("/api/compare", methods=["POST"])
# def compare_api():
#     try:
#         data = request.json
#         user_id = data.get("userId")

#         # -----------------------------
#         # GET DATA
#         # -----------------------------
#         baseline = get_baseline(user_id)
#         current = get_current_behavior(user_id)

#         if not baseline or not current:
#             return jsonify({
#                 "status": "NO_DATA",
#                 "message": "Missing data"
#             })

#         if current.get("status") == "error":
#             return jsonify({
#                 "status": "NO_DATA",
#                 "message": "Invalid behavior data"
#             })

#         # -----------------------------
#         # CLEAN DATA
#         # -----------------------------
#         baseline = clean_features(baseline)
#         current = clean_features(current)

#         # -----------------------------
#         # FEATURE ALIGNMENT (IMPORTANT)
#         # -----------------------------
#         keys = sorted(baseline.keys())

#         baseline_list = [baseline[k] for k in keys]
#         current_list = [current.get(k, 0.0) for k in keys]

#         baseline_tensor = torch.tensor([baseline_list], dtype=torch.float32)
#         current_tensor = torch.tensor([current_list], dtype=torch.float32)

#         # -----------------------------
#         # SIAMESE INFERENCE (FIXED)
#         # -----------------------------
#         with torch.no_grad():
#             out1 = siamese_model.forward_once(baseline_tensor)
#             out2 = siamese_model.forward_once(current_tensor)

#             similarity = F.cosine_similarity(out1, out2)

#         return jsonify({
#             "status": "OK",
#             "similarity": float(similarity.item())
#         })

#     except Exception as e:
#         print("ERROR:", e)
#         return jsonify({
#             "status": "ERROR",
#             "message": str(e)
#         })


# @app.route("/")
# def home():
#     return "🧠 Module 4 Running"


# if __name__ == "__main__":
#     print("Running on http://127.0.0.1:5001")

#     app.run(
#         port=5001,
#         debug=False,
#         threaded=True,
#         use_reloader=False
#     )











# from flask import Flask, request, jsonify
# from flask_cors import CORS

# from services.data_loader import get_baseline
# from model.siamese_network import SiameseNetwork

# import torch
# import torch.nn.functional as F

# app = Flask(__name__)
# CORS(app)

# # load model once
# model = SiameseNetwork()
# model.eval()


# # -------------------------
# # CLEAN FEATURES
# # -------------------------
# def clean_features(data):
#     cleaned = {}
#     for k, v in data.items():
#         try:
#             cleaned[k] = float(v)
#         except:
#             cleaned[k] = 0.0
#     return cleaned


# # -------------------------
# # MAIN LIVE COMPARE API
# # -------------------------
# @app.route("/api/compare", methods=["POST"])
# def compare():
#     try:
#         data = request.json
#         user_id = data.get("userId")

#         # 🔥 1. BASELINE FROM DB
#         baseline = get_baseline(user_id)

#         # 🔥 2. CURRENT FROM FRONTEND (LIVE EXAM DATA)
#         current = data.get("features")

#         if not baseline or not current:
#             return jsonify({
#                 "status": "NO_DATA",
#                 "message": "Missing data"
#             })

#         # clean
#         baseline = clean_features(baseline)
#         current = clean_features(current)

#         # sort keys to match
#         keys = sorted(baseline.keys())

#         base_list = [baseline[k] for k in keys]
#         curr_list = [current.get(k, 0.0) for k in keys]

#         # tensor
#         base_tensor = torch.tensor([base_list], dtype=torch.float32)
#         curr_tensor = torch.tensor([curr_list], dtype=torch.float32)

#         # 🔥 SIAMESE INFERENCE
#         with torch.no_grad():
#             out1 = model.forward_once(base_tensor)
#             out2 = model.forward_once(curr_tensor)

#             similarity = F.cosine_similarity(out1, out2)

#         score = float(similarity.item())

#         # 🔥 SIMPLE ALERT LOGIC
#         alert = score < 0.7   # threshold

#         return jsonify({
#             "status": "OK",
#             "similarity": score,
#             "alert": alert
#         })

#     except Exception as e:
#         return jsonify({
#             "status": "ERROR",
#             "message": str(e)
#         })


# @app.route("/")
# def home():
#     return "Module 4 Running"


# if __name__ == "__main__":
#     app.run(
#         port=5001,
#         debug=False,
#         threaded=True,
#         use_reloader=False
#     )












from flask import Flask, request, jsonify
from flask_cors import CORS

from services.data_loader import get_baseline
from model.siamese_network import SiameseNetwork

import torch
import torch.nn.functional as F

app = Flask(__name__)
CORS(app)

# -------------------------
# LOAD MODEL
# -------------------------
model = SiameseNetwork()
model.eval()


# -------------------------
# CLEAN FEATURES
# -------------------------
def clean_features(data):
    cleaned = {}
    for k, v in data.items():
        try:
            cleaned[k] = float(v)
        except:
            cleaned[k] = 0.0
    return cleaned


# -------------------------
# MAIN API
# -------------------------
@app.route("/api/compare", methods=["POST"])
def compare():
    try:
        data = request.get_json()  # safer than request.json

        print("DEBUG REQUEST:", data)

        if not data:
            return jsonify({
                "status": "NO_DATA",
                "message": "Empty request body"
            })

        user_id = data.get("userId")
        current = data.get("features")

        # -------------------------
        # VALIDATION FIX
        # -------------------------
        if not user_id or current is None:
            return jsonify({
                "status": "NO_DATA",
                "message": "Missing userId or features"
            })

        # -------------------------
        # GET BASELINE
        # -------------------------
        baseline = get_baseline(user_id)

        if not baseline:
            return jsonify({
                "status": "NO_DATA",
                "message": "No baseline found in DB"
            })

        # -------------------------
        # CLEAN DATA
        # -------------------------
        baseline = clean_features(baseline)
        current = clean_features(current)

        # -------------------------
        # ALIGN FEATURES
        # -------------------------
        keys = sorted(baseline.keys())

        base_list = [baseline[k] for k in keys]
        curr_list = [current.get(k, 0.0) for k in keys]

        # -------------------------
        # TENSORS (FIX SHAPE ISSUE)
        # -------------------------
        base_tensor = torch.tensor([base_list], dtype=torch.float32)
        curr_tensor = torch.tensor([curr_list], dtype=torch.float32)

        # -------------------------
        # SIAMESE INFERENCE
        # -------------------------
        with torch.no_grad():
            out1 = model.forward_once(base_tensor)
            out2 = model.forward_once(curr_tensor)

            similarity = F.cosine_similarity(out1, out2)

        score = float(similarity.item())

        # -------------------------
        # ALERT LOGIC
        # -------------------------
        alert = score < 0.7

        print("SCORE:", score, "ALERT:", alert)

        return jsonify({
            "status": "OK",
            "similarity": score,
            "alert": alert
        })

    except Exception as e:
        print("ERROR:", e)
        return jsonify({
            "status": "ERROR",
            "message": str(e)
        })


# -------------------------
# HOME
# -------------------------
@app.route("/")
def home():
    return "🧠 Module 4 Running"


# -------------------------
# RUN SERVER
# -------------------------
if __name__ == "__main__":
    print("Running on http://127.0.0.1:5001")

    app.run(
        port=5001,
        debug=False,
        threaded=True,
        use_reloader=False
    )