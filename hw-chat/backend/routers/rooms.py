"""Роутер КОМНАТ — НЕПОЛНЫЙ.
Есть только GET. Студенты дописывают POST (создание комнаты) и PUT (присоединение).

Задание отличается от остальных:
- POST создаёт комнату
- PUT /rooms/{room_id}/join добавляет пользователя в members
Это учит работать с PUT-запросами и обновлением данных."""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/rooms", tags=["rooms"])

db: list[dict] = [
    {"id": 1, "name": "general",  "description": "Общий чат",      "members": ["Алиса", "Боб"]},
    {"id": 2, "name": "random",   "description": "Болталка",        "members": ["Чарли"]},
    {"id": 3, "name": "homework", "description": "Помощь с ДЗ",     "members": ["Боб"]},
]
next_id = 4


class RoomIn(BaseModel):
    name: str
    description: str = ""


class JoinIn(BaseModel):
    username: str


# ── GET /rooms/ — список комнат (готово) ─────────────────────
@router.get("/")
def get_rooms():
    return db


# ── GET /rooms/{room_id} — одна комната (готово) ─────────────
@router.get("/{room_id}")
def get_room(room_id: int):
    for r in db:
        if r["id"] == room_id:
            return r
    raise HTTPException(404, "Комната не найдена")


# ══════════════════════════════════════════════════════════════
# ЗАДАНИЕ 1: допиши POST /rooms/
#
# Что нужно:
# 1. Принять RoomIn (name, description)
# 2. Проверить, что name не пустое
# 3. Проверить, что комнаты с таким name ещё нет (иначе 409 Conflict)
# 4. Создать комнату с пустым списком members
# 5. Вернуть созданную комнату, status_code=201
#
# Подсказка:
#
# @router.post("/", status_code=201)
# def create_room(body: RoomIn):
#     global next_id
#     ...
# ══════════════════════════════════════════════════════════════


# ══════════════════════════════════════════════════════════════
# ЗАДАНИЕ 2: допиши PUT /rooms/{room_id}/join
#
# Это НОВЫЙ тип запроса (PUT) — обновление существующего ресурса!
#
# Что нужно:
# 1. Принять JoinIn (username)
# 2. Найти комнату по room_id (если нет — 404)
# 3. Проверить, что username не пустое
# 4. Проверить, что пользователь ещё не в members (иначе 409)
# 5. Добавить username в room["members"]
# 6. Вернуть обновлённую комнату
#
# Подсказка:
#
# @router.put("/{room_id}/join")
# def join_room(room_id: int, body: JoinIn):
#     # найти комнату...
#     # проверить, что ещё не в members...
#     # добавить в members...
#     # вернуть комнату
# ══════════════════════════════════════════════════════════════
