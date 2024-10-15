const socket = io();

function checkSocket() {
    console.log("Estado del socket: ", socket.connected );
}

socket.on('connect', (msg) => {
    console.log("el socket connected");
    console.log(socket.id);
    checkSocket();
})

socket.on('connect_error', (err) => {
    console.log("Error en conexión");
    console.log(err);
})

socket.on('disconnect', () => {
    console.log("el socket disconnected");
    checkSocket();
})

socket.io.on('reconnect_attempt', () => {
    console.log("estoy intentando reconectarme");
})

socket.io.on('reconnect', () => {
    console.log("Re-conectado");
})
