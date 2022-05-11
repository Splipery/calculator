const screen = document.querySelector('#screen');
let active = 0;
let targetVal = 0;
let operator = '';
let toDisplay = '0';

function getInput(e){
    let inputValue = e.target.innerText;
    if(Number.isInteger(inputValue*1) || inputValue === '.'){
        if(toDisplay === '0') toDisplay = '';
        if(toDisplay.includes('.') && inputValue === '.') inputValue = '';

        toDisplay += inputValue;
        active = toDisplay * 1;
        updateDisplay(active);
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
    if(toDisplay.length >= 12){
        toDisplay = displayValue.toPrecision(12).toString();
    } else {
        toDisplay = displayValue.toString();
    }
    screen.textContent = toDisplay;
}

function calculate(){
    switch(operator){
        case '+':
            targetVal = targetVal + active;
            break;
        case '-':
            targetVal = targetVal - active;
            break;
        case '*':
            targetVal = targetVal * active;
            break;
        case '/':
            if(active === 0){
                screen.textContent = "ERROR#DIV/0";
                return;
            } else {
                targetVal = targetVal / active;
            }
            break;
    }
    if(targetVal === 0) targetVal = active;
    updateDisplay(targetVal);
}

function setOperator(op){
    operator = op;
    if(toDisplay != '0'){
        targetVal = toDisplay * 1;
        toDisplay = '0';
    }
    updateDisplay(toDisplay);
    active = 0;
}


const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('click', getInput));

function logKey(e){
    console.log(e.keyCode);
}

window.addEventListener('keydown', logKey);

setOperator();