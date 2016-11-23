'use strict';
var myApp = angular.module('myApp');
myApp.controller('PackageController', ['$scope', function($scope) {

	$scope.name = "Package";
	$scope.classes = [];
    $scope.position = null;
    $scope.init = function(position){
        $scope.position = position;
    }
    $scope.setName = function(name){
        $scope.name = name;
    }
    $scope.addClass = function(classs){
        $scope.classes.push(classs);
    }
    $scope.getClasses = function(){
        return $scope.classes;
    }
    $scope.deleteClass = function(classs){
        var index = $scope.classes.indexOf(classs);
        if(index > -1){
            $scope.classes.splice(index, 1);
        }
    }
    $scope.updatePosition = function(position){
        $scope.position = position;
    }
}])
.directive('packageDirective', function(){
    return {
        templateUrl: 'package/package.html'
    };
});
