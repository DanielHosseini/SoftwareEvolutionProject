
var myApp = angular.module('myApp');
myApp.factory('operationObject', ['idGenerator', function(idGenerator) {

    // Instantiate the operation object
    var operationObject = function(name) {
        this.id = idGenerator.getNewId();
        this.type = "operation";
        this.name = name;
        this.editMode = false;
        this.selected  = false;
    };

    operationObject.prototype.toggleSelected = function () {
      if (this.selected) {
        this.selected = false;

      }
      else{this.selected = true}
    };

    operationObject.prototype.getSelected = function(){
      return this.selected;
    }

    operationObject.prototype.getId = function() {
        return this.id;
    };

    operationObject.prototype.setName = function(name) {
        this.name = name;
    };

    operationObject.prototype.getName = function() {
        return this.name;
    };

    operationObject.prototype.startEditName = function() {
        this.editMode = true;
    };

    operationObject.prototype.stopEditName = function() {
        this.editMode = false;
    };

    return operationObject;
}]);
