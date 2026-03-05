// ── Ключ в localStorage ──────────────────────────────────────
const STORAGE_KEY = 'ls-notes';

// ── Элементы DOM ─────────────────────────────────────────────
const form     = document.getElementById('note-form');
const input    = document.getElementById('note-input');
const list     = document.getElementById('note-list');
const clearBtn = document.getElementById('clear-btn');

// ── Работа с хранилищем ──────────────────────────────────────

/** Загружает массив заметок из localStorage */
function loadNotes() {
  const raw = localStorage.getItem(STORAGE_KEY);
  // getItem возвращает строку или null
  // JSON.parse превращает строку обратно в массив
  return raw ? JSON.parse(raw) : [];
}

/** Сохраняет массив заметок в localStorage */
function saveNotes(notes) {
  // JSON.stringify превращает массив в строку для хранения
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

// ── Рендер ───────────────────────────────────────────────────

function render() {
  const notes = loadNotes();
  list.innerHTML = '';

  notes.forEach((text, index) => {
    const li = document.createElement('li');
    li.className = 'note-item';

    const span = document.createElement('span');
    span.className = 'note-text';
    span.textContent = text;

    const delBtn = document.createElement('button');
    delBtn.className = 'del-btn';
    delBtn.textContent = '✕';
    delBtn.setAttribute('aria-label', 'Удалить заметку');
    delBtn.addEventListener('click', () => deleteNote(index));

    li.append(span, delBtn);
    list.append(li);
  });
}

// ── Добавить заметку ─────────────────────────────────────────

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const text = input.value.trim();
  if (!text) return;

  const notes = loadNotes();
  notes.push(text);          // добавляем в массив
  saveNotes(notes);          // сохраняем в localStorage
  render();                  // перерисовываем список

  input.value = '';
  input.focus();
});

// ── Удалить одну заметку ─────────────────────────────────────

function deleteNote(index) {
  const notes = loadNotes();
  notes.splice(index, 1);   // удаляем элемент по индексу
  saveNotes(notes);
  render();
}

// ── Очистить все ─────────────────────────────────────────────

clearBtn.addEventListener('click', () => {
  if (!confirm('Удалить все заметки?')) return;
  localStorage.removeItem(STORAGE_KEY); // removeItem удаляет ключ полностью
  render();
});

// ── Инициализация ─────────────────────────────────────────────
render(); // при загрузке страницы восстанавливаем заметки из localStorage
