// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.version',
  'dndLists'
])
.controller('AppController', ['$scope', 'diagramService', 'observerService', function(scope, diagramService, observerService){
    scope.tour = false;
    scope.workflow = false;
    scope.about = false;
    scope.cite = false;
    scope.feedback = false;
    scope.question = "";
    scope.toolbox = true;
    scope.showTour = function(){
        scope.tour=!scope.tour;
    }
    scope.showWorkflow = function(){
        scope.workflow=!scope.workflow;
    }
    scope.showAbout = function(){
        scope.about=!scope.about;
    }
    scope.showCite = function(){
        scope.cite=!scope.cite;
    }

    scope.showToolbox = function(){
        scope.toolbox=!scope.toolbox;
    }

    scope.clear  = function(){
        diagramService.clearAll();
    }
    scope.showFeedback = function(){
        scope.feedback = !scope.feedback;
    }
    scope.sendFeedback = function() {
        observerService.addLogEntry(scope.question);
        scope.feedback = !scope.feedback;
    }
}])

.directive('ngConfirmClick', [function(){
    return{
        link: function (scope, element, attr) {
            var msg = attr.ngConfirmClick || "Are you sure?";
            var clickAction = attr.confirmedClick;
            element.bind('click',function () {
                if ( window.confirm(msg) ) {
                    scope.$eval(clickAction);
                }
            });
        }
    }
}])

.directive('workflowDirective', function(){
    return {
        templateUrl: 'directives/workflow.html'
    };
})

.directive('aboutDirective', function(){
    return {
        templateUrl: 'directives/about.html'
    };
})

.directive('feedbackDirective', function(){
    return {
        templateUrl: 'directives/feedback.html'
    };
});
