// ============================================================
// Самостоятельная работа: Генератор пароля
// ============================================================
// Задание:
//   Реализуй логику генератора пароля.
//   HTML и CSS уже готовы — тебе нужно написать JS.
//
// Что нужно сделать:
//   1. При клике на «Сгенерировать» (#generate-btn):
//      a. Считай длину из #length-input (число от 4 до 32)
//      b. Собери набор допустимых символов:
//         - строчные буквы всегда: 'abcdefghijklmnopqrstuvwxyz'
//         - если #use-upper отмечен → добавь 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
//         - если #use-digits отмечен → добавь '0123456789'
//         - если #use-symbols отмечен → добавь '!@#$%^&*'
//      c. Сгенерируй строку нужной длины (Math.random + индекс)
//      d. Помести результат в #password-output
//
//   2. При клике на кнопку копирования (#copy-btn):
//      - скопируй текст из #password-output в буфер
//        (navigator.clipboard.writeText)
//      - покажи сообщение «Скопировано!» в #copy-status
//      - через 2 секунды очисти его
//
// Подсказки:
//   - checkbox.checked — true/false
//   - Math.floor(Math.random() * chars.length)
//   - output.textContent = password
//   - navigator.clipboard.writeText(text).then(() => { … })
//   - setTimeout(() => { … }, 2000)
// ============================================================

// Шаг 1. Найди нужные элементы
const generateBtn    = /* твой код */;
const copyBtn        = /* твой код */;
const lengthInput    = /* твой код */;
const useUpper       = /* твой код */;
const useDigits      = /* твой код */;
const useSymbols     = /* твой код */;
const passwordOutput = /* твой код */;
const copyStatus     = /* твой код */;

// Шаг 2. Функция генерации пароля — возвращает строку
function generatePassword() {
  // твой код
}

// Шаг 3. Обработчик кнопки «Сгенерировать»
// твой код

// Шаг 4. Обработчик кнопки копирования
// твой код
