let _io;
var Salas = [];


function listen(socket){
    const io = _io;
    console.log("nome client - "+ socket.id);

    socket.on('criarSala', function(codigoSala, nomeSala){
        console.log("criando sala - " + codigoSala + " - "+nomeSala);
        var novaSala = {
            "Codigo": codigoSala,
            "Nome": nomeSala
        }
        Salas.push(novaSala);
        io.emit("recarregarSalas");
    });

    socket.on('listarSalas', function(){
        socket.emit('listandoSalas', Salas);
    });

    socket.on('join', function(sala){
        console.log("join na sala: " + sala +" - id: "+socket.id);
        socket.join(sala);
    });

    socket.on('leave', function(sala){
        console.log("leave na sala: " + sala + " - id" + socket.id);
        socket.leave(sala);
    });

    socket.on('msg', function(Sala, Nome, Idade, Cor, Mensagem){
        socket.to(Sala).emit('msg',Nome, Idade, Cor, Mensagem);
    });


}

module.exports = function(io){
    _io = io;
    return {listen};
};
