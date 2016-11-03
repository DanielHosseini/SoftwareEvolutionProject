'use strict';

angular.module('myApp.toolBar', ['ngRoute'])

//Don't really need routing do we since it is not separate pages
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/toolBar', {
    templateUrl: 'toolbar/toolbar.html',
    controller: 'ToolBarController'
  });
}])

.controller('ToolBarController', [function() {

openAbout = function(){

}

explainWorkFlow = function(){

}

toggleToolBox = function(){

}

clearDiagram = function(){

}

openCite = function(){

}

showTour = function(){

}

save = function(){

}

importXMI  = function(){

}

exportXMI = function(){

}

showLog = function(){

}

inspect = function(){

}

swapTask = function(){

}

showFeedbackDialog = function(){

}

submit = function(){

}

sendBug = function(){

}

toggleHints = function(){

}
}]);
