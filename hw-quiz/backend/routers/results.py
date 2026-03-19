"""Роутер РЕЗУЛЬТАТОВ — НЕПОЛНЫЙ.
Студент дописывает POST для проверки ответа и GET для статистики.

Задание отличается от предыдущих: здесь нужно не просто сохранить,
а проверить ответ и вернуть результат { correct: true/false, right_answer: ... }"""

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/results", tags=["results"])

# Хранилище результатов: { question_id, user_answer, is_correct }
history: list[dict] = []


class AnswerIn(BaseModel):
    question_id: int
    answer: int  # индекс выбранного варианта (0-based)


# ── GET /results/stats — статистика (готово) ─────────────────
@router.get("/stats")
def get_stats():
    """Возвращает общую статистику: всего ответов, правильных, процент"""
    total = len(history)
    correct = sum(1 for h in history if h["is_correct"])
    return {
        "total": total,
        "correct": correct,
        "percent": round(correct / total * 100) if total else 0,
    }


# ══════════════════════════════════════════════════════════════
# ЗАДАНИЕ: допиши POST /results/check
#
# Что нужно сделать:
# 1. Принять AnswerIn (question_id и answer)
# 2. Найти правильный ответ — используй функцию из questions.py:
#       from routers.questions import get_correct_answer
# 3. Если вопрос не найден — вернуть HTTPException(404)
# 4. Сравнить answer с правильным ответом
# 5. Сохранить результат в history:
#       { "question_id": ..., "user_answer": ..., "is_correct": True/False }
# 6. Вернуть JSON:
#       { "correct": True/False, "right_answer": <индекс правильного> }
#
# Подсказка — примерная структура:
#
# @router.post("/check")
# def check_answer(body: AnswerIn):
#     right = get_correct_answer(body.question_id)
#     ...
# ══════════════════════════════════════════════════════════════
