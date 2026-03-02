const body = document.body;
const toggleBtn = document.getElementById('toggleBtn');
const themeLabel = document.getElementById('themeLabel');


const saved = localStorage.getItem('theme') || 'light';
applyTheme(saved);

toggleBtn.addEventListener('click', () => {
  const next = body.classList.contains('dark') ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('theme', next);
});

function applyTheme(theme) {
  if (theme === 'dark') {
    body.classList.add('dark');
    themeLabel.textContent = '🌙 Тёмная';
  } else {
    body.classList.remove('dark');
    themeLabel.textContent = '☀️ Светлая';
  }
}
