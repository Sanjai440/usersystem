# from config import THRESHOLD

# def evaluate(distance):
#     if distance < THRESHOLD:
#         return "AUTHENTICATED"
#     return "INTRUDER"







# THRESHOLD = 10   # 🔥 IMPORTANT (not 0.5)

# THRESHOLD = 0.85
# def evaluate(distance):
#     if distance < THRESHOLD:
#         return "AUTHENTICATED"
#     return "INTRUDER"






# THRESHOLD = 0.15

# def evaluate(distance):
#     if distance > THRESHOLD:
#         return "INTRUDER"
#     return "AUTHENTICATED"



# THRESHOLD = 7.9

# def evaluate(similarity, baseline, current):

#     if similarity < THRESHOLD:
#         return "INTRUDER"

#     # typing speed spike
#     if current["typing_speed"] > baseline["typing_speed"] * 1.5:
#         return "INTRUDER"

#     return "AUTHENTICATED"

THRESHOLD = 0.85   # correct range

def evaluate(similarity, baseline, current):

    if similarity <= THRESHOLD:
        return "INTRUDER"

    if current["typing_speed"] > baseline["typing_speed"] * 1.5:
        return "INTRUDER"

    return "AUTHENTICATED"