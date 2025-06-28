from fastapi import HTTPException
from pymongo.collection import Collection
from models.user import UserRegister

def register_user(user: UserRegister, user_collection: Collection):
    # Check if user already exists
    print("Inserting user:")
    if user_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="User already exists")
    user_dict = user.dict()
    user_collection.insert_one(user_dict)
    return {"status": "success", "message": "User registered successfully"}
