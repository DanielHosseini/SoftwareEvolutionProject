angular.module('myApp')
.controller('AssociationController', function ($scope) {

    $scope.name = "Association";
    $scope.direction = "Undirected";//Undirected - Directed
    $scope.type = "Undirected";//Undirected - Directed - Aggregation - Composition - Inheritance
    $scope.label = null;
    $scope.dependency = "Association";//Association - Dependency
    $scope.multiplicity = ["",""];//[multiplicitySource, multiplicityTarget]
    $scope.init = function(position){
        $scope.position = position;
    }
    $scope.setName = function(name){
        $scope.name = name;
    }
    $scope.setDirection = function(direction){
        $scope.direction = direction;
    }
    $scope.setType = function(type){
        $scope.type = type;
    }
    $scope.setlabel = function(label){
        $scope.label = label;
    }
    $scope.setDependency = function(dependency){
        $scope.dependency = dependency;
    }
    $scope.setMultiplicity = function(multiplicitySource, multiplicityTarget){
        $scope.multiplicity[0] = multiplicitySource;
        $scope.multiplicity[1] = multiplicityTarget;
    }
    $scope.getMultiplicity = function(){
        return $scope.multiplicity;
    }
})
.directive('associationDirective', function(){
    return {
        templateUrl: 'association/association.html'
    };
});
