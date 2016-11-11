'use strict';
angular.module('myApp.operation', ['ngRoute'])
.controller('OperationController', [function OperationController($scope) {
//Implement Methods
   $scope.name = "Operation";
    $scope.position = null;
    $scope.init = function(position){
        $scope.position = position;
    }
    $scope.setName = function(name){
        $scope.name = name;
    }
    $scope.updatePosition = function(position){
        $scope.position = position;
    }
}]);
}]);
