"use strict";

let privateVariable = "Hello world!"; // Variabile privata non esportata

function sayHello(name){
    console.log(`Hello ${name}!`);
}

module.exports.greet = sayHello; // Funzione pubblica con alias