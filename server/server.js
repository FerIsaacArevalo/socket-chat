const express = require('express');
const http = require('http');
const path = require('path');
const app = express();
let server = http.createServer(app);
//Defino la constante de socket
const socketIO = require('socket.io');

//Esta es la variable que contiene la comunicacion del backend
// y la almaceno en moodule.exports para utilizarla en su archivo propio /sockets/socket
let IO = socketIO(server);
module.exports = { IO };

//para utilizar todo la funcion de los sockets lo llamo de la sigueinte forma
require('./sockets/socket');


const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));



server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});