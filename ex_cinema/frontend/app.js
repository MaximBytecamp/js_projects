const API = "/api";


const movieList  = document.getElementById("movie-list");
const movieForm  = document.getElementById("movie-form");
const movieTitle = document.getElementById("movie-title");
const movieGenre = document.getElementById("movie-genre");
const movieYear  = document.getElementById("movie-year");

async function loadMovies() {
  try {
    const res  = await fetch(`${API}/movies/`);
    const data = await res.json();
    movieList.innerHTML = "";

    data.forEach((m) => {
      const li = document.createElement("li");

      const info = document.createElement("div");
      info.className = "info";
      info.innerHTML = `
        <span class="title">${m.title}</span>
        <div class="meta">${m.genre} · ${m.year}</div>
      `;

      const btn = document.createElement("button");
      btn.textContent = "✕";
      btn.addEventListener("click", () => deleteMovie(m.id));

      li.append(info, btn);
      movieList.append(li);
    });

    // Обновить выпадающие списки фильмов (для сеансов)
    updateMovieSelects(data);
  } catch (err) {
    movieList.innerHTML = "<li style='color:red'>❌ Ошибка загрузки. Запущен ли сервер?</li>";
    console.error("loadMovies error:", err);
  }
}

movieForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  await fetch(`${API}/movies/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: movieTitle.value.trim(),
      genre: movieGenre.value.trim(),
      year:  Number(movieYear.value),
    }),
  });
  movieForm.reset();
  loadMovies();
});

async function deleteMovie(id) {
  await fetch(`${API}/movies/${id}`, { method: "DELETE" });
  loadMovies();
  loadSessions();  // сеансы тоже могут измениться
}

/** Заполнить <select> фильмами (для формы и фильтра сеансов) */
function updateMovieSelects(movies) {
  const filterSelect = document.getElementById("filter-movie");

  // Фильтр
  const currentFilter = filterSelect.value;
  filterSelect.innerHTML = '<option value="">Все сеансы</option>';
  movies.forEach((m) => {
    const opt = document.createElement("option");
    opt.value = m.id;
    opt.textContent = m.title;
    filterSelect.append(opt);
  });
  filterSelect.value = currentFilter;

  // Форма добавления сеанса (если раскомментирована)
  const sessionMovie = document.getElementById("session-movie");
  if (sessionMovie) {
    const currentVal = sessionMovie.value;
    sessionMovie.innerHTML = '<option value="">Выбери фильм...</option>';
    movies.forEach((m) => {
      const opt = document.createElement("option");
      opt.value = m.id;
      opt.textContent = m.title;
      sessionMovie.append(opt);
    });
    sessionMovie.value = currentVal;
  }
}

/* ═══════════════════════════════════════
   СЕАНСЫ  — задание студента
   ═══════════════════════════════════════ */

const sessionList  = document.getElementById("session-list");
const filterMovie  = document.getElementById("filter-movie");

// Фильтр — при смене загружаем сеансы заново
filterMovie.addEventListener("change", () => loadSessions());

async function loadSessions() {
  // ══════════════════════════════════════════════════════════════
  // ЗАДАНИЕ — loadSessions:
  //
  // 1. Определи URL для запроса:
  //    - если filterMovie.value не пустой:
  //        `${API}/sessions/?movie_id=${filterMovie.value}`
  //    - иначе: `${API}/sessions/`
  //
  // 2. Сделай fetch и получи массив сеансов
  //
  // 3. Для каждого сеанса создай карточку:
  //    <div class="session-card">
  //      <div class="session-info">
  //        <div class="session-time">18:00</div>
  //        <div class="session-meta">Фильм ID: 1 · 450 ₽ · 50 мест</div>
  //      </div>
  //      <button>✕</button>  ← вызывает deleteSession(session.id)
  //    </div>
  //    и добавь в sessionList
  //
  // 4. При ошибке — покажи сообщение в sessionList
  //
  // Подсказка — посмотри как сделана loadMovies()
  // ══════════════════════════════════════════════════════════════

  sessionList.innerHTML = "<p style='color:#f5c518'>⏳ Допиши loadSessions и бэкенд</p>";
}

async function deleteSession(id) {
  // ЗАДАНИЕ: отправь DELETE на /api/sessions/${id} и вызови loadSessions()
}

// ══════════════════════════════════════════════════════════════
// ЗАДАНИЕ — форма добавления сеанса:
//
// 1. Раскомментируй форму в index.html
// 2. Получи элементы: session-movie, session-time, session-price, session-seats
// 3. Повесь обработчик submit:
//    - собери данные: movie_id (Number!), time, price (Number!), seats (Number!)
//    - отправь POST на /api/sessions/
//    - после успеха: сброс формы + loadSessions()
//
// Подсказка — посмотри movieForm.addEventListener выше
// ══════════════════════════════════════════════════════════════

/* ── Старт ── */
loadMovies();
loadSessions();
