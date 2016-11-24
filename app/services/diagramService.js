var myApp = angular.module('myApp');
myApp.service('diagramService', ['classObject', function(classObject) {
    var DiagramService = this;
    DiagramService.diagram = {
        'classCount':0,
        'classes': [],
        'associations': [],
        'packages': []
    };
    var callbacks = [];
    // var DiagramService = {classes:[],associations:[],packages:[]};
    // DiagramService.diagram.classes = [];
    // DiagramService.diagram.associations = [];
    // DiagramService.diagram.packages = [];

    this.addObserver = function(callback){
        callbacks.push(callback);
    }

    DiagramService.addClass = function(item) {
        DiagramService.diagram.classes.push(item);
        DiagramService.diagram.classCount = DiagramService.diagram.classCount + 1;
    }

    DiagramService.removeClass = function(item) {
        DiagramService.diagram.classes.splice(DiagramService.diagram.classes.indexOf(item), 1)
    }

    DiagramService.getClasses = function() {
        return DiagramService.diagram.classes;
    }

    DiagramService.addAssociation = function(item) {
        DiagramService.diagram.associations.push(item);
    }

    DiagramService.removeAssociation = function(item) {
        DiagramService.diagram.associations.splice(DiagramService.diagram.associations.indexOf(item), 1);
    }

    DiagramService.getAssociations = function() {
        return DiagramService.diagram.associations;
    }

    DiagramService.addPackage = function(item) {
        DiagramService.diagram.packages.push(item);
    }

    DiagramService.removePackage = function(item) {
        DiagramService.diagram.packages.splice(DiagramService.diagram.packages.indexOf(item), 1);
    }

    DiagramService.getPackages = function() {
        return DiagramService.diagram.packages;
    }

    DiagramService.addElement = function(element, position) {
        console.log("diagramService classes length", DiagramService.getClasses().length);
        console.log("diagramService packages length", DiagramService.getPackages().length);

        if (element.hasClass('toolboxClass')) {
            DiagramService.addClass(new classObject('class1'));
            console.log("diagramService classes length", DiagramService.getClasses().length);
        }

        if (element.hasClass('toolboxPackage')) {
            DiagramService.addPackage(new classObject('package1'));
            console.log("diagramService packages length", DiagramService.getPackages().length);
        }

        if (element.hasClass('toolboxAttribute')) {}

        if (element.hasClass('toolboxOperation')) {}
        angular.forEach(callbacks, function(callback){
            callback();
        });
    }
}]);
