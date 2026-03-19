"""Роутер КНИГ — ПОЛНЫЙ (GET / POST / DELETE).
Студенты используют его как образец."""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/books", tags=["books"])

db: list[dict] = [
    {"id": 1, "title": "Война и мир",         "author": "Толстой"},
    {"id": 2, "title": "Мастер и Маргарита",  "author": "Булгаков"},
]
next_id = 3


class BookIn(BaseModel):
    title: str
    author: str


# ── GET — список книг ─────────────────────────────────────────
@router.get("/")
def get_books():
    return db


# ── POST — добавить книгу ─────────────────────────────────────
@router.post("/", status_code=201)
def add_book(body: BookIn):
    global next_id
    if not body.title.strip():
        raise HTTPException(400, "Название не может быть пустым")
    book = {"id": next_id, "title": body.title.strip(), "author": body.author.strip()}
    db.append(book)
    next_id += 1
    return book


# ── DELETE — удалить книгу ─────────────────────────────────────
@router.delete("/{book_id}", status_code=204)
def delete_book(book_id: int):
    global db
    before = len(db)
    db = [b for b in db if b["id"] != book_id]
    if len(db) == before:
        raise HTTPException(404, "Книга не найдена")
