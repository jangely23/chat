
const socket = io();

// Verifica el estado de la conexión false o true
function checkSocketStatus() {
    console.log("Estado del socket: ", socket.connected );
}

// Emitir eventos personalizados desde el cliente webSocket
const emitToServer = document.querySelector("#emitToServer")
emitToServer.addEventListener("click", (e) => {
    socket.emit("server", "Hola Servidor")
})

// Emitir eventos personalizados a un cliente especifiico desde el cliente del webSocket
const emitToLast = document.querySelector("#emitToLast")
emitToLast.addEventListener("click", (e) => {
    socket.emit("lastConnection", "Hola Ultimo")
})

// Recibe la emisión del evento personalizado a un cliente desde el server
socket.on("lastConnectionGreeting", data => { console.log(data) });

// Recibir eventos personalizados webSocket server
socket.on('welcome', data =>{
    console.log(data);
    const text = document.querySelector("#text")
    text.textContent = data;
})

// Recibe un evento perdonalizado general para todos los clientes
socket.on("everyone", data => { console.log(data)})

//**********************************************
// Procesa los eventos basicos del WebSocket
//**********************************************

socket.on('connect', (msg) => {
    console.log("el socket connected");
    console.log(socket.id);
    checkSocketStatus();
})

socket.on('connect_error', (err) => {
    console.log("Error en conexión");
    console.log(err);
})


socket.on('disconnect', () => {
    console.log("el socket disconnected");
    checkSocketStatus();
})

socket.io.on('reconnect_attempt', () => {
    console.log("estoy intentando reconectarme");
})

socket.io.on('reconnect', () => {
    console.log("Re-conectado");
})
