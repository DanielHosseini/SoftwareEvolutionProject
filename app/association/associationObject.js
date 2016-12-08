
var myApp = angular.module('myApp');
myApp.factory('associationObject', ['idGenerator', function(idGenerator) {

    // Instantiate the association object
    var associationObject = function() {
    	this.id = idGenerator.getNewId();
    };

    associationObject.prototype.getId = function() {
        return this.id;
    };

    return associationObject;
}]);
