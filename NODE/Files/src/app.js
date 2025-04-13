"use strict";
const fs = require("node:fs");

const files = fs.readdirSync("./"); // Restituisce un array di tutti i file nella directory, leggendoli con un'operazione sincrona
console.table(files);

fs.readdir("./", (err, files) => { // Restituisce un array di tutti i file nella directory, leggendoli con un'operazione asincrona
    if(err) console.error(err); // Controllo dell'errore con una arrow function di callback 
    else console.table(files);
})

/** 
    Le funzione asincrone saranno le ultima a venire loggate, in quanto la loro esecuzioni non bloccano quelle delle funzioni sincrone. 
    L'ordine di log sarà quindi: 
    1. fs.readdirSync
    2. fs.readFileSync
    3. fs.readdir
    4. fs.readFile
**/
const file = fs.readFileSync("./app.js", "utf-8"); // Restituisce un buffer contenente tutte le informazioni di un file se 'options' non è specificata, leggendolo con un'operazione sincrona
console.info(file);

fs.readFile("./app.js", "utf-8", (err, file) => { // Restituisce un buffer contenente tutte le informazioni di un file se 'options' non è specificata, leggendolo con un'operazione asicnrona
    if(err) console.error(err);
    else console.info(file);
})