"use strict";

const SIZE = 4;
const WRAPPER = document.querySelector(".container");
const BUTTON = document.querySelector("button");
let intervalID;
let running = false;

generateField();


function generateField(){
	for(let i = 0; i < SIZE; i++){
		for(let j = 0; j < SIZE; j++){
			const cell = document.createElement("div");
			cell.classList.add("cella");
			cell.id = `div-${i}-${j}`;
			WRAPPER.appendChild(cell);
		}
	}
	
	BUTTON.addEventListener("click", startGame);
}
	
function startGame(){
	if(running){
		return;
	}

	let counter = 0;
	running = true;

	intervalID = setInterval(function(){
		const cell = document.getElementById(`div-${random(0, 4)}-${random(0, 4)}`);

		if(cell.style.backgroundColor !== "gray"){
			cell.textContent = random(0, 4);
		}

		if(++counter === 80){
			clearInterval(intervalID);
			checkCells();
			running = false;
		}

	}, 50, counter);
}

function checkCells(){
	for(let i = 0; i < SIZE; i++){
		for(let j = 0; j < SIZE - 1; j++){
			const currCell = document.getElementById(`div-${i}-${j}`);
			const nextCell = document.getElementById(`div-${i}-${j + 1}`);

			if(currCell.textContent === nextCell.textContent){
				currCell.style.backgroundColor = "gray";
				nextCell.style.backgroundColor = "gray";
			}
		}
	}

	for(let i = 0; i < SIZE - 1; i++){
		for(let j = 0; j < SIZE; j++){
			const currCell = document.getElementById(`div-${i}-${j}`);
			const nextCell = document.getElementById(`div-${i + 1}-${j}`);

			if(currCell.textContent === nextCell.textContent){
				currCell.style.backgroundColor = "gray";
				nextCell.style.backgroundColor = "gray";
			}
		}
	}

	if([...document.querySelectorAll(".cella")].every(cell => cell.style.backgroundColor === "gray")){ // Controllo che tutte le celle abbiano sfondo grigio
		alert("Hai vinto!");
		BUTTON.disabled = true;
	}
}


function random(min, max){
	return Math.floor((max-min)*Math.random() + min)
}
