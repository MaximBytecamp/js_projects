const numA = document.getElementById('numA');
const numB = document.getElementById('numB');
const result = document.getElementById('result');
const opBtns = document.querySelectorAll('.op-btn');

let selectedOp = null;

// Highlight active operation button
opBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    opBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedOp = btn.dataset.op;
    calculate();
  });
});

// Recalculate whenever a number changes
[numA, numB].forEach(input => {
  input.addEventListener('input', calculate);
});

function calculate() {
  const a = parseFloat(numA.value);
  const b = parseFloat(numB.value);

  if (!selectedOp) {
    result.textContent = 'Выберите операцию';
    result.classList.remove('error');
    return;
  }

  if (isNaN(a) || isNaN(b)) {
    result.textContent = 'Введите оба числа';
    result.classList.remove('error');
    return;
  }

  let res;

  if (selectedOp === '+') res = a + b;
  else if (selectedOp === '−') res = a - b;
  else if (selectedOp === '×') res = a * b;
  else if (selectedOp === '÷') {
    if (b === 0) {
      result.textContent = 'Делить на ноль нельзя';
      result.classList.add('error');
      return;
    }
    res = a / b;
  }

  result.classList.remove('error');

  // Round floating-point noise: show up to 10 significant digits
  result.textContent = `${a} ${selectedOp} ${b} = ${parseFloat(res.toPrecision(10))}`;
}
