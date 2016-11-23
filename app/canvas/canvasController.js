'use strict';
var myApp = angular.module('myApp');
myApp.controller('canvasController', ['$scope', 'diagramService', function($scope, diagramService) {

	$scope.diagram = diagramService.diagram;
	
    $scope.classes = $scope.diagram.classes;
    $scope.associations = diagramService.associations;
    $scope.packages = diagramService.packages;
}])
.directive('canvasClassesDirective', function(){
    return {
    	replace: true,
        templateUrl: 'canvas/classes.html'
    };
});
