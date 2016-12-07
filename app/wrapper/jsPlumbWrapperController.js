var myApp = angular.module('myApp');

//TODO: Fix observerService
myApp.controller('jsPlumbWrapperController', ['$scope', 'diagramService', function($scope, diagramService) {
    $scope.printClasses = function() {
        console.log(diagramService.getPackages());
    };
    jsPlumb.importDefaults({
        Endpoint: ["Dot", { radius: 2 }],
        HoverPaintStyle: { strokeStyle: "#42a62c", lineWidth: 2 }
    });

    jsPlumb.bind("contextmenu", function(c, e) {
        console.log("contextmenu");
        var isMac = e.metaKey && window.navigator.platform === "MacIntel"
        var isWin = e.ctrlKey && window.navigator.platform === "Win32"
        if ((isMac || isWin) && c.getOverlay("directedAssociation")) {
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

    jsPlumb.bind("connection", function() {
        //observerService.addLogEntry('CREATE', 'ASSOCIATION', 'NULL', info.sourceId, info.targetId);
    });

    jsPlumb.bind("click", function(c, e) {
        console.log("clicked");
        if (e.altKey || e.keyCode === 18) {
            e.preventDefault();
            //observerService.addLogEntry('REMOVE', 'ASSOCIATION', 'NULL', c.sourceId, c.targetId);
            jsPlumb.detach(c);
        }
    });

    jsPlumb.bind("dblclick", function(c, e) {
        console.log("dblclick");
        var connector = c;
        if (connector.getOverlay("label") === null) {
            connector.addOverlay(["Label", { label: "label", id: "label", cssClass: "connectionLabel" }]);
        }
        var name = connector.getOverlay("label").getLabel();
        angular.element(name).bind("click", function() { console.log('click') });
        $elm = connector.getOverlay("label");
        $elm.hide();
        var theelm = $elm.getElement();
        var par = theelm.parentElement;
        angular.element(par).append("<input id=\"label-edit\" type=\"text\" size=\"10\" value=\"" + name + "\">");
        angular.element(document.getElementById("label-edit")).css({ position: 'absolute', top: angular.element(theelm).css("top"), left: angular.element(theelm).css("left") });
        angular.element(document.getElementById("label-edit")).focus();
        angular.element(document.getElementById("label-edit")).on("keypress blur", function(e) {
            if (e.keyCode === 13 || !e.keyCode) {
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
            if (angular.element(e).attr('id') === undefined) { //check if endpoint already exsists [toolbox-demo]
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
        var connector = c;
        if (connector.getOverlay("directedAssociation") || type === "aggregate") {
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
        } else if (connector.getOverlay("aggregation") || type === "composite") {
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
        } else if (connector.getOverlay("composition") || type === "inheritance") {
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

        } else if (connector.getOverlay("inheritance") || type === "directed") {
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
            jsPlumb.bind("connection", function() {
                $scope.$apply(function() {
                    console.log("Possibility to push connection into array");
                });
            });
        });
    };
}]);

myApp.directive('plumbNonDraggable', ['diagramService', function(diagramService) {
    return {
        replace: true,
        controller: 'jsPlumbWrapperController',
        link: function(scope, element, attrs) {
            jsPlumb.setDraggable(element, false);
        }
    };
}]);

myApp.directive('plumbItem', ['diagramService', function(diagramService) {
    return {
        replace: true,
        controller: 'jsPlumbWrapperController',
        link: function(scope, element) {
            jsPlumb.makeTarget(element, {
                anchor: 'Continuous',
            });
            jsPlumb.draggable(element, {
                start: function(event) {
                },
                stop: function(event) {
                    var canvas = angular.element(document.getElementById('diagram-canvas'));
                    var canvasLeft = canvas.prop('offsetLeft');
                    var canvasTop = canvas.prop('offsetTop');

                    var elementLeft = event.pos[0] < canvasLeft ? canvasLeft : event.pos[0];
                    var elementTop = event.pos[1] < canvasTop ? canvasTop : event.pos[1];

                    droppedEl = angular.element(event.el);
                    var elementId = event.el.attributes['data-id'].value;
                    diagramService.updateElementPosition(droppedEl, elementId, [elementLeft, elementTop]);

                },
                containment: false
            });
        }
    };
}]);

myApp.directive('plumbMenuItem', ['diagramService', function(diagramService) {
    return {
        replace: true,
        controller: 'jsPlumbWrapperController',
        link: function(scope, element) {
            jsPlumb.draggable(element, {
                start: function() {
                },
                stop: function(event) {
                    element[0].style.cssText = "";

                    var canvas = angular.element(document.getElementById('diagram-canvas'));
                    var canvasLeft = canvas.prop('offsetLeft');
                    var canvasTop = canvas.prop('offsetTop');

                    var elementLeft = event.pos[0] < canvasLeft ? canvasLeft : event.pos[0];
                    var elementTop = event.pos[1] < canvasTop ? canvasTop : event.pos[1];

                    /*
                      TODO:

                      - Add id to dropped elements then pass it to the canvas controller

                    Handle events in this file, in the event say through canvasController
                    to do stuff with diagramService


                    func(event){
                      ...
                      controller.update()
                    }

                    //In the canvas controller far, far away
                    - Check where it's dropped, if outside canvas then put it in the canvas at the nearest edge
                    - Paint in canvas (Visual)
                    fun update(){
                    service.updateSoemthing()
                    }
                    */
                    droppedEl = angular.element(event.el);
                    diagramService.addElement(droppedEl, [elementLeft, elementTop]);
                },
                containment: false
            });
        }
    };
}]);
