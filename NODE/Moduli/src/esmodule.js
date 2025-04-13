"use strict";

let  privateVariable = "Hello world!"; // Variabile privata non esportata

export function sayHello(name){ // Funzione pubblica
    console.log(`Hello ${name}!`);
}