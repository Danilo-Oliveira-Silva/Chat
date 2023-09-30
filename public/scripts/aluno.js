var socket;
var minhaSalaAtual = "";
var Nome = "";
var Idade = "";
var Cor = "";

(function(){

    socket = io.connect(window.location.origin);
    
    socket.on("questao", function(question){
        $("#tdQuestion").html(question.question);
        $("#tdRespA").html(question.respA);
        $("#tdRespB").html(question.respB);
        $("#tdRespC").html(question.respC);
        $("#tdRespD").html(question.respD);
    });

    socket.emit("conn-aluno");

})();


function EntrarNaSala()
{   
    var nomeAluno = $("#txtNome").val();
    var codigoSala = $("#txtCodigo").val();

    console.log(nomeAluno + " - " + codigoSala);
    socket.emit("entrar-sala", codigoSala, nomeAluno);
}