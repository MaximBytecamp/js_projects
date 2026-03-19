const API = "/api";

/* ═══════════════════════════════════════
   ЗАГРУЗКА ВОПРОСОВ — готово
   ═══════════════════════════════════════ */

let questions = [];
let currentIndex = 0;

const questionText = document.getElementById("question-text");
const optionsDiv   = document.getElementById("options");
const currentNum   = document.getElementById("current-num");
const totalNum     = document.getElementById("total-num");
const feedback     = document.getElementById("feedback");
const nextBtn      = document.getElementById("next-btn");

// Статистика
const statTotal   = document.getElementById("stat-total");
const statCorrect = document.getElementById("stat-correct");
const statPercent = document.getElementById("stat-percent");

async function loadQuestions() {
  const res = await fetch(`${API}/questions/`);
  questions = await res.json();
  totalNum.textContent = questions.length;
  showQuestion();
}

function showQuestion() {
  if (currentIndex >= questions.length) {
    questionText.textContent = "🎉 Викторина завершена!";
    optionsDiv.innerHTML = "";
    feedback.classList.add("hidden");
    nextBtn.classList.add("hidden");
    return;
  }

  const q = questions[currentIndex];
  currentNum.textContent = currentIndex + 1;
  questionText.textContent = q.text;
  feedback.classList.add("hidden");
  nextBtn.classList.add("hidden");
  optionsDiv.innerHTML = "";

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = opt;
    btn.addEventListener("click", () => handleAnswer(q.id, i, btn));
    optionsDiv.append(btn);
  });
}

/* ═══════════════════════════════════════
   ОБРАБОТКА ОТВЕТА  — задание студента
   ═══════════════════════════════════════ */

async function handleAnswer(questionId, answerIndex, clickedBtn) {
  // Заблокировать все кнопки, чтобы нельзя было ответить дважды
  document.querySelectorAll(".option-btn").forEach((b) => (b.disabled = true));
  clickedBtn.classList.add("selected");

  // ══════════════════════════════════════════════════════════════
  // ЗАДАНИЕ:
  // 1. Отправь POST на /api/results/check
  //    с телом JSON: { question_id: questionId, answer: answerIndex }
  //
  // 2. Получи ответ от сервера: { correct: true/false, right_answer: <число> }
  //
  // 3. Если correct === true:
  //    - добавь clickedBtn класс «correct»
  //    - покажи feedback: «✅ Правильно!» с классом «correct-fb»
  //
  // 4. Если correct === false:
  //    - добавь clickedBtn класс «wrong»
  //    - найди кнопку правильного варианта и добавь ей класс «correct»
  //      (подсказка: optionsDiv.children[right_answer])
  //    - покажи feedback: «❌ Неправильно!» с классом «wrong-fb»
  //
  // 5. Покажи кнопку «Следующий вопрос» (убери класс hidden у nextBtn)
  // 6. Обнови статистику — вызови loadStats()
  //
  // Пример отправки POST (замени ... на реальные данные):
  //
  // const res = await fetch(`${API}/results/check`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ question_id: ..., answer: ... }),
  // });
  // const data = await res.json();
  // ══════════════════════════════════════════════════════════════

  // Пока задание не сделано — просто показываем «далее»
  feedback.textContent = "⏳ Допиши POST /api/results/check, чтобы проверка заработала";
  feedback.className = "feedback wrong-fb";
  nextBtn.classList.remove("hidden");
}

/* Кнопка «Следующий вопрос» — готово */
nextBtn.addEventListener("click", () => {
  currentIndex++;
  showQuestion();
});

/* ═══════════════════════════════════════
   СТАТИСТИКА  — готово (GET /api/results/stats)
   ═══════════════════════════════════════ */

async function loadStats() {
  try {
    const res = await fetch(`${API}/results/stats`);
    const data = await res.json();
    statTotal.textContent   = data.total;
    statCorrect.textContent = data.correct;
    statPercent.textContent  = data.percent + "%";
  } catch {
    // stats ещё не работает — ок
  }
}

/* ── Старт ── */
loadQuestions();
loadStats();
