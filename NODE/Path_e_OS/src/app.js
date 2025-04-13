"use strict";
const path = require("node:path"); // Importa modulo path di default
const os = require("node:os"); // Importa modulo os di default

let pathObj = path.parse(__filename); // Restituisce il path del modulo corrente (__filename)

/*
Struttura oggetto path: 
    {
    root: 'E:\\',
    dir: 'E:\\Programmazione\\WEB\\NODE\\Path\\src',
    base: 'app.js',
    ext: '.js',
    name: 'app'
    }
*/

console.log(pathObj);

let totalMemory = os.totalmem(); // Restituisce la memoria totale in byte del sistema
let freeMemory = os.freemem(); // Restituisce la memoria libera in byte del sistema

console.log(`Memoria totale: ${totalMemory / 100000}MB`);
console.log(`Memoria libera: ${freeMemory / 100000}MB`);

let user = os.userInfo(); // Restituisce le informazioni sull'utente corrente
console.log(`Nome utente: ${user.username}`);

let osEndianness = os.endianness(); // Restituisce il tipo di endianness utilizzata dal sistema
let endianDict = {"LE": "Little Endian", "BE": "Big Endian"};
console.log(`Tipo di endianness: ${endianDict[osEndianness]}`);