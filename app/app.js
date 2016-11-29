'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
  'ngRoute',
  'myApp.version',
]);

myApp.controller('AppController', ['$scope', 'diagramService', function($scope, diagramService){
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

    $scope.clear  = function(){
        console.log("clearing")
        diagramService.clearAll();
    }
}]);

myApp.directive('ngConfirmClick', [function(){
    return{
        link: function (scope, element, attr) {
            var msg = attr.ngConfirmClick || "Are you sure?";
            var clickAction = attr.confirmedClick;
            element.bind('click',function (event) {
                if ( window.confirm(msg) ) {
                    console.log("confirmed")
                    scope.$eval(clickAction);
                }
            });
        }
    }
}])
