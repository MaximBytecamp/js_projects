"""Роутер СООБЩЕНИЙ — ГОТОВ (GET / POST).
Студенты используют как образец для работы с rooms."""

from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from datetime import datetime

router = APIRouter(prefix="/messages", tags=["messages"])

db: list[dict] = [
    {"id": 1, "room": "general",  "author": "Алиса",  "text": "Привет всем!",           "time": "12:00"},
    {"id": 2, "room": "general",  "author": "Боб",    "text": "Здарова!",                "time": "12:01"},
    {"id": 3, "room": "general",  "author": "Алиса",  "text": "Как дела с домашкой?",    "time": "12:02"},
    {"id": 4, "room": "random",   "author": "Чарли",  "text": "Кто хочет пиццу? 🍕",     "time": "12:05"},
    {"id": 5, "room": "homework", "author": "Боб",    "text": "Кто-нибудь решил задачу 3?", "time": "12:10"},
]
next_id = 6


class MessageIn(BaseModel):
    room: str
    author: str
    text: str


@router.get("/")
def get_messages(room: str = Query(default=None)):
    """Получить сообщения. Если передан room — только для этой комнаты."""
    if room:
        return [m for m in db if m["room"] == room]
    return db


@router.post("/", status_code=201)
def add_message(body: MessageIn):
    global next_id
    if not body.text.strip():
        raise HTTPException(400, "Сообщение не может быть пустым")
    if not body.author.strip():
        raise HTTPException(400, "Укажи имя автора")

    msg = {
        "id": next_id,
        "room": body.room,
        "author": body.author.strip(),
        "text": body.text.strip(),
        "time": datetime.now().strftime("%H:%M"),
    }
    db.append(msg)
    next_id += 1
    return msg
