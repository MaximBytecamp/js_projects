"""Роутер АВТОРОВ — НЕПОЛНЫЙ.
Есть только GET. Студенты должны сами дописать POST и DELETE по аналогии с books.py"""

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/authors", tags=["authors"])

db: list[dict] = [
    {"id": 1, "name": "Лев Толстой"},
    {"id": 2, "name": "Михаил Булгаков"},
]
next_id = 3


class AuthorIn(BaseModel):
    name: str


# ── GET — список авторов (готово) ──────────────────────────────
@router.get("/")
def get_authors():
    return db


# ══════════════════════════════════════════════════════════════
# ЗАДАНИЕ: допиши POST и DELETE по аналогии с routers/books.py
# ══════════════════════════════════════════════════════════════

# POST /authors/ — добавить автора
# Подсказка: скопируй add_book из books.py и адаптируй


# DELETE /authors/{author_id} — удалить автора
# Подсказка: скопируй delete_book из books.py и адаптируй
