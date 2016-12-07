'use strict';
var myApp = angular.module('myApp');
myApp.factory('packageObject', ['$rootScope', 'idGenerator', 'classObject', function($rootScope, idGenerator, classObject) {

    // Instantiate the package object
    var packageObject = function(name, position) {
        this.id = idGenerator.getNewId();
        this.name = name;
        this.type = "package";
        this.classes = [];
        this.position = position;
        this.editMode = false;
    };

    packageObject.prototype.onElementDropped = function(event, index, item, external, type, allowedType) {
        if (item.type === "class") {
            var newElement = new classObject(item.name, item.position);
            newElement.attributes = item.attributes;
            newElement.operations = item.operations;
            this.addClass(newElement, index);

            // Notify listeners so the canvas can remove the class from its classes array
            $rootScope.$broadcast('class:addedToPackage', item.id);

            return true;
        }

        return false;
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

    packageObject.prototype.startEditName = function() {
        this.editMode = true;
    };

    packageObject.prototype.stopEditName = function() {
        this.editMode = false;
    };

    packageObject.prototype.addClass = function(newClass) {
        this.classes.push(newClass);
    };

    packageObject.prototype.getClasses = function() {
        return this.classes;
    };

    packageObject.prototype.deleteClass = function(deletedClass) {
        var index = packageObject.prototype.classes.indexOf(deletedClass);
        if (index > -1) {
            packageObject.prototype.classes.splice(index, 1);
        }
    };

    packageObject.prototype.updatePosition = function(position) {
        this.position = position;
    };

    return packageObject;
}]);
