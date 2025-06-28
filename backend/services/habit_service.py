from pymongo.collection import Collection
from models.habit import HabitCreate

def create_habit(habit: HabitCreate, habit_collection: Collection):
    habit_dict = habit.dict()
    habit_collection.insert_one(habit_dict)
    return {"status": "success", "message": "Habit created successfully"}
