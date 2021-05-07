var socket;
var minhaSalaAtual = "";
var Nome = "";
var Idade = "";
var Cor = "";

(function(){

    socket = io.connect(window.location.origin);
    

    socket.on('listandoSalas', function(Salas){
        
        $("#listaSalas").html("");
        Salas.forEach(function(Sala){
            var funcao = 'EntrarSala("'+Sala.Codigo+'","'+Sala.Nome+'")';
            $("#listaSalas").append("<li onclick='"+funcao+"'>"+Sala.Nome+"</li>");
        });
        
    });

    socket.on('recarregarSalas', function(){
        socket.emit("listarSalas");    
    });

    socket.on('msg', function(Nome, Idade, Cor, Mensagem){
        AddMsg(Nome, Idade, Cor, Mensagem);
    });


    socket.emit("listarSalas");



})();


function CriarSala(){
    var nomeSala = document.getElementById("txtCriarSala").value;
    var codigoSala = GerarCodigo();
    minhaSalaAtual = codigoSala;
    socket.emit("criarSala", codigoSala, nomeSala);
    EntrarSala(codigoSala, nomeSala);
}

function EntrarSala(SalaCodigo, SalaNome){
    Nome = $("#txtNome").val();
    Idade = $("#txtIdade").val();
    Cor = $("#txtCor").val();
    
    $("#divTelaInicio").css("display","none");
    $("#divTelaMensagens").css("display","block");
    $("#SalaNome").html(SalaNome);

    socket.emit("join",SalaCodigo);
    minhaSalaAtual = SalaCodigo;
}

function SairSala(){
    socket.emit("leave", minhaSalaAtual);
    minhaSalaAtual = "";
    $("#divMensagens").html("");
    $("#divTelaInicio").css("display","");
    $("#divTelaMensagens").css("display","none");
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

function EnviarMsg(){
    var txtMensagem = $("#txtMensagem").val();
    socket.emit("msg", minhaSalaAtual, Nome, Idade, Cor, txtMensagem);
    AddMsg(Nome, Idade, Cor, txtMensagem);
    $("#txtMensagem").val("");
}

function AddMsg(Nome, Idade, Cor, Mensagem){

    var html = '';
    html += '<div class="divMensagem">';
    html += '<label class="msgNome" style="color:'+Cor+';">'+Nome+', '+Idade+'</label>';
    html += '<label class="msgTexto">'+Mensagem+'</label>';
    html += '</div>';
    $("#divMensagens").append(html);

}