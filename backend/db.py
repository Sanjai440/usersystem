# db.py - MongoDB Connection Module
# =============== CENTRALIZED DATABASE INITIALIZATION ===============

from pymongo import MongoClient
from pymongo.errors import ServerSelectionTimeoutError, ConnectionFailure
import logging

logger = logging.getLogger(__name__)

# MongoDB Connection Configuration
MONGO_URI = "mongodb://localhost:27017/"
DATABASE_NAME = "keystrokeAI_DB"
CONNECTION_TIMEOUT = 5000

# Initialize MongoDB Client
mongo_client = None
db = None
users_collection = None
training_collection = None
analysis_collection = None


def init_db():
    """Initialize MongoDB connection with error handling"""
    global mongo_client, db, users_collection, training_collection, analysis_collection
    
    try:
        mongo_client = MongoClient(
            MONGO_URI,
            serverSelectionTimeoutMS=CONNECTION_TIMEOUT,
            connectTimeoutMS=CONNECTION_TIMEOUT
        )
        # Test connection
        mongo_client.admin.command('ping')
        logger.info("✅ MongoDB connected successfully")
        
        # Initialize database and collections
        db = mongo_client[DATABASE_NAME]
        users_collection = db["users"]
        training_collection = db["training_data"]
        analysis_collection = db["analysis_results"]
        
        logger.info(f"✅ Database '{DATABASE_NAME}' initialized")
        logger.info("✅ Collections: users, training_data, analysis_results")
        
        return mongo_client
        
    except (ServerSelectionTimeoutError, ConnectionFailure) as e:
        logger.error(f"❌ MongoDB connection failed: {e}")
        logger.error("⚠️ App will run but database operations will fail")
        mongo_client = None
        db = None
        users_collection = None
        training_collection = None
        analysis_collection = None
        return None


def get_collections():
    """Return all initialized collections"""
    return {
        "users": users_collection,
        "training_data": training_collection,
        "analysis_results": analysis_collection
    }


def is_db_connected():
    """Check if database is connected"""
    return mongo_client is not None and training_collection is not None
