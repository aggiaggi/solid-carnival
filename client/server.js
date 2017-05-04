var socket_port = 3000;	//port for io.socket
var serial_port = "/dev/ttySAMD"; //serial port

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//var SerialPort = require("/usr/lib/node_modules/serialport").SerialPort
var SerialPort = require("/usr/lib/node_modules/serialport");
var serialPort;

//app.use(express.static('/webapp/client'));
app.use(express.static('/webapp-ng2/webapp/client/src'));
//app.use('/node_modules', express.static('/webapp-ng2/webapp/client/node_modules'));

// ---------------------
// Websocket connection
//----------------------

//Websocket server start listening  on port
http.listen(socket_port, function(){
  console.log('Websocket server listening on localhost:' + socket_port);
});

//Handle websocket "connection" event
io.on('connection', function(socket){
	console.log("Websocket client connected");
  
  //Handle websocket "disconnect" events
  socket.on('disconnect', function(){
    console.log('Websocket client disconnected');
  });
  
  //Handle "command" events sent via the websocket connection
  socket.on('command', function(msg){
    console.log(msg);
	try {
		serialPort.write(msg);
	}
	catch(err) {
		console.log("Could not write to serial port: " + err);
	}
	
  });
});

//Handle websocket error event
io.on('error', function(err){
	console.log('socket.io error: ' + err);
});


// ---------------------
// Serial port connection
//----------------------

//Open serial port
openSerialPort(2000);

//Recusrsive function that tries to open serial port
//waittime: delay between attempts 
function openSerialPort(waittime) {
	
	console.log('Trying to open Serial port');
	
	serialPort = new SerialPort(serial_port, {
		autoOpen: false,
	    baudrate: 400000,
	    dataBits: 8,
	    parity: 'none',
	    stopBits: 1,
	    flowControl: false
	}, function(){});
	
	serialPort.open(function (err){
		if (err) {
			console.log("Serial port failed to open: " + err);
			console.log('Waiting for ' + waittime + ' ms');
			sleep(waittime);
			openSerialPort(waittime);
		}
	});
	
	//Handle serial port "open" event after successful connection
	serialPort.on("open", function () {
	    console.log("Serial port" + serial_port + " open!");
	
		// send an intial message to MCU on startup
		serialPort.write("Websocket server connected via the serial port " + serial_port);			
	
	
	});

	//Handle incoming data
	serialPort.on('data', function(data) {
		try {
			//Validate received data by parsing into JSON object
			var obj = JSON.parse(data);
			//JSON object is transferred back into string representation
			var str = JSON.stringify(obj);
	    	//console.log('data received: ' + str);
			io.emit('position', str);
		}
		catch(err){
			//Log error if received data is not a valid JSON string
			console.log("Error while parsing JSON data!")
		}
	});

	//Before serial port is closed the "disconnect" event is emitted
	serialPort.on('disconnect', function(err) {
	    console.log('Serial port disconnected: ' + err);
	});

	//Handle the serial port "close" event
	serialPort.on('close', function() {
	    console.log('Serial port closed');
		openSerialPort(2000);
	});

	//Handle serial port "error" event
	serialPort.on('error', function(err) {
	    console.log('Serial port error: '+err);
	});
	
	//Helper function to realize sleep(milliseconds) function
	function sleep(delay) {
		var start = new Date().getTime();
		while (new Date().getTime() < start + delay);
	}
}

