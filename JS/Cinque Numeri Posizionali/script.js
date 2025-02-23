"use strict";

let comb = new Array(5);
let nums = document.getElementsByName("txtNum");
let leds = document.getElementsByName("chkNum");
let gss = [];

for(let i = 0; i < 5; i++)
{
    let x;

    do
    {
        x = Random(1, 10);
    }
    while(comb.includes(x));

    comb[i] = x;
}

function controlla(event)
{
    let obj = event.target.value;
    let exp = /[0-9]/;

    if(obj.match(exp) == null)
    {
        event.target.value = "";
    }
}

function confrontaNumeri()
{
    for(let i = 0; i < nums.length; i++)
    {
        if(nums[i].value == comb[i])
        {
            nums[i].style.backgroundColor = "green";
            nums[i].disabled = "true";
            leds[i].checked = "true";
            
            if(!gss.includes(i))
            {
                gss.push(i);
            }
        }
    }

    if(gss.length == 5)
    {
        document.getElementById("btnInvia").disabled = "true";
    }
        
}

function Random(min, max)
{
    return Math.floor((max - min) * Math.random()) + min;
}