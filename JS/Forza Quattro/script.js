"use strict";

const ROWS=6;
const COLS=7;

const GREY = "rgb(127, 127, 127)";
const YELLOW = "rgb(255, 255, 0)";
const RED = "rgb(255, 0, 0)";

const wrapper = document.getElementById("wrapper");
const turnDiv = document.getElementById("nextPlayer");
let turn = true;
let board = Array.from(Array(ROWS), () => new Array(COLS));


generateBoard();

function generateBoard(){
    for(let i = 0; i < ROWS; i++){
        for(let j = 0; j < COLS; j++){
            const piece = document.createElement("div");
            piece.classList.add("pedina");
            piece.setAttribute("id", `p-${i}-${j}`);
            board[i][j] = piece;

            if(i == ROWS - 1){
                piece.addEventListener("click", function gameClick(){
                    const color = turn ? YELLOW : RED;

                    this.style.backgroundColor = color;
                    turnDiv.textContent = color == YELLOW ? "ROSSO" : "GIALLO";
                    turn = !turn;
                    
                    const row = this.id.split("-")[1];
                    const col = this.id.split("-")[2];

                    checkWin(row, col, color);
                    
                    if(row > 0){
                        board[row - 1][col].addEventListener("click", gameClick);
                    }

                    this.removeEventListener("click", gameClick);
                });
            }

            wrapper.appendChild(piece);
        }
    }
}

function checkWin(row, col, color){
    row = parseInt(row);
    col = parseInt(col);

    function countInDirection(dx, dy){
        let r = row + dy;
        let c = col + dx;
        let count = 0;

        while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c].style.backgroundColor === color){
            count++;
            r += dy;
            c += dx;
        }

        return count;
    }

    function checkDirection(dx, dy){
        return 1 + countInDirection(dx, dy) + countInDirection(-dx, -dy) >= 4;
    }

    if (
        checkDirection(1, 0) ||
        checkDirection(0, 1) ||
        checkDirection(1, 1) ||
        checkDirection(1, -1)
    ) 
    {
        alert(`Il giocatore ${color == YELLOW ? "GIALLO" : "ROSSO"} vince!`);
    }
}
