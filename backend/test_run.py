# from module_2.feature_extraction.extract import extract_features

# events = [
#     {"key": "t", "holdTime": 80, "delayFromLastKey": 120},
#     {"key": "h", "holdTime": 70, "delayFromLastKey": 150},
#     {"key": "e", "holdTime": 90, "delayFromLastKey": 110}
# ]

# result = extract_features(events, user_id="test_user")

# print("FINAL RESULT:", result)




import sys
import os

sys.path.append(os.path.abspath("."))

# from module_2.feature_extraction.extract import extract_features
# from module_2.feature_extraction.extract import extract_features

from module_2.feature_extraction.extract_features import extract_features

events = [
    {"key": "t", "holdTime": 80, "delayFromLastKey": 120},
    {"key": "h", "holdTime": 70, "delayFromLastKey": 150},
    {"key": "e", "holdTime": 90, "delayFromLastKey": 110}
]

result = extract_features(events, user_id="test_user")

print("FINAL RESULT:", result)