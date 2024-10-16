const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const path = require("node:path");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static(path.join(__dirname, 'views')));

const socketsOnline = [];

// Ruta base acceso web
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
})

// WebSocket
io.on('connection', (socket) => {

    socketsOnline.push(socket.id);

    /*console.log("Id de los socket contectados " + socket.id); */
    console.log("Clientes contectados " + io.engine.clientsCount );

    /* socket.on('disconnect', () => {
        console.log("user disconnected id:");
        console.log( socket.id);
    }); */

    // Emite un evento personalizado a el cliente
    socket.emit("welcome", "Hi, Pepito Perez estas conectado");

    // Emite a todos los clientes conectados
    io.emit("everyone", socket.id + "se ha conectado");

    // Recibe un evento personalizado del cliente
    socket.on("server", data => {  console.log(data) });

    // Emite a un cliente especifico
    socket.on("lastConnection", data => {
        const lastSocket = socketsOnline[socketsOnline.length - 1];
        io.to(lastSocket).emit("lastConnectionGreeting", data);
    });

})

httpServer.listen(3000);

