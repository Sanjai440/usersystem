# from config import THRESHOLD

# def evaluate(distance):
#     if distance < THRESHOLD:
#         return "AUTHENTICATED"
#     return "INTRUDER"







THRESHOLD = 10   # 🔥 IMPORTANT (not 0.5)

def evaluate(distance):
    if distance < THRESHOLD:
        return "AUTHENTICATED"
    return "INTRUDER"