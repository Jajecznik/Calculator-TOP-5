const mainDisplay = document.querySelector('.main');
const secondaryDisplay = document.querySelector('.secondary');
const clearBtn = document.querySelector('.clear');
const deleteBtn = document.querySelector('.delete');
const equalBtn = document.querySelector('.equal');
const decimalBtn = document.querySelector('.decimal');
const operators = document.querySelectorAll('.operator');
const numbers = document.querySelectorAll('.number');

let operator = null;
let firstNumber = 0;
let secondNumber = null;
let toClear = false;

document.addEventListener('keydown', (event) => {
    if (event.key >= 0 && event.key <= 9) numberClick(event.key);
    else if (event.key === "+" || event.key === "-" || event.key === "*" || event.key === "/") operatorClick(event.key);
    else if (event.key === ".") decimalClick();
    else if (event.key === "=") equalClick();
    else if (event.key === "Backspace") deleteClick();
    else if (event.key === "Delete") clearDisplays();
    else event.preventDefault();
});

clearBtn.addEventListener('click', () => clearDisplays());
deleteBtn.addEventListener('click', () => deleteClick());
equalBtn.addEventListener('click', () => equalClick());
decimalBtn.addEventListener('click', () => decimalClick());

operators.forEach(operation => {
    operation.addEventListener('click', () => operatorClick(operation.innerText));
});

numbers.forEach(number => {
    number.addEventListener('click', () => numberClick(number.innerText));
});


// clearing calculator - restore default values
function clearDisplays() {
    mainDisplay.innerText = "0";
    secondaryDisplay.innerText = "";
    operator = null;
    firstNumber = 0;
    secondNumber = null;
    toClear = false;
}

// delete button logic 
function deleteClick() {
    if (firstNumber !== null && operator === null && !toClear) {
        firstNumber = firstNumber.toString().slice(0, -1);
        if (firstNumber.toString().length == 0) firstNumber = 0;
        mainDisplay.innerText = firstNumber;
    } else if (secondNumber !== null) {
        secondNumber = secondNumber.toString().slice(0, -1);
        if (secondNumber.toString().length == 0) secondNumber = 0;
        mainDisplay.innerText = secondNumber;
    }
}

// equal button logic
function equalClick() {
    if (secondNumber !== null) {
        operate(operator, firstNumber, secondNumber);
        toClear = true;
    }
}

// decimal numbers
function decimalClick() {
    if (operator !== null && secondNumber === null) {
        secondNumber = "0.";
        mainDisplay.innerText = secondNumber;
    } else if (operator !== null && secondNumber !== null && !secondNumber.toString().includes('.')) {
        secondNumber = `${secondNumber}.`;
        mainDisplay.innerText = secondNumber;
    } else if (toClear && firstNumber !== null && secondNumber === null) {
        toClear = false;
        firstNumber = "0.";
        mainDisplay.innerText = firstNumber;
    } else if (firstNumber !== null && !firstNumber.toString().includes('.') && secondNumber === null) {
        firstNumber = `${firstNumber}.`;
        mainDisplay.innerText = firstNumber;
    }
}

// user operator input
function operatorClick(operation) {
    if (operator !== null && firstNumber !== null && secondNumber !== null) {
        operate(operator, firstNumber, secondNumber);

        if (mainDisplay.innerText !== "Cannot divide by zero!") {
            operator = operation;
            mainDisplay.innerText = firstNumber;
            secondaryDisplay.innerText = `${firstNumber} ${operator}`;
        }
    } else if (firstNumber !== null) {
        operator = operation;
        mainDisplay.innerText = firstNumber;
        secondaryDisplay.innerText = `${firstNumber} ${operator}`;
    }
}

// checking to which number append digit now
function numberClick(number) {
    if (operator !== null) secondNumber = userInput(number, secondNumber);
    else {
        if (toClear) {
            secondaryDisplay.innerText = "";
            firstNumber = number;
            mainDisplay.innerText = firstNumber;
            toClear = false;
        } else {
            firstNumber = userInput(number, firstNumber);
        }
    }
}

// append digit to number
function userInput(number, displayNumber) {
    if (displayNumber !== null) {
        if (displayNumber.toString() === "0") displayNumber = number;
        else displayNumber += number;
    } else {
        displayNumber = number;
    }

    mainDisplay.innerText = displayNumber;
    return displayNumber;
}

// select proper operator
function operate(operation, firstNum, secondNum) {
    firstNumber = parseFloat(firstNum);
    secondNumber = parseFloat(secondNum);
    let result = null;

    switch (operation) {
        case '+':
            result = add(firstNumber, secondNumber);
            break;
        case '-':
            result = subtract(firstNumber, secondNumber);
            break;
        case '*':
            result = multiply(firstNumber, secondNumber);
            break;
        case '/':
            result = divide(firstNumber, secondNumber);
            break;
    }

    if (result !== false) {
        result = Math.round(result * 1000000) / 1000000;
        mainDisplay.innerText = result;
        secondaryDisplay.innerText = `${firstNumber} ${operator} ${secondNumber} =`;
        firstNumber = result;
    } else {
        mainDisplay.innerText = "Cannot divide by zero!";
    }

    secondNumber = null;
    operator = null;
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b !== 0) {
        return a / b;
    } else {
        return false;
    }
}
