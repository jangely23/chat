module.exports = httpServer => {
    const { Server } = require("socket.io");
    const io = new Server(httpServer);

    io.on("connection", (socket) => {

        const cookies = socket.handshake.headers.cookie;
        const user = cookies.split("=").pop();

        const date = new Date().toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric", hour:"numeric", minute:"numeric"});

        socket.on("message", ({dataMessage}) => {
            io.emit("message", {
                user,
                message: dataMessage,
                date,
            });
        })
    })
}