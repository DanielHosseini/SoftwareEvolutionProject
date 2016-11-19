'use strict';

describe('diagram service test', function() {

    beforeEach(module("myApp"));

    // Tests for classes in the diagram

    it('should return 0 for classes length initially', inject(function(diagramService) {
        expect(diagramService.getClasses().length).toEqual(0);
    }))

    it('should return 1 for classes length after adding one class', inject(function(diagramService, classObject) {
        var class1 = new classObject('class1');
        diagramService.addClass(class1);
        expect(diagramService.getClasses().length).toEqual(1);
    }))

    it('should return 0 for classes length after adding one class and removing it', inject(function(diagramService, classObject) {
        var class1 = new classObject('class1');
        diagramService.addClass(class1);
        diagramService.removeClass(class1);
        expect(diagramService.getClasses().length).toEqual(0);
    }))

    it('should return "class1" after adding two classes and looking for the name of the first one which was "class1"', inject(function(diagramService, classObject) {
        var class1 = new classObject('class1');
        diagramService.addClass(class1);
        var class2 = new classObject('class2');
        diagramService.addClass(class2);
        expect(diagramService.getClasses()[0].getName()).toEqual('class1');
    }))

    // Tests for associations in the diagram

    it('should return 0 for associations length initially', inject(function(diagramService) {
        expect(diagramService.getAssociations().length).toEqual(0);
    }))

    it('should return 1 for associations length after adding one association', inject(function(diagramService, associationObject) {
        var association1 = new associationObject();
        diagramService.addAssociation(association1);
        expect(diagramService.getAssociations().length).toEqual(1);
    }))

    it('should return 0 for associations length after adding one association and removing it', inject(function(diagramService, associationObject) {
        var association1 = new associationObject();
        diagramService.addAssociation(association1);
        diagramService.removeAssociation(association1);
        expect(diagramService.getAssociations().length).toEqual(0);
    }))

    it('should return 2 for associations length after adding two associations', inject(function(diagramService, associationObject) {
        var association1 = new associationObject();
        diagramService.addAssociation(association1);
        var association2 = new associationObject();
        diagramService.addAssociation(association2);
        expect(diagramService.getAssociations().length).toEqual(2);
    }))

    // Tests for packages in the diagram

    it('should return 0 for packages length initially', inject(function(diagramService) {
        expect(diagramService.getPackages().length).toEqual(0);
    }))

    it('should return 1 for packages length after adding one package', inject(function(diagramService, packageObject) {
        var package1 = new packageObject();
        diagramService.addPackage(package1);
        expect(diagramService.getPackages().length).toEqual(1);
    }))

    it('should return 0 for packages length after adding one package and removing it', inject(function(diagramService, packageObject) {
        var package1 = new packageObject();
        diagramService.addPackage(package1);
        diagramService.removePackage(package1);
        expect(diagramService.getPackages().length).toEqual(0);
    }))

    it('should return 2 for packages length after adding two packages', inject(function(diagramService, packageObject) {
        var package1 = new packageObject();
        diagramService.addPackage(package1);
        var package2 = new packageObject();
        diagramService.addPackage(package2);
        expect(diagramService.getPackages().length).toEqual(2);
    }))

    
});
