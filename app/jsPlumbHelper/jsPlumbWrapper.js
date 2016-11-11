//JSPLUMBHELPER -- seen as singleton
function jsPlumbHelper(){
    jsPlumb.importDefaults({
        Endpoint: ["Dot", {radius: 2}],HoverPaintStyle: {strokeStyle: "#42a62c",lineWidth: 2}
    });
    jsPlumb.bind("contextmenu", function(c, e) {
        if((e.metaKey && window.navigator.platform=="MacIntel" || e.ctrlKey && window.navigator.platform=="Win32") && c.getOverlay("directedAssociation")){
            c.removeOverlay("directedAssociation");
            c.addOverlay(["Arrow", {
                              label: "Arrow",
                              foldback: 0.1,
                              id: "dependency",
                              location: 1
                              }]);
            c.setPaintStyle({dashstyle: "4 4", strokeStyle:"#000000", lineWidth:2});
            c.setHoverPaintStyle({dashstyle: "4 4", strokeStyle:"#42a62c", lineWidth:2});
        }
        else{
            c.setPaintStyle({dashstyle: "0 0", strokeStyle:"#000000", lineWidth:2});
            c.setHoverPaintStyle({dashstyle: "0 0", strokeStyle:"#42a62c", lineWidth:2});
            jsPlumbHelper.changeEndShape(c);

            }
        e.preventDefault();
    });
    jsPlumb.bind("connection", function(info) {
                 uiObserver.addLogEntry('CREATE','ASSOCIATION', 'NULL', info.sourceId, info.targetId) ;
                 });

    jsPlumb.bind("click", function(c, e) {

        if (e.altKey || e.keyCode == 18) {
            e.preventDefault();
            uiObserver.addLogEntry('REMOVE','ASSOCIATION', 'NULL', c.sourceId, c.targetId) ;
            jsPlumb.detach(c);

        }
    });

      jsPlumb.bind("dblclick", function(c, e) {
            connector = c;
            if (connector.getOverlay("label") === null){
                connector.addOverlay(["Label", {label: "label",id: "label",cssClass: "connectionLabel"}]);
            }
            name = connector.getOverlay("label").getLabel();
                 angular.element(name).bind("click", function(c, e) {console.log('click')});
            angular.elementelm = connector.getOverlay("label");
            angular.elementelm.hide();
            var theelm = angular.elementelm.getElement();
            var par = theelm.parentElement;
            angular.element(par).append("<input id=\"label-edit\" type=\"text\" size=\"10\" value=\"" + name + "\">");
            angular.element("#label-edit").css({position: 'absolute', top: angular.element(theelm).css("top"), left: angular.element(theelm).css("left")});
            angular.element("#label-edit").focus();
            angular.element("#label-edit").on("keypress blur", function(e) {
                 if (e.keyCode == 13 || !e.keyCode) {
                     connector.getOverlay("label").setLabel(angular.element(this).val());
                     angular.elementelm.show();
                     angular.element("#label-edit").remove();
                 }
            });

            e.preventDefault();

    });

}

jsPlumbHelper.prototype.initTargets = function(){
    jsPlumb.makeTarget(jsPlumb.getSelector(".class"), {
        dropOptions: { hoverClass: "dragHover" }, anchor: "Continuous"
    });
};

jsPlumbHelper.prototype.initEndpoints = function(nextColour, curved) {
    angular.element(".ep").each(function(i, e) {
      var p = angular.element(e).parent();
      if (angular.element(e).attr('id') == undefined) { //check if endpoint already exsists [toolbox-demo]
        jsPlumb.makeSource(angular.element(e), {
             parent: p,
             //anchor:"BottomCenter",
             anchor: "Continuous",
             connector: ["StateMachine", {curviness: (curved ? 30.0 : 0.01), margin: 1.0}],
                           connectorStyle: {strokeStyle: nextColour, lineWidth: 2, outlineWidth: 6, outlineColor: 'transparent'}, // Strokestyle: color,
             maxConnections: -1//, uniqueEndpoint: true
        });
      }
    });
};

jsPlumbHelper.prototype.changeEndShape = function(c,type) {
    // Right click to change between association types: Undirected association => Directed association => Aggregation => Composition => Inheritance and Realization
    connector = c;
    if (connector.getOverlay("directedAssociation") || type=="aggregate") {
        // if it is an directed association
        connector.removeOverlay("directedAssociation");
        // add an aggregation
        connector.addOverlay(["Arrow", {
                              label: "Arrow",
                              cssClass: "diamond",
                              foldback: 2.0,
                              paintStyle: {fillStyle: "white"},
                              id: "aggregation",
                              location: 1
                              }]);
    } else if (connector.getOverlay("aggregation") || type=="composite") {
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
    } else if (connector.getOverlay("composition") || type=="inheritance") {
            // if it is an inheritance
            connector.removeOverlay("composition");
            // add a composition
            connector.addOverlay(["Arrow", {
                                  label: "Arrow",
                                  cssClass: "diamond",
                                  foldback: 1.0,
                                  id: "inheritance",
                                  location: 1,
                                  paintStyle: {fillStyle: "white"}
                                  }]);

    } else if (connector.getOverlay("inheritance" || type=="directed")) {
        // if it is an inheritance
        connector.removeOverlay("inheritance");
       // connector.setPaintStyle({dashstyle: "none", strokeStyle:"#000000", lineWidth:2});
      //  connector.setHoverPaintStyle({dashstyle: "2 4", strokeStyle:"#42a62c", lineWidth:2});
    } else {
        // if it is currently an undirected association (no arrow label)
        // add a directed association (black solid triangle arrow)
        connector.addOverlay(["Arrow", {
                              label: "Arrow",
                              foldback: 0.1,
                              id: "directedAssociation",
                              location: 1
                              }]);
        //connector.addOverlay([ "Label", { label:"*", id:"label",location: 0.94 } ]);

    }
   // if (connector.getOverlay('directedAssociation')) //event logger
       // console.log('changed to directed association from: '+connector.sourceId +'to '+connector.targetId); //event logger
};
