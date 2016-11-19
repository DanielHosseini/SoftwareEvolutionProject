var myApp = angular.module('myApp');
myApp.service('idGenerator', function() {
	var idGenerator = {};
	var id = 0;

	idGenerator.getNewId = function () {
		id++;
		return id;
	}

	return idGenerator;
});