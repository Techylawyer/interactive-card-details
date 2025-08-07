const form = document.getElementById('card-form')
const thankYou = document.querySelector('aside')
const continueBtn = document.getElementById('continue-btn')

const cardNameInput = document.getElementById('card-name')
const cardNumberInput = document.getElementById('card-number')
const cardMonthInput = document.getElementById('expiry-month')
const cardYearInput = document.getElementById('expiry-year')
const cardCVCInput = document.getElementById('card-cvc')

const inputElementsArray = [
  cardNameInput,
  cardNumberInput,
  cardMonthInput,
  cardYearInput,
  cardCVCInput,
]
console.log(inputElementsArray)

const cardNameDisplay = document.getElementById('card-name-img')
const cardNumberDisplay = document.getElementById('card-number-img')
const expiryMonthDisplay = document.getElementById('card-month-img')
const expiryYearDisplay = document.getElementById('card-year-img')
const cardCVCDisplay = document.getElementById('card-cvc-img')

function formatCardNumber(value) {
  return value
    .replace(/\D/g, '')
    .substring(0, 16)
    .replace(/(.{4})/g, '$1 ')
    .trim()
}

function showError(input, message) {
  const error = input.nextElementSibling

  error.textContent = message
  input.classList.add('error-border')
}

function clearError(input) {
  const error = input.nextElementSibling
  error.textContent = ''
  input.classList.remove('error-border')
}

function isValidName(name) {
  const parts = name.trim().split(/\s+/)
  if (parts.length < 2) return false
  return parts.every((part) => /^[A-Za-z]+$/.test(part))
}

function isValidCardNumber(number) {
  if (/[A-Za-z]/.test(number)) return 'Wrong format, numbers only'
  if (!/^\d{4} \d{4} \d{4} \d{4}$/.test(number)) return 'Must be 16 digits'
  return true
}

function isValidMonth(month) {
  if (!month.trim()) return "Can't be blank"
  if (+month < 1 || +month > 12) return 'Must be between 1 and 12'
  return true
}

function isValidYear(year) {
  const currentYear = new Date().getFullYear() % 100

  if (!year.trim()) return "Can't be blank"
  if (!/^\d{2}$/.test(year)) return 'Must be 2 digits'
  if (+year < currentYear) return "Year can't be in the past"
  return true
}

function isValidCVC(cvc) {
  if (!cvc.trim()) return "Can't be blank"
  if (!/^\d{3}$/.test(cvc)) return 'Must be 3 digits'
  return true
}

function isFutureDate(month, year) {
  const now = new Date()
  const currentMonth = now.getMonth() + 1
  const currentYear = now.getFullYear() % 100

  const inputMonth = parseInt(month, 10)
  const inputYear = parseInt(year, 10)

  if (
    inputYear < currentYear ||
    (inputYear === currentYear && inputMonth < currentMonth)
  ) {
    return false
  }

  return true
}

cardNameInput.addEventListener('input', (e) => {
  cardNameDisplay.textContent = e.target.value || 'Jane Appleseed'
})

cardNumberInput.addEventListener('input', (e) => {
  const input = e.target
  let cursorPosition = input.selectionStart
  let formattedValue = formatCardNumber(input.value)

  const prevSpacesBeforeCursor = (
    input.value.slice(0, cursorPosition).match(/ /g) || []
  ).length

  const cursorRawPosition = cursorPosition - prevSpacesBeforeCursor

  let newCursorPosition = cursorRawPosition
  newCursorPosition += Math.floor(cursorRawPosition / 4)

  input.value = formattedValue

  input.setSelectionRange(newCursorPosition, newCursorPosition)

  cardNumberDisplay.textContent = formattedValue || '0000 0000 0000 0000'
})

cardCVCInput.addEventListener('input', (e) => {
  cardCVCDisplay.textContent = e.target.value || '000'
})

cardMonthInput.addEventListener('input', (e) => {
  let value = e.target.value.replace(/\D/g, '')

  e.target.value = value
  expiryMonthDisplay.textContent = value || '00'
})

cardMonthInput.addEventListener('blur', (e) => {
  let value = e.target.value
  if (value.length === 1) {
    value = '0' + value
    e.target.value = value
    expiryMonthDisplay.textContent = value
  }
})

cardYearInput.addEventListener('input', (e) => {
  expiryYearDisplay.textContent = e.target.value || '00'
})

form.addEventListener('submit', (e) => {
  e.preventDefault()
  inputElementsArray.forEach(clearError)

  let isValid = true

  if (!isValidName(cardNameInput.value)) {
    showError(cardNameInput, 'Please enter a valid name')
    isValid = false
  }

  const cardNumberValidation = isValidCardNumber(cardNumberInput.value.trim())
  if (cardNumberValidation !== true) {
    showError(cardNumberInput, cardNumberValidation)
    isValid = false
  }

  const monthValidation = isValidMonth(cardMonthInput.value)
  if (monthValidation !== true) {
    showError(cardMonthInput, monthValidation)
    isValid = false
  }

  const yearValidation = isValidYear(cardYearInput.value)
  if (yearValidation !== true) {
    showError(cardYearInput, yearValidation)
    isValid = false
  }

  if (monthValidation === true && yearValidation === true) {
    if (!isFutureDate(cardMonthInput.value, cardYearInput.value)) {
      showError(cardMonthInput, 'Card has expired')
      showError(cardYearInput, '')
      isValid = false
    }
  }

  const cvcValidation = isValidCVC(cardCVCInput.value)
  if (cvcValidation !== true) {
    showError(cardCVCInput, cvcValidation)
    isValid = false
  }

  if (isValid) {
    form.style.display = 'none'
    thankYou.classList.remove('hidden')
  }
})

continueBtn?.addEventListener('click', () => {
  form.reset()
  thankYou.classList.add('hidden')
  form.style.display = 'flex'

  cardNameDisplay.textContent = 'Jane Appleseed'
  cardNumberDisplay.textContent = '0000 0000 0000 0000'
  expiryMonthDisplay.textContent = '00'
  expiryYearDisplay.textContent = '00'
  cardCVCDisplay.textContent = '000'

  inputElementsArray.forEach(clearError)
})
