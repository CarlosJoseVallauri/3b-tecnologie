"use strict";

let screen;
let lastNumber = "";
let currentOperator;
let operationNum = 0;
let operators;

window.onload = () => {
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

    clear.addEventListener("click", () => { 
        screen.value = "0";
        lastNumber = "";
        currentOperator = null;
        operationNum = 0;
    });

    equal.addEventListener("click", btnCalcolaPress);
}

function btnNumPress(event)
{
    if(screen.value == "0" && event.target.value == '0')
    {
        screen.value = "0";
        return;
    }

    if(!currentOperator)
    {
        lastNumber += event.target.value;
        screen.value = lastNumber;
    }
    else
    {
        screen.value += event.target.value;
    }

    enableControls(true);
}

function btnOperatorPress(event)
{
    currentOperator = event.target.value;
    screen.value = "";
    operationNum = 0;
}

function btnCalcolaPress()
{
    operationNum++;
    let n1 = parseFloat(lastNumber);
    let n2 = parseFloat(screen.value);

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

            if(operationNum == 1){
                lastNumber = n2;
            }

            return;
        case '/':

            if(n2 == 0)
            {
                screen.value = "Divisione per 0";
                lastNumber = "";
                currentOperator = null;
                enableControls(false);

                return;
            }
            screen.value = n1 / n2;
            
            if(operationNum == 1){
                lastNumber = n2;
            }
            return;
    }

    lastNumber = screen.value;
}

function enableControls(flag)
{
    operators.forEach((elem) => {
        elem.disabled = !flag;
    });
}