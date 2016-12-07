'use strict';
var myApp = angular.module('myApp');
myApp.controller('OperationController', ['$scope', 'operationObject', function($scope, operationObject) {

    $scope.operationTemplate = new operationObject("Operation()");

}]).directive('operationDirective', function(){
    return {
        templateUrl: 'operation/operation.html'
    };
});
