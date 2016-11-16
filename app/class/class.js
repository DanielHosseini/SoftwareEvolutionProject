'use strict';
var myApp = angular.module('myApp')
.controller('ClassController', function ClassController($scope) {

    $scope.name = "Class";
    $scope.attributes = [];
    $scope.operations = [];
    $scope.position = null;
    $scope.init = function(position){
        $scope.position = position;
    }
    $scope.setName = function(name){
        $scope.name = name;
    }
    $scope.addAttribute = function(attribute){
        $scope.attributes.push(attribute);
    }
    $scope.getAttributes = function(){
        return $scope.attributes;
    }
    $scope.deleteAttribute = function(attribute){
        var index = $scope.attributes.indexOf(attribute);
        if(index > -1){
            $scope.attributes.splice(index, 1);
        }
    }
    $scope.addOperation = function(operation){
        $scope.operations.push(operation);
    }
    $scope.getOperations = function(){
        return $scope.operations;
    }
    $scope.deleteOperation = function(operation){
        var index = $scope.operations.indexOf(operation);
        if(index > -1){
            $scope.operations.splice(index, 1);
        }
    }
    $scope.updatePosition = function(position){
        $scope.position = position;
    }
})
.directive('classDirective', function(){
    return {
        templateUrl: 'class/class.html'
    };
});
