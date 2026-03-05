// ── Ключ в localStorage ──────────────────────────────────────
const STORAGE_KEY = 'ls-vocabulary';

// ── Элементы DOM ─────────────────────────────────────────────
const form        = document.getElementById('word-form');
const wordInput   = document.getElementById('word-input');
const transInput  = document.getElementById('trans-input');
const searchInput = document.getElementById('search-input');
const tbody       = document.getElementById('word-tbody');
const emptyMsg    = document.getElementById('empty-msg');

// ── Работа с хранилищем ──────────────────────────────────────

/** Массив объектов [{ word, translation }, …] */
function loadWords() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveWords(words) {
  // Сохраняем массив объектов — JSON.stringify умеет сериализовывать объекты
  localStorage.setItem(STORAGE_KEY, JSON.stringify(words));
}

// ── Рендер ───────────────────────────────────────────────────

function render(filter = '') {
  let words = loadWords();

  // Фильтрация: если задан поисковый запрос, оставляем совпадения
  if (filter) {
    const q = filter.toLowerCase();
    words = words.filter(
      ({ word, translation }) =>
        word.toLowerCase().includes(q) || translation.toLowerCase().includes(q)
    );
  }

  tbody.innerHTML = '';
  emptyMsg.hidden = words.length > 0;

  words.forEach(({ word, translation }, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${word}</td>
      <td>${translation}</td>
      <td>
        <button class="btn btn-icon" data-index="${index}" aria-label="Удалить">✕</button>
      </td>
    `;
    tbody.append(tr);
  });
}

// ── Добавить слово ────────────────────────────────────────────

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const word        = wordInput.value.trim();
  const translation = transInput.value.trim();
  if (!word || !translation) return;

  const words = loadWords();
  words.push({ word, translation }); // сохраняем объект в массив
  saveWords(words);
  render(searchInput.value);

  wordInput.value  = '';
  transInput.value = '';
  wordInput.focus();
});

// ── Удалить слово ────────────────────────────────────────────

// Делегирование: один обработчик на всю таблицу
tbody.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-icon');
  if (!btn) return;

  const index = Number(btn.dataset.index);
  const words = loadWords();
  words.splice(index, 1);
  saveWords(words);
  render(searchInput.value);
});

// ── Поиск ────────────────────────────────────────────────────

searchInput.addEventListener('input', () => {
  render(searchInput.value);
});

// ── Инициализация ─────────────────────────────────────────────
render();
