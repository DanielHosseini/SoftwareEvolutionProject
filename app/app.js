'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
  'ngRoute',
  'myApp.version',
]);

myApp.controller('AppController', ['$scope', function($scope){
    $scope.tour = false;
    $scope.workflow = false;
    $scope.about = false;
    $scope.cite = false;
    $scope.toolbox = true;
    $scope.showTour = function(){
        console.log("clicked")
        $scope.tour=!$scope.tour;
    }
    $scope.showWorkflow = function(){
        console.log("clicked")
        $scope.workflow=!$scope.workflow;
    }
    $scope.showAbout = function(){
        console.log("clicked")
        $scope.about=!$scope.about;
    }
    $scope.showCite = function(){
        console.log("clicked")
        $scope.cite=!$scope.cite;
    }

    $scope.showToolbox = function(){
        console.log("clicked")
        $scope.toolbox=!$scope.toolbox;
    }
}]);
