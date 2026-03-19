"""Роутер ПРОГНОЗА — НЕПОЛНЫЙ.
Студент дописывает GET /forecast/ с query-параметрами.

Задание: генерировать «фейковый» прогноз на основе города и кол-ва дней.
Это учит работать с Query-параметрами, валидацией, генерацией данных."""

from fastapi import APIRouter, Query, HTTPException
from pydantic import BaseModel
import random

router = APIRouter(prefix="/forecast", tags=["forecast"])

# Заготовка данных для генерации погоды
WEATHER_CONDITIONS = ["☀️ Ясно", "⛅ Облачно", "🌧 Дождь", "❄️ Снег", "🌤 Переменная облачность"]
DAY_NAMES = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]


# ── GET /forecast/sample — пример ответа (готово) ───────────
@router.get("/sample")
def get_sample():
    """Пример того, как должен выглядеть ответ прогноза."""
    return {
        "city": "Москва",
        "days": [
            {"day": "Пн", "temp": -3, "condition": "❄️ Снег"},
            {"day": "Вт", "temp": 1,  "condition": "⛅ Облачно"},
            {"day": "Ср", "temp": 4,  "condition": "🌤 Переменная облачность"},
        ]
    }


# ══════════════════════════════════════════════════════════════
# ЗАДАНИЕ: допиши GET /forecast/
#
# Эндпоинт принимает Query-параметры:
#   city: str  — название города (обязательный)
#   days: int  — кол-во дней (от 1 до 7, по умолчанию 3)
#
# Что нужно сделать:
# 1. Объяви функцию с Query-параметрами:
#       def get_forecast(city: str, days: int = Query(default=3, ge=1, le=7)):
#
# 2. Проверь, что город существует — найди его в cities.db:
#       from routers.cities import db as cities_db
#    Если город не найден — верни HTTPException(404, "Город не найден")
#
# 3. Сгенерируй список прогнозов на `days` дней:
#    - день недели: DAY_NAMES[i % 7]
#    - температура: random.randint(-15, 35)
#    - погода: random.choice(WEATHER_CONDITIONS)
#
# 4. Верни JSON:
#    {
#       "city": "Москва",
#       "days": [
#          { "day": "Пн", "temp": 5, "condition": "☀️ Ясно" },
#          ...
#       ]
#    }
#
# Подсказка — примерная структура:
#
# @router.get("/")
# def get_forecast(city: str, days: int = Query(default=3, ge=1, le=7)):
#     # найти город в cities_db...
#     # сгенерировать прогноз...
#     # вернуть результат
# ══════════════════════════════════════════════════════════════
