var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('usuario') || !params.has('sala')) {

    window.location.assign('index.html');
    throw new Error({
        Error: true,
        mensaje: 'No se esta enviado el usuario/sala'
    })
}

var usuario = params.get('usuario');
var sala = params.get('sala');

//EL METODO ON es para escuchar algo (eventos, etc)
//Configuracion para ver si estamos activos con el servidor (activo activo)
socket.on('connect', function() {
    console.log('conectado al servidor');

    //EL METODO EMIT ES PARA EMITIR ALGO
    socket.emit('entrarSala', {
        usuario: usuario,
        sala: sala
    }, function(resp) {
        console.log(resp);
    })

})

socket.on('salidaUsuarios', function(resp) {
    console.log(resp);
})

socket.on('listaUsuarios', function(resp) {
    console.log(resp);
})

socket.on('ingresoUsuario', function(resp) {
    console.log(resp);
})

//Configuracion para ver si perdimos conexión con el servidor (activo desactivo)
socket.on('disconnect', function() {
    console.log('desconectado del servidor');
})

//comando enviado por la consola
//socket.emit('enviarMensaje', {mensaje: 'Hola a todos!'}, function(resp){console.log(resp)})

//socket.emit('mensajePrivado', {mensaje: 'Hola a ANDREA', para: ''})

socket.on('enviarMensaje', function(data) {
    console.log(data);
})

socket.on('mensajePrivado', function(data) {
    console.log(data);
})