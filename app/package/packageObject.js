'use strict';
var myApp = angular.module('myApp');
myApp.factory('packageObject', ['idGenerator', function(idGenerator) {

    // Instantiate the package object
    var packageObject = function() {
    	this.id = idGenerator.getNewId();
    };

    packageObject.prototype.getId = function() {
        return this.id;
    };

    return packageObject;
}]);
