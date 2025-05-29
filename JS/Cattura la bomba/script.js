"use strict";

const SIZE = 10;
let FIELD = Array.from(Array(SIZE), () => new Array(SIZE));
const WRAPPER = document.getElementById("wrapper");
let intervalID;
let contInside = 0;

const MOVEMENTS = {
    1: {r: -1, c: 0},
    2: {r: 1, c: 0},
    3: {r: 0, c: -1},
    4: {r: 0, c: 1}
};

generateBoard();


function generateBoard(){
    for(let i = 0; i < SIZE; i++){
        for(let j = 0; j < SIZE; j++){
            const btn = document.createElement("button");
            btn.classList.add("cella");
            btn.location = {r: i, c: j};
            FIELD[i][j] = btn;
            btn.addEventListener("click", boardClick);
            WRAPPER.appendChild(btn);
        }
    }

    intervalID = setInterval(() => {
        const prevBomb = FIELD.flat().find(btn => btn.isBomba);
        let prevI, prevJ;

        if(prevBomb){
            prevBomb.isBomba = false;
            prevI = prevBomb.location.r;
            prevJ = prevBomb.location.c;
        }
        
        const DIRECTION = getMovement(prevBomb ? {
            u: prevI === 0,
            d: prevI === 9,
            l: prevJ === 0,
            r: prevJ === 9
        } : null);

        if(prevBomb && FIELD[prevI + DIRECTION.r][prevJ + DIRECTION.c].isWall === true){
            contInside++;

            if(contInside == 15){
                clearInterval(intervalID);
                const img = document.createElement("img");
                img.src = "bomba.png";
                prevBomb.appendChild(img);
                alert("Hai vinto!");
            }
        }
        else{
            const i = (prevBomb ? prevI  + DIRECTION.r : random(0, SIZE));
            const j = (prevBomb ? prevJ  + DIRECTION.c : random(0, SIZE));

            FIELD[i][j].isBomba = true;
        }
    }, 150);
}

function boardClick(){
    if(this.isBomba){
        clearInterval(intervalID);
        const img = document.createElement("img");
        img.src = "bomba.png";
        this.appendChild(img);
        alert("Hai perso!");
    }
    else{
        this.style.backgroundColor = this.style.backgroundColor == "blue" ? "rgb(127, 127, 127)" : "blue";
        this.isWall = this.style.backgroundColor == "blue";
    }
}

function random(min, max){
    return Math.floor((max - min) * Math.random()) + min;
}

function getMovement(checks){
    if(!checks){
        return MOVEMENTS[random(1, 5)];
    }

    let possMovs = [1, 2, 3, 4];
    
    if(checks.u){
        possMovs = possMovs.filter(mov => mov !== 1);
    }
    if(checks.d){
        possMovs = possMovs.filter(mov => mov !== 2);
    }
    if(checks.l){
        possMovs = possMovs.filter(mov => mov !== 3);
    }
    if(checks.r){
        possMovs = possMovs.filter(mov => mov !== 4);
    }

    return MOVEMENTS[possMovs[random(0, possMovs.length)]];
}