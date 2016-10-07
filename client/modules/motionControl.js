angular.module('motionControl', [])
  .controller('directControlCtrl', DirectControlCtrl)
  .controller('videoCtrl', VideoCtrl)
  .controller('timelapseCtrl', TimelapseCtrl);

function DirectControlCtrl($scope, $http, currentSpot) {
	
	var baseUrl = 'http://arduino.local:3000/';
	
	$scope.axes = [{
				index:'1',
				name: 'Slider',
				type: 'linear',
				unit: 'mm',
				ratio: '25', //[step/unit], 8 mm per 200 steps
				accel:'300',
				decel: '500',
                speed: 300,
				maxSpeed:'600',
				numberOfSteps:'100',
				startSoftStopsEnabled: false,
				endSoftStopsEnabled: false,
				startSoftStop: 0,
				endSoftStop: 0,
				pos: 0,
                commandedPos: 0,
                commandmode: 'run',
                programmingState: "OFF"
			},
			{
				index:'2',
				name: 'Pan',
				type: 'rotary',
				unit: 'deg',
				ratio: '16.666666',
				accel:'300',
				decel: '500',
				speed: 300,
				maxSpeed:'600',
				numberOfSteps:'100',
				startSoftStopsEnabled: false,
				endSoftStopsEnabled: false,
				startSoftStop: 0,
				endSoftStop: 0,
				pos: 0,
				commandedPos: 0,
				commandmode: 'run',
				programmingState: "OFF"
			},
			{
				index:'3',
				name: 'Tilt',
				type: 'rotary',
				unit: 'deg',
				ratio: '16.666666',
				accel:'300',
				decel: '500',
				speed: 300,
				maxSpeed:'600',
				numberOfSteps:'100',
				startSoftStopsEnabled: false,
				endSoftStopsEnabled: false,
				startSoftStop: 0,
				endSoftStop: 0,
				pos: 0,
				commandedPos: 0,
				commandmode: 'run',
				programmingState: "OFF"
			}
		];


	$scope.show = function(axis) {
		var i;
		for (i in $scope.axes) {
			if ($scope.axes[i].index == axis.index)
				$scope.axes[i].show = true;
			else
				$scope.axes[i].show = false;
		}
		console.log($scope.axes[0].show + "/" + $scope.axes[1].show);
	}

	
	//Set acceleration
	$scope.setAcceleration = function(axis) {
		url = baseUrl + "arduino/" + axis.index + "/acc/" + axis.accel;
		console.log(url);
		$http.get(url);
	}
	
	//Set deceleration
	$scope.setDeceleration = function(axis) {
		url = baseUrl + "arduino/" + axis.index + "/dec/" + axis.decel;
		console.log(url);
		$http.get(url);
	}
	
	//Move number of steps
	$scope.move = function(axis,dir,steps) {
		command = axis.index + "/move/" + dir + "/" + steps;
		console.log(command);
		socket.emit("command", command);
	}
	
	//Run @speed
	$scope.run = function(axis,speed) {
		command = axis.index + "/run/" + speed;
		console.log(command);
		socket.emit("command", command);
	}

    //Go to position
	$scope.go = function (axis, pos) {
	    command = axis.index + "/go/" + pos;
	    console.log(command);
	    socket.emit("command", command);
	}
	
	//Stop command
	$scope.stop = function(axis) {
		command = axis.index + "/stop";
		console.log(command);
		//axis.speed = 0;
		socket.emit("command", command);
	}

	// Home button
	$scope.home = function (axis) {
	    if(axis.programmingState == "OFF") {
	        command = axis.index + "/gohome";
	        console.log(command);
	        socket.emit("command", command);
	    } else if (axis.programmingState == "REC") {
	        command = axis.index + "/sethome";
	        console.log(command);
	        socket.emit("command", command);
	    }

	}
	
	//Command mode
	$scope.commandmode = function(axis,mode) {
		console.log(mode);
		/*if(mode == "move"){
			console.log("Move Mode");
			axis.commandmode = "move";
			$("#move"+axis.index).addClass("btn-success");
			$("#run"+axis.index).removeClass("btn-success");
			$("#run"+axis.index).addClass("btn-default");
			$("#go"+axis.index).removeClass("btn-success");
			$("#go"+axis.index).addClass("btn-default");
		} else*/
		if (mode == "run") {
			console.log("Run Mode");
			axis.commandmode = "run";
			$("#run"+axis.index).addClass("btn-success");
			$("#move"+axis.index).removeClass("btn-success");
			$("#move"+axis.index).addClass("btn-default");
			$("#go"+axis.index).removeClass("btn-success");
			$("#go"+axis.index).addClass("btn-default");
		} else if(mode == "go") {
			console.log("Go Mode");
			axis.commandmode = "go";
			$("#go"+axis.index).addClass("btn-success");
			$("#move"+axis.index).removeClass("btn-success");
			$("#move"+axis.index).addClass("btn-default");
			$("#run"+axis.index).removeClass("btn-success");
			$("#run"+axis.index).addClass("btn-default");
		}
			
	}

	$scope.recordToggle = function (axis) {
        console.log("toggle recording!")
	    if (axis.programmingState == "OFF") {
	        axis.programmingState = "REC";
            $("#record" + axis.index).addClass("REC");
            $("#startsoftstop" + axis.index).addClass("REC");
            $("#endsoftstop" + axis.index).addClass("REC");
            $("#home" + axis.index).addClass("REC");
	    }
	    else {
	        axis.programmingState = "OFF";
	        $("#record" + axis.index).removeClass("REC");
	        $("#startsoftstop" + axis.index).removeClass("REC");
	        $("#endsoftstop" + axis.index).removeClass("REC");
            $("#home" +axis.index).removeClass("REC");
        }
	}

	$scope.deleteToggle = function (axis) {
	    console.log("toggle delete!")
	    if (axis.programmingState == "OFF") {
	        axis.programmingState = "DEL";
	        $("#delete" + axis.index).addClass("DEL");
	        $("#startsoftstop" + axis.index).addClass("DEL");
	        $("#endsoftstop" + axis.index).addClass("DEL");
	    }
	    else {
	        axis.programmingState = "OFF";
	        $("#delete" + axis.index).removeClass("DEL");
	        $("#startsoftstop" + axis.index).removeClass("DEL");
	        $("#endsoftstop" + axis.index).removeClass("DEL");
	    }
	}

    //Stops
	$scope.startSoftStopClicked = function (axis) {
	    if (axis.programmingState == "OFF") {
	        command = axis.index + "/gostartsoftstop";
	        execute(command);
	    } else if (axis.programmingState == "REC") {
	        command = axis.index + "/markstartsoftstop";
	        execute(command);
	        axis.startSoftStop = axis.pos;
	    } else if (axis.programmingState == "DEL") {
	        command = axis.index + "/deletestartsoftstop";
	        execute(command);
	        axis.startSoftStop = 0;
	    }
	}

	$scope.endSoftStopClicked = function (axis) {
	    if (axis.programmingState == "OFF") {
	        command = axis.index + "/goendsoftstop";
	        execute(command);
	    } else if (axis.programmingState == "REC") {
	        command = axis.index + "/markendsoftstop";
	        execute(command);
	        axis.endSoftStop = axis.pos;
	    }
	    else if (axis.programmingState == "DEL") {
	        command = axis.index + "/deleteendsoftstop";
	        execute(command);
	        axis.endSoftStop = 0;
	    }
	}




	//Websocket communication with server
	socket.on('position', function(data) {
		console.log(data);
		data.trim();
		var dataobj = JSON.parse(data);
      	$scope.axes[0].pos = dataobj.pos1;
		$scope.axes[1].pos = dataobj.pos2;
		$scope.axes[2].pos = dataobj.pos3;
      	$scope.$apply();
    })

}

function execute(command) {
	console.log(command);
	socket.emit("command", command);
}


function VideoCtrl(currentSpot) {
}

function TimelapseCtrl() {
}

function extend(obj) {
	function E(){};
	E.prototype = obj;
	return new E();
}
