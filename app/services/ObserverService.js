var myApp = angular.module('myApp', []);
myApp.factory('observerService', function() {
    var log = "";

    return {
    	// Returns the log
        getLog: function() {
            return log;
        },

		// Inserts a new log entry with any number of string parameters passed
        addLogEntry: function() {
            //log += Date.now().toString() + ',';
            for (var i = 0; i < arguments.length; i++) {
                log += arguments[i] + ',';
            }
            //log += "\r\n";
        },

        // Empties the log
        empty: function() {
            log = "";
        }
    }
});
