const API = 'http://localhost:8000/api';

const pageAuth    = document.getElementById('page-auth');
const pageCabinet = document.getElementById('page-cabinet');

function showAuth()    { pageAuth.classList.remove('hidden'); pageCabinet.classList.add('hidden'); }
function showCabinet() { pageCabinet.classList.remove('hidden'); pageAuth.classList.add('hidden'); }

async function apiFetch(path, options = {}) {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(API + path, { ...options, headers });

  if (res.status === 401) { logout(); return null; }

  return res;
}

document.querySelectorAll('.tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');

    const tab = btn.dataset.tab;
    document.getElementById('login-form').classList.toggle('hidden',    tab !== 'login');
    document.getElementById('register-form').classList.toggle('hidden', tab !== 'register');
  });
});

document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('reg-username').value.trim();
  const email    = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;

  clearMessages('reg-error', 'reg-success');

  if (!username || !email || !password) {
    return setError('reg-error', 'Заполни все поля');
  }

  const res = await fetch(`${API}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await res.json();

  if (!res.ok) return setError('reg-error', data.detail || 'Ошибка регистрации');

  setSuccess('reg-success', '✅ Регистрация успешна! Войди в аккаунт.');

  setTimeout(() => {
    document.querySelector('[data-tab="login"]').click();
    document.getElementById('login-username').value = username;
  }, 1200);
});

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value;

  clearMessages('login-error');

  if (!username || !password) return setError('login-error', 'Заполни все поля');

  const formData = new URLSearchParams();
  formData.append('username', username);
  formData.append('password', password);

  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) return setError('login-error', data.detail || 'Неверный логин или пароль');

  localStorage.setItem('token', data.access_token);
  await loadCabinet();
});

async function loadCabinet() {
  const res = await apiFetch('/me');
  if (!res) return;

  const user = await res.json();

  document.getElementById('cab-id').textContent       = user.id;
  document.getElementById('cab-username').textContent = user.username;
  document.getElementById('cab-email').textContent    = user.email;
  document.getElementById('cab-created').textContent  = new Date(user.created_at).toLocaleString('ru');

  showCabinet();
}

document.getElementById('update-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const newUsername = document.getElementById('new-username').value.trim();
  clearMessages('update-error', 'update-success');

  if (!newUsername) return setError('update-error', 'Введи новый логин');

  const res = await apiFetch('/me', {
    method: 'PATCH',
    body: JSON.stringify({ username: newUsername }),
  });

  if (!res || !res.ok) {
    const data = await res?.json();
    return setError('update-error', data?.detail || 'Ошибка обновления');
  }

  setSuccess('update-success', '✅ Логин обновлён');
  document.getElementById('new-username').value = '';
  await loadCabinet();  
});

document.getElementById('logout-btn').addEventListener('click', logout);

function logout() {
  localStorage.removeItem('token');
  showAuth();
}

function setError(id, msg)   { document.getElementById(id).textContent = msg; }
function setSuccess(id, msg) { document.getElementById(id).textContent = msg; }
function clearMessages(...ids) { ids.forEach(id => { document.getElementById(id).textContent = ''; }); }

(async () => {
  const token = localStorage.getItem('token');
  if (token) {
    await loadCabinet();
  } else {
    showAuth();
  }
})();
