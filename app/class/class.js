'use strict';
var myApp = angular.module('myApp');
myApp.controller('ClassController', ['$scope', 'classObject', 'diagramService', function($scope, classObject, diagramService) {

        $scope.classTemplate = new classObject("Class", []);
        $scope.classTemplate.id = -1;

        $scope.newClassDragEndHandler = function(event, droppedClass) {
            var canvas = angular.element(document.getElementById('diagram-canvas'));
            var canvasLeft = canvas.prop('offsetLeft');
            var canvasTop = canvas.prop('offsetTop');

            var newElement = new classObject(droppedClass.name, [event.x - canvasLeft, event.y - canvasTop - event.target.clientHeight]);
            diagramService.addClass(newElement);

            event.stopPropagation();
        };
    }])
    .directive('classDirective', function() {
        return {
            templateUrl: 'class/class.html'
        };
});
