'use strict';

describe('AssociationController', function() {
    beforeEach(module('myApp'));
    var $controller;

    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
    }));

    describe('$scope.name', function(){
        it('changes the name of the Association to testName', function(){
            var $scope = {};
            $controller('AssociationController', {$scope: $scope});
            $scope.name = 'Association_1';
            $scope.setName('testName');
            expect($scope.name).toEqual('testName');
        });
    });

    describe('$scope.direction', function(){
        it('changes the direction of the Association to Directed', function(){
            var $scope = {};
            $controller('AssociationController', {$scope: $scope});
            $scope.direction = 'Undirected';
            $scope.setDirection('Directed');
            expect($scope.direction).toEqual('Directed');
        });
    });

    describe('$scope.type', function(){
        it('changes the type of the Association to Inheritance', function(){
            var $scope = {};
            $controller('AssociationController', {$scope: $scope});
            $scope.type = 'Undirected';
            $scope.setType('Inheritance');
            expect($scope.type).toEqual('Inheritance');
        });
    });

    describe('$scope.label', function(){
        it('changes the label of the Association to testLabel', function(){
            var $scope = {};
            $controller('AssociationController', {$scope: $scope});
            $scope.label = 'Unlabeled';
            $scope.setlabel('testLabel');
            expect($scope.label).toEqual('testLabel');
        });
    });

    describe('$scope.dependency', function(){
        it('changes the dependency of the Association to Dependency', function(){
            var $scope = {};
            $controller('AssociationController', {$scope: $scope});
            $scope.dependency = 'Association';
            $scope.setDependency('Dependency');
            expect($scope.dependency).toEqual('Dependency');
        });
    });

    describe('$scope.multiplicity', function(){
        it('changes multiplicity of Association to be (1)(*)', function(){
            var $scope = {};
            $controller('AssociationController', {$scope: $scope});
            $scope.multiplicity[0] = "multiplicitySource";
            $scope.multiplicity[1] = "multiplicityTarget";
            $scope.setMultiplicity("1","*");
            expect($scope.multiplicity[0]).toEqual("1");
            expect($scope.multiplicity[1]).toEqual("*");
        });
        it('retrieves the multiplicitylist of Association should return [1,*]', function(){
            var $scope = {};
            $controller('AssociationController', {$scope: $scope});
            $scope.setMultiplicity("1","*");
            expect($scope.multiplicity[0]).toEqual("1");
            expect($scope.multiplicity[1]).toEqual("*");
        });
    });
});
