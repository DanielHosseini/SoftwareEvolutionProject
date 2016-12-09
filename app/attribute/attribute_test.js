'use strict';

describe('AttributeController', function() {
    beforeEach(module('myApp'));
    var $controller;

    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
    }));

    describe('$scope.name', function(){
        it('changes the name of the Attribute to fullName', function(){
            var $scope = {};
            var controller = $controller('AttributeController', {$scope: $scope});
            $scope.attributeTemplate.name = 'Attribute';
            $scope.attributeTemplate.setName('fullName');
            expect($scope.attributeTemplate.name).toEqual('fullName');
        });
    });

});
