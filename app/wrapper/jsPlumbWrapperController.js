var myApp = angular.module('myApp');

//TODO: Fix observerService
myApp.controller('jsPlumbWrapperController', ['$scope', function($scope) {
    jsPlumb.importDefaults({
        Endpoint: ["Dot", { radius: 2 }],
        HoverPaintStyle: { strokeStyle: "#42a62c", lineWidth: 2 }
    });

    jsPlumb.bind("contextmenu", function(c, e) {
        if ((e.metaKey && window.navigator.platform == "MacIntel" || e.ctrlKey && window.navigator.platform == "Win32") && c.getOverlay("directedAssociation")) {
            c.removeOverlay("directedAssociation");
            c.addOverlay(["Arrow", {
                label: "Arrow",
                foldback: 0.1,
                id: "dependency",
                location: 1
            }]);
            c.setPaintStyle({ dashstyle: "4 4", strokeStyle: "#000000", lineWidth: 2 });
            c.setHoverPaintStyle({ dashstyle: "4 4", strokeStyle: "#42a62c", lineWidth: 2 });
        } else {
            c.setPaintStyle({ dashstyle: "0 0", strokeStyle: "#000000", lineWidth: 2 });
            c.setHoverPaintStyle({ dashstyle: "0 0", strokeStyle: "#42a62c", lineWidth: 2 });
            jsPlumbHelper.changeEndShape(c);

        }
        e.preventDefault();
    });

    jsPlumb.bind("connection", function(info) {
        //observerService.addLogEntry('CREATE', 'ASSOCIATION', 'NULL', info.sourceId, info.targetId);
    });

    jsPlumb.bind("click", function(c, e) {
        console.log("clicked");
        if (e.altKey || e.keyCode == 18) {
            e.preventDefault();
            //observerService.addLogEntry('REMOVE', 'ASSOCIATION', 'NULL', c.sourceId, c.targetId);
            jsPlumb.detach(c);
        }
    });

    jsPlumb.bind("dblclick", function(c, e) {
        connector = c;
        if (connector.getOverlay("label") === null) {
            connector.addOverlay(["Label", { label: "label", id: "label", cssClass: "connectionLabel" }]);
        }
        name = connector.getOverlay("label").getLabel();
        angular.element(name).bind("click", function(c, e) { console.log('click') });
        $elm = connector.getOverlay("label");
        $elm.hide();
        var theelm = $elm.getElement();
        var par = theelm.parentElement;
        angular.element(par).append("<input id=\"label-edit\" type=\"text\" size=\"10\" value=\"" + name + "\">");
        angular.element(document.getElementById("label-edit")).css({ position: 'absolute', top: angular.element(theelm).css("top"), left: angular.element(theelm).css("left") });
        angular.element(document.getElementById("label-edit")).focus();
        angular.element(document.getElementById("label-edit")).on("keypress blur", function(e) {
            if (e.keyCode == 13 || !e.keyCode) {
                connector.getOverlay("label").setLabel(angular.element(this).val());
                $elm.show();
                angular.element(document.getElementById("label-edit")).remove();
            }
        });

        e.preventDefault();

    });
    initTargets = function() {
        jsPlumb.makeTarget(jsPlumb.getSelector(".class"), {
            dropOptions: { hoverClass: "dragHover" },
            anchor: "Continuous"
        });
    };

    initEndpoints = function(nextColour, curved) {
        angular.element(".ep").each(function(i, e) {
            var p = angular.element(e).parent();
            if (angular.element(e).attr('id') == undefined) { //check if endpoint already exsists [toolbox-demo]
                jsPlumb.makeSource(angular.element(e), {
                    parent: p,
                    anchor: "Continuous",
                    connector: ["StateMachine", { curviness: (curved ? 30.0 : 0.01), margin: 1.0 }],
                    connectorStyle: { strokeStyle: nextColour, lineWidth: 2, outlineWidth: 6, outlineColor: 'transparent' }, // Strokestyle: color,
                    maxConnections: -1 //, uniqueEndpoint: true
                });
            }
        });
    };

    changeEndShape = function(c, type) {
        // Right click to change between association types: Undirected association => Directed association => Aggregation => Composition => Inheritance and Realization
        connector = c;
        if (connector.getOverlay("directedAssociation") || type == "aggregate") {
            // if it is an directed association
            connector.removeOverlay("directedAssociation");
            // add an aggregation
            connector.addOverlay(["Arrow", {
                label: "Arrow",
                cssClass: "diamond",
                foldback: 2.0,
                paintStyle: { fillStyle: "white" },
                id: "aggregation",
                location: 1
            }]);
        } else if (connector.getOverlay("aggregation") || type == "composite") {
            // if it is an aggregation
            connector.removeOverlay("aggregation");
            // add a composition
            connector.addOverlay(["Arrow", {
                label: "Arrow",
                cssClass: "diamond",
                foldback: 2.0,
                id: "composition",
                location: 1
            }]);
        } else if (connector.getOverlay("composition") || type == "inheritance") {
            // if it is an inheritance
            connector.removeOverlay("composition");
            // add a composition
            connector.addOverlay(["Arrow", {
                label: "Arrow",
                cssClass: "diamond",
                foldback: 1.0,
                id: "inheritance",
                location: 1,
                paintStyle: { fillStyle: "white" }
            }]);

        } else if (connector.getOverlay("inheritance" || type == "directed")) {
            // if it is an inheritance
            connector.removeOverlay("inheritance");
        } else {
            // if it is currently an undirected association (no arrow label)
            // add a directed association (black solid triangle arrow)
            connector.addOverlay(["Arrow", {
                label: "Arrow",
                foldback: 0.1,
                id: "directedAssociation",
                location: 1
            }]);
        }
    };
    $scope.init = function() {
        jsPlumb.bind("ready", function() {
            console.log("Set up jsPlumb listeners (should be only done once)");
            jsPlumb.bind("connection", function(info) {
                $scope.$apply(function() {
                    console.log("Possibility to push connection into array");
                });
            });
        });
    };

    $scope.plumbMenuItemDropped = function() {

    };

}]);

