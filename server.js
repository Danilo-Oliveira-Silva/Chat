//npm install express --save
//npm install socket.io

const express = require('express');
const app  = express();

let server;
let port;

const http = require('http');
server = http.createServer(app);
port = 3000;

const io = require('socket.io')(server);
const Room = require('./Room')(io);
io.sockets.on('connection', Room.listen);
io.sockets.on('error', e => console.log(e));

app.use(express.static(__dirname + '/public'));

app.get("/professor",function(req, res){
    res.sendFile(__dirname + '/public/prof.html');
});

app.get("/aluno",function(req, res){
    res.sendFile(__dirname + '/public/aluno.html');
});



server.listen(port, () => console.log("Chat online"));