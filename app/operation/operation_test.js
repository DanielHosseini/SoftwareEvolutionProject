'use strict';

describe('OperationController', function() {
    beforeEach(module('myApp'));
    var $controller;

    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
    }));

    describe('$scope.name', function(){
        it('changes the name of the Operation() to doSomething()', function(){
            var $scope = {};
            var controller = $controller('OperationController', {$scope: $scope});
            $scope.name = 'Operation()';
            $scope.setName('doSomething()');
            expect($scope.name).toEqual('doSomething()');
        });
    });

    describe('$scope.position', function(){
        it('updates the position to be (150,50)', function(){
            var $scope = {};
            var controller = $controller('OperationController', {$scope: $scope});
            $scope.updatePosition({x: 150, y: 50});
            expect($scope.position.x).toEqual(150);
            expect($scope.position.y).toEqual(50);
        })
    })
});