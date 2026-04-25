# def extract_features(typing_speed, mouse_speed, pause_time):
#     return {
#         "typing_speed": typing_speed,
#         "mouse_speed": mouse_speed,
#         "pause_time": pause_time
#     }









# import numpy as np

# def extract_features(data):

#     hold_times = []
#     flight_times = []

#     for event in data:
#         if event["type"] == "up" and "holdTime" in event:
#             hold_times.append(event["holdTime"])

#         if event["type"] == "down" and "delayFromLastKey" in event:
#             if event["delayFromLastKey"] > 0:
#                 flight_times.append(event["delayFromLastKey"])

#     typing_speed = len(hold_times)

#     mouse_speed = 0   # if mouse data illa na 0 vechiko
#     pause_time = np.mean(flight_times) if flight_times else 0

#     return {
#         "typing_speed": typing_speed,
#         "mouse_speed": mouse_speed,
#         "pause_time": pause_time
#     }











# module2/feature_extraction/extract_feature.py

# def extract_features(events):
#     total_time = 0
#     total_keys = 0
#     hold_times = []
#     delays = []

#     for e in events:
#         # hold time collect
#         if "holdTime" in e:
#             hold_times.append(e["holdTime"])

#         # delay collect
#         if "delayFromLastKey" in e:
#             delays.append(e["delayFromLastKey"])

#         total_keys += 1

#     # basic calculations
#     avg_hold_time = sum(hold_times) / len(hold_times) if hold_times else 0
#     avg_delay = sum(delays) / len(delays) if delays else 0

#     typing_speed = total_keys / (sum(delays)/1000) if sum(delays) > 0 else 0

#     features = {
#         "typing_speed": typing_speed,
#         "avg_hold_time": avg_hold_time,
#         "avg_delay": avg_delay,
#         "total_keys": total_keys
#     }

#     return features










# def extract_features(events):
#     hold_times = []
#     delays = []

#     for e in events:
#         # hold time
#         if "holdTime" in e and e["holdTime"] is not None:
#             hold_times.append(e["holdTime"])

#         # delay between keys
#         if "delayFromLastKey" in e and e["delayFromLastKey"] is not None:
#             delays.append(e["delayFromLastKey"])

#     # averages
#     avg_hold_time = sum(hold_times) / len(hold_times) if hold_times else 0
#     avg_delay = sum(delays) / len(delays) if delays else 0

#     # safe typing speed calculation
#     total_time = sum(delays) / 1000 if delays else 1
#     typing_speed = len(events) / total_time

#     return {
#         "typing_speed": typing_speed,
#         "avg_hold_time": avg_hold_time,
#         "avg_delay": avg_delay,
#         "total_keys": len(events)
#     }








# def extract_features(events):
#     hold_times = []
#     delays = []

#     for e in events:
#         if "holdTime" in e:
#             hold_times.append(e["holdTime"])

#         if "delayFromLastKey" in e:
#             delays.append(e["delayFromLastKey"])

#     avg_hold_time = sum(hold_times) / len(hold_times) if hold_times else 0
#     avg_delay = sum(delays) / len(delays) if delays else 0

#     typing_speed = len(events) / (sum(delays)/1000) if sum(delays) > 0 else 0

#     return {
#         "typing_speed": typing_speed,
#         "avg_hold_time": avg_hold_time,
#         "avg_delay": avg_delay,
#         "total_keys": len(events)
#     }












# from module_2.feature_extraction.save_to_db import save_features

# def extract_features(events, user_id=None):
#     hold_times = []
#     delays = []

#     for e in events:
#         if "holdTime" in e:
#             hold_times.append(e["holdTime"])

#         if "delayFromLastKey" in e:
#             delays.append(e["delayFromLastKey"])

#     avg_hold_time = sum(hold_times) / len(hold_times) if hold_times else 0
#     avg_delay = sum(delays) / len(delays) if delays else 0

#     typing_speed = len(events) / (sum(delays)/1000) if sum(delays) > 0 else 0

#     features = {
#         "typing_speed": typing_speed,
#         "avg_hold_time": avg_hold_time,
#         "avg_delay": avg_delay,
#         "total_keys": len(events)
#     }

#     # 🔥 AUTO SAVE TO DB (NO FLASK REQUIRED)
#     if user_id:
#         save_features(user_id, features)

#     return features










# from module_2.feature_extraction.save_to_db import save_features

# def extract_features(events, user_id=None):
#     hold_times = []
#     delays = []

#     print("🔥 extract_features CALLED")
#     print("USER_ID:", user_id)

#     for e in events:
#         if "holdTime" in e:
#             hold_times.append(e["holdTime"])

#         if "delayFromLastKey" in e:
#             delays.append(e["delayFromLastKey"])

#     # safe calculations
#     avg_hold_time = sum(hold_times) / len(hold_times) if hold_times else 0
#     avg_delay = sum(delays) / len(delays) if delays else 0

