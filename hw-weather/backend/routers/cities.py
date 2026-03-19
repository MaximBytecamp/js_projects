"""Роутер ГОРОДОВ — ГОТОВ.
Отдаёт список городов с координатами."""

from fastapi import APIRouter

router = APIRouter(prefix="/cities", tags=["cities"])

db: list[dict] = [
    {"id": 1, "name": "Москва",          "lat": 55.75, "lon": 37.62},
    {"id": 2, "name": "Санкт-Петербург", "lat": 59.93, "lon": 30.32},
    {"id": 3, "name": "Казань",          "lat": 55.79, "lon": 49.11},
    {"id": 4, "name": "Новосибирск",     "lat": 55.01, "lon": 82.93},
    {"id": 5, "name": "Сочи",            "lat": 43.60, "lon": 39.73},
]


@router.get("/")
def get_cities():
    return db
