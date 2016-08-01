angular.module('main', ['ngRoute', 'core', 'ngTouch', 'motionControl'])
  .controller('adminCtrl', AdminCtrl)
  .controller('mainCtrl', MainCtrl)
  .config(function ($routeProvider) {
    $routeProvider.when('/directControl', {
      templateUrl: 'views/directControl.html',
      controller: 'directControlCtrl'
    });
    $routeProvider.when('/video', {
      templateUrl: 'views/video.html',
      controller: 'videoCtrl'
    });
    $routeProvider.when('/timelapse', {
      templateUrl: 'views/timelapse.html',
      controller: 'timelapseCtrl'
    });
    $routeProvider.otherwise({
      templateUrl: 'views/directControl.html',
      controller: 'directControlCtrl'
    });
  });

function AdminCtrl($scope, currentSpot) {
  $scope.isActive = isActive;
  $scope.getTitle = getTitle;
  $scope.getActiveMenu = getActiveMenu;

  function isActive(menuId) {
    return currentSpot.getActiveMenu() == menuId;
  }

  function getTitle() {
    return currentSpot.getTitle();
  }

  function getActiveMenu() {
    return currentSpot.getActiveMenu();
  }
}

function MainCtrl(currentSpot) {
}
