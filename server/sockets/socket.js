const { IO } = require('../server');

const { Usuarios } = require('../Classes/usuarios');
const usuario = new Usuarios();

const { crearMensaje } = require('../utils/utilidades');


//configuraciones para ver si un usuario se conecto
IO.on('connection', (client) => {

    console.log('usuario conectado');

    //configuración para ver si un usuario se desconecto de nuestra app
    client.on('disconnect', () => {
        console.log('usuario desconectado');
        let us = usuario.borrarPersona(client.id) || 'usuario';

        client.broadcast.to(us.sala).emit('salidaUsuarios', { usuario: 'Administrador', mensaje: `${us.nombre} salio` });
        client.broadcast.to(us.sala).emit('listaUsuarios', usuario.getPersonasPorSala(us.sala));
    })


    //Escuchando la variable que se emitio desde el cliente
    client.on('entrarSala', (data, callback) => {

        if (data.nombre && data.sala) {

            client.join(data.sala);

            let personas = usuario.agregarPersona(client.id, data.nombre, data.sala);

            callback(usuario.getPersonasPorSala(data.sala));
            client.broadcast.to(data.sala).emit('ingresoUsuario', usuario.getPersonasPorSala(data.sala));
            client.broadcast.to(data.sala).emit('listaUsuarios', usuario.getPersonasPorSala(data.sala));
        } else {
            callback({
                Error: true,
                mensaje: 'No se envio un parametro valido usuario/sala'
            });
        }

    })

    client.on('enviarMensaje', (data, callback) => {

        //Identificar quien esta enviando el mensaje
        let persona = usuario.getPersona(client.id);

        let mensaje = crearMensaje(persona.nombre, data.mensaje);

        client.broadcast.to(persona.sala).emit('enviarMensaje', mensaje);
        callback(mensaje);
    })

    client.on('mensajePrivado', (data) => {

        //Identificar quien esta enviando el mensaje
        let persona = usuario.getPersona(client.id);

        let mensaje = crearMensaje(persona.nombre, data.mensaje);

        client.broadcast.to(data.para).emit('mensajePrivado', mensaje);
    })



})

module.exports = IO;