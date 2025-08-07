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
    .substring(0, 16)
    .replace(/(.{4})/g, '$1 ')
    .trim()
}

function showError(input, message) {
  const error = input.nextElementSibling
  console.log(error)
  console.log(input)
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
  if (!/^\d{2}$/.test(month)) return 'Must be 2 digits'
  if (+month < 1 || +month > 12) return 'Must be between 01 and 12'
  return true
}

function isValidYear(year) {
  if (!year.trim()) return "Can't be blank"
  if (!/^\d{2}$/.test(year)) return 'Must be 2 digits'
  return true
}

function isValidCVC(cvc) {
  if (!cvc.trim()) return "Can't be blank"
  if (!/^\d{3}$/.test(cvc)) return 'Must be 3 digits'
  return true
}

cardNameInput.addEventListener('input', (e) => {
  cardNameDisplay.textContent = e.target.value || 'Jane Appleseed'
})

cardNumberInput.addEventListener('input', (e) => {
  const formatted = formatCardNumber(e.target.value)
  e.target.value = formatted
  cardNumberDisplay.textContent = formatted || '0000 0000 0000 0000'
})

cardCVCInput.addEventListener('input', (e) => {
  cardCVCDisplay.textContent = e.target.value || '000'
})

cardMonthInput.addEventListener('input', (e) => {
  expiryMonthDisplay.textContent = e.target.value || '00'
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
