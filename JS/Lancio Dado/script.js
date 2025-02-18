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
        let temp = Random(1, 7);
        counters[temp - 1]++;
    }

    for(let i = 0; i < 6; i++)
    {
        let r = Random(0, 256);
        let g = Random(0, 256);
        let b = Random(0, 256)

        msgs[i].style.color = `rgb(${r}, ${g}, ${b})`;
        msgs[i].innerText = `Il numero ${i + 1} è uscito ${counters[i]} volte`;
    }
}

function Random(min, max)
{
    return Math.floor((max - min) * Math.random()) + min;
}