let _io;
var Salas = [];


function listen(socket){
    const io = _io;
    
    socket.on('criarSala', function(codigoSala, nomeSala){
        console.log("criando sala - " + codigoSala + " - "+nomeSala);
        var novaSala = {
            "Codigo": codigoSala,
            "Nome": nomeSala
        }
        Salas.push(novaSala);
    });

    socket.on('listarSalas', function(){
        socket.emit('listandoSalas', Salas);
    });

    socket.on('join', function(sala){
        console.log("join na sala: " + sala +" - id: "+socket.id);
        socket.join(sala);
    });


}

module.exports = function(io){
    _io = io;
    return {listen};
};
