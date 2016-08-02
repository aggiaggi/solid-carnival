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
				speed:'0',
				numberOfSteps:'100'
			},
			{
				index:'2',
				name: 'Pan',
				type: 'rotary',
				unit: 'deg',
				ratio: '16.666666',
				accel:'300',
				decel:'500',
				speed:'100',
				numberOfSteps:'100'
			},
			{
				index:'3',
				name: 'Tilt',
				type: 'rotary',
				unit: 'deg',
				ratio: '16.666666',
				accel:'300',
				decel:'500',
				speed:'100',
				numberOfSteps:'100'
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

	//Change direction
	$scope.changeDirection = function(axis) {
		if (axis.dir == 'FWD')
			axis.dir = 'REV';
		else
			axis.dir = 'FWD';
		console.log("Direction: " + axis.dir);
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
	
	//Set speed
	//$scope.setSpeed = function(axis) {
		//url = "run/" + axis.index + "/" + axis.speed;
		//console.log(url);
		//$http.get(url);
	//}
	
	//Move number of steps
	$scope.move = function(axis) {
		command = axis.index + "/move/" + axis.dir + "/" + axis.numberOfSteps;
		console.log(command);
		socket.emit("command", command);
	}
	
	//Run @speed
	$scope.run = function(axis) {
		command = axis.index + "/run/" + axis.speed;
		console.log(command);
		socket.emit("command", command);
	}
	
	//Stop command
	$scope.stop = function(axis) {
		command = axis.index + "/stop";
		console.log(command);
		axis.speed = 0;
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