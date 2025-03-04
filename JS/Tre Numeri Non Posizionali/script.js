"use strict";

let txts = document.getElementsByName("txtN");
let chks = document.getElementsByName("chkN");
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let combAI = [];

for(let i = 0; i < 3; i++)
{
    let r = Random(1, numbers.length - 1);

    combAI[i] = numbers[r];
    numbers.splice(r, 1);
}


function Random(min, max)
{
    return Math.floor((max - min) * Math.random()) + min;    
}

function controlla()
{
    if(!checkTexts())
    {
        alert("Tutti le caselle devono essere piene e contenere numeri diversi");
        return;
    }

    for(let i = 0; i < chks.length; i++)
    {
        chks[i].checked = false;
    }

    let z = 0;

    for(let i = 0; i < txts.length; i++)
    {
        if(combAI.includes(parseInt(txts[i].value)))
        {
            chks[z++].checked = true;
        }
    }
}

function checkTexts()
{
    let i = 0;
    let values = [];

    while(i < txts.length && txts[i].value != "")
    {
        if(values.includes(txts[i].value))
        {
            return false;
        }
        values.push(txts[i++].value)
    }

    return i == txts.length && txts[i - 1].value != "";
}