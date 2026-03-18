from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/users", tags=["users"])

# "База" — просто список в памяти
db: list[dict] = [
    {"id": 1, "name": "Alice"},
    {"id": 2, "name": "Bob"},
]
next_id = 3


class UserIn(BaseModel):
    name: str


@router.get("/")
def get_users():
    return db


@router.post("/", status_code=201)
def add_user(body: UserIn):
    global next_id
    if not body.name.strip():
        raise HTTPException(400, "Имя не может быть пустым")
    user = {"id": next_id, "name": body.name.strip()}
    db.append(user)
    next_id += 1
    return user
