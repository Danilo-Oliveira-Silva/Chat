var socket;

(function(){

    socket = io.connect(window.location.origin);
    

    socket.on('listandoSalas', function(Salas){
        
        Salas.forEach(function(Sala){
            var funcao = 'EntrarSala("'+Sala.Codigo+'")';
            $("#listaSalas").append("<li onclick='"+funcao+"'>"+Sala.Nome+"</li>");
        });
        
    });


    socket.emit("listarSalas");



})();


function CriarSala(){
    var nomeSala = document.getElementById("txtCriarSala").value;
    var codigoSala = GerarCodigo();
    
    socket.emit("criarSala", codigoSala, nomeSala);
}

function EntrarSala(SalaCodigo){
    var Nome = $("#txtNome").val();
    var Idade = $("#txtIdade").val();
    var Cor = $("#txtCor").val();
    
    $("#divTelaInicio").css("display","none");
    socket.emit("join",SalaCodigo);
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