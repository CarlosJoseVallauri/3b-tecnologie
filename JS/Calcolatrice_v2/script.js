"use strict";

let screen;
let firstOperand = "";
let secondOperand = "";
let currentOperator;
let operationNum = 0;
let operators;

window.onload = () => {
    window.onkeydown = (event) => 
    {
        let newEvent =
        {
            target: {
                value: event.key
            }
        }

        let key = event.key;

        if(isDigit(key)){
            btnNumPress(newEvent);
        }
        else if(isOper(key)){
            btnOperatorPress(newEvent);
        }
        else if(key == "=" || key == "Enter"){
            btnCalcolaPress();
        }
        else if(key == "Backspace" && screen.value != "0" && screen.value != "")        {
            screen.value = screen.value.substring(0, screen.value.length - 1);

            if(screen.value == ""){
                screen.value = "0";
            }

            firstOperand = "";
        }
        else if(key == "C" || key == "c" || key == "Delete"){
            clearScreen();
        }
    };
    
    screen = document.querySelector("input[type=text]");

    screen.value = 0;

    let inputs = document.querySelectorAll('input[type=button]');
    let nums = [...inputs].filter((elem) => elem.name == "btnNum");
    operators = [...inputs].filter((elem) => elem.name == "btnOperatore");
    let clear = [...inputs].filter((elem) => elem.id == "btnClear")[0];
    let equal = [...inputs].filter((elem) => elem.id == "btnCalcola")[0];
    
    nums.forEach((elem) => {
        elem.addEventListener("click", btnNumPress);
    })

    operators.forEach((elem) => {
        elem.addEventListener("click", btnOperatorPress);
    })

    clear.addEventListener("click", clearScreen);
    equal.addEventListener("click", btnCalcolaPress);
}

function clearScreen()
{
    screen.value = "0";
    firstOperand = "";
    secondOperand = "";
    currentOperator = null;
    operationNum = 0;
    enableControls(true);
}

function isDigit(char)
{
    return char >= "0" && char <= "9" || char == ".";
}

function isOper(char)
{
    let opers = ["+", "-", "*", "/"];

    return opers.includes(char);
}

function btnNumPress(event)
{
    if(screen.value == "0" && event.target.value == '0') // TODO: Handle 0 press on showing result
    {
        screen.value = "0";
        return;
    }

    if(!currentOperator)
    {
        firstOperand += event.target.value;
        screen.value = firstOperand;
    }
    else
    {
        secondOperand += event.target.value;
        screen.value = secondOperand;
    }

    enableControls(true);
}

function btnOperatorPress(event)
{
    operationNum = 0;
    secondOperand = "";
    currentOperator = event.target.value;
    screen.value = "";
}

function btnCalcolaPress()
{
    operationNum++;

    if(firstOperand == ""){
        firstOperand = "0";
    }

    let n1 = parseFloat(firstOperand);
    let n2 = parseFloat(secondOperand);

    switch(currentOperator)
    {
        case '+':
            screen.value = n1 + n2;
            break;
        case '-':
            screen.value = n1 - n2;
            break;
        case '*':
            screen.value = n1 * n2;
            break;
        case '/':
            if(n2 == 0)
            {
                screen.value = "Divisione per 0";
                firstOperand = "";
                currentOperator = null;
                enableControls(false);

                return;
            }
            screen.value = n1 / n2;
    
            break;
    }

    if(currentOperator != '-' && currentOperator != '/'){
        if(firstOperand == "0"){
            secondOperand = screen.value;
        }
    }

    firstOperand = screen.value;
}

function enableControls(flag)
{
    operators.forEach((elem) => {
        elem.disabled = !flag;
    });
}