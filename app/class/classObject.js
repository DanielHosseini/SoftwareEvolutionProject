'use strict';
var myApp = angular.module('myApp');
myApp.factory('classObject', function() {

    // Instantiate the class object
    var classObject = function(name) {
        this.name = name;
        this.attributes = [];
        this.operations = [];
        this.position = null;
    };

    classObject.prototype.setName = function(name) {
        this.name = name;
    };

    classObject.prototype.getName = function() {
        return this.name;
    };

    classObject.prototype.addAttribute = function(attribute) {
        this.attributes.push(attribute);
    };

    classObject.prototype.getAttributes = function() {
        return this.attributes;
    };

    classObject.prototype.deleteAttribute = function(attribute) {
        var index = classObject.prototype.attributes.indexOf(attribute);
        if (index > -1) {
            classObject.prototype.attributes.splice(index, 1);
        }
    };

    classObject.prototype.addOperation = function(operation) {
        classObject.prototype.operations.push(operation);
    };

    classObject.prototype.getOperations = function() {
        return classObject.prototype.operations;
    };

    classObject.prototype.deleteOperation = function(operation) {
        var index = classObject.prototype.operations.indexOf(operation);
        if (index > -1) {
            classObject.prototype.operations.splice(index, 1);
        }
    };

    classObject.prototype.updatePosition = function(position) {
        this.position = position;
    };

    return classObject;
});
