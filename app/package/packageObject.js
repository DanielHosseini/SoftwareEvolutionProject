angular.module('myApp')
.factory('packageObject', ['$rootScope', 'idGenerator', 'classObject', function($rootScope, idGenerator, classObject) {

    // Instantiate the package object
    var packageObject = function(name, position) {
        this.id = idGenerator.getNewId();
        this.name = name;
        this.type = "package";
        this.classes = [];
        this.position = position;
        this.editMode = false;
    };

    packageObject.prototype.onElementDropped = function(event, index, item) {
        if (item.type === "class") {
            // Notify listeners so the canvas can remove the class from its classes array
            $rootScope.$broadcast('class:addedToPackage', item.id);
            var newElement = new classObject(item.name, item.position);
            newElement.attributes = item.attributes;
            newElement.operations = item.operations;

            if (item.id === -1) {
                // Element coming from toolbox so add the new element
                this.addClassAt(newElement, index);

                return true; 
            } else {
                return newElement;
            }
        }

        return false;
    };

    packageObject.prototype.dragoverCallback = function(event, index, external, type) {
        console.log(event, type);
        return true;
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

    packageObject.prototype.addClassAt = function(newClass, index) {
        this.classes.splice(index, 0, newClass);
    };

    packageObject.prototype.getClasses = function() {
        return this.classes;
    };

    packageObject.prototype.deleteClassAt = function(index) {
        this.classes.splice(index, 1);
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
