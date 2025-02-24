"use strict";

let comb = new Array(5);
let nums = document.getElementsByName("txtNum");
let leds = document.getElementsByName("chkNum");

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
	let cnt = 0;
	
    for(let i = 0; i < nums.length; i++)
    {
        if(nums[i].value == comb[i])
        {
            nums[i].style.backgroundColor = "green";
            nums[i].disabled = "true";
            leds[i].checked = "true";
            
            cnt++;
        }
    }

    if(cnt == 5)
    {
        document.getElementById("btnInvia").disabled = "true";
    }
        
}

function Random(min, max)
{
    return Math.floor((max - min) * Math.random()) + min;
}