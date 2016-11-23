'use strict';
var myApp = angular.module('myApp');
myApp.controller('AttributeController', function ($scope) {

    $scope.name = "Attribute";
    $scope.position = null;
    $scope.init = function(position){
        $scope.position = position;
    }
    $scope.setName = function(name){
        $scope.name = name;
    }
    $scope.updatePosition = function(position){
        $scope.position = position;
    }
}).directive('attributeDirective', function(){
    return {
        templateUrl: 'attribute/attribute.html'
    };
});
