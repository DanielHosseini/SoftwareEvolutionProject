var myApp = angular.module('myApp');
myApp.service('DiagramService', function() {
  var DiagramService = {};
  var classes = [];
  var associations = [];
  var packages = [];

//Added "y" at the end to be able to distinguish methods in autocomplete
  DiagramService.addClassy = function(item){classes.push(item);}
  DiagramService.removeClassy = function(item){
    classes.splice(classes.indexOf(item),1)
  }
  DiagramService.getClassy = function(){
    return classes;
  }
  DiagramService.addAssociationy = function(item){associations.push(item);}
  DiagramService.removeAssociationy = function(item){
    associations.splice(associations.indexOf(item),1);
  }
  DiagramService.addPackagey = function(item){packages.push(item);}
  DiagramService.removePackagey= function(item){
    packages.splice(packages.indexOf(item),1);
  }

  return DiagramService
});
