"use strict";

const WRAPPER = document.getElementById("wrapper");
const MENU = document.querySelector("select");
let prevCell = null;

menuSettings();


function menuSettings(){
    MENU.selectedIndex = -1;
    MENU.addEventListener("change", function(){
        WRAPPER.textContent = "";

        const SIZE = +this.selectedOptions[0].value;
        let numbers = Array.from(Array(SIZE * SIZE / 2), (_, i) => [i + 1, i + 1]).flat(); // Creo una matrice contenente lo stesso numero due volte, poi usando flat() lo rendo un vettore unidimensionale 
    
        WRAPPER.style.width = `${SIZE * 55}px`;
        WRAPPER.style.height = `${SIZE * 55}px`;

        for(let i = 0; i < SIZE; i++){
            for(let j = 0; j < SIZE; j++){
                const cell = document.createElement("button");
                cell.classList.add("cella");
                //cell.id = `div-${i}-${j}`;
                cell.textContent = numbers.splice(random(0, numbers.length), 1)[0];
                cell.addEventListener("click", cellClick);
                WRAPPER.appendChild(cell);
            }
	    }
    });
}

function cellClick(){
    this.style.backgroundColor = "red";
    this.style.color = "white";

    if(this === prevCell){
        return;
    }

    if(prevCell){
        for(const cell of document.getElementsByClassName("cella")){
            if(cell !== this && cell !== prevCell && cell.style.backgroundColor != "rgb(136, 136, 221)"){
                cell.disabled = true;
            }
        }

        setTimeout(() => { // Sono obbligato ad usare una arrow function, altrimenti this viene riassegnato (in quanto function() riassegna this) e avrei bisogno di un'altra variabile
            if(this.textContent === prevCell.textContent){
                this.style.backgroundColor = "#88D";
                prevCell.style.backgroundColor = "#88D"
                this.disabled = true;
                prevCell.disabled = true;
                this.style.cursor = "default";
                prevCell.style.cursor = "default";
            }
            else{
                this.style.backgroundColor = "#C7C7C7";
                prevCell.style.backgroundColor = "#C7C7C7";
                this.style.color = "#B2B2B2";
                prevCell.style.color = "#B2B2B2";
            }

            for(const cell of document.getElementsByClassName("cella")){
                if(cell !== this && cell !== prevCell && cell.style.backgroundColor !== "rgb(136, 136, 221)"){
                    cell.disabled = false;
                }
            }
            prevCell = null;

            if([...document.querySelectorAll(".cella")].every(cell => cell.style.backgroundColor === "rgb(136, 136, 221)")){
                alert("Hai vinto!");
            }
        }, 500);
    }
    else{
        prevCell = this;
    }
}

function random(min, max){
	return Math.floor((max-min)*Math.random() + min)
}
