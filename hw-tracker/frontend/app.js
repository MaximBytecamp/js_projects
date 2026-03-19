const API = "/api";

/* ═══════════════════════════════════════
   ЗАДАЧИ  — полный пример (GET, POST, DELETE)
   ═══════════════════════════════════════ */

const taskList  = document.getElementById("task-list");
const taskForm  = document.getElementById("task-form");
const taskTitle = document.getElementById("task-title");

async function loadTasks() {
  const res  = await fetch(`${API}/tasks/`);
  const data = await res.json();
  taskList.innerHTML = "";

  data.forEach((t) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = t.title;
    if (t.done) span.classList.add("done");

    const btn = document.createElement("button");
    btn.textContent = "✕";
    btn.addEventListener("click", () => deleteTask(t.id));

    li.append(span, btn);
    taskList.append(li);
  });
}

taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  await fetch(`${API}/tasks/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: taskTitle.value.trim() }),
  });
  taskForm.reset();
  loadTasks();
});

async function deleteTask(id) {
  await fetch(`${API}/tasks/${id}`, { method: "DELETE" });
  loadTasks();
}

/* ═══════════════════════════════════════
   ТЕГИ  — только GET (остальное — задание)
   ═══════════════════════════════════════ */

const tagList = document.getElementById("tag-list");

async function loadTags() {
  const res  = await fetch(`${API}/tags/`);
  const data = await res.json();
  tagList.innerHTML = "";

  data.forEach((tag) => {
    const li = document.createElement("li");

    const dot = document.createElement("span");
    dot.className = "tag-color";
    dot.style.background = tag.color;

    const name = document.createElement("span");
    name.textContent = tag.name;

    li.append(dot, name);
    // ЗАДАНИЕ: добавь кнопку «✕» для удаления тега
    tagList.append(li);
  });
}

// ══════════════════════════════════════════════════════════════
// ЗАДАНИЕ:
// 1. Раскомментируй форму в index.html
// 2. Получи элементы формы (getElementById)
// 3. Повесь обработчик submit → отправь POST на /api/tags/
//    с полями { name, color }
// 4. Добавь кнопку удаления в loadTags → отправь DELETE
// 5. Не забудь дописать POST и DELETE в backend/routers/tags.py
// ══════════════════════════════════════════════════════════════

/* ── Загрузка при старте ── */
loadTasks();
loadTags();
