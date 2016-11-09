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
});