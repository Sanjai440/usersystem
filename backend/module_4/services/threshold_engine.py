from config import THRESHOLD

def evaluate(distance):
    if distance < THRESHOLD:
        return "AUTHENTICATED"
    return "INTRUDER"