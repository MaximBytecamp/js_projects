const API = window.location.origin + '/api';

// ── универсальный fetch ──────────────────────────────────────
async function api(path, options = {}) {
  const res = await fetch(API + path, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (res.status === 204) return null;
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || 'Ошибка');
  return data;
}

// ════════════════════════════════════════════════════════════════
// КНИГИ — полный CRUD (образец для студентов)
// ════════════════════════════════════════════════════════════════
const booksList  = document.getElementById('books-list');
const booksForm  = document.getElementById('books-form');
const booksError = document.getElementById('books-error');

async function loadBooks() {
  const books = await api('/books/');
  booksList.innerHTML = '';
  books.forEach(({ id, title, author }) => {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = `${title} — ${author}`;

    const del = document.createElement('button');
    del.className = 'del-btn';
    del.textContent = '✕';
    del.addEventListener('click', async () => {
      await api(`/books/${id}`, { method: 'DELETE' });
      await loadBooks();
    });

    li.append(span, del);
    booksList.append(li);
  });
}

booksForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  booksError.textContent = '';
  const title  = document.getElementById('book-title').value;
  const author = document.getElementById('book-author').value;
  try {
    await api('/books/', {
      method: 'POST',
      body: JSON.stringify({ title, author }),
    });
    booksForm.reset();
    await loadBooks();
  } catch (err) {
    booksError.textContent = err.message;
  }
});

// ════════════════════════════════════════════════════════════════
// АВТОРЫ — только GET (студенты допишут POST и DELETE)
// ════════════════════════════════════════════════════════════════
const authorsList = document.getElementById('authors-list');

async function loadAuthors() {
  const authors = await api('/authors/');
  authorsList.innerHTML = '';
  authors.forEach(({ id, name }) => {
    const li = document.createElement('li');
    li.textContent = name;
    // ЗАДАНИЕ: добавь кнопку удаления по аналогии с книгами выше
    authorsList.append(li);
  });
}

// ЗАДАНИЕ: найди закомментированную форму в index.html,
// раскомментируй её и напиши обработчик submit по аналогии
// с booksForm выше. Не забудь добавить POST-роут на бэкенде!

// ── Загрузка при старте ──────────────────────────────────────
loadBooks();
loadAuthors();
