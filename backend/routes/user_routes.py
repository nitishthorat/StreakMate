from fastapi import APIRouter, Depends
from pymongo.database import Database
from models.user import UserRegister
from services.user_service import register_user
from db import get_db

router = APIRouter()

@router.post("/register")
def register(user: UserRegister, db: Database = Depends(get_db)):
    user_collection = db["User"]
    return register_user(user, user_collection)
