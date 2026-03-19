"""Роутер ТОВАРОВ — ПОЛНЫЙ (GET / POST / DELETE).
Студенты используют как образец."""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/products", tags=["products"])

db: list[dict] = [
    {"id": 1, "name": "iPhone 15",     "price": 99990},
    {"id": 2, "name": "MacBook Air",   "price": 139990},
    {"id": 3, "name": "AirPods Pro 2", "price": 24990},
]
next_id = 4


class ProductIn(BaseModel):
    name: str
    price: int


@router.get("/")
def get_products():
    return db


@router.post("/", status_code=201)
def add_product(body: ProductIn):
    global next_id
    if not body.name.strip():
        raise HTTPException(400, "Название не может быть пустым")
    if body.price < 0:
        raise HTTPException(400, "Цена не может быть отрицательной")
    product = {"id": next_id, "name": body.name.strip(), "price": body.price}
    db.append(product)
    next_id += 1
    return product


@router.delete("/{product_id}", status_code=204)
def delete_product(product_id: int):
    global db
    before = len(db)
    db = [p for p in db if p["id"] != product_id]
    if len(db) == before:
        raise HTTPException(404, "Товар не найден")
