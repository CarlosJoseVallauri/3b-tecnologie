"use strict";
const EventEmitter = require("node:events");
const emitter = new EventEmitter(); // Non fa call all'event listener in app.js a meno che i due file non condividano l'oggetto EventEmitter

const Logger = require("./logger"); // Permette al modulo esterno di fare call al listener in app.js
const logger = new Logger();

logger.on("messageLogged", function(eventArgs){
    console.log("Evento messageLogged scatenato", eventArgs);
});

logger.log("Ciao");

