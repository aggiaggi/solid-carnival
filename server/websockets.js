var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);
var readline = require('readline');	// include the readline module

// create an interface to read lines from the Arduino:
var lineReader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});


console.log("Hello Arduino");			// send an intial message on startup

app.use(express.static('/mnt/sd/arduino/webapp/client'));

var port = 3000;

/*app.get('/', function(req, res){
  res.sendfile('public/main.html');
});*/

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  
  socket.on('command', function(msg){
    console.log(msg);
  });
});

http.listen(port, function(){
  //console.log('listening on *:' + port);
});

// when you get a newline in the stdin (ends with \n),
// send a reply out the stdout:
lineReader.on('line', function (data) {
  io.emit('position', parseInt(data));
});