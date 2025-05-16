"use strict"

const DIM = 5;
const parole = ["Barca", "Fiore", "Gente", "Fuoco", "Fungo", "Opaco", "Prova", "Sasso", "Scusa", "Torta", "Vespa"];
let parolaSegreta;
let rigaCorrente = 0;
const wrapper = document.getElementById("wrapper");
const input = document.querySelector("input[type=text]");
const cells = Array.from(Array(5), () => new Array(5)); // inizializzazione matrice per evitare di richiamare document.getElementById ogni volta 

generateBoard();

function generateBoard(){
    parolaSegreta = parole[generaNumero(1, parole.length)];

    for(let i = 0; i < DIM; i++){
        for(let j = 0; j < DIM; j++){
            const cell = document.createElement("div");
            cell.classList.add("cella");
            cell.setAttribute("id", `div-${i}-${j}`);
            
            if(i == 0 && j == 0){
                cell.textContent = parolaSegreta[0];
            }

            cells[i][j] = cell;
            wrapper.appendChild(cell);
        }
    }

    input.addEventListener("keydown", function(event){
        const key = event.key;

        if(!((key >= "A" && key <= "z") || key == "Enter" || key == "Backspace")){
            event.preventDefault();
        }
        else if(key >= "a" && key <= "z"){
            event.preventDefault();
            input.value += key.toUpperCase();
        }
        else if(key === "Enter"){
            if(this.value.length != parolaSegreta.length){
                alert("La parola deve essere di cinque lettere");
                this.value = "";
                //this.focus();
            }
            else{
                let missedLetters = [];
                let win = true;

                for(let i = 0; i < parolaSegreta.length; i++){
                    if(input.value[i] === parolaSegreta[i].toUpperCase()){
                        cells[rigaCorrente][i].style.backgroundColor = "greenYellow";
                        cells[rigaCorrente][i].textContent = input.value[i];
                        missedLetters.push("*");
                    }
                    else{
                        missedLetters.push(parolaSegreta[i].toUpperCase());
                        win = false;
                    }
                }

                console.log(missedLetters)

                if(rigaCorrente == 4){
                    if(!win){
                        alert("Hai perso!");
                        this.disabled = true;
                        return;
                    }
                }

                if(!win){
                    for(let i = 0; i < input.value.length; i++){
                        if(missedLetters.includes(input.value[i]) && missedLetters[i] != "*"){
                            cells[rigaCorrente][i].style.backgroundColor = "yellow";
                            cells[rigaCorrente][i].textContent = input.value[i];
                            missedLetters[missedLetters.indexOf(input.value[i])] = "?";
                        }
                    }
                    console.log(missedLetters)
                }
                else{
                    alert("Hai vinto!");
                    this.disabled = true;
                    return;
                }

                input.value = "";
                rigaCorrente++;
            }
        }

    });
    
    input.focus();
}

function replaceAt(string, index, char){
    return string.substring(0, index) + char + string.substring(index + 1, string.length - index + 1);
}

function generaNumero(a, b){
    return Math.floor((b-a)*Math.random()) + a;
}

