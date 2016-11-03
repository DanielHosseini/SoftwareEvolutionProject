'use strict';

angular.module('myApp.toolBar', ['ngRoute'])

//HOW WE DO DIS
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
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
