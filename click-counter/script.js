let value = 0;

const counterValueEl = document.getElementById('counterValue');
const plusBtn = document.getElementById('plusBtn');
const minusBtn = document.getElementById('minusBtn');
const resetBtn = document.getElementById('resetBtn');

function render() {
  counterValueEl.textContent = String(value);
}

plusBtn.addEventListener('click', () => {
  value += 1;
  render();
});

minusBtn.addEventListener('click', () => {
  value -= 1;
  render();
});

resetBtn.addEventListener('click', () => {
  value = 0;
  render();
});

render();
