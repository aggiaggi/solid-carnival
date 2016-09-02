var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort("/dev/ttySAMD", {
    baudrate: 400000,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false
}, false);

app.use(express.static('/webapp/client'));

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
	serialPort.write(msg);
  });
});

http.listen(port, function(){
  //console.log('listening on *:' + port);
});


serialPort.on("open", function () {
    console.log('open');
	serialPort.write("Hello Arduino");			// send an intial message on startup
    serialPort.on('data', function(data) {
		try {
			var obj = JSON.parse(data);
			var str = JSON.stringify(obj);
        	//console.log('data received: ' + str);
			io.emit('position', str);
		}
		catch(err){
			console.log("Error while parsing JSON data!")
		}
    });
});

serialPort.on('error', function(err) {
    console.log('error: '+err);
});

serialPort.open();