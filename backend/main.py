from fastapi import FastAPI, Depends
from pymongo import MongoClient
import os
from dotenv import load_dotenv
from routes.user_routes import router as user_router
from routes.habit_routes import router as habit_router
from db import get_db

app = FastAPI()

# Load environment variables from .env file
load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME")

# Initialize MongoDB client
client = MongoClient(MONGO_URI)

# Include routers
app.include_router(user_router)
app.include_router(habit_router)