'use strict';
var myApp = angular.module('myApp')
.controller('PackageController', function PackageController($scope) {

	$scope.name = "Package";
	$scope.classes = [];
    $scope.position = null;
    $scope.init = function(position){
        $scope.position = position;
    }
    $scope.setName = function(name){
        $scope.name = name;
    }
    $scope.addClass = function(class){
        $scope.classes.push(class);
    }
    $scope.getClasses = function(){
        return $scope.classes;
    }
    $scope.updatePosition = function(position){
        $scope.position = position;
    }
    
}).directive('packageDirective', function(){
    return {
        templateUrl: 'package/package.html'
    };
});
