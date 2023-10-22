function chooseOperation(num1, operator, num2) {
    let result = 0;
    switch(operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            result = num1 / num2;
            break;
    };
    return result;
};

function calculate(numberArray, operatorArray) {
    let result = 0;
    if(numberArray.length < 3) return numberArray[0];
    let operand1 = 0;
    let operand2 = 0;
    let operator = '+';
    let nextMDIndex = operatorArray.findIndex(operator => operator === '*' || operator === '/');
    let nextASIndex = operatorArray.findIndex(operator => operator === '+' || operator === '-');
    if(nextMDIndex > -1) {
        operator = operatorArray[nextMDIndex];
        operatorArray.splice(nextMDIndex, 1);
        operand1 = +numberArray[nextMDIndex];
        numberArray.splice((nextMDIndex), 1);
        operand2 = +numberArray[nextMDIndex];
        numberArray[nextMDIndex] = chooseOperation(operand1, operator, operand2);
    } else {
        operator = operatorArray[nextASIndex];
        operatorArray.splice(nextASIndex, 1);
        operand1 = +numberArray[nextASIndex];
        numberArray.splice((nextASIndex), 1);
        operand2 = +numberArray[nextASIndex];
        numberArray[nextASIndex] = chooseOperation(operand1, operator, operand2);
    }
    result = calculate(numberArray, operatorArray);
    return result;
}

function parsedisplay(equation) {
    let numbersArray = equation.split(/[^0-9\.]/g);
    let operatorsArray = equation.split(/[0-9\.]/g);
    let newArray = [];
    for( let i = 0; i < operatorsArray.length; i++) {
        if(operatorsArray[i] !== '') newArray.push(operatorsArray[i]);
    }
    return calculate(numbersArray, newArray);
    // console.log(numbersArray, newArray);
    // return numbersArray;
}


let display = '';

let textBox = document.querySelector('.textBox');
let button = document.querySelector('.buttons');
button.addEventListener('mouseup', (event) => {
    display += event.target.textContent;
    if(event.target.textContent === 'Clear') display = '';
    if(event.target.textContent === 'Backspace') display = display.substring(0, display.length - 10);
    if(event.target.textContent === '=') display = parsedisplay(display);
    textBox.textContent = display;
});


