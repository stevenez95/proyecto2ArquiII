angular.module('starter.controllers', ['ionic.cloud'])

.controller('ControlsCtrl', function($scope,$interval,$ionicPush) {
  console.log('sdfds');
  $ionicPush.register().then(function(t) {
  return $ionicPush.saveToken(t);
}).then(function(t) {
  console.log('Token saved:', t.token);
  alert(t.token);
});

$scope.$on('cloud:push:notification', function(event, data) {
  var msg = data.message;
  alert(msg.title + ': ' + msg.text);
});
  var stop=0;

  $scope.move = function (dir) {
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

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
