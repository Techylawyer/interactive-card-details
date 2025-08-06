const form = document.getElementById('card-form')
const thankYou = document.querySelector('aside')
const continueBtn = document.getElementById('continue-btn')

const cardNameInput = document.getElementById('card-name')
const cardNumberInput = document.getElementById('card-number')
const cardMonthInput = document.getElementById('expiry-month')
const cardYearInput = document.getElementById('expiry-year')
const cardCVCInput = document.getElementById('card-cvc')

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

function formatCardNumber(value) {
  return value.replace(/\D/g, '').substring(0, 16).replace(/(.{4})/g, '$1 ').trim();
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
  return /^[A-Za-z ]+$/.test(name.trim())
}

function isValidCardNumber(number) {
  return /^\d{4} \d{4} \d{4} \d{4}$/.test(number)
}

function isValidMonth(month) {
  return /^\d{2}$/.test(month) && +month >= 1 && +month <= 12
}

function isValidYear(year) {
  return /^\d{2}$/.test(year)
}

function isValidCVC(cvc) {
  return /^\d{3}$/.test(cvc)
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
  form.style.display = 'none'
//   form.classList.add('hidden')
  thankYou.classList.remove('hidden')
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
    
})


