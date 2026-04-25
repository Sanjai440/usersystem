# from services.feature_engineering import extract_features
from module_3.services.feature_engineering import extract_features
from module_3.services.rule_engine import apply_rules
# from services.rule_engine import apply_rules
# from integration.module2_connector import get_clean_data
from module_3.integration.module2_connector import get_clean_data

def detect_fraud():
    data = get_clean_data()

    features = extract_features(data)
    risk_score = apply_rules(features)

    status = "SAFE"
    if risk_score > 50:
        status = "FRAUD DETECTED"

    return {
        "features": features,
        "risk_score": risk_score,
        "status": status
    }