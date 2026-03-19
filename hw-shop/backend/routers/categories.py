"""Роутер КАТЕГОРИЙ — НЕПОЛНЫЙ.
Есть только GET. Студенты дописывают POST и DELETE по аналогии с products.py"""

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/categories", tags=["categories"])

db: list[dict] = [
    {"id": 1, "name": "Смартфоны"},
    {"id": 2, "name": "Ноутбуки"},
    {"id": 3, "name": "Аксессуары"},
]
next_id = 4


class CategoryIn(BaseModel):
    name: str


# ── GET — список категорий (готово) ────────────────────────────
@router.get("/")
def get_categories():
    return db


# ══════════════════════════════════════════════════════════════
# ЗАДАНИЕ: допиши POST и DELETE по аналогии с routers/products.py
# ══════════════════════════════════════════════════════════════
