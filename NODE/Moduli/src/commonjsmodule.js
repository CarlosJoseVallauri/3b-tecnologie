"use strict";

let privateVariable = "Hello world!"; // Variabile privata non esportata

function sayHello(name){
    console.log(`Hello ${name}!`);
}

module.exports.greet = sayHello; // Funzione pubblica con alias
//exports.greet = sayHello; // Uso dell'alias exports
//module.exports = sayHello; // Esporto un'unica funzione
//exports = sayHello; // Errore, exports è un riferimento e non può essere modificato