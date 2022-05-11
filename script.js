const screen = document.querySelector('#screen');
let active = 0;
let targetVal = 0;
let operator = '';
let toDisplay = '0';

function getInput(e){
    let inputValue = e.target.innerText;
    if(Number.isInteger(inputValue*1) || inputValue === '.'){
        if(toDisplay === '0' && inputValue !== '.') toDisplay = '';
        if(toDisplay.includes('.') && inputValue === '.') inputValue = '';
        toDisplay += inputValue;
        if(inputValue === '.') {
            active = toDisplay.slice(0, -1) * 1;
        } else {        
            active = toDisplay * 1;
        }
        updateDisplay(toDisplay);
    } else if (inputValue === "Back") {
        toDisplay = toDisplay.slice(0, -1);
        if(toDisplay === ''){
            toDisplay = '0';
        }
        active = toDisplay * 1;
        updateDisplay(active);
    } else if('+/*-'.includes(inputValue)){
        setOperator(inputValue);
    } else if(inputValue === '='){
        calculate();
    } else if(inputValue === 'AC'){
        active = 0;
        targetVal = 0;
        operator = '';
        toDisplay = '0';
        updateDisplay(targetVal);
    }
}

function updateDisplay(displayValue){
    if(toDisplay.length >= 10){
        toDisplay = displayValue.toPrecision(12).toString();
    } else {
        toDisplay = displayValue.toString();
    }
    screen.textContent = toDisplay;
}

function add(a, b){ return a + b;}

function subtract(a, b){ return a - b;}

function multiply(a, b){ return a * b; }

function divide(a, b){ 
    return a / b; 
}

function calculate(){
    switch(operator){
        case '+':
            targetVal = add(targetVal, active);
            break;
        case '-':
            targetVal = subtract(targetVal, active);
            break;
        case '*':
            targetVal = multiply(targetVal, active);
            break;
        case '/':
            if(active === 0){
                alert("You can't divide by 0, you fool.")
                updateDisplay(active);
                //screen.textContent = "ERROR#DIV/0";
                return;
            } else {
                targetVal = divide(targetVal, active);
            }
            break;
    }
    if(targetVal === 0) targetVal = active;
    active = 0;
    updateDisplay(targetVal);
}

function setOperator(op){
    if(active !== 0) {
        calculate();
    }
    operator = op;
    if(toDisplay != '0'){
        targetVal = toDisplay * 1;
        toDisplay = '0';
    }
    updateDisplay(toDisplay);
}


const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('click', getInput));

function logKey(e){
    console.log(e.keyCode);
}

window.addEventListener('keydown', logKey);

setOperator();