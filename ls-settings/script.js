// ── Ключ в localStorage ──────────────────────────────────────
const STORAGE_KEY = 'ls-settings';

// ── Настройки по умолчанию ────────────────────────────────────
const DEFAULTS = {
  username: '',
  theme:    'light',
  fontSize: 16,
};

// ── Элементы DOM ─────────────────────────────────────────────
const usernameInput = document.getElementById('username-input');
const themeSelect   = document.getElementById('theme-select');
const fontRange     = document.getElementById('font-range');
const fontValue     = document.getElementById('font-value');
const saveBtn       = document.getElementById('save-btn');
const resetBtn      = document.getElementById('reset-btn');
const statusMsg     = document.getElementById('status-msg');
const previewName   = document.getElementById('preview-name');
const previewText   = document.getElementById('preview-text');

// ── Работа с хранилищем ──────────────────────────────────────

function loadSettings() {
  const raw = localStorage.getItem(STORAGE_KEY);
  // Если настройки есть — разбираем JSON, иначе берём defaults
  return raw ? { ...DEFAULTS, ...JSON.parse(raw) } : { ...DEFAULTS };
}

function saveSettings(settings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

// ── Применить настройки к странице ───────────────────────────

function applySettings(settings) {
  const { username, theme, fontSize } = settings;

  // Тема: переключаем классы на body
  document.body.classList.remove('dark', 'sepia');
  if (theme !== 'light') document.body.classList.add(theme);

  // Размер шрифта: меняем CSS-переменную / напрямую style
  previewText.style.fontSize = `${fontSize}px`;

  // Превью имени
  previewName.textContent = username || 'гость';
}

// ── Заполнить форму из объекта настроек ──────────────────────

function fillForm(settings) {
  usernameInput.value    = settings.username;
  themeSelect.value      = settings.theme;
  fontRange.value        = settings.fontSize;
  fontValue.textContent  = `${settings.fontSize}px`;
}

// ── Показать статус ───────────────────────────────────────────

function showStatus(msg, color = '#2ecc71') {
  statusMsg.textContent  = msg;
  statusMsg.style.color  = color;
  setTimeout(() => { statusMsg.textContent = ''; }, 2000);
}

// ── Обработчики ───────────────────────────────────────────────

// Живое обновление лейбла ползунка
fontRange.addEventListener('input', () => {
  fontValue.textContent = `${fontRange.value}px`;
  previewText.style.fontSize = `${fontRange.value}px`;
});

// Живой предпросмотр темы
themeSelect.addEventListener('change', () => {
  const tmp = loadSettings();
  tmp.theme = themeSelect.value;
  applySettings(tmp);
});

// Сохранить
saveBtn.addEventListener('click', () => {
  const settings = {
    username: usernameInput.value.trim(),
    theme:    themeSelect.value,
    fontSize: Number(fontRange.value),
  };

  saveSettings(settings);   // setItem — сохраняем в localStorage
  applySettings(settings);
  showStatus('✅ Настройки сохранены!');
});

// Сбросить
resetBtn.addEventListener('click', () => {
  localStorage.removeItem(STORAGE_KEY); // removeItem — удаляем ключ
  fillForm(DEFAULTS);
  applySettings(DEFAULTS);
  showStatus('🔄 Настройки сброшены', '#e67e22');
});

// ── Инициализация — загрузить и применить при старте ──────────
const initial = loadSettings();  // getItem + JSON.parse
fillForm(initial);
applySettings(initial);
