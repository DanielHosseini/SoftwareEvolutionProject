'use strict';
var myApp = angular.module('myApp');
myApp.controller('canvasController', ['$scope', 'diagramService', function($scope, diagramService) {
    var currentlyEditedElement = undefined;
        $scope.hints = false;
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

        $scope.epClick = function(clickEvent) {

          $scope.clickEvent = clickEvent.target.parentElement.id;
          console.log($scope.clickEvent); //ID of surrounding DIV, i.e a Class (id = jsPlumb1.5)
          //Need to make some drag from $scope.ClickEvent to a destination
      };

    $scope.editNameKeyPressed = function(clickedElement, $event) {
        if ($event.which === 13 || event.which === 27) { // 13 enter key, 27 = esc key
            if (clickedElement.name === "") {
                alert("Name must not be empty!");
            } else {
                clickedElement.stopEditName();
            }
        };
    };

        $scope.showHints = function(){
            $scope.hints = !$scope.hints;
        }
    };


    $scope.classMoved = function(event, movedClass) {
        console.log('moved', movedClass);
        movedClass.updatePosition([event.x, event.y]);
    };

    $scope.dragendHandler = function(event, droppedElement) {
        var canvas = angular.element(document.getElementById('diagram-canvas'));
        var canvasLeft = canvas.prop('offsetLeft');
        var canvasTop = canvas.prop('offsetTop');
        droppedElement.updatePosition([event.x - canvasLeft, event.y - canvasTop - event.target.clientHeight]);
        event.stopPropagation();
    };
}])

.directive('toggleEndpoint', function() {
return {
    restrict: 'A', //Restricts to divs
    link: function(scope, element, attrs) {
        element.bind('click', function() {
            element.toggleClass(attrs.toggleEndpoint);
        });
    }
};
})

.directive('toggleSelected', function() {
return {
    restrict: 'A', //Restricts to divs
    link: function(scope, element, attrs) {
        element.bind('click', function() {
          angular.element(document.querySelectorAll(".selected")).removeClass('selected');
            element.toggleClass(attrs.toggleSelected);
        });
    }
};
})

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

.directive('keyHint', function(){
    if(window.navigator.platform==="MacIntel"){
        return {
            replace: true,
            templateUrl: "directives/machints.html"
        }
    }else if((window.navigator.platform).indexOf("Linux")>-1 && (window.navigator.platform).indexOf("arm")>-1){
        return {
            replace: true,
            templateUrl: "directives/windowhints.html"
        }
    }
})
