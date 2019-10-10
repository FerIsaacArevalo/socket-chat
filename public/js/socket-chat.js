var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {

    window.location.assign('index.html');
    throw new Error({
        Error: true,
        mensaje: 'No se esta enviado el nombre/sala'
    })
}

//Parametros JQUERY esta en el js de jquery
//var divUsuarios = $('#divUsuarios'); 


var nombre = params.get('nombre');
var sala = params.get('sala');

//EL METODO ON es para escuchar algo (eventos, etc)
//Configuracion para ver si estamos activos con el servidor (activo activo)
socket.on('connect', function() {
    console.log('conectado al servidor');

    //EL METODO EMIT ES PARA EMITIR ALGO
    socket.emit('entrarSala', {
        nombre: nombre,
        sala: sala
    }, function(resp) {
        divUsuarios.html(renderizarUsuarios(resp)); //RenderizarUsuarios es una funcion declara en socket-chat-jquery.js
    })

})

socket.on('salidaUsuarios', function(mensaje) {
    console.log(mensaje);

})

socket.on('listaUsuarios', function(resp) {
    console.log(resp);
})

socket.on('ingresoUsuario', function(mensaje) {
    divUsuarios.html(renderizarUsuarios(mensaje)); //RenderizarUsuarios es una funcion declara en socket-chat-jquery.js
    renderizarMensaje(mensaje, false);
})

//Configuracion para ver si perdimos conexión con el servidor (activo desactivo)
socket.on('disconnect', function() {
    console.log('desconectado del servidor');
})

//comando enviado por la consola
//socket.emit('enviarMensaje', {mensaje: 'Hola a todos!'}, function(resp){console.log(resp)})

//socket.emit('mensajePrivado', {mensaje: 'Hola a ANDREA', para: ''})

socket.on('enviarMensaje', function(data) {
    //Funcion declarada en socket-chat-jquery.js
    renderizarMensaje(data, false);
    scrollBottom();
})

socket.on('mensajePrivado', function(data) {
    console.log(data);
})