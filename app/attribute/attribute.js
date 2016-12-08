
var myApp = angular.module('myApp');
myApp.controller('AttributeController', ['$scope', 'attributeObject', function($scope, attributeObject) {

    $scope.attributeTemplate = new attributeObject("Attribute");

}]).directive('attributeDirective', function(){
    return {
        templateUrl: 'attribute/attribute.html'
    };
});
