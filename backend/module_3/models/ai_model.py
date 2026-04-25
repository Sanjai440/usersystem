def load_model():
    return "model_loaded"

def predict_score(features):
    return sum(features.values()) / len(features)