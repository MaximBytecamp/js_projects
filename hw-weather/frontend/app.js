const API = "/api";

/* ═══════════════════════════════════════
   ГОРОДА — готово (GET /api/cities/)
   ═══════════════════════════════════════ */

const cityButtons   = document.getElementById("city-buttons");
const forecastInfo   = document.getElementById("forecast-info");
const forecastCards  = document.getElementById("forecast-cards");
const sampleOutput   = document.getElementById("sample-output");

let selectedCity = null;

async function loadCities() {
  try {
    const res  = await fetch(`${API}/cities/`);
    const data = await res.json();
    cityButtons.innerHTML = "";

    data.forEach((city) => {
      const btn = document.createElement("button");
      btn.className = "city-btn";
      btn.textContent = city.name;
      btn.addEventListener("click", () => {
        // Подсветить выбранную кнопку
        document.querySelectorAll(".city-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        selectedCity = city.name;
        loadForecast(city.name);
      });
      cityButtons.append(btn);
    });
  } catch (err) {
    cityButtons.innerHTML = "<p style='color:red'>❌ Ошибка загрузки. Проверь, запущен ли сервер (uvicorn main:app --reload)</p>";
    console.error("loadCities error:", err);
  }
}

/* ═══════════════════════════════════════
   ПРОГНОЗ — задание студента
   ═══════════════════════════════════════ */

async function loadForecast(cityName) {
  // ══════════════════════════════════════════════════════════════
  // ЗАДАНИЕ:
  // 1. Отправь GET на /api/forecast/?city=<cityName>&days=5
  //    Подсказка: используй шаблонные строки:
  //      `${API}/forecast/?city=${encodeURIComponent(cityName)}&days=5`
  //
  // 2. Получи JSON ответ: { city: "Москва", days: [ {day, temp, condition}, ... ] }
  //
  // 3. Покажи название города:
  //      forecastInfo.innerHTML = `<h3>Прогноз для ${data.city}</h3>`;
  //
  // 4. Для каждого дня создай карточку:
  //      <div class="day-card">
  //        <div class="day-name">Пн</div>
  //        <div class="temp">+5°</div>
  //        <div class="condition">☀️ Ясно</div>
  //      </div>
  //    и добавь в forecastCards
  //
  // 5. Не забудь: temp может быть отрицательной!
  //    Для отображения: temp > 0 → "+5°", иначе → "-3°"
  //
  // Пример:
  //
  // const res = await fetch(`${API}/forecast/?city=${encodeURIComponent(cityName)}&days=5`);
  // if (!res.ok) { forecastInfo.innerHTML = "<p>❌ Ошибка запроса</p>"; return; }
  // const data = await res.json();
  // forecastCards.innerHTML = "";
  // data.days.forEach(d => {
  //   const card = document.createElement("div");
  //   card.className = "day-card";
  //   card.innerHTML = `
  //     <div class="day-name">${d.day}</div>
  //     <div class="temp">${d.temp > 0 ? "+" : ""}${d.temp}°</div>
  //     <div class="condition">${d.condition}</div>
  //   `;
  //   forecastCards.append(card);
  // });
  // ══════════════════════════════════════════════════════════════

  // Пока задание не сделано — заглушка
  forecastInfo.innerHTML = `<p>⏳ Допиши GET /api/forecast/ на бэкенде и fetch в app.js</p>`;
  forecastCards.innerHTML = "";
}

/* ═══════════════════════════════════════
   ПРИМЕР — загрузка образца (готово)
   ═══════════════════════════════════════ */

async function loadSample() {
  try {
    const res  = await fetch(`${API}/forecast/sample`);
    const data = await res.json();
    sampleOutput.textContent = JSON.stringify(data, null, 2);
  } catch {
    sampleOutput.textContent = "Не удалось загрузить пример";
  }
}

/* ── Старт ── */
loadCities();
loadSample();
