//Commandline parqameters
// --mockserialdata  :deactivates serial port and generates mock serial data

// The following node packages are expected to be installed (globally via opkg on TIAN):
// node-express ('/usr/lib/node_modules/express')
// node-socket-io ('/usr/lib/node_modules/socket.io')
// node-serialport ("/usr/lib/node_modules/serialport")

//Get command line arguments
var argv = require('minimist')(process.argv.slice(2));

// ---------------------
// Json Server
//----------------------
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db/db.json');
const middlewares = jsonServer.defaults();
const json_port = 3001;

server.use(middlewares);
server.use(router);
server.listen(3001, () => {
	console.log('JSON server listening on port:' + json_port);
})

// ---------------------
// Websocket connection
//----------------------
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const socket_port = 3000;	//port for io.socket

//Use web app content from dist folder 
const app_dir = __dirname + '/../client/dist';
app.use(express.static(app_dir));
console.log('serving app from ' + app_dir);

//Websocket server start listening  on port
http.listen(socket_port, function () {
	console.log('Websocket server listening on port:' + socket_port);
});

//Handle websocket "connection" event
io.on('connection', function (socket) {
	console.log("Websocket client connected");
	io.emit('message', 'Websocket server connected!');

	//Handle websocket "disconnect" events
	socket.on('disconnect', function () {
		console.log('Websocket client disconnected');
	});

	//Handle "command" events sent from the client
	socket.on('command', function (msg) {
		console.log(msg);
		try {
			serialPort.write(msg);
		}
		catch (err) {
			console.log("Could not write to serial port: " + err);
		}

	});
});

//Handle websocket error event
io.on('error', function (err) {
	console.log('socket.io error: ' + err);
});


// ---------------------
// Serial port connection
//----------------------

const serial_port = "/dev/ttySAMD"; //serial port TIAN
const SerialPort = require('serialport');
var serialPort;

//Open serial port
if (!argv.mockserialdata) {
	openSerialPort(2000);
}
	

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
	}, function () { });

	serialPort.open(function (err) {
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
	serialPort.on('data', function (data) {
		try {
			//Validate received data by parsing into JSON object
			var obj = JSON.parse(data);
			//JSON object is transferred back into string representation
			var str = JSON.stringify(obj);
			//console.log('data received: ' + str);
			io.emit('position', str);
		}
		catch (err) {
			//Log error if received data is not a valid JSON string
			console.log("Error while parsing JSON data!")
		}
	});

	//Before serial port is closed the "disconnect" event is emitted
	serialPort.on('disconnect', function (err) {
		console.log('Serial port disconnected: ' + err);
	});

	//Handle the serial port "close" event
	serialPort.on('close', function () {
		console.log('Serial port closed');
		openSerialPort(2000);
	});

	//Handle serial port "error" event
	serialPort.on('error', function (err) {
		console.log('Serial port error: ' + err);
	});

	//Helper function to realize sleep(milliseconds) function
	function sleep(delay) {
		var start = new Date().getTime();
		while (new Date().getTime() < start + delay);
	}
}

// ------------------------------------------
// Mock serial data generator
//-------------------------------------------
if (argv.mockserialdata) {
	console.log("!!!Generating mock serial data!!!");
	setInterval(function(){
		var obj = {
					"axis1":{"pos":111,"stop1":-1111,"stop2":1111},
					"axis2":{"pos":222,"stop1":-2222,"stop2":2222},
					"axis3":{"pos":333,"stop1":-3333,"stop2":3333}
				};
		var str = JSON.stringify(obj);
		io.emit('position', str);
		//console.log(str);
	 }, 1000);
}

