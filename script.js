// DOM Elements

const calulatorDisplay = document.querySelector('h1')
const inputBtns = document.querySelectorAll('button')
const clearBtn = document.getElementById('clear-btn')

let firstValue = 0
let operatorValue = ''
let awaitingNextValue = false




 
// Calculate first and second values
const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
    '=': (firstNumber, secondNumber) => secondNumber,
}






// Update Number Display
function sendNumberValue(number) {
     // Replace current display value if first value is entered
     if (awaitingNextValue) {
         calulatorDisplay.textContent = number
         awaitingNextValue = false
     } else {
        // If current display value is 0, replace it, else add number
        const displayValue = calulatorDisplay.textContent
        calulatorDisplay.textContent = displayValue === '0' ? number : displayValue + number
     }
}

// Use an Operator
function useOperator(operator) {
    // Prevent multiple operators pressed
    if (operatorValue && awaitingNextValue) {
        operatorValue = operator
        return
    }

    const currentValue = Number(calulatorDisplay.textContent)

    // Assign as firstValue if there's none
    if (!firstValue) {
        firstValue = currentValue
    } else {
        const result = calculate[operatorValue](firstValue, currentValue)
        calulatorDisplay.textContent = result
        firstValue = result
    }

    // Ready for next value, store operator
    awaitingNextValue = true

    operatorValue = operator
}

// Add a Decimal Point
function addDecimal() {
    // If operator pressed, don't add decimal
    if (awaitingNextValue) return

    // If no decimal, add one
    if (!calulatorDisplay.textContent.includes('.')) {
        calulatorDisplay.textContent = `${calulatorDisplay.textContent}.`
    }
}

// Reset Display and All Values
function resetAll() {
    calulatorDisplay.textContent = '0'
    firstValue = 0
    operatorValue = ''
    awaitingNextValue = false
}






// Event Listeners
clearBtn.addEventListener('click', resetAll)

// Add Event Listeners for numbers, operators, decimal buttons
inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.length === 0) {
        // Number Button
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value))
    } else if (inputBtn.classList.contains('operator')) {
        // Operator Button
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value))
    } else if (inputBtn.classList.contains('decimal')) {
        // Decimal Button
        inputBtn.addEventListener('click', () => addDecimal())
    }
}) 