#     total_time = sum(delays) / 1000
#     typing_speed = len(events) / total_time if total_time > 0 else 0

#     features = {
#         "typing_speed": typing_speed,
#         "avg_hold_time": avg_hold_time,
#         "avg_delay": avg_delay,
#         "total_keys": len(events)
#     }

#     print("🔥 FEATURES GENERATED:", features)

#     # AUTO SAVE
#     if user_id:
#         save_features(user_id, features)
#     else:
#         print("❌ user_id missing → NOT SAVED")

#     return features









# from module_2.feature_extraction.save_to_db import save_features

# def extract_features(events, user_id=None):
#     hold_times = []
#     delays = []

#     print("🔥 extract_features CALLED")
#     print("USER_ID:", user_id)

#     for e in events:
#         if isinstance(e, dict):
#             if "holdTime" in e:
#                 hold_times.append(e["holdTime"])

#             if "delayFromLastKey" in e:
#                 delays.append(e["delayFromLastKey"])

#     # safe calculations
#     avg_hold_time = sum(hold_times) / len(hold_times) if hold_times else 0
#     avg_delay = sum(delays) / len(delays) if delays else 0

#     total_time = sum(delays) / 1000
#     typing_speed = len(events) / total_time if total_time > 0 else 0

#     features = {
#         "typing_speed": round(typing_speed, 3),
#         "avg_hold_time": round(avg_hold_time, 2),
#         "avg_delay": round(avg_delay, 2),
#         "total_keys": len(events)
#     }

#     print("🔥 FEATURES:", features)

#     # SAVE TO DB
#     if user_id:
#         result = save_features(user_id, features)
#         print("🔥 DB RESULT:", result)
#     else:
#         print("❌ user_id missing → not saved")

#     return features











# from module_2.feature_extraction.save_to_db import save_features

# def extract_features(events, user_id=None):
#     hold_times = []
#     delays = []

#     print("🔥 extract_features STARTED")
#     print("USER_ID:", user_id)

#     for e in events:
#         if isinstance(e, dict):
#             hold_times.append(e.get("holdTime", 0))
#             delays.append(e.get("delayFromLastKey", 0))

#     avg_hold_time = sum(hold_times) / len(hold_times) if hold_times else 0
#     avg_delay = sum(delays) / len(delays) if delays else 0

#     total_time = sum(delays) / 1000
#     typing_speed = len(events) / total_time if total_time > 0 else 0

#     features = {
#         "typing_speed": round(typing_speed, 3),
#         "avg_hold_time": round(avg_hold_time, 2),
#         "avg_delay": round(avg_delay, 2),
#         "total_keys": len(events)
#     }

#     print("🔥 FEATURES READY:", features)

#     # SAFE SAVE (NO ERROR EVER)
#     try:
#         if isinstance(user_id, str) and user_id.strip():
#             save_features(user_id.strip(), features)
#         else:
#             print("⚠️ user_id missing → saved skipped")
#     except Exception as e:
#         print("❌ SAVE ERROR (handled):", e)

#     return features









from module_2.feature_extraction.save_to_db import save_features

def extract_features(events, user_id=None):
    hold_times = []
    delays = []

    print("🔥 extract_features STARTED")
    print("🔥 RAW EVENTS COUNT:", len(events))
    print("USER_ID:", user_id)

    # STEP 1: SAFE DATA EXTRACTION
    for e in events:
        if isinstance(e, dict):
            hold_times.append(e.get("holdTime", 0))
            delays.append(e.get("delayFromLastKey", 0))

    print("🔥 HOLD TIMES:", hold_times)
    print("🔥 DELAYS:", delays)

    # STEP 2: FEATURE CALCULATION (SAFE)
    avg_hold_time = sum(hold_times) / len(hold_times) if hold_times else 0
    avg_delay = sum(delays) / len(delays) if delays else 0

    total_time = sum(delays) / 1000 if sum(delays) > 0 else 1  # prevent divide error
    typing_speed = len(events) / total_time if total_time > 0 else 0

    features = {
        "typing_speed": round(typing_speed, 3),
        "avg_hold_time": round(avg_hold_time, 2),
        "avg_delay": round(avg_delay, 2),
        "total_keys": len(events)
    }

    print("🔥 FEATURES GENERATED:", features)

    # STEP 3: FORCE SAVE DEBUG FLOW
    if not user_id or not isinstance(user_id, str) or not user_id.strip():
        print("❌ user_id MISSING → DB NOT SAVED")
        return features

    user_id = user_id.strip()

    print("🔥 SAVING TO DB...")

    try:
        result = save_features(user_id, features)

        if result:
            print("🔥 DB SAVE SUCCESS:", result)
        else:
            print("❌ DB SAVE FAILED (returned None)")

    except Exception as e:
        print("❌ SAVE FUNCTION ERROR:", str(e))

    return features