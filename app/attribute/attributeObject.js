'use strict';
var myApp = angular.module('myApp');
myApp.factory('attributeObject', ['idGenerator', function(idGenerator) {

    // Instantiate the attribute object
    var attributeObject = function(name) {
        this.id = idGenerator.getNewId();
        this.type = "attribute";
        this.name = name;
        this.editMode = false;
    };

    attributeObject.prototype.getId = function() {
        return this.id;
    };

    attributeObject.prototype.setName = function(name) {
        this.name = name;
    };

    attributeObject.prototype.getName = function() {
        return this.name;
    };

    attributeObject.prototype.startEditName = function() {
        this.editMode = true;
    };

    attributeObject.prototype.stopEditName = function() {
        this.editMode = false;
    };

    return attributeObject;
}]);
