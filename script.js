const screen = document.querySelector('#screen');
let active = [];
let targetVal = 0;
let operator = '';

function getInput(e){
    let inputValue = e.target.innerText;
    console.log("INPUT: " + inputValue);

    if(Number.isInteger(inputValue*1)){
        updateDisplay(inputValue);
    } else if (inputValue === '.') {
        updateDisplay(inputValue);
    } else if (inputValue === '=') {
        screen.textContent = operate(operator, targetVal, active.join(''));
        operator = '';
    } else if (inputValue === 'AC') {
        active = [];
        targetVal = 0;
        updateDisplay();
    } else if(inputValue === 'Back') {
        let temp = active.pop();
        console.log(active);
        updateDisplay();
    } else {
        setOperator(inputValue);
    }
}

function updateDisplay(inputValue) {
    active.push(inputValue);
    screen.textContent = active.join('');
}

function setOperator(inputValue){
    operator = inputValue;
    if(active.length >= 1){
        targetVal = active.join('') * 1;
        active = [];
        updateDisplay();
    }
}

function operate(operator, a = 0, b = 0){
    a = a * 1;
    b = b * 1;
    let c = 0;
    active = [];
    switch(operator){
        case "+":
            c = a + b;
            break;
        case "-":
            c = a - b;
            break;
        case "*":
            c = a * b;
            break;
        case "/":
            if(b !== 0) {
                c = a / b;
                
            } else {
                c =  "Cannot divide by zero."
            }
            break;
        default:
            return a;
    }
    targetVal = c;
    return c;
}

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('click', getInput));

function logKey(e){
    console.log(e.keyCode);
}

window.addEventListener('keydown', logKey);