"use strict";
const EventEmitter = require("node:events");

// Classe Logger che estende EventEmitter, permettendo di utilizzare l'emitter tra più moduli
class Logger extends EventEmitter{
    log(message){
        console.log(message);
        this.emit("messageLogged", { id: 1, url: "http://", message: message });
    }
}

module.exports = Logger;