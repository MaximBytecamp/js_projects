const POMODORO_SECONDS = 25 * 60;

let seconds = 0;
let intervalId = null;

const secondsValueEl = document.getElementById('secondsValue');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');

function setRunning(isRunning) {
  startBtn.disabled = isRunning;
  stopBtn.disabled = !isRunning;
}

function render() {
  secondsValueEl.textContent = String(seconds);
}

function start() {
  if (intervalId !== null) return;

  intervalId = window.setInterval(() => {
    seconds += 1;
    render();

    if (seconds >= POMODORO_SECONDS) {
      stop();
      alert('25 минут прошло!');
    }
  }, 1000);

  setRunning(true);
}

function stop() {
  if (intervalId === null) return;

  window.clearInterval(intervalId);
  intervalId = null;
  setRunning(false);
}

startBtn.addEventListener('click', start);
stopBtn.addEventListener('click', stop);

setRunning(false);
render();
