'use strict';

describe('OperationController', function() {
    beforeEach(module('myApp'));
    var $controller;

    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
    }));

    describe('$scope.name', function(){
        it('changes the name of the Operation to fullName', function(){
            var $scope = {};
            var controller = $controller('OperationController', {$scope: $scope});
            $scope.name = 'Operation';
            $scope.setName('fullName');
            expect($scope.name).toEqual('fullName');
        });
    });

    describe('$scope.position', function(){
        it('updates the position to be (20,10)', function(){
            var $scope = {};
            var controller = $controller('OperationController', {$scope: $scope});
            $scope.updatePosition({x: 20, y: 10});
            expect($scope.position.x).toEqual(20);
            expect($scope.position.y).toEqual(10);
        })
    })
});