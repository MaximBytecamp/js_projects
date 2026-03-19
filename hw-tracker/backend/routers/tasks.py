"""Роутер ЗАДАЧ — ПОЛНЫЙ (GET / POST / DELETE).
Студенты используют как образец."""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/tasks", tags=["tasks"])

db: list[dict] = [
    {"id": 1, "title": "Изучить FastAPI",     "done": False},
    {"id": 2, "title": "Сделать домашку",      "done": True},
    {"id": 3, "title": "Подготовить презентацию", "done": False},
]
next_id = 4


class TaskIn(BaseModel):
    title: str
    done: bool = False


@router.get("/")
def get_tasks():
    return db


@router.post("/", status_code=201)
def add_task(body: TaskIn):
    global next_id
    if not body.title.strip():
        raise HTTPException(400, "Заголовок не может быть пустым")
    task = {"id": next_id, "title": body.title.strip(), "done": body.done}
    db.append(task)
    next_id += 1
    return task


@router.delete("/{task_id}", status_code=204)
def delete_task(task_id: int):
    global db
    before = len(db)
    db = [t for t in db if t["id"] != task_id]
    if len(db) == before:
        raise HTTPException(404, "Задача не найдена")
