const express = require('express');
const { createServer } = require('http');
const realtimeServer = require("./realtimeServer")

const path = require('path');
const cookieParser = require("cookie-parser");

const app = express();
const httpServer = createServer(app);

// Settings
app.set("port", process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser());

// Routes
app.use( require('./routes') );
app.use( express.static(path.join(__dirname, 'public')) );

// Levanto el server
httpServer.listen( app.get("port"), ()=> {
    console.log( "Listening on port " + app.get("port") );
})

// LLamo al servidor de Socket.io
realtimeServer(httpServer);
