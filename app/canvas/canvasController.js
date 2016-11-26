'use strict';
var myApp = angular.module('myApp');
myApp.controller('canvasController', ['$scope', 'diagramService', function($scope, diagramService) {

        var currentlyEditedElement = undefined;

        $scope.diagram = diagramService.diagram;
        $scope.packages = $scope.diagram.packages;
        $scope.classes = $scope.diagram.classes;
        $scope.associations = diagramService.associations;
        diagramService.addObserver(function() {
            $scope.$apply();
        });

        $scope.doubleClick = function(clickedElement) {
            // TODO, stop editing all other classes and packages
            clickedElement.startEditName();
        };

        $scope.editNameKeyPressed = function(clickedElement, $event) {
            if ($event.which === 13 || event.which === 27) { // 13 enter key, 27 = esc key
                clickedElement.stopEditName();
            };
        };
    }])
    .directive('canvasClassesDirective', function() {
        return {
            replace: true,
            templateUrl: 'canvas/classes.html'
        };
    })

.directive('canvasPackagesDirective', function() {
    return {
        replace: true,
        templateUrl: 'canvas/packages.html'
    };
})
