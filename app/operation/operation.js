
var myApp = angular.module('myApp');
myApp.controller('OperationController', ['$scope', 'operationObject', function($scope, operationObject) {

    $scope.operationTemplate = new operationObject("Operation()");
    $scope.operationTemplate.id = -1;

}]).directive('operationDirective', function(){
    return {
        templateUrl: 'operation/operation.html'
    };
});
