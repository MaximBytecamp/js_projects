const generateBtn = document.getElementById('generateBtn');
const colorBox = document.getElementById('colorBox');
const hexValue = document.getElementById('hexValue');

function randomHex() {
  const hex = Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, '0');
  return `#${hex}`;
}

function generate() {
  const color = randomHex();
  document.body.style.background = color;
  colorBox.style.background = color;
  hexValue.textContent = color.toUpperCase();
}

generateBtn.addEventListener('click', generate);

generate();
