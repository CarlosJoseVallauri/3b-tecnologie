"use strict";
const http = require("node:http");
const os = require("node:os");
const fs = require("node:fs");
const server = http.createServer((req, res) => {
    if(req.url === '/'){ // Se la connessione richiede la home, mostra 'Hello world!'
        res.write("Hello world!");
        res.end();
    }
    else if(req.url === '/studenti'){
        fs.readFile("./studenti.json", "utf-8", (err, file) => {
            if(err){
                console.error(err);
                res.statusCode = 500; // Server error
                res.write("Internal Server Error");
                res.end();
            }
            else{
                res.write(file); // Scrive un file JSON in formato stringa
                res.end();
            }
        });
    }
    else{ // Altrimenti, restituisci 404
        res.statusCode = 404;
        res.write("Error 404, non trovato");
        res.end();
    }
}); // Crea un server con le stesse funzionalità (e più) di EventEmitter

server.on("connection", (socket) => {
    const ip = socket.remoteAddress;
    const port = socket.remotePort;
    console.log(`New connection from IP: ${ip} on Port: ${port}`); // Mostrato quando un nuovo ip si connette al server

    socket.on("end", () => {
        console.log(`Connection from IP: ${ip} on Port: ${port} closed`); // Mostrato quando viene chiusa una connessione
    });

    socket.on("close", (hadError) => {
        console.log(`Connection from IP: ${ip} on Port: ${port} reported error: ${hadError}`); // Mostra se nella chiusura si sono verificati errori
    });

    socket.on("error", (err) => {
        console.error(`Connection error from IP: ${ip} on Port: ${port}:`, err); // Mostra che errore si è verificato
    });
});


server.listen(3000);  // Sceglie la porta su cui ascoltare
console.info("Listening on port 3000");