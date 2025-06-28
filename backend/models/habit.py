from pydantic import BaseModel

class HabitCreate(BaseModel):
    name: str
    description: str
    preference: str
    duration: int  
