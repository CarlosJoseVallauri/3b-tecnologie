"use strict"

let radioBtns = document.getElementsByName("radio");
let rangeSlider = document.getElementById("txtRange");
let btnGen = document.getElementById("btnGenera");
let spans = document.getElementsByTagName("span");

function abilita()
{
	btnGen.disabled = false;
}

function genera(event)
{
	let i = 0;
	let pswd = "";

	while(i < radioBtns.length && !(radioBtns[i++].checked));

	i--;
	
	switch(i)
	{
		case 0:
		{
			let cnt = 0;

			while(cnt < rangeSlider.value)
			{
				let rndChar = random(47, 126);
				let isLetter = (rndChar > 64 && rndChar < 91) || (rndChar > 96 && rndChar < 123);

				if(isLetter)
				{
					pswd += String.fromCharCode(rndChar);
					cnt++;
				}
			}

			break;
		}

		case 1:
		{
			let cnt = 0;

			while(cnt < rangeSlider.value)
			{
				let rndChar = random(47, 126);
				let isNumber = (rndChar > 47 && rndChar < 58);

				if(isNumber)
				{
					pswd += String.fromCharCode(rndChar);
					cnt++;
				}
			}
			break;
		}

		case 2:
		{
			let cnt = 0;

			while(cnt < rangeSlider.value)
			{
				let rndChar = random(47, 126);
				let isLetter = (rndChar > 64 && rndChar < 91) || (rndChar > 96 && rndChar < 123);
				let isNumber = (rndChar > 47 && rndChar < 58);

				if(isLetter || isNumber)
				{
					pswd += String.fromCharCode(rndChar);
					cnt++;
				}
			}
			break;
		}

		case 3:
		{
			for(let i = 0; i < rangeSlider.value; i++)
			{
				pswd += String.fromCharCode(random(47, 126));
			}
			break;
		}
	}

	spans[1].textContent = pswd;
}

function aggiorna()
{
	spans[0].textContent = `lunghezza: ${rangeSlider.value}`
}


function random(min, max){
	return Math.floor((max-min)*Math.random()+min)
}



