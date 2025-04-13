"use strict";
const EventEmitter = require("node:events"); // Classe EventEmitter, non una funzione o un oggetto. Permette di utilizzare metodi statici
const emitter = new EventEmitter(); // Oggetto EventEmitter, permette di utilizzare metodi di istanza
const readline = require("node:readline"); // Modulo readline per leggere dalla console

// Interfaccia che usa StandardIn e StandardOut come input e output
const rl = readline.createInterface({
    input: process.stdin, // Prendo dal modulo process stdin e stdout
    output: process.stdout,
    prompt: ">| " // Definisce cosa appare durante la lettura dell'input
}); 

// Registra un listener
emitter.on("messageLogged", function(eventArgs){ // Utilizzando function(), this viene assegnato. Con un arrow function invece this è un oggetto vuoto
    console.log("Evento messageLogged scatenato", eventArgs);
});

// Scatena un evento
emitter.emit("messageLogged", { id: 1, url: "http://" }); // Un oggetto args viene passato come argomento dell'evento

// Scateno e gestisco evento con dati in input
emitter.on("messageReceived", function(eventArgs){
    console.info(`Ricevuto un messaggio: ${eventArgs}`);
});

rl.question("Messaggio: ", (message) => {
    emitter.emit("messageReceived", message); // Scateno l'evento con il messaggio come parametro
    rl.close(); // Chiudo l'interfaccia di input
})

rl.on("line", (line) => { // Evento line, permette di gestire qualsiasi ricezione di input
    console.info("Input ricevuto", line);
})