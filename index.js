var app = require('express')();
var http = require('http').Server(app);

// include the socket library
var io = require('socket.io')(http);

app.get('/socket.js', function(req, res){
res.sendFile(__dirname + '/socket.js');
});


app.get('/', function(req, res){
res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('User connected.');
    
    socket.on('disconnect', function(){
        console.log('User disconnected.');
    });
    
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
    
});

    
http.listen(3000, function(){
  console.log('listening on *:3000');
});