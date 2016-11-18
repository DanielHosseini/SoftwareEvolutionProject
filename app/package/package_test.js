'use strict';

describe('PackageController', function() {
    beforeEach(module('myApp'));
    var $controller;

    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
    }));

    describe('$scope.name', function(){
        it('changes the name of the package to Library', function(){
            var $scope = {};
            var controller = $controller('PackageController', {$scope: $scope});
            $scope.name = 'Package';
            $scope.setName('Library');
            expect($scope.name).toEqual('Library');
        });
    });

    describe('$scope.class', function(){
        it('adds class to the list, should be 1 longer', function(){
            var $scope = {};
            var controller = $controller('PackageController', {$scope: $scope});
            var length = $scope.classes.length;
            $scope.addClass('class1');
            expect($scope.classes.length).toEqual(length+1);
        });
        it('retrieves the classlist, should return length of 1', function(){
            var $scope = {};
            var controller = $controller('PackageController', {$scope: $scope});
            $scope.addClass('class1');
            expect($scope.classes.length).toEqual(1);
        });
        it('removes a class from the list, should return length of 0', function(){
            var $scope = {};
            var controller = $controller('PackageController', {$scope: $scope});
            $scope.addClass('class1');
            $scope.deleteClass('class1');
            expect($scope.classes.length).toEqual(0);
        });
    });

    describe('$scope.position', function(){
        it('updates the position to be (15,50)', function(){
            var $scope = {};
            var controller = $controller('PackageController', {$scope: $scope});
            $scope.updatePosition({x: 15, y: 50});
            expect($scope.position.x).toEqual(15);
            expect($scope.position.y).toEqual(50);
        })
    })
});