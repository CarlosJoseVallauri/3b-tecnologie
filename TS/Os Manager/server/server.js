"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var fs_1 = require("fs");
function isValidDrive(Drive) {
    return Object.keys(Drive).length === 3 &&
        'name' in Drive &&
        'runningOs' in Drive &&
        'size' in Drive;
}
var DATABASE = '../database/hard_drives.json';
var server = (0, http_1.createServer)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, DATABASE_DATA, formattedData_1, body_1, body_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.url;
                switch (_a) {
                    case '/': return [3 /*break*/, 1];
                }
                return [3 /*break*/, 5];
            case 1:
                if (!(req.method === "GET")) return [3 /*break*/, 3];
                res.writeHead(200, { "Content-Type": "text/html" });
                return [4 /*yield*/, readDatabase()];
            case 2:
                DATABASE_DATA = _b.sent();
                formattedData_1 = "\n                    <tr>\n                        <th>ID</th>\n                        <th>Nome</th>\n                        <th>OS</th>\n                        <th>Dimensione</th>\n                    </tr>\n                ";
                DATABASE_DATA.forEach(function (Drive) {
                    formattedData_1 +=
                        "\n                    <tr>\n                        <td>".concat(Drive.id, "</td>\n                        <td>").concat(Drive.name, "</td>\n                        <td>").concat(Drive.runningOs, "</td>\n                        <td>").concat(Drive.size, "</td>\n                    </tr>\n                    ");
                });
                res.end("\n                        <!DOCTYPE html>\n                        <html>\n                            <head>\n                                <title>Hard Disk Manager</title>\n                                <style>\n                                    table{\n                                        border: 1px solid black;\n                                        border-radius: 12px;\n                                        border-spacing: 12px;\n                                        padding: 3px;\n                                    }\n                                    td{\n                                        padding: 5px;\n                                        border-bottom: 1px solid black;\n                                    }\n                                </style>\n                            </head>\n                            <body>\n                                <h1>Hard Disk Manager</h1>\n                                <div>\n                                    <table id=\"main-table\">\n                                        ".concat(formattedData_1, "\n                                    </table>\n                                </div>\n                            </body>\n                        </html>\n                    "));
                return [3 /*break*/, 4];
            case 3:
                if (req.method === "POST") {
                    body_1 = '';
                    req.on('data', function (chunk) {
                        body_1 += chunk;
                    });
                    req.on('end', function () { return __awaiter(void 0, void 0, void 0, function () {
                        var newDrive, successWrite, error_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    console.log("Received POST data: ".concat(body_1));
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    newDrive = JSON.parse(body_1);
                                    if (!isValidDrive(newDrive)) {
                                        res.writeHead(400, { "Content-Type": "application/json" });
                                        res.end(JSON.stringify({ error: "Invalid drive" }));
                                        return [2 /*return*/];
                                    }
                                    return [4 /*yield*/, writeDatabase(newDrive)];
                                case 2:
                                    successWrite = _a.sent();
                                    if (successWrite) {
                                        res.writeHead(200, { "Content-Type": "application/json" });
                                        res.end(JSON.stringify({ message: "Drive added" }));
                                    }
                                    else {
                                        res.writeHead(400, { "Content-Type": "application/json" });
                                        res.end(JSON.stringify({ error: "Drive not added" }));
                                    }
                                    return [3 /*break*/, 4];
                                case 3:
                                    error_1 = _a.sent();
                                    console.error("Error parsing JSON: ".concat(error_1));
                                    res.writeHead(400, { "Content-Type": "application/json" });
                                    res.end(JSON.stringify({ error: "Invalid JSON format" }));
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); });
                    req.on('error', function (error) {
                        console.error("Request error: ".concat(error));
                        res.writeHead(500, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({ error: "Server error" }));
                    });
                }
                else if (req.method === "DELETE") {
                    body_2 = '';
                    req.on('data', function (chunk) {
                        body_2 += chunk;
                    });
                    req.on('end', function () { return __awaiter(void 0, void 0, void 0, function () {
                        var deleteId, successDelete, error_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    console.log("Received DELETE data: ".concat(body_2));
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    deleteId = JSON.parse(body_2).id;
                                    return [4 /*yield*/, deleteDrive(deleteId)];
                                case 2:
                                    successDelete = _a.sent();
                                    if (successDelete) {
                                        res.writeHead(200, { "Content-Type": "application/json" });
                                        res.end(JSON.stringify({ message: "Drive removed" }));
                                    }
                                    else {
                                        res.writeHead(400, { "Content-Type": "application/json" });
                                        res.end(JSON.stringify({ error: "Drive not removed" }));
                                    }
                                    return [3 /*break*/, 4];
                                case 3:
                                    error_2 = _a.sent();
                                    console.error("Error parsing JSON: ".concat(error_2));
                                    res.writeHead(400, { "Content-Type": "application/json" });
                                    res.end(JSON.stringify({ error: "Invalid JSON format" }));
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); });
                    req.on('error', function (error) {
                        console.error("Request error: ".concat(error));
                        res.writeHead(500, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({ error: "Server error" }));
                    });
                }
                _b.label = 4;
            case 4: return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
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
function writeDatabase(newDrive) {
    return __awaiter(this, void 0, void 0, function () {
        var Data, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, readDatabase()];
                case 1:
                    Data = _a.sent();
                    newDrive.id = Data[Data.length - 1].id + 1;
                    Data.push(newDrive);
                    return [4 /*yield*/, fs_1.promises.writeFile(DATABASE, JSON.stringify(Data, null, '\t'))];
                case 2:
                    _a.sent();
                    return [2 /*return*/, true];
                case 3:
                    error_3 = _a.sent();
                    console.info("Error ".concat(error_3, " writing to database."));
                    return [2 /*return*/, false];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function readDatabase() {
    return __awaiter(this, void 0, void 0, function () {
        var Data, _a, _b, error_4;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    Data = [];
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    _b = (_a = JSON).parse;
                    return [4 /*yield*/, fs_1.promises.readFile(DATABASE, "utf-8")];
                case 2:
                    Data = _b.apply(_a, [_c.sent()]);
                    if (!Array.isArray(Data)) {
                        Data = [];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _c.sent();
                    Data = [];
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/, Data];
            }
        });
    });
}
function deleteDrive(ID) {
    return __awaiter(this, void 0, void 0, function () {
        var Data, IDDrive_1, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, readDatabase()];
                case 1:
                    Data = _a.sent();
                    IDDrive_1 = Data.find(function (Drive) { return Drive.id == ID; });
                    if (IDDrive_1 === undefined) {
                        return [2 /*return*/, false];
                    }
                    Data = Data.filter(function (Drive) { return Drive != IDDrive_1; });
                    return [4 /*yield*/, fs_1.promises.writeFile(DATABASE, JSON.stringify(Data, null, '\t'))];
                case 2:
                    _a.sent();
                    return [2 /*return*/, true];
                case 3:
                    error_5 = _a.sent();
                    console.info("Error ".concat(error_5, " writing to database."));
                    return [2 /*return*/, false];
                case 4: return [2 /*return*/];
            }
        });
    });
}
