'use strict';

describe('observer service test', function() {

    beforeEach(module("myApp"));

    it('should return empty string initially', inject(function(observerService) {
        expect(observerService.getLog()).toEqual("");
    }))

    it('should return a,', inject(function(observerService) {
        observerService.addLogEntry("a");
        expect(observerService.getLog()).toEqual("a,");
    }))

    it('should return empty string', inject(function(observerService) {
        observerService.addLogEntry("a");
        expect(observerService.getLog()).toEqual("a,");
        observerService.empty();
        expect(observerService.getLog()).toEqual("");
    }))

    it('should return b,c,', inject(function(observerService) {
        observerService.addLogEntry("b");
        expect(observerService.getLog()).toEqual("b,");
        observerService.addLogEntry("c");
        expect(observerService.getLog()).toEqual("b,c,");
    }))
});
