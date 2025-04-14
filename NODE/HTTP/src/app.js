"use strict";
const http = require("node:http");
const os = require("node:os");
const fs = require("node:fs");
const server = http.createServer((req, res) => {
    if(req.url === '/'){ // Se la connessione richiede la home, mostra 'Hello world!'
        res.writeHead(200, { // Scrive gli header per contenuto e connessione, riportando anche lo status code
            'Content-Type': 'text/plain', // Definisce il tipo di dati scritti
            'Connection': 'keep-alive' // Definisce il tipo di connessione
        });
        res.write("Hello world!"); // Anche res.end("Hello world!"); per semplificare
        res.end();
    }
    else if(req.url === '/studenti'){
        fs.readFile("./studenti.json", "utf-8", (err, file) => {
            if(err){
                console.error(err);
                //res.statusCode = 500; // Server error
                res.writeHead(500, {
                    'Content-Type': 'text/plain', 
                    'Connection': 'keep-alive' 
                });
                res.write("Internal Server Error");
                res.end();
            }
            else{
                res.writeHead(200, {
                    'Content-Type': 'application/json',
                    'Connection': 'keep-alive'
                });
                res.write(file); // Scrive un file JSON in formato stringa
                res.end();
            }
        });
    }
    else{ // Altrimenti, restituisci 404
        res.writeHead(404, {
            "Content-Type": "text/plain",
            "Connection": "keep-alive"
        });
        res.write(`Couldn't find resource ${req.url}`);
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

server.timeout = 0; // Numero di millisecondi dopo i quali il server assume che il socket sia andato in timeout
// server.maxConnections = 1; // Numero massimo di connessioni al server
server.listen(3000);  // Sceglie la porta su cui ascoltare
console.info("Listening on port 3000");