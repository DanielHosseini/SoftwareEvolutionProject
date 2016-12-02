var myApp = angular.module('myApp');
myApp.service('diagramService', ['classObject', 'packageObject', function(classObject, packageObject) {
    var DiagramService = this;
    DiagramService.diagram = {
        'classCount': 0,
        'classes': [],
        'associations': [],
        'packageCount': 0,
        'packages': []
    };
    var callbacks = [];
    // var DiagramService = {classes:[],associations:[],packages:[]};
    // DiagramService.diagram.classes = [];
    // DiagramService.diagram.associations = [];
    // DiagramService.diagram.packages = [];

    this.addObserver = function(callback) {
        callbacks.push(callback);
    }

    DiagramService.clearAll = function(){
        DiagramService.diagram.classes.splice(0, DiagramService.diagram.classes.length)
        DiagramService.diagram.associations.splice(0, DiagramService.diagram.associations.length)
        DiagramService.diagram.packages.splice(0, DiagramService.diagram.packages.length)
        DiagramService.diagram.classCount = 0;
        DiagramService.diagram.packageCount = 0;
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

    DiagramService.findById = function(array, id) {
        for (var element in array) {
            if (array[element].getId().toString() === id) {
                return array[element];
            }
        }
    };

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
        DiagramService.diagram.packageCount = DiagramService.diagram.packageCount + 1;

    }

    DiagramService.removePackage = function(item) {
        DiagramService.diagram.packages.splice(DiagramService.diagram.packages.indexOf(item), 1);
    }

    DiagramService.getPackages = function() {
        return DiagramService.diagram.packages;
    }

    var alertObserver = function(){
        angular.forEach(callbacks, function(callback) {
            callback();
        });
    }

    DiagramService.addElement = function(element, position) {
        console.log(element)
        if (element.hasClass('toolboxClass')) {
            DiagramService.addClass(new classObject('Class', position));
            console.log("diagramService last class position", DiagramService.getClasses()[DiagramService.getClasses().length - 1].position);
        }

        if (element.hasClass('toolboxPackage')) {
            DiagramService.addPackage(new packageObject('Package', position));
            console.log("diagramService last package position", DiagramService.getPackages()[DiagramService.getPackages().length - 1].position);
        }

        if (element.hasClass('toolboxAttribute')) {}

        if (element.hasClass('toolboxOperation')) {}
        alertObserver();
    }

    DiagramService.updateElementPosition = function(element, elementId, position) {
        if (element.hasClass('class')) {
            DiagramService.findById(DiagramService.getClasses(), elementId).updatePosition(position);
        }

        if (element.hasClass('package')) {
            DiagramService.findById(DiagramService.getPackages(), elementId).updatePosition(position);
        }

        alertObserver();
    }
}]);
