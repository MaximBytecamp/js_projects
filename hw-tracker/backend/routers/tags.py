"""Роутер ТЕГОВ — НЕПОЛНЫЙ.
Есть только GET. Студенты дописывают POST и DELETE по аналогии с tasks.py"""

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/tags", tags=["tags"])

db: list[dict] = [
    {"id": 1, "name": "срочно",  "color": "#e74c3c"},
    {"id": 2, "name": "учёба",   "color": "#3498db"},
    {"id": 3, "name": "работа",  "color": "#2ecc71"},
]
next_id = 4


class TagIn(BaseModel):
    name: str
    color: str = "#888888"


# ── GET — список тегов (готово) ─────────────────────────────
@router.get("/")
def get_tags():
    return db


# ══════════════════════════════════════════════════════════════
# ЗАДАНИЕ: допиши POST и DELETE по аналогии с routers/tasks.py
# ══════════════════════════════════════════════════════════════
