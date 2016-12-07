'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
  'ngRoute',
  'myApp.version',
  'dndLists'
]);

myApp.controller('AppController', ['$scope', 'diagramService', 'observerService', function($scope, diagramService, observerService){
    $scope.tour = false;
    $scope.workflow = false;
    $scope.about = false;
    $scope.cite = false;
    $scope.feedback = false;
    $scope.question = "";
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

    $scope.clear  = function(){
        console.log("clearing")
        diagramService.clearAll();
    }
    $scope.showFeedback = function(){
        console.log("clicked")
        $scope.feedback = !$scope.feedback;
    }
    $scope.sendFeedback = function() {
        console.log($scope.question);
        observerService.addLogEntry($scope.question);
        $scope.feedback = !$scope.feedback;
    }
}]);

myApp.directive('ngConfirmClick', [function(){
    return{
        link: function (scope, element, attr) {
            var msg = attr.ngConfirmClick || "Are you sure?";
            var clickAction = attr.confirmedClick;
            element.bind('click',function () {
                if ( window.confirm(msg) ) {
                    scope.$eval(clickAction);
                }
            });
        }
    }
}]);

myApp.directive('workflowDirective', function(){
    return {
        templateUrl: 'directives/workflow.html'
    };
});

myApp.directive('aboutDirective', function(){
    return {
        templateUrl: 'directives/about.html'
    };
});

myApp.directive('feedbackDirective', function(){
    return {
        templateUrl: 'directives/feedback.html'
    };
});
