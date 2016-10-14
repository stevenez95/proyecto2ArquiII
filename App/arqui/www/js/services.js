angular.module('starter.services', [])

.factory('Gas', function($http) {  
  return {
    all: function() {
      var promise = $http.get('http://localhost:8080/api/gas').then(function (response) {
        return response.data;
      });
      return promise;
    }
  };
})
.factory('Temp', function($http) {  
  return {
    all: function() {
      var promise = $http.get('http://localhost:8080/api/temp').then(function (response) {
        return response.data;
      });
      return promise;
    }
  };
})
.factory('Intruder', function($http) {  
  return {
    all: function() {
      var promise = $http.get('http://localhost:8080/api/intruder').then(function (response) {
        return response.data;
      });
      return promise;
    }
  };
});

