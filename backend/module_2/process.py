from feature_extraction.extract_feature import extract_features
from feature_extraction.save_to_db import save_features

def process_training_data(raw_events, user_id):

    # Step 1: feature extraction
    features = extract_features(raw_events)

    # Step 2: store in DB
    save_features(user_id, features)

    print("✅ Training data saved to DB")

    return features