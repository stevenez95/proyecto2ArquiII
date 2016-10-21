angular.module('starter.controllers', [])

.controller('ControlsCtrl', function($scope,$interval,Sensing) {
  var stop=0;

  $scope.move = function (dir) {
    if(Sensing.all()) return;
    stop = $interval(function(){
      console.log(dir);
    }, 1000);
  };

  $scope.stopMoving = function(){
    $interval.cancel(stop);
  };


})

.controller('LoggerCtrl', function($scope,$interval,Gas,Temp,Intruder) {
  $scope.gases = {};
  $scope.temps = {};
  $scope.intruders = {};

  $scope.refresh = function(){
    console.log('ref');
    $scope.getGas();
    $scope.getTemp();
    $scope.getIntruder();
  };

  //$scope.refresh():

  $scope.getGas = function(){
    Gas.all().then(function(d) {
      $scope.gases = d;
    });
  };

  $scope.getTemp = function(){
    Temp.all().then(function(d) {
      $scope.temps = d;
    });
  };

  $scope.getIntruder = function(){
    Intruder.all().then(function(d) {
      $scope.intruders = d;
    });
  };

  $interval(function () {
      $scope.refresh();
  }, 5000);

})

.controller('AccountCtrl', function($scope,Sensing) {

  $scope.refresh = function(){
    $scope.sense = Sensing.all();
    console.log($scope.sense);
  };

  $scope.refresh();

  $scope.changeSense = function(){
    Sensing.change();
    $scope.refresh();
  };
});
