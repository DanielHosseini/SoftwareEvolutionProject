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
            $scope.operationTemplate.name = 'Operation()';
            $scope.operationTemplate.setName('doSomething()');
            expect($scope.operationTemplate.name).toEqual('doSomething()');
        });
    });
});
