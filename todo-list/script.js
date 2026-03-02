// Массив для хранения задач
let todos = [];

const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const doneCount = document.getElementById('done-count');

function renderTodos() {
    list.innerHTML = '';
    let done = 0;
    todos.forEach((todo, idx) => {
        const li = document.createElement('li');
        li.className = 'todo-item';

        const span = document.createElement('span');
        span.className = 'todo-text' + (todo.done ? ' done' : '');
        span.textContent = todo.text;
        span.onclick = () => {
            todos[idx].done = !todos[idx].done;
            renderTodos();
        };
        if (todo.done) done++;

        const delBtn = document.createElement('button');
        delBtn.className = 'delete-btn';
        delBtn.innerHTML = '✕';
        delBtn.onclick = () => {
            todos.splice(idx, 1);
            renderTodos();
        };

        li.appendChild(span);
        li.appendChild(delBtn);
        list.appendChild(li);
    });
    doneCount.textContent = done;
}

form.onsubmit = function(e) {
    e.preventDefault();
    const value = input.value.trim();
    if (value) {
        todos.push({ text: value, done: false });
        input.value = '';
        renderTodos();
    }
};

renderTodos();
