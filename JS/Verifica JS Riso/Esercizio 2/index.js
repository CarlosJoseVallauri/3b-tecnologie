"use strict";

let citta=[
	"Londra", "Liverpool", "Manchester", "Cambridge",
	"Amsterdam", "Rotterdam", "Maastricht",
	"Lisbona", "Oporto", "Braga",
	"Stoccolma", "Goteborg",
	"Kiev", "Leopoli", "Odessa",
	"Berna", "Lugano", "Zurigo", 
	"Madrid", "Barcellona"
]

let nazioni=[
	"Inghilterra", "Inghilterra", "Inghilterra", "Inghilterra", 
	"Olanda", "Olanda", "Olanda",
	"Portogallo", "Portogallo", "Portogallo",
	"Svezia", "Svezia",
	"Ucraina", "Ucraina", "Ucraina",
	"Svizzera", "Svizzera", "Svizzera",
	"Spagna", "Spagna"]

let elencoUnivocoNazioni = new Set(nazioni); 
let imgFlag = document.getElementById("bandiera");
let nationName = document.getElementById("nazione");
let txtsCity = document.getElementsByName("txtCitta");
let chksCity = document.getElementsByName("chkCitta");
let imgsCity = document.getElementsByClassName("img");
let btnCont = document.getElementById("btncontrolla");
let cityIndexes = [];

/* Il set è una struttura di dati che contiene solo valori univoci, senza ripetizioni. 
Utilizzando il constructor new Set(Array) viene generata un'istanza della classe Set contenente 
i valori dell'array passato come parametro ripetuti un'unica volta. In questo caso permette di 
ottenere l'elenco univoco di nazioni richiesto*/

let r = random(0, elencoUnivocoNazioni.size);
let nazione = ([...elencoUnivocoNazioni.values()][r]);

/*[...Set] mi permette, attraverso la creazione di una struttura dati che supporta l'indicizzazione 
e che contiene i valori di Set, di accedere direttamente agli elementi del set*/

for(let i = 0; i < citta.length; i++)
{
	cityIndexes[i] = i;
}

for(let i = 0; i < citta.length; i++)
{
	let j = random(0, cityIndexes.length)
	let z = cityIndexes[j];

	txtsCity[i].value = citta[z];
	txtsCity[i].nazione = nazioni[z];

	cityIndexes.splice(j, 1);
}

imgFlag.src = `img/${nazione.toLowerCase()}.png`;
nationName.textContent = nazione;


function random(min, max){
	return Math.floor((max-min)*Math.random()+min);
}

function controlla()
{
	let vittoria = true;

	for(let i = 0; i < txtsCity.length; i++)
	{
		let correct = txtsCity[i].nazione === nationName.textContent;
		let checked = chksCity[i].checked;

		if(correct && checked)
		{
			chksCity[i].disabled = true;
			txtsCity[i].disabled = true;
			imgsCity[i].src = `img/${txtsCity[i].nazione.toLowerCase()}.png`;
		}
		else if((!checked && correct) || (checked && !correct))
		{
			vittoria = false;
		}
	}

	if(vittoria)
	{
		alert("Hai vinto!");
		btnCont.disabled = true;
	}
	else
	{
		alert("Non hai selezionato tutte le città o ne hai selezionate alcune sbagliate. Riprova");
	}
}
