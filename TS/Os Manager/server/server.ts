import { IncomingMessage, ServerResponse, createServer } from "http"
import {promises as fsp} from "fs";
import { Socket } from "net";

interface HardDrive{
    id: number,
    name: string,
    runningOs: string,
    size: number
}

function isValidDrive(Drive: any): Drive is HardDrive{
    return  Object.keys(Drive).length === 3 &&
           'name' in Drive &&
           'runningOs' in Drive &&
           'size' in Drive;
}

const DATABASE = '../database/hard_drives.json';

const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
    switch(req.url){
        case '/':
            if(req.method === "GET"){
                res.writeHead(200, { "Content-Type": "text/html" });
                
                const DATABASE_DATA: HardDrive[] = await readDatabase();
                let formattedData = 
                `
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>OS</th>
                        <th>Dimensione</th>
                    </tr>
                `;

                DATABASE_DATA.forEach(Drive => {
                    formattedData += 
                    `
                    <tr>
                        <td>${Drive.id}</td>
                        <td>${Drive.name}</td>
                        <td>${Drive.runningOs}</td>
                        <td>${Drive.size}</td>
                    </tr>
                    `
                });

                res.end(
                    `
                        <!DOCTYPE html>
                        <html>
                            <head>
                                <title>Hard Disk Manager</title>
                                <style>
                                    table{
                                        border: 1px solid black;
                                        border-radius: 12px;
                                        border-spacing: 12px;
                                        padding: 3px;
                                    }
                                    td{
                                        padding: 5px;
                                        border-bottom: 1px solid black;
                                    }
                                </style>
                            </head>
                            <body>
                                <h1>Hard Disk Manager</h1>
                                <div>
                                    <table id="main-table">
                                        ${formattedData}
                                    </table>
                                </div>
                            </body>
                        </html>
                    `
                )
            }
            else if(req.method === "POST"){
                let body : string = '';
                
                req.on('data', (chunk: string) => {
                    body += chunk;
                });
                
                req.on('end', async () => {
                    console.log(`Received POST data: ${body}`);
                    
                    try {
                        const newDrive: HardDrive = JSON.parse(body);

                        if(!isValidDrive(newDrive)){
                            res.writeHead(400, { "Content-Type": "application/json" });
                            res.end(JSON.stringify({ error: "Invalid drive" }))
                            return;
                        }
                        
                        const successWrite : boolean = await writeDatabase(newDrive);

                        if(successWrite){
                            res.writeHead(200, { "Content-Type": "application/json" });
                            res.end(JSON.stringify({ message: "Drive added" }));
                        }
                        else{
                            res.writeHead(400, { "Content-Type": "application/json" });
                            res.end(JSON.stringify({ error: "Drive not added" }));
                        }
                    } 
                    catch (error) {
                        console.error(`Error parsing JSON: ${error}`);
                        res.writeHead(400, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({ error: "Invalid JSON format" }));
                    }
                });
                
                req.on('error', (error) => {
                    console.error(`Request error: ${error}`);
                    res.writeHead(500, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ error: "Server error" }));
                });
            }
            else if(req.method === "DELETE"){
                let body : string = '';
                
                req.on('data', (chunk: string) => {
                    body += chunk;
                });
                
                req.on('end', async () => {
                    console.log(`Received DELETE data: ${body}`);
                    
                    try {
                        const deleteId: number = JSON.parse(body).id;         
                        const successDelete : boolean = await deleteDrive(deleteId);

                        if(successDelete){
                            res.writeHead(200, { "Content-Type": "application/json" });
                            res.end(JSON.stringify({ message: "Drive removed" }));
                        }
                        else{
                            res.writeHead(400, { "Content-Type": "application/json" });
                            res.end(JSON.stringify({ error: "Drive not removed" }));
                        }
                    } 
                    catch (error) {
                        console.error(`Error parsing JSON: ${error}`);
                        res.writeHead(400, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({ error: "Invalid JSON format" }));
                    }
                });
                
                req.on('error', (error) => {
                    console.error(`Request error: ${error}`);
                    res.writeHead(500, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ error: "Server error" }));
                });
            }

            break;
    }
});

server.on("connection", (socket: Socket) => {
    const remoteIP: string = `${socket.remoteAddress}:${socket.remotePort}`;
    console.info(`Connection started from IP ${remoteIP}.`);

    socket.on("end", () => {
        console.info(`Connection from IP ${remoteIP} ended.`)
    })

    socket.on("error", (error) => {
        console.info(`Error (${error}) occured on connection from IP ${remoteIP}.`);
    })
})

server.listen(8000);
console.info("Listening on port: 8000");


async function writeDatabase(newDrive: HardDrive) : Promise<boolean>{
    try{
        let Data: HardDrive[] = await readDatabase();
        newDrive.id = Data[Data.length - 1].id + 1;

        Data.push(newDrive);
        await fsp.writeFile(DATABASE, JSON.stringify(Data, null, '\t'));

        return true;
    }
    catch(error){
        console.info(`Error ${error} writing to database.`);
        return false;
    }
}

async function readDatabase() : Promise<HardDrive[]>{
    let Data: HardDrive[] = [];

    try{
        Data = JSON.parse(await fsp.readFile(DATABASE, "utf-8"));

        if(!Array.isArray(Data)){
            Data = [];
        }
    }
    catch(error){
        Data = [];
    }

    return Data;
}

async function deleteDrive(ID:number): Promise<boolean> {
    try{
        let Data: HardDrive[] = await readDatabase();
        let IDDrive: HardDrive | undefined = Data.find(Drive => Drive.id == ID);

        if(IDDrive === undefined){
            return false;
        }

        Data = Data.filter(Drive => Drive != IDDrive);
        await fsp.writeFile(DATABASE, JSON.stringify(Data, null, '\t'));

        return true;
    }
    catch(error){
        console.info(`Error ${error} writing to database.`);
        return false;
    }
}