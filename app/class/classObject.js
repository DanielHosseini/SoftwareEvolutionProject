'use strict';
var myApp = angular.module('myApp');
myApp.factory('classObject', ['idGenerator', 'attributeObject', 'operationObject', function(idGenerator, attributeObject, operationObject) {

    // Instantiate the class object
    var classObject = function(name, position) {
        this.id = idGenerator.getNewId();
        this.name = name;
        this.attributes = [];
        //this.attributes.push(new attributeObject("att1"));
        this.operations = [];
        //this.operations.push(new operationObject("op1"));
        this.position = position;
        this.editMode = false;
        this.allowedAttributeTypes = ['attributeObject'];
    };

    classObject.prototype.onElementDropped = function(event, index, item, external, type, allowedType) {
        if (item.type === "attribute") {
            if (allowedType === "attributeObject") {
                this.addAttribute(item, index);
            } else{
                this.attributes.push(item);
                alert("Attributes are placed in the upper part of a class element");
            }
        }
        if (item.type === "operation") {
            if (allowedType === "operationObject") {
                this.addOperation(item, index);
            } else {
                this.operations.push(item);
                alert("Operations are placed in the lower part of a class element");
            }
        }

        return true;
    };

    classObject.prototype.getId = function() {
        return this.id;
    };

    classObject.prototype.setName = function(name) {
        this.name = name;
    };

    classObject.prototype.getName = function() {
        return this.name;
    };

    classObject.prototype.startEditName = function() {
        this.editMode = true;
    };

    classObject.prototype.stopEditName = function() {
        this.editMode = false;
    };

    classObject.prototype.addAttribute = function(attribute, index) {
        this.attributes.splice(index, 0, attribute);
    };

    classObject.prototype.getAttributes = function() {
        return this.attributes;
    };

    classObject.prototype.deleteAttribute = function(attribute) {
        var index = this.attributes.indexOf(attribute);
        if (index > -1) {
            this.attributes.splice(index, 1);
        }
    };

    classObject.prototype.addOperation = function(operation, index) {
        this.operations.splice(index, 0, operation);
    };

    classObject.prototype.getOperations = function() {
        return this.operations;
    };

    classObject.prototype.deleteOperation = function(operation) {
        var index = this.operations.indexOf(operation);
        if (index > -1) {
            this.operations.splice(index, 1);
        }
    };

    classObject.prototype.updatePosition = function(position) {
        this.position = position;
    };

    return classObject;
}]);
