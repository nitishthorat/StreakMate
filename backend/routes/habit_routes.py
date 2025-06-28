from fastapi import APIRouter, Depends
from pymongo.database import Database
from models.habit import HabitCreate
from services.habit_service import create_habit
from db import get_db

router = APIRouter()

@router.post("/habit")
def create(habit: HabitCreate, db: Database = Depends(get_db)):
    habit_collection = db["Habit"]
    return create_habit(habit, habit_collection)
