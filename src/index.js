const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const path = require("node:path");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
})

io.on('connection', (socket) => {

    /*console.log("Id de los socket contectados " + socket.id); */
    console.log("Clientes contectados " + io.engine.clientsCount );

    socket.on('disconnect', () => {
        console.log("user disconnected id:");
        console.log( socket.id);
    });
})

httpServer.listen(3000);

