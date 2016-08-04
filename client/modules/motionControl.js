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
				decel:'500',
				maxSpeed:'600',
				numberOfSteps:'100',
				endstopsDisabled: false,
				pos: 0,
				commandmode: 'run'
			},
			{
				index:'2',
				name: 'Pan',
				type: 'rotary',
				unit: 'deg',
				ratio: '16.666666',
				accel:'300',
				decel:'500',
				maxSpeed:'600',
				numberOfSteps:'100',
				endstopsDisabled: false,
				pos: 0,
				commandmode: 'run'
			},
			{
				index:'3',
				name: 'Tilt',
				type: 'rotary',
				unit: 'deg',
				ratio: '16.666666',
				accel:'300',
				decel:'500',
				maxSpeed:'600',
				numberOfSteps:'100',
				endstopsDisabled: false,
				pos: 0,
				commandmode: 'run'
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
	
	//Stop command
	$scope.stop = function(axis) {
		command = axis.index + "/stop";
		console.log(command);
		//axis.speed = 0;
		socket.emit("command", command);
	}

	//Set home command
	$scope.sethome = function(axis) {
		command = axis.index + "/sethome";
		console.log(command);
		socket.emit("command", command);
	}

	//Go home command
	$scope.gohome = function(axis) {
		command = axis.index + "/gohome";
		console.log(command);
		socket.emit("command", command);
	}
	
	//Command mode
	$scope.commandmode = function(axis,mode) {
		console.log(mode);
		if(mode == "move"){
			console.log("Move Mode");
			axis.commandmode = "move";
			$("#move"+axis.index).addClass("btn-success");
			$("#run"+axis.index).removeClass("btn-success");
			$("#run"+axis.index).addClass("btn-default");
			$("#go"+axis.index).removeClass("btn-success");
			$("#go"+axis.index).addClass("btn-default");
		} else if(mode == "run") {
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



	//Websocket communication with server
	socket.on('position', function(data) {
		//console.log(data);
		var dataobj = JSON.parse(data.trim());
      	$scope.axes[0].pos = dataobj.pos1;
      	$scope.$apply();
    })

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