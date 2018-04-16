var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8080, function() {
    console.log('Servidor corriendo en http://138.4.94.48:80');
});
var messages = [];

io.on('connection', function(socket) {
    //console.log('Alguien se ha conectado con Sockets');
    socket.emit('messages', messages);
  
    socket.on('new-message', function(data) {
      //messages.push(data);
  
      io.sockets.emit('messages', data);
    });
  });

app.use(express.static('public'));