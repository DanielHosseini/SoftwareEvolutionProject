'use strict';

describe('ClassController', function() {
    beforeEach(module('myApp'));
    var $controller;

    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
    }));

    describe('$scope.name', function(){
        it('changes the name of the class to main', function(){
            var $scope = {};
            var controller = $controller('ClassController', {$scope: $scope});
            $scope.name = 'not main';
            $scope.setName('main');
            expect($scope.name).toEqual('main');
        });
    });

    describe('$scope.attribute', function(){
        it('adds attribute to the list should be 1 longer', function(){
            var $scope = {};
            var controller = $controller('ClassController', {$scope: $scope});
            var length = $scope.attributes.length;
            $scope.addAttribute('attr1');
            expect($scope.attributes.length).toEqual(length+1);
        });
        it('retrieves the attributelist should return length of 1', function(){
            var $scope = {};
            var controller = $controller('ClassController', {$scope: $scope});
            $scope.addAttribute('attr1');
            expect($scope.attributes.length).toEqual(1);
        });
        it('removes an attribute from the list should return length of 0', function(){
            var $scope = {};
            var controller = $controller('ClassController', {$scope: $scope});
            $scope.addAttribute('attr1');
            $scope.deleteAttribute('attr1');
            expect($scope.attributes.length).toEqual(0);
        });
    });

    describe('$scope.operation', function(){
        it('adds operation to the list should be 1 longer', function(){
            var $scope = {};
            var controller = $controller('ClassController', {$scope: $scope});
            var length = $scope.operations.length;
            $scope.addOperation('opr1');
            expect($scope.operations.length).toEqual(length+1);
        });
        it('retrieves the attributelist should return length of 1', function(){
            var $scope = {};
            var controller = $controller('ClassController', {$scope: $scope});
            $scope.addOperation('opr1');
            expect($scope.operations.length).toEqual(1);
        });
        it('removes an attribute from the list should return length of 0', function(){
            var $scope = {};
            var controller = $controller('ClassController', {$scope: $scope});
            $scope.addOperation('opr1');
            $scope.deleteOperation('opr1');
            expect($scope.operations.length).toEqual(0);
        });
    });

    describe('$scope.position', function(){
        it('updates the position to be (10,10)', function(){
            var $scope = {};
            var controller = $controller('ClassController', {$scope: $scope});
            $scope.updatePosition({x: 10, y: 10});
            expect($scope.position.x).toEqual(10);
            expect($scope.position.y).toEqual(10);
        })
    })
});
