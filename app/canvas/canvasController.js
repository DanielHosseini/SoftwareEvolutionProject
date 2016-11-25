'use strict';
var myApp = angular.module('myApp');
myApp.controller('canvasController', ['$scope', 'diagramService', function($scope, diagramService) {

	$scope.diagram = diagramService.diagram;
    $scope.packages = $scope.diagram.packages;
    $scope.classes = $scope.diagram.classes;
    $scope.associations = diagramService.associations;
    diagramService.addObserver(function(){
        $scope.$apply();
    })
}])
.directive('canvasClassesDirective', function(){
    return {
    	replace: true,
        templateUrl: 'canvas/classes.html'
    };
})

.directive('canvasPackagesDirective', function(){
    return {
        replace: true,
        templateUrl: 'canvas/packages.html'
    };
})
