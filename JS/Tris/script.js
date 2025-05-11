"use strict";

const DIM = 3; 
const table = document.querySelector("table");
const result = document.getElementById("divRisultato");
let cells = Array.from(Array(DIM), () => new Array(DIM));
let turn = true;
let gameOver = false;

generateField();

function generateField(){
    for(let i = 0; i < DIM; i++){
        const row = document.createElement("tr");
        for (let j = 0; j < DIM; j++){
            const cell = document.createElement("td");
            const img = document.createElement("img");
            img.src = "img/vuota.png";
            img.id = `img-${i}-${j}`;
            img.play = null;

            img.addEventListener("click", function gameClick(){
                if(gameOver) return;

                const symbol = turn ? "X" : "O";

                this.src = `img/${symbol}.png`;
                this.play = symbol;
                this.removeEventListener("click", gameClick);

                if(checkWin(i, j, symbol)){
                    result.textContent = `Il giocatore ${symbol} vince!`;
                    gameOver = true;
                }
                else if(isDraw()){
                    result.textContent = "Pareggio";
                    gameOver = true;
                }

                turn = !turn;
            });

            cells[i][j] = img;
            cell.appendChild(img);
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
}

function checkWin(x, y, symbol) {
    if (cells[x].every(cell => cell.play === symbol)) return true;
    if (cells.every(row => row[y].play === symbol)) return true;
    if (x === y && cells.every((row, idx) => row[idx].play === symbol)) return true;
    if (x + y === DIM - 1 && cells.every((row, idx) => row[DIM - 1 - idx].play === symbol)) return true;

    return false;
}

function isDraw(){
    return cells.flat().every(cell => cell.play !== null)
}