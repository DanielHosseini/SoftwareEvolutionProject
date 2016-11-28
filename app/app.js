'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
  'ngRoute',
  'myApp.version',
]);

myApp.controller('AppController', ['$scope', function($scope){
    $scope.tour = false;
    $scope.workflow = false;
    $scope.showTour = function(){
        console.log("clicked")
        $scope.tour=!$scope.tour;
    }
    $scope.showWorkflow = function(){
        console.log("clicked")
        $scope.workflow=!$scope.workflow;
    }
}]);
