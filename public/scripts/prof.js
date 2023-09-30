var socket;
var minhaSalaAtual = "";
var Nome = "";
var Idade = "";
var Cor = "";
var codigoSala = "";

(function(){

    socket = io.connect(window.location.origin);
    
    socket.on('codigo-gerado', function(codigo){
        codigoSala = codigo;
        $("#divCodigo").append(codigo);
    });

    socket.on("entrou-sala", function(nomeAluno){
        console.log("entrou-sala" + nomeAluno);
        $("#tableAlunos").append("<tr><td>"+nomeAluno+"</td></tr>");
    });

    socket.on("questao", function(question){
        $("#tdQuestion").html(question.question);
        $("#tdRespA").html(question.respA);
        $("#tdRespB").html(question.respB);
        $("#tdRespC").html(question.respC);
        $("#tdRespD").html(question.respD);
    });


    socket.emit("conn-prof");

})();

function IniciarJogo() {

    socket.emit("iniciar-jogo", codigoSala);
}
