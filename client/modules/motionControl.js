angular.module('motionControl', [])
  .controller('directControlCtrl', DirectControlCtrl)
  .controller('videoCtrl', VideoCtrl)
  .controller('timelapseCtrl', TimelapseCtrl);

function DirectControlCtrl($scope, $http, currentSpot) {
	
	var baseUrl = 'http://arduino.local/';
	
	$scope.axes = [{
				index:'1',
				name: 'Slider',
				show: true,
				accel:'300',
				decel:'500',
				dir:'FWD',
				speed:'200',
				numberOfSteps:'200'
			},
			{
				index:'2',
				name: 'Pan',
				show: false,
				accel:'300',
				decel:'500',
				dir:'FWD',
				speed:'200',
				numberOfSteps:'200'
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
	$scope.setSpeed = function(axis) {
		url = baseUrl + "arduino/" + axis.index + "/speed/" + axis.speed;
		//console.log(url);
		//$http.get(url);
	}
	
	//Move number of steps
	$scope.move = function(axis) {
		url = baseUrl + "arduino/" + axis.index + "/move/" + axis.dir + "/" + axis.numberOfSteps;
		console.log(url);
		$http.get(url);
	}
	
	//Run @speed
	$scope.run = function(axis) {
		url = baseUrl + "arduino/" + axis.index + "/run/" + axis.dir + "/" + axis.speed;
		console.log(url);
		$http.get(url);
	}
	
	//Stop command
	$scope.stop = function(axis) {
		url = baseUrl + "arduino/" + axis.index + "/stop";
		console.log(url);
		$http.get(url);
	}

	//Set home command
	$scope.sethome = function(axis) {
		url = baseUrl + "arduino/" + axis.index + "/sethome";
		console.log(url);
		$http.get(url);
	}

	//Go home command
	$scope.gohome = function(axis) {
		url = baseUrl + "arduino/" + axis.index + "/gohome";
		console.log(url);
		$http.get(url);
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