myApp.directive('plumbItem', function() {
    return {
        replace: true,
        controller: 'jsPlumbWrapperController',
        link: function(scope, element, attrs) {
            //console.log("Add plumbing for the 'item' element");

            jsPlumb.makeTarget(element, {
                anchor: 'Continuous',
            });
            jsPlumb.draggable(element, {
                containment: 'parent'
            });
        }
    };
});

myApp.directive('plumbMenuItem', ['diagramService', 'classObject', function(diagramService, classObject) {
    return {
        replace: true,
        controller: 'jsPlumbWrapperController',
        link: function(scope, element, attrs) {
            jsPlumb.draggable(element, {
                xpos: 0,
                ypos: 0,
                start: function(event) {
                    console.log("start", event)
                },
                stop: function(event, ui) {
                    console.log("dropped", element[0].style)
                    element[0].style.cssText = "";

                    // TODO move this code to the canvas controller
                    /*
                      TODO:
                      - Paint in canvas (Visual)
                      - Refactor code to canvasController:

                      CanvasController has injected diagramService
                      CanvasController is injected in THISFIEL
                      CanvasController HERE says diagramService.doStuff

                    Handle events in this file, in the event say through canvasController
                    to do stuff with diagramService


                    func(event){
                      ...
                      controller.update()
                    }

                    //In a controller far, far away
                    fun update(){
                    service.updateSoemthing()
                    }
                    */
                    droppedEl = angular.element(event.el);

                    console.log("diagramService classes length", diagramService.getClasses().length);
                    console.log("diagramService packages length", diagramService.getPackages().length);

                    if (droppedEl.hasClass('toolboxClass')) {
                        diagramService.addClass(new classObject('class1'));
                        console.log("diagramService classes length", diagramService.getClasses().length);
                    }

                    if (droppedEl.hasClass('toolboxPackage')) {
                        diagramService.addPackage(new classObject('class1'));
                        console.log("diagramService packages length", diagramService.getPackages().length);
                    }

                    if (droppedEl.hasClass('toolboxAttribute')) {}

                    if (droppedEl.hasClass('toolboxOperation')) {}
                },
                containment: false
            });
        }
    };
}]);
