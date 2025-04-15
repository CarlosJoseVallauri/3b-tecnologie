"use strict"

let images = document.getElementById("container1").getElementsByTagName("div");
let indexes = Array.from({length: 9}, (_, i) => i + 1); // Utilizzo un Array.from con una variabile di scarto _, che mi permette di assegnare ad i il suo successivo per una lunghezza definita da length
let verBtn = document.querySelector("#btnVerifica");

for(const img of images){
	let i = random(0, indexes.length);
	img.style.backgroundImage = `url(img/img${indexes[i]}.jpg)`;
	img.isSemaforo = indexes[i] < 5;
	img.cliccato = false;
	indexes.splice(i, 1);

	img.addEventListener("click", imgClick);
}

verBtn.addEventListener("click", verifyWin);

function imgClick(){
	if(!this.cliccato){
		this.style.borderColor = "red";
	}
	else{
		this.style.borderColor = "#AFA";
	}

	this.cliccato = !this.cliccato;
}

function verifyWin(){
	let result = document.querySelector(".ris");

	for(const img of images){
		let click = img.cliccato;
		let correct = img.isSemaforo;

		if(click && !correct || !click && correct){
			result.style.textColor = "grey";
			result.textContent = "Riprova";
			return;
		}
	}

	result.style.textColor = "red";
	result.textContent = "Bravo hai indovinato!";
	verBtn.disabled = true;
}

function random(min, max){
	return Math.floor((max-min)*Math.random()+min)
}



