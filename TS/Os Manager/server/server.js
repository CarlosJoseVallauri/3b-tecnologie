"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var server = (0, http_1.createServer)(function (req, res) {
    res.writeHead(200, { "Content-Type": "html" });
});
server.on("request", function (req, res) {
    switch (req.url) {
        case '/':
            res.end("\n                <h1>Hard Disk Manager</h1>\n                <div>\n                    <table id=\"main-table\">\n                    \n                    </table>\n                </div>\n            ");
    }
});
server.on("connection", function (socket) {
    var remoteIP = "".concat(socket.remoteAddress, ":").concat(socket.remotePort);
    console.info("Connection started from IP ".concat(remoteIP, "."));
    socket.on("end", function () {
        console.info("Connection from IP ".concat(remoteIP, " ended."));
    });
    socket.on("error", function (error) {
        console.info("Error (".concat(error, ") occured on connection from IP ").concat(remoteIP, "."));
    });
});
server.listen(8000);
console.info("Listening on port: 8000");
