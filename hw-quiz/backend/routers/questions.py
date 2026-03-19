"""Роутер ВОПРОСОВ — ГОТОВ.
Отдаёт список вопросов с вариантами ответов.
Правильный ответ хранится, но НЕ отдаётся на фронтенд."""

from fastapi import APIRouter

router = APIRouter(prefix="/questions", tags=["questions"])

# База вопросов (correct — индекс правильного ответа, 0-based)
db: list[dict] = [
    {
        "id": 1,
        "text": "Какой HTTP-метод используется для создания ресурса?",
        "options": ["GET", "POST", "DELETE", "PATCH"],
        "correct": 1,
    },
    {
        "id": 2,
        "text": "Что возвращает fetch() в JavaScript?",
        "options": ["String", "JSON", "Promise", "Array"],
        "correct": 2,
    },
    {
        "id": 3,
        "text": "Какой статус-код означает «Не найдено»?",
        "options": ["200", "301", "404", "500"],
        "correct": 2,
    },
    {
        "id": 4,
        "text": "Как объявить переменную, которую нельзя переназначить?",
        "options": ["var", "let", "const", "def"],
        "correct": 2,
    },
    {
        "id": 5,
        "text": "Какой тег используется для заголовка страницы в HTML?",
        "options": ["<header>", "<head>", "<title>", "<h1>"],
        "correct": 2,
    },
]


@router.get("/")
def get_questions():
    """Возвращает вопросы БЕЗ правильных ответов"""
    safe = []
    for q in db:
        safe.append({
            "id": q["id"],
            "text": q["text"],
            "options": q["options"],
        })
    return safe


def get_correct_answer(question_id: int) -> int | None:
    """Вспомогательная функция — вернуть correct для вопроса"""
    for q in db:
        if q["id"] == question_id:
            return q["correct"]
    return None
