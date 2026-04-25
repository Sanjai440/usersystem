from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["authDB"]

def save_log(data):
    db["logs"].insert_one(data)