'use strict';
var myApp = angular.module('myApp');
myApp.factory('classObject', ['idGenerator', 'attributeObject', 'operationObject', function(idGenerator, attributeObject, operationObject) {

    // Instantiate the class object
    var classObject = function(name, position) {
        this.id = idGenerator.getNewId();
        this.name = name;
        this.type = "class"
        this.attributes = [];
        this.operations = [];
        this.position = position;
        this.editMode = false;
        this.selected = false;
        this.allowedAttributeTypes = ['attributeObject'];
    };

    classObject.prototype.onElementDropped = function(event, index, item, external, type, allowedType) {
        if (item.type === "attribute") {
            var newElement = new attributeObject(item.name);
            if (allowedType === "attributeObject") {
                this.addAttribute(newElement, index);
            } else{
                this.attributes.push(newElement);
                alert("Attributes are placed in the upper part of a class element");
            }
        }
        if (item.type === "operation") {
            var newElement = new operationObject(item.name);
            if (allowedType === "operationObject") {
                this.addOperation(newElement, index);
            } else {
                this.operations.push(newElement);
                alert("Operations are placed in the lower part of a class element");
            }
        }

        return true;
    };

    classObject.prototype.toggleSelected = function () {
      if (this.selected) {
        this.selected = false;

      }
      else{this.selected = true}
    };

    classObject.prototype.getSelected = function(){
      return this.selected;
    }

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
