const API = "/api";

const usernameInput = document.getElementById("username");

/* ═══════════════════════════════════════
   КОМНАТЫ  — GET готов, остальное — задание
   ═══════════════════════════════════════ */

const roomList   = document.getElementById("room-list");
const roomTitle  = document.getElementById("room-title");
const roomMembers = document.getElementById("room-members");

let currentRoom = "general";

async function loadRooms() {
  const res  = await fetch(`${API}/rooms/`);
  const data = await res.json();
  roomList.innerHTML = "";

  data.forEach((r) => {
    const btn = document.createElement("button");
    btn.className = "room-btn" + (r.name === currentRoom ? " active" : "");
    btn.textContent = `# ${r.name}`;
    btn.addEventListener("click", () => {
      currentRoom = r.name;
      loadRooms();      // обновить подсветку
      loadMessages();   // загрузить сообщения комнаты

      // Показать участников
      roomTitle.textContent = r.name;
      roomMembers.textContent = r.members.length
        ? `👥 ${r.members.join(", ")}`
        : "";
    });

    // Авто-показать участников текущей комнаты
    if (r.name === currentRoom) {
      roomTitle.textContent = r.name;
      roomMembers.textContent = r.members.length
        ? `👥 ${r.members.join(", ")}`
        : "";
    }

    roomList.append(btn);
  });
}

// ══════════════════════════════════════════════════════════════
// ЗАДАНИЕ 1: Создание комнаты (POST /api/rooms/)
//
// 1. Раскомментируй форму #room-form в index.html
// 2. Получи элементы формы:
//      const roomForm = document.getElementById("room-form");
//      const roomNameInput = document.getElementById("room-name");
//
// 3. Добавь обработчик submit:
//      roomForm.addEventListener("submit", async (e) => {
//        e.preventDefault();
//        await fetch(`${API}/rooms/`, {
//          method: "POST",
//          headers: { "Content-Type": "application/json" },
//          body: JSON.stringify({ name: roomNameInput.value.trim() }),
//        });
//        roomForm.reset();
//        loadRooms();
//      });
//
// 4. Не забудь дописать POST в backend/routers/rooms.py
// ══════════════════════════════════════════════════════════════

// ══════════════════════════════════════════════════════════════
// ЗАДАНИЕ 2: Присоединение к комнате (PUT /api/rooms/{id}/join)
//
// Это более сложная задача! Добавь кнопку «Войти» рядом с каждой
// комнатой в loadRooms(). При клике:
//
//   await fetch(`${API}/rooms/${r.id}/join`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ username: usernameInput.value.trim() }),
//   });
//   loadRooms();
//
// Не забудь дописать PUT в backend/routers/rooms.py
// ══════════════════════════════════════════════════════════════

/* ═══════════════════════════════════════
   СООБЩЕНИЯ  — полностью готово (GET / POST)
   ═══════════════════════════════════════ */

const messagesDiv = document.getElementById("messages");
const msgForm     = document.getElementById("msg-form");
const msgText     = document.getElementById("msg-text");

async function loadMessages() {
  const res  = await fetch(`${API}/messages/?room=${encodeURIComponent(currentRoom)}`);
  const data = await res.json();
  messagesDiv.innerHTML = "";

  const myName = usernameInput.value.trim();

  data.forEach((m) => {
    const div = document.createElement("div");
    div.className = "msg " + (m.author === myName ? "mine" : "other");

    const author = document.createElement("div");
    author.className = "author";
    author.textContent = m.author;

    const text = document.createElement("div");
    text.textContent = m.text;

    const time = document.createElement("div");
    time.className = "time";
    time.textContent = m.time;

    div.append(author, text, time);
    messagesDiv.append(div);
  });

  // Прокрутить вниз
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

msgForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const author = usernameInput.value.trim() || "Аноним";
  await fetch(`${API}/messages/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      room: currentRoom,
      author: author,
      text: msgText.value.trim(),
    }),
  });
  msgForm.reset();
  loadMessages();
});

/* ── Старт ── */
loadRooms();
loadMessages();
