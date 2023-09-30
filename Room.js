let _io;
var Salas = [];

var questions = [
     {
        "question": "pergunta A",
        "respA": "AA",
        "respB": "AB",
        "respC": "AC",
        "respD": "AD"
    },
     {
        "question": "pergunta B",
        "respA": "BA",
        "respB": "BB",
        "respC": "BC",
        "respD": "BD"
    }
];


function listen(socket){
    const io = _io;
    console.log("nome client - "+ socket.id);

    socket.on('conn-prof', function(){
        var codigo = GerarCodigo();
        socket.join(codigo);
        var novaSala = {
            "Codigo": codigo,
            "Questao": 0
        };
        Salas.push(novaSala);
        socket.emit('codigo-gerado', codigo);
    });

    socket.on('conn-aluno', function(){

    });

    socket.on("entrar-sala", function(codigoSala, nomeAluno){
        console.log(nomeAluno + " - " + codigoSala);
        socket.join(codigoSala);
        socket.to(codigoSala).emit("entrou-sala", nomeAluno);
    });

    socket.on("iniciar-jogo", function(codigoSala){
        socket.to(codigoSala).emit("questao", questions[1]);
    });
    /*
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
*/

}


function GerarCodigo(){
    var letras = "ABCDEFGHIJKLMNOPQRSTUVXWYZ";
    var num = 0;
    var codigo = "";

    for(var i = 0; i < 9; i++)
    {
        num = Math.floor(Math.random() * 25) + 1;
        codigo = codigo + letras.substr(num,1);
    }
    return codigo;
    
}


module.exports = function(io){
    _io = io;
    return {listen};
};
