"use strict"

const nDOMANDE = 5;
const risposteCorrette = ['d', 'b', 'a', 'c', 'a'];
let risposteCorrenti = ['', '', '', '', ''];

let qstOne = document.getElementsByName("q1");
let qstTwo = document.getElementsByName("q2");
let qstThree = document.getElementsByName("q3");
let qstFour = document.getElementsByName("q4");
let qstFive = document.getElementsByName("q5");
const qsts = [qstOne, qstTwo, qstThree, qstFour, qstFive];
let verBtn = document.querySelector("button");


initializeRadios();
verBtn.addEventListener("click", verifyAnswers);


function verifyAnswers(){
    let voto = 0;
    let ansAll = true;

    for(let i in risposteCorrette){
        let checks = [...qsts[i]].filter(rd => rd.checked); // Utlizzo uno spread operator, che mi permette di trasformare una HTMLCollection in un semplice array e dunque usufruire della funzione filter, che mi permette, attraverso una arrow function, di trovare solo gli elementi che rispondono ad una definita condizione
        
        if(checks.length == 0){
            if(ansAll){
                alert("Devi rispondere a tutte le domande");
                ansAll = false;
            }
            continue;
        }
        
        if(risposteCorrenti[i] !== risposteCorrette[i]){
            checks[0].checked = false; 
        }
        else if(ansAll){
            voto += 2;
        }
    }

    if(ansAll){
        let result = document.querySelector("#ris");

        result.style.display = "block";
        result.textContent += voto;
        verBtn.disabled = true;
    }
}

function initializeRadios(){
    for(const arr of qsts){
        arr.forEach(rd => { // Utilizzo un Array.forEach(), che ha come parametro una funzione lambda (chiamata arrow function in JS) che ha essa stessa come parametro una variabile, qui definita "rd", che rappresenta l'elemento dell'array ad ogni iterazione
            rd.addEventListener("change", function(){
                if(this.checked){
                    risposteCorrenti[qsts.indexOf(arr)] = this.value; 
                    console.log(this.value);
                }
            })
        })
    }
}



