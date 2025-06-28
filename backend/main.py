from fastapi import FastAPI
from pymongo import MongoClient
import os
from dotenv import load_dotenv

app = FastAPI()

# Load environment variables from .env file
load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME")

# Initialize MongoDB client
client = MongoClient(MONGO_URI)
db = client[DB_NAME]