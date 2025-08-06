const form = document.getElementById('card-form')
const thankYou = document.querySelector('aside')

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

cardNameInput.addEventListener('input', (e) => {
  cardNameDisplay.textContent = e.target.value || 'Jane Appleseed'
})

cardNumberInput.addEventListener('input', (e) => {
  cardNumberDisplay.textContent = e.target.value || '0000 0000 0000 0000'
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
  thankYou.classList.remove('hidden')
})


