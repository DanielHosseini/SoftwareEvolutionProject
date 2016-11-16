var myApp = angular.module('myApp');
myApp.service('DiagramService', function() {
  var DiagramService = {}
  var classes = []
  var associations = []
  var packages = []

//Added "y" at the end to be able to distinguish methods in autocomplete
  Diagram.addClassy = function(item){classes.push(item);}
  Diagram.removeClassy = function(item){
    classes.splice(classes.indexOf(item),1)
  }
  Diagram.addAssociationy = function(item){associations.push(item);}
  Diagram.removeAssociationy = function(item){
    associations.splice(associations.indexOf(item),1)
  }
  Diagram.addPackagey = function(item){packages.push(item);}
  Diagram.removePackagey= function(item){
    packages.splice(packages.indexOf(item),1)
  }

  return DiagramService
});
