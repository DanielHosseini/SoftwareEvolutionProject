'use strict';

angular.module('myApp.toolBox', ['ngRoute'])

//Don't really need routing do we since it is not separate pages
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/toolBox', {
    templateUrl: 'toolbox/toolbox.html',
    controller: 'ToolboxController'
  });
}])

.controller('ToolboxController', [function() {

//Start DragEvent?


}]);
