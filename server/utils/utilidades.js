const crearMensaje = (nombre, mensaje) => {

    return {
        usuario: nombre,
        mensaje,
        fecha: new Date().getTime()
    }
}


module.exports = {
    crearMensaje
}