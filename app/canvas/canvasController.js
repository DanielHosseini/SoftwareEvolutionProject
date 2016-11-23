'use strict';
var myApp = angular.module('myApp');
myApp.controller('canvasController', ['$scope', 'diagramService', function($scope, diagramService) {

    $scope.classes = diagramService.classes;
    $scope.associations = diagramService.associations;
    $scope.packages = diagramService.packages;

    
}]);
