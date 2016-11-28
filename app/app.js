'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
  'ngRoute',
  'myApp.version',
]);

myApp.controller('AppController', ['$scope', function($scope){
    $scope.show = false;
    $scope.showTour = function(){
        console.log("clicked")
        $scope.show=!$scope.show;
    }
}]);
