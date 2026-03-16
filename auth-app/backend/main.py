from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import os

from database import init_db, get_connection
from auth import hash_password, verify_password, create_access_token, decode_token

app = FastAPI(title="Auth App")
init_db()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

frontend_path = os.path.join(os.path.dirname(__file__), "..", "frontend")
app.mount("/app", StaticFiles(directory=frontend_path, html=True), name="frontend")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")


class RegisterRequest(BaseModel):
    username: str
    email: str
    password: str


class UserOut(BaseModel):
    id: int
    username: str
    email: str
    created_at: str


def get_current_user(token: str = Depends(oauth2_scheme)) -> dict:
    payload = decode_token(token)
    if not payload:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Недействительный токен")
    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Нет sub в токене")

    with get_connection() as conn:
        row = conn.execute("SELECT * FROM users WHERE id = ?", (int(user_id),)).fetchone()
    if not row:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Пользователь не найден")
    return dict(row)


@app.post("/api/auth/register", status_code=201)
def register(body: RegisterRequest):
    if len(body.password) < 6:
        raise HTTPException(status_code=400, detail="Пароль должен быть не короче 6 символов")

    hashed = hash_password(body.password)
    try:
        with get_connection() as conn:
            conn.execute(
                "INSERT INTO users (username, email, hashed_password) VALUES (?, ?, ?)",
                (body.username.strip(), body.email.lower().strip(), hashed),
            )
            conn.commit()
    except Exception:
        raise HTTPException(status_code=400, detail="Логин или email уже заняты")

    return {"ok": True, "message": "Регистрация успешна"}


@app.post("/api/auth/login")
def login(form: OAuth2PasswordRequestForm = Depends()):
    with get_connection() as conn:
        row = conn.execute(
            "SELECT * FROM users WHERE username = ?", (form.username,)
        ).fetchone()

    if not row or not verify_password(form.password, row["hashed_password"]):
        raise HTTPException(status_code=400, detail="Неверный логин или пароль")

    token = create_access_token({"sub": str(row["id"])})
    return {"access_token": token, "token_type": "bearer"}


@app.get("/api/me", response_model=UserOut)
def me(user: dict = Depends(get_current_user)):
    return user


@app.patch("/api/me")
def update_me(body: dict, user: dict = Depends(get_current_user)):
    new_username = (body.get("username") or "").strip()
    if not new_username:
        raise HTTPException(status_code=400, detail="Имя не может быть пустым")

    try:
        with get_connection() as conn:
            conn.execute(
                "UPDATE users SET username = ? WHERE id = ?",
                (new_username, user["id"]),
            )
            conn.commit()
    except Exception:
        raise HTTPException(status_code=400, detail="Имя уже занято")

    return {"ok": True}
