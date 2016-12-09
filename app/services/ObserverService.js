angular.module('myApp')
.factory('observerService', function() {
    var log = "";

    return {
    	// Returns the log
        getLog: function() {
            return log;
        },

		// Inserts a new log entry with any number of string parameters passed
        addLogEntry: function() {
            for (var i = 0; i < arguments.length; i++) {
                log += arguments[i] + ',';
            }
        },

        // Empties the log
        empty: function() {
            log = "";
        }
    }
});
