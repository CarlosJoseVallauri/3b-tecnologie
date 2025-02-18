"use strict";

let txtNum = document.getElementById("txtNumero");
let divTries = document.getElementById("divTentativi");
let divMsg = document.getElementById("divMessaggio");
let btnGioca = document.getElementById("btnGioca");
let btnReset = document.getElementById("btnReset");
btnReset.style.visibility = "hidden";

let tries = 0;
let numSegreto = generaNumero(1, 101);



function gioca()
{
    let numUser = parseInt(txtNum.value);
    let msg = "";
    let vinto = false;
    
    if(numUser < 1 || numUser > 100 || txtNum.value === "")
    {
        alert("Numero non valido");
    }
    else
    {
        tries++;
        divTries.textContent = "Tentativi: " + tries.toString();

        if(numUser > numSegreto)
        {
            msg = "Numero inserito troppo grande " + numUser.toString();
        }
        else if(numUser < numSegreto)
        {
            msg = "Numero inserito troppo piccolo " + numUser.toString();
        }
        else if(numUser === numSegreto)
        {
            msg = "Numero indovinato!"
            vinto = true;
            terminaGioco();
        }

        if(!vinto && tries >= 10)
        {
            msg += " <br>Hai perso e esaurito i tentativi. Il numero segreto era: " + numSegreto.toString();
            terminaGioco();
        }

        divMsg.innerHTML += msg + "<br>";
    }

    txtNum.focus();
    txtNum.value = "";
}

function terminaGioco()
{
    txtNum.disabled = true;
    btnGioca.disabled = true;
    btnReset.style.visibility = "visible";
}

function generaNumero(a, b)
{
    return Math.floor((b - a) * Math.random() + a);
}

function gestisciEnter(event) 
{
    if(event.key == "Enter")
    {
        gioca();
    }
}