'use strict' 

const COLONNE = 30;
const RIGHE = 20;
const OSTACOLI = 25;
const WRAPPER = document.getElementById("wrapper");
const STARTBTN = document.getElementById("btnAvvia");
let field = Array.from(Array(RIGHE), () => new Array(COLONNE));

generateField();


function generateField(){
    for(let i = 0; i < RIGHE; i++){
        for(let j = 0; j < COLONNE; j++){
            const div = document.createElement("div");
            div.classList.add("cella");
            div.id = `${i}-${j}`;
            field[i][j] = div;
            WRAPPER.appendChild(div);
        }
    }

    STARTBTN.addEventListener("click", function(){
        [...field].flat().forEach(div => {
            div.style.backgroundColor = "rgb(127, 127, 127)";
            div.style.backgroundImage = "";
        });

        let indexes = Array.from(Array(RIGHE * COLONNE), (_, i) => ({
            r: i % RIGHE, 
            c: Math.floor(i / RIGHE)
        })).filter(index => index.c !== 0);

        for(let i = 0; i < OSTACOLI; i++){
            let i = randInt(0, indexes.length);
            let index = indexes[i];
            field[index.r][index.c].style.backgroundImage = "url('./bomba.png')";
            indexes.splice(i, 1);
        }

        let oneIn = randInt(0, 11);
        let twoIn = oneIn + randInt(5, 15 - oneIn);
        let plOne = field[oneIn][0];
        let plTwo = field[twoIn][0];

        plOne.style.backgroundColor = "blue";
        plTwo.style.backgroundColor = "blue";

        const intID = setInterval(() => {
            let luckOne = randInt(1, 11);
            let luckTwo = randInt(1, 11);

            if(luckOne <= 7){
                plOne = goForward(plOne);
            }

            if(luckTwo <= 7){
                plTwo = goForward(plTwo);
            }

            const posOne = plOne.id.split("-")[1];
            const posTwo = plTwo.id.split("-")[1]

            if(posOne === "29" && posTwo === "29"){
                alert("Pareggio");
                clearInterval(intID);
                return;
            }

            if(posOne === "29"){
                alert("Vince giocatore 1");
                clearInterval(intID);
            }

            if(posTwo === "29"){
                alert("Vince giocatore 2");
                clearInterval(intID);
            }

        }, 150);
    })
}

function goForward(player){
    const currP = player.id.split("-");
    const currR = +currP[0];
    const currC = +currP[1];

    if(field[currR][currC + 1].style.backgroundImage !== ''){
        player = field[currR + 1][currC];
    }
    else{
        player = field[currR][currC + 1];
    }
    
    player.style.backgroundColor = "blue";
    return player;
}

function randInt(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}

