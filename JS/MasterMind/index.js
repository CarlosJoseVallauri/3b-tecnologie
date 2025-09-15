"use strict";

const GRIGIO = "rgb(235, 235, 235)";
const NERO = "rgb(0, 0, 0)";
const GRIGIO_SCURO = "rgb(110, 110, 110)";

const COLORI = {
	1: "rgb(255, 0, 0)",
	2: "rgb(255, 255, 0)",
	3: "rgb(0, 220, 0)",
	4: "rgb(0, 0, 220)",
	5: "rgb(0, 255, 255)",
	6: "rgb(135, 38, 165)"
};

const table = document.querySelector("table");

let numSegreti = Array.from(Array(4), () => random(1, 7));
let numUtente = new Array(4).fill(1);
let rigaCorrente = 0;

	
generateRow();

function generateRow(){
	const row = document.createElement("tr");
	const cntCell = document.createElement("td");

	cntCell.appendChild(document.createTextNode(` ${rigaCorrente + 1} `));
	row.appendChild(cntCell);

	const usrCells = document.createElement("td");

	for(let i = 0; i < 4; i++){
		const usrCell = document.createElement("div");
		usrCell.setAttribute("id", `div-${rigaCorrente}-${i}`);
		usrCell.classList.add("pedina");
		usrCell.style.backgroundColor = COLORI[1];
		usrCell.dataset.color = 1;
		usrCell.dataset.index = i;

		usrCell.addEventListener("click", function usrClick(){
			if(this.dataset.color < 6){
				this.dataset.color++;
			}
			else{
				this.dataset.color = 1;
			}

			numUtente[this.dataset.index] = +this.dataset.color;
			this.style.backgroundColor = COLORI[this.dataset.color];
		});

		usrCells.appendChild(usrCell);
	}

	const btn = document.createElement("button");
	btn.textContent = "Invia";

	btn.addEventListener("click", function sendClick(){
		let isWin = true;

		for(let i = 0; i < 4; i++){
			usrCells.children[i].replaceWith(usrCells.children[i].cloneNode(false));

			if(numUtente[i] == numSegreti[i]){
				resCells.children[i].style.backgroundColor = NERO;
			}
			else{
				isWin = false;
			}
		}

		if(isWin){
			alert("Hai vinto!");
			return;
		}

		this.style.display = "none";
		rigaCorrente++;
		generateRow();
	});

	usrCells.appendChild(btn);

	row.appendChild(usrCells);

	const resCells = document.createElement("td");

	for(let i = 0; i < 4; i++){
		const resCell = document.createElement("div");
		resCell.classList.add("pedina");
		resCell.setAttribute("id", `res-${rigaCorrente}-${i}`);
		resCell.style.backgroundColor = GRIGIO;
		resCells.appendChild(resCell);
	}

	row.appendChild(resCells);

	table.appendChild(row);
}

function random(min, max){
	return Math.floor((max - min) * Math.random()) + min;
}


