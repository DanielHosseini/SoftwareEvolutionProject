'use strict';
//Implement Methods
var myApp = angular.module('myApp')
.controller('OperationController', function OperationController($scope) {

    $scope.name = "Operation()";
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
}).directive('operationDirective', function(){
    return {
        templateUrl: 'operation/operation.html'
    };
});
