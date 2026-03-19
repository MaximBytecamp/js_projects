const API = "/api";

/* ═══════════════════════════════════════
   КНИГИ  — полный пример (GET, POST, DELETE)
   ═══════════════════════════════════════ */

const booksList = document.getElementById("books-list");
const booksForm = document.getElementById("books-form");

async function loadBooks() {
  const res = await fetch(`${API}/books/`);
  const data = await res.json();
  booksList.innerHTML = "";

  data.forEach((b) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = `${b.title} — ${b.author}`;

    const btn = document.createElement("button");
    btn.className = "del-btn";
    btn.textContent = "✕";
    btn.addEventListener("click", () => deleteBook(b.id));

    li.append(span, btn);
    booksList.append(li);
  });
}

booksForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("book-title").value.trim();
  const author = document.getElementById("book-author").value.trim();
  await fetch(`${API}/books/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, author }),
  });
  booksForm.reset();
  loadBooks();
});

async function deleteBook(id) {
  await fetch(`${API}/books/${id}`, { method: "DELETE" });
  loadBooks();
}

/* ═══════════════════════════════════════
   АВТОРЫ  — только GET (остальное — задание)
   ═══════════════════════════════════════ */

const authorsList = document.getElementById("authors-list");

async function loadAuthors() {
  const res = await fetch(`${API}/authors/`);
  const data = await res.json();
  authorsList.innerHTML = "";

  data.forEach((a) => {
    const li = document.createElement("li");
    li.textContent = a.name;
    // ЗАДАНИЕ: добавь кнопку «✕» для удаления автора
    authorsList.append(li);
  });
}

// ══════════════════════════════════════════════════════════════
// ЗАДАНИЕ:
// 1. Раскомментируй форму в index.html
// 2. Получи элементы формы (getElementById)
// 3. Повесь обработчик submit → отправь POST на /api/authors/
// 4. Добавь кнопку удаления в loadAuthors → отправь DELETE
// 5. Не забудь дописать POST и DELETE в backend/routers/authors.py
// ══════════════════════════════════════════════════════════════

// ── Загрузка при старте ──────────────────────────────────────
loadBooks();
loadAuthors();
