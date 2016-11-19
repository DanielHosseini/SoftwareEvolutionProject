var myApp = angular.module('myApp');
myApp.service('diagramService', function() {
    var DiagramService = {};
    var classes = [];
    var associations = [];
    var packages = [];

    DiagramService.addClass = function(item) {
        classes.push(item);
    }

    DiagramService.removeClass = function(item) {
        classes.splice(classes.indexOf(item), 1)
    }

    DiagramService.getClasses = function() {
        return classes;
    }

    DiagramService.addAssociation = function(item) {
        associations.push(item);
    }

    DiagramService.removeAssociation = function(item) {
        associations.splice(associations.indexOf(item), 1);
    }

    DiagramService.getAssociations = function() {
        return associations;
    }

    DiagramService.addPackage = function(item) {
        packages.push(item);
    }

    DiagramService.removePackage = function(item) {
        packages.splice(packages.indexOf(item), 1);
    }

    DiagramService.getPackages = function() {
        return packages;
    }

    return DiagramService
});
