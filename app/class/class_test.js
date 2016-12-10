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
            $controller('ClassController', {$scope: $scope});
            $scope.classTemplate.name = 'not main';
            $scope.classTemplate.setName('main');
            expect($scope.classTemplate.name).toEqual('main');
        });
    });

    describe('$scope.attribute', function(){
        it('adds attribute to the list should be 1 longer', function(){
            var $scope = {};
            $controller('ClassController', {$scope: $scope});
            var length = $scope.classTemplate.attributes.length;
            $scope.classTemplate.addAttribute('attr1');
            expect($scope.classTemplate.attributes.length).toEqual(length+1);
        });
        it('retrieves the attributelist should return length of 1', function(){
            var $scope = {};
            $controller('ClassController', {$scope: $scope});
            $scope.classTemplate.addAttribute('attr1');
            expect($scope.classTemplate.attributes.length).toEqual(1);
        });
        it('removes an attribute from the list should return length of 0', function(){
            var $scope = {};
            $controller('ClassController', {$scope: $scope});
            $scope.classTemplate.addAttribute('attr1');
            $scope.classTemplate.deleteAttribute('attr1');
            expect($scope.classTemplate.attributes.length).toEqual(0);
        });
    });

    describe('$scope.operation', function(){
        it('adds operation to the list should be 1 longer', function(){
            var $scope = {};
            $controller('ClassController', {$scope: $scope});
            var length = $scope.classTemplate.operations.length;
            $scope.classTemplate.addOperation('opr1');
            expect($scope.classTemplate.operations.length).toEqual(length+1);
        });
        it('retrieves the attributelist should return length of 1', function(){
            var $scope = {};
            $controller('ClassController', {$scope: $scope});
            $scope.classTemplate.addOperation('opr1');
            expect($scope.classTemplate.operations.length).toEqual(1);
        });
        it('removes an attribute from the list should return length of 0', function(){
            var $scope = {};
            $controller('ClassController', {$scope: $scope});
            $scope.classTemplate.addOperation('opr1');
            $scope.classTemplate.deleteOperation('opr1');
            expect($scope.classTemplate.operations.length).toEqual(0);
        });
    });

    describe('$scope.position', function(){
        it('updates the position to be (10,10)', function(){
            var $scope = {};
            $controller('ClassController', {$scope: $scope});
            $scope.classTemplate.updatePosition({x: 10, y: 10});
            expect($scope.classTemplate.position.x).toEqual(10);
            expect($scope.classTemplate.position.y).toEqual(10);
        })
    })
});
