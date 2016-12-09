var myApp = angular.module('myApp');
myApp.service('diagramService', ['$rootScope', 'classObject', 'packageObject', function($rootScope, classObject, packageObject) {
    var DiagramService = this;
    DiagramService.diagram = {
        'classCount': 0,
        'classes': [],
        'associations': [],
        'packageCount': 0,
        'packages': []
    };
    var callbacks = [];
    

    $rootScope.$on('class:addedToPackage', function(event, classId) {
        if (classId === -1) {
            // This means that a new class has been dropped on a package,
            // but had been added before that to the diagram on the canvas,
            // so we remove the last class here
            setTimeout(function() {
                DiagramService.removeClassAt(DiagramService.diagram.classes.length - 1);
                $rootScope.$digest();
            }, 100);
        } else {
            // This means that a class that was on the canvas was added to a package,
            // so find it and remove it from the classes without packages
            for (i = 0; i < DiagramService.diagram.classes.length; i++) { 
                if (DiagramService.diagram.classes[i].id === classId) {
                    DiagramService.removeClassAt(i);
                    break;
                }
            }
        }
    });

    this.addObserver = function(callback) {
        callbacks.push(callback);
    }

    DiagramService.clearAll = function(){
        DiagramService.diagram.classes.splice(0, DiagramService.diagram.classes.length)
        DiagramService.diagram.associations.splice(0, DiagramService.diagram.associations.length)
        DiagramService.diagram.packages.splice(0, DiagramService.diagram.packages.length)
        DiagramService.diagram.classCount = 0;
        DiagramService.diagram.packageCount = 0;
        alertObserver();
    }

    DiagramService.addClass = function(item) {
        DiagramService.diagram.classes.push(item);
        DiagramService.diagram.classCount = DiagramService.diagram.classCount + 1;
    }

    DiagramService.removeClass = function(item) {
        DiagramService.diagram.classes.splice(DiagramService.diagram.classes.indexOf(item), 1);
    }

    DiagramService.removeClassAt = function(index) {
        DiagramService.diagram.classes.splice(index, 1);
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
        var top = angular.element(document.querySelector('#diagram-canvas')).prop('offsetTop')
        var left = angular.element(document.querySelector('#diagram-canvas')).prop('offsetLeft')
        position[0] = position[0] - left;
        position[1] = position[1] - top;

        if (element.hasClass('toolboxClass')) {
            DiagramService.addClass(new classObject('Class', position));
        }

        if (element.hasClass('toolboxPackage')) {
            DiagramService.addPackage(new packageObject('Package', position));
        }

        if (element.hasClass('toolboxAttribute')) {
          //Find class it was dropped on


        }

        if (element.hasClass('toolboxOperation')) {
          //Find class it was dropped on

        }

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
