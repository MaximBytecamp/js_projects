const phrases = [
  // Мотивация
  'Маленький шаг сегодня — большой результат завтра.',
  'Сделай сначала просто, потом сделай хорошо.',
  'Регулярность сильнее вдохновения.',

  // Шутка
  'Работает? Не трогай. Не работает? Тоже не трогай — вдруг само починится.',
  'Если баг не воспроизводится — это фича окружения.',
  'Переименовал переменную — почувствовал себя архитектором.',

  // Совет программисту
  'Разбей задачу на маленькие шаги и сделай первый прямо сейчас.',
  'Сначала напиши понятное решение, оптимизацию оставь на потом.',
  'Если что-то странно — проверь, что ты сохранил файл.',
];

const phraseEl = document.getElementById('phrase');
const generateBtn = document.getElementById('generateBtn');

function getRandomItem(items) {
  const index = Math.floor(Math.random() * items.length);
  return items[index];
}

function generate() {
  phraseEl.textContent = getRandomItem(phrases);
}

generateBtn.addEventListener('click', generate);
