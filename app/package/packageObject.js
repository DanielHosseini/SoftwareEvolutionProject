'use strict';
var myApp = angular.module('myApp');
myApp.factory('packageObject', ['idGenerator', function(idGenerator) {

    // Instantiate the package object
    var packageObject = function(name) {
        this.id = idGenerator.getNewId();
        this.name = name;
        this.classes = [];
        this.position = null;
    };

    packageObject.prototype.getId = function() {
        return this.id;
    };

    packageObject.prototype.setName = function(name) {
        this.name = name;
    };

    packageObject.prototype.getName = function() {
        return this.name;
    };

    packageObject.prototype.addClass = function(classs) {
        this.classes.push(classs);
    };

    packageObject.prototype.getClasses = function() {
        return this.classes;
    };

    packageObject.prototype.deleteClass = function(classs) {
        var index = packageObject.prototype.classes.indexOf(classs);
        if (index > -1) {
            packageObject.prototype.classes.splice(index, 1);
        }
    };

    packageObject.prototype.updatePosition = function(position) {
        this.position = position;
    };

    return packageObject;
}]);
