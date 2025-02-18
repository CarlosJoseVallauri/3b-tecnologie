"use strict";

function genera()
{
    let msgs = document.getElementsByName("msg");
    let count = parseInt(document.getElementById("txtLanci").value);
    let counters = [0, 0, 0, 0, 0, 0];

    if(!count)
    {
        alert("Inserisci un numero")
        return;
    }
    
    for(let i = 0; i < count; i++)
    {
        let temp = Math.floor(6 * Math.random()) + 1;
        counters[temp - 1]++;
    }

    for(let i = 0; i < 6; i++)
    {
        msgs[i].innerText = counters[i];
    }
}