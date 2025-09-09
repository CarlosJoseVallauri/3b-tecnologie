"use strict";

const colori = ["Argento", "Oro", "Nero", "Marrone", "Rosso", "Arancio", "Giallo",
                "Verde", "Blu", "Viola", "Grigio", "Bianco" ];
				
const tolleranze=["10", "5", "", "1", "2", "", "", "0.5", "0.25", "0.1", "", ""];

const COMBOS = document.getElementsByTagName("select");
const COMBOS_array = [...COMBOS];
const RESULT = document.getElementById("txtRisultato");

loadCombo();

function loadCombo(){
    COMBOS_array.forEach(combo => {
        combo.selectedIndex = -1;
        let currInd = COMBOS_array.indexOf(combo);

        for(const col of colori){
            if((col === "Grigio" || col === "Bianco") && (currInd === 2 || currInd === 3) ||
               (col === "Argento" || col === "Oro") && (currInd === 0 || currInd === 1) ||
               (col === "Nero" || col === "Arancio" || col === "Giallo") && (currInd === 3)){
                continue;
            }

            const opt = document.createElement("option");
            opt.value = colori.indexOf(col);
            opt.text = col;
            combo.appendChild(opt);
        }
    });
}

function calcola(){
    const fNum = COMBOS[0].value - 2;
    const sNum = COMBOS[1].value - 2;
    const fMul = COMBOS[2].value - 2;
    const tol = `± ${tolleranze[COMBOS[3].value]} %`;

    let res = (fNum * 10 + sNum) * (10 ** fMul);

    if(res < 10 && res !== 0){
        RESULT.innerText = `${res.toFixed(2)} ohm ${tol}`;
    }
    else{
        RESULT.innerText = `${res.toFixed(0)} ohm ${tol}`;
    }
}


