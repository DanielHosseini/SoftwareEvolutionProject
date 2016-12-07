'use strict';
var myApp = angular.module('myApp');
myApp.controller('XMLController', ['$scope', 'observerService', 'diagramService', 'classObject', 'packageObject', 'attributeObject', 'operationObject',
    function($scope, observerService, diagramService, classObject, packageObject, attributeObject, operationObject) {

        $scope.exportXML = function() {

                var XMLstring = '<?xml version="1.0" encoding="UTF-8"?><XMI xmi.version="1.1" xmlns:UML="href://org.omg/UML/1.3"><XMI.header><XMI.documentation><XMI.owner></XMI.owner><XMI.contact></XMI.contact><XMI.exporter>UML WEB Editor</XMI.exporter><XMI.exporterVersion>1.0</XMI.exporterVersion><XMI.notice></XMI.notice></XMI.documentation><XMI.metamodel xmi.name="UML" xmi.version="1.3" /></XMI.header><XMI.content><UML:Model xmi.id="UMLModel.3" name="Design Model" visibility="public" isSpecification="false" namespace="UMLModel.2" isRoot="false" isLeaf="false" isAbstract="false"><UML:Namespace.ownedElement>';


                function toXMIClass(childs, namespace) {
                    if (typeof namespace !== 'undefined')
                        namespace = 'namespace="' + namespace + '"';
                    else
                        namespace = 'namespace="model1"';


                    for (var i = 0; i < childs.length; i++) {
                        var atts = angular.element(childs[i]).find('ul').children();

                        var class_name = angular.element(childs[i]).find('h1').text();
                        var class_id = $(childs[i]).children()[0].id;



                        XMLstring += '<UML:Class name="' + class_name + '" ' + namespace + ' xmi.id="' + class_id + '"><UML:Classifier.feature>';
                        for (var j = 0; j < atts.length; j++) {
                            if ($(atts[j]).attr('class').search('attributeElement') !== -1)
                                XMLstring += '<UML:Attribute name="' + $(atts[j]).text().trim() + '" xmi.id="att' + j + '_' + class_id + '" />'

                            if ($(atts[j]).attr('class').search('operationElement') !== -1)
                                XMLstring += '<UML:Operation name="' + $(atts[j]).text().trim() + '" xmi.id="oper' + j + '_' + class_id + '" />'
                        }
                        XMLstring += '</UML:Classifier.feature></UML:Class>';
                    }
                }

                var childs = angular.element('#diagram-canvas').children().children('.class');
                toXMIClass(childs);

                var packages = angular.element('#diagram-canvas').children().children('.package');

                for (var i = 0; i < packages.length; i++) {
                    XMLstring += '<UML:Package isAbstract="false" isLeaf="false" isRoot="false" name="' + $(packages[i]).children('h1').text() + '" xmi.id="' +$(packages[i]).children()[0].id + '">';
                    XMLstring += '<UML:Namespace.ownedElement>';
                    var classesInPackage = angular.element(packages[i]).find('.class');
                    toXMIClass(classesInPackage, $(packages[i]).children()[0].id);
                    XMLstring += '</UML:Namespace.ownedElement>';
                    XMLstring += '</UML:Package>';


                }

                //add association to xml string
                var conns = jsPlumb.getAllConnections();
                for (var i = 0; i < conns.length; i++) {

                    var name, nav, agr, gen, dep;
                    name = '';
                    nav = '';
                    agr = '';
                    gen = false;
                    dep = false;
                    //below can be done much nicer
                    var overlays = jsPlumb.getAllConnections()[i].getOverlays();
                    if (overlays.length === 1) {
                        if ((jsPlumb.getAllConnections()[i].getOverlays()[0].id) === "directedAssociation")
                            nav = ' isNavigable="true"';
                        if ((jsPlumb.getAllConnections()[i].getOverlays()[0].id) === "aggregation")
                            agr = '     aggregation="aggregate"';
                        if ((jsPlumb.getAllConnections()[i].getOverlays()[0].id) === "composition")
                            agr = '     aggregation="composite"';
                        if ((jsPlumb.getAllConnections()[i].getOverlays()[0].id) === "label")
                            name = ' name="' + jsPlumb.getAllConnections()[i].getOverlays()[0].labelText + '"';
                        if ((jsPlumb.getAllConnections()[i].getOverlays()[0].id) === "inheritance")
                            gen = true;
                        if ((jsPlumb.getAllConnections()[i].getOverlays()[0].id) === "dependency")
                            dep = true;
                    }
                    if (overlays.length === 2) {
                        if ((jsPlumb.getAllConnections()[i].getOverlays()[0].id) === "directedAssociation" || (jsPlumb.getAllConnections()[i].getOverlays()[1].id) === "directedAssociation")
                            nav = ' isNavigable="true"';
                        if ((jsPlumb.getAllConnections()[i].getOverlays()[0].id) === "aggregation" || (jsPlumb.getAllConnections()[i].getOverlays()[1].id) === "agregation")
                            agr = '     aggregation="aggregate"';
                        if ((jsPlumb.getAllConnections()[i].getOverlays()[0].id) === "composition" || (jsPlumb.getAllConnections()[i].getOverlays()[1].id) === "composition")
                            agr = '     aggregation="composite"';
                        if ((jsPlumb.getAllConnections()[i].getOverlays()[0].id) === "label")
                            name = ' name="' + jsPlumb.getAllConnections()[i].getOverlays()[0].labelText + '"';
                        if ((jsPlumb.getAllConnections()[i].getOverlays()[1].id) === "label")
                            name = ' name="' + jsPlumb.getAllConnections()[i].getOverlays()[1].labelText + '"';
                        if ((jsPlumb.getAllConnections()[i].getOverlays()[0].id) === "inheritance")
                            gen = true;
                        if ((jsPlumb.getAllConnections()[i].getOverlays()[1].id) === "inheritance")
                            gen = true;
                        if ((jsPlumb.getAllConnections()[i].getOverlays()[0].id) === "dependency")
                            dep = true;
                        if ((jsPlumb.getAllConnections()[i].getOverlays()[1].id) === "dependency")
                            dep = true;
                    }


                    if (overlays.length > 2) {
                        for (var index = 0; index < overlays.length; index++) {
                            var overlayid = jsPlumb.getAllConnections()[i].getOverlays()[index].id;
                            if (overlayid === "directedAssociation")
                                nav = ' isNavigable="true"';
                            if (overlayid === "aggregation")
                                agr = '     aggregation="aggregate"';
                            if (overlayid === "composition")
                                agr = '     aggregation="composite"';
                            if (overlayid === "label")
                                name = ' name="' + jsPlumb.getAllConnections()[i].getOverlays()[index].labelText + '"';
                            //multiplicity source
                            if (overlayid === "m_l")
                                var ms = jsPlumb.getAllConnections()[i].getOverlays()[index].labelText;
                            //multiplicity target
                            if (overlayid === "m_r")
                                var mt = jsPlumb.getAllConnections()[i].getOverlays()[index].labelText;
                        }
                    }

                    if (typeof ms !== 'undefined') {
                        var lower_source = ms.split('..')[0];
                        var upper_source = ms.split('..')[1];
                    } else {
                        var lower_source = "";
                        var upper_source = "";
                    }
                    if (typeof mt !== 'undefined') {
                        var lower_target = mt.split('..')[0];
                        var upper_target = mt.split('..')[1];
                    } else {
                        var lower_target = "";
                        var upper_target = "";
                    }

                    var mStringSource = '<UML:AssociationEnd.multiplicity><UML:Multiplicity><UML:Multiplicity.range><UML:MultiplicityRange lower="' + lower_source + '" upper="' + upper_source + '"/></UML:Multiplicity.range></UML:Multiplicity></UML:AssociationEnd.multiplicity>';
                    var mStringTarget = '<UML:AssociationEnd.multiplicity><UML:Multiplicity><UML:Multiplicity.range><UML:MultiplicityRange lower="' + lower_target + '" upper="' + upper_target + '"/></UML:Multiplicity.range></UML:Multiplicity></UML:AssociationEnd.multiplicity>';

                    //in case lower or upperbound are not there
                    mStringSource = mStringSource.replace("undefined", "");
                    mStringTarget = mStringTarget.replace("undefined", "");

                    if (dep) {
                        XMLstring += '<UML:Dependency xmi.id="' + conns[i].id + '" ' + name + ' client="' + conns[i].sourceId + '" supplier="' + conns[i].targetId + '" />';
                    } else if (gen) {
                        XMLstring += '<UML:Generalization xmi.id="' + conns[i].id + '" ' + name + ' visibility="public" isSpecification="false" namespace="model1" discriminator="" child="' + conns[i].sourceId + '" parent="' + conns[i].targetId + '" />';
                    } else {
                        XMLstring += '<UML:Association ' + name + ' namespace="model1" xmi.id="' + conns[i].id + '"><UML:Association.connection>';

                        XMLstring += '<UML:AssociationEnd association="ass' + i + '" type="' + conns[i].sourceId + '" xmi.id="end' + i + '">' + mStringSource + '<UML:AssociationEnd.participant></UML:AssociationEnd.participant></UML:AssociationEnd>';

                        XMLstring += '<UML:AssociationEnd' + nav + ' ' + agr + ' association="ass' + i + '" type="' + conns[i].targetId + '" xmi.id="end' + i + '">' + mStringTarget + '<UML:AssociationEnd.participant></UML:AssociationEnd.participant></UML:AssociationEnd>';

                        XMLstring += '</UML:Association.connection></UML:Association>';
                    }
                }




                XMLstring += '</UML:Namespace.ownedElement></UML:Model>';

                //start of diagram part of XMI file

                XMLstring += '<UML:Diagram xmi.id="UMLClassDiagram.4" name="OnlineUMLExport" diagramType="ClassDiagram" toolName="Rational Rose 98" owner="UMLModel.3"><UML:Diagram.element>';

                function classToDiagram(childs, id) {
                    for (var i = 0; i < childs.length; i++) {

                        var top = $(childs[i]).offset().top - $(childs[i]).parent().offset().top;
                        var left = $(childs[i]).offset().left - $(childs[i]).parent().offset().left;

                        if (typeof id !== 'undefined') {
                            top = $(childs[i]).offset().top - $(childs[i]).parent().parent().offset().top;
                            left = $(childs[i]).offset().left - $(childs[i]).parent().parent().offset().left;
                        }


                        var elementWidth = $(childs[i]).width();
                        var elementHeight = $(childs[i]).height();
                        var idref = id;

                        XMLstring += '<UML:DiagramElement xmi.id="UMLClassView.' + $(childs[i]).children()[0].id + '" geometry="' + Math.round(left) + ',' + Math.round(top) + ',' + Number(Math.round(left) + elementWidth) + ',' + Number(Math.round(top) + elementHeight) + '," style="LineColor.Red=128,LineColor.Green=0,LineColor.Blue=0,FillColor.Red=255,FillColor.Green=255,FillColor.Blue=185,Font.Red=0,Font.Green=0,Font.Blue=0,Font.FaceName=Tahoma,Font.Size=8,Font.Bold=0,Font.Italic=0,Font.Underline=0,Font.Strikethrough=0,AutomaticResize=0,ShowAllAttributes=1,SuppressAttributes=0,ShowAllOperations=1,SuppressOperations=0,ShowOperationSignature=1," subject="' + $(childs[i]).children()[0].id + '">';

                        if (typeof idref !== 'undefined')
                            XMLstring += '<parentDiagramElement idref="' + idref + '"/>';

                        XMLstring += '</UML:DiagramElement>';
                    }

                }

                childs = $('#diagram-canvas').find('.class');
                classToDiagram(childs);

                childs = $('#diagram-canvas').find('.package');
                for (var i = 0; i < childs.length; i++) {
                    classToDiagram(new Array(childs[i]));

                    var classes = $(childs[i]).children('.class');
                    classToDiagram(classes, 'UMLClassView.' + $(childs[i]).attr('id'));
                }

                //add associations
                for (var i = 0; i < conns.length; i++) {
                    XMLstring += '<UML:DiagramElement xmi.id="UMLAssociationView' + conns[i].id + '" style="Association:LineColor.Red=128,LineColor.Green=0,LineColor.Blue=0,Font.Red=0,Font.Green=0,Font.Blue=0,Font.FaceName=Tahoma,Font.Size=8,Font.Bold=0,Font.Italic=0,Font.Underline=0,Font.Strikethrough=0," subject="' + conns[i].id + '" />';
                }

                XMLstring += '</UML:Diagram.element></UML:Diagram></XMI.content></XMI>';
                XMLstring=vkbeautify.xml(XMLstring);
                var blob = new Blob([XMLstring], {
                    type: "text/xml"
                });
                saveAs(blob, "UOE" + Date.now().toString() + ".xml");

            } //END ALERT FUNC

        //XMLImporter
        $scope.XMLImporter = function() {
            var parent = this;
            angular.element("#xmi-input-dialog").dialog({
                autoOpen: false
            });
            angular.element("#xmi-input-dialog").dialog("open");
            angular.element("#xmi-input-dialog").dialog({
                buttons: {
                    ImportXMI: function() {
                        parent.importXML(angular.element("#xmi-input").val());
                        $scope.$apply();
                        angular.element(this).dialog("close");
                    }
                }
            });
        }

        $scope.importXML = function(element) {

                var XMI = $.parseXML(element);
                var model_elements = $(XMI).find('UML\\:Model, \\Model').find('UML\\:Namespace\\.ownedElement, \\Namespace\\.ownedElement').children();
                var diagram_elements = $(XMI).find('UML\\:Diagram, \\Diagram').find('UML\\:Diagram\\.element, Diagram\\.element');


                var ymax = 0;
                var xmax = 0;
                $(XMI).find('UML\\:Diagram, \\Diagram').find('UML\\:Diagram\\.element, Diagram\\.element').children().each(function() {
                    if (typeof $(this).attr('geometry') !== 'undefined') {
                        var xnew = Number($(this).attr('geometry').split(',')[0]) + Number($(this).attr('geometry').split(',')[2]);
                        var ynew = Number($(this).attr('geometry').split(',')[1]) + Number($(this).attr('geometry').split(',')[3]);

                        if (xnew > xmax)
                            xmax = xnew
                        if (ynew > ymax)
                            ymax = ynew
                    }


                });

                if (xmax > Number($('#diagram-canvas').width()))
                    var xratio = xmax / Number($('#diagram-canvas').width());
                else
                    xratio = 1;

                if (ymax > Number($('#diagram-canvas').height()))
                    var yratio = ymax / Number($('#diagram-canvas').height());
                else
                    yratio = 1;


                var packages = [];
                var classes = [];

                for (i = 0; i < model_elements.length; i++) {

                    if ($(model_elements[i]).prop('tagName') === "UML:Package") {
                        var packageName = $(model_elements[i]).attr('name');
                        var packageId = $(model_elements[i]).attr('xmi.id')

                        var x = $(diagram_elements).children('[subject|="' + $(model_elements[i]).attr('xmi.id') + '"]');
                        if (x !== 'undefined')
                            x = $(x).attr('geometry').split(',')[0];
                        else
                            x = 0;
                        var y = $(diagram_elements).children('[subject|="' + $(model_elements[i]).attr('xmi.id') + '"]');
                        if (y !== 'undefined')
                            y = $(y).attr('geometry').split(',')[1];
                        else
                            y = 0;


                        var w = $(diagram_elements).children('[subject|="' + $(model_elements[i]).attr('xmi.id') + '"]');
                        var h = $(diagram_elements).children('[subject|="' + $(model_elements[i]).attr('xmi.id') + '"]');

                        packages.push({id: packageId, pack: new packageObject(packageName, [x, y])});

                    }

                    if ($(model_elements[i]).prop('tagName') === "UML:Class") {

                        var className = $(model_elements[i]).attr('name');
                        var refId = $(model_elements[i]).attr('namespace')
                        var classId = $(model_elements[i]).attr('xmi.id')

                        var x = $(diagram_elements).children('[subject|="' + $(model_elements[i]).attr('xmi.id') + '"]');
                        if (x !== 'undefined')
                            x = $(x).attr('geometry').split(',')[0];
                        else
                            x = 0;
                        var y = $(diagram_elements).children('[subject|="' + $(model_elements[i]).attr('xmi.id') + '"]');
                        if (y !== 'undefined')
                            y = $(y).attr('geometry').split(',')[1];
                        else
                            y = 0;

                        if(refId.indexOf('package') >= -1){
                            classes.push({id: classId, clas: new classObject(className, [x, y]), packageId: refId});

                        } else {
                            classes.push({id: classId, clas: new classObject(className, [x, y])});
                        }
                    }





                }


                for (var i = 0; i < model_elements.length; i++) {
                    var features = $(model_elements[i]).prop('tagName', 'UML:Class').children().children();
                    for (var j = 0; j < features.length; j++) {
                        if ($(features[j]).prop('tagName') === "UML:Attribute") {
                            var classId = $(features[j]).attr('xmi.id')
                            classId = classId.substring(classId.indexOf('class'), classId.length)
                            var name = $(features[j]).attr('name')
                            angular.forEach(classes, function(clas){
                                if(clas.id === classId ){
                                    clas.clas.addAttribute(new attributeObject(name));
                                }
                            })


                        }
                        if ($(features[j]).prop('tagName') === "UML:Operation") {
                            var classId = $(features[j]).attr('xmi.id')
                            classId = classId.substring(classId.indexOf('class'), classId.length)
                            var name = $(features[j]).attr('name'); //also makes ul -> has to be changed
                            angular.forEach(classes, function(clas){
                                if(clas.id === classId ){
                                    clas.clas.addOperation(new operationObject(name));
                                }
                            })

                        }

                    }
                }
                angular.forEach(classes, function(clas){
                    if(clas.packageId === undefined || clas.packageId.indexOf("package") === -1){
                        diagramService.addClass(clas.clas);
                    }else {
                        angular.forEach(packages, function(packag){
                            if(packag.id === clas.packageId){
                                packag.pack.addClass(clas.clas);
                            }
                        })
                    }
                })
                angular.forEach(packages, function(packag){
                    if(packag.id === refId){
                        diagramService.addPackage(packag.pack);
                    }
                })



                for (var i = 0; i < model_elements.length; i++) { 
                    if ($(model_elements[i]).prop('tagName') === "UML:Association") {

                        var check_in_diagram = $(diagram_elements).children('[subject|="' + $(model_elements[i]).attr('xmi.id') + '"]');

                        var end0 = $($($(model_elements[i]).children()[0]).children()[0]).attr('type');
                        var end1 = $($($(model_elements[i]).children()[0]).children()[1]).attr('type');
                        var aggr1 = $($($(model_elements[i]).children()[0]).children()[1]).attr('aggregation');
                        var navig = $($($(model_elements[i]).children()[0]).children()[1]).attr('isNavigable');
                        if (navig)
                           var agr1 = 'directed';
                        var tmpcon = jsPlumb.connect({ source: connections[end0], target: connections[end1], connector: ["Straight"], paintStyle: { strokeStyle: '#000000', lineWidth: 2 } });
                        if (typeof aggr1 !== 'undefined' || typeof navig !== 'undefined')
                            jsPlumbHelper.changeEndShape(tmpcon, aggr1);
                        var name = $(model_elements[i]).attr('name');
                        if (typeof name !== 'undefined')
                            tmpcon.addOverlay(["Label", { label: name, id: "label", cssClass: "connectionLabel" }]);

                        if (check_in_diagram.length === 0)
                            tmpcon.setPaintStyle({ strokeStyle: 'red' });
                    }
                }

                for (var i = 0; i < model_elements.length; i++) {
                    if ($(model_elements[i]).prop('tagName') === "UML:Dependency") {
                        var end0 = $(model_elements[i]).attr('client');
                        var end1 = $(model_elements[i]).attr('supplier');

                        var tmpcon = jsPlumb.connect({ source: connections[end0], target: connections[end1], connector: ["Straight"], paintStyle: { strokeStyle: '#000000', lineWidth: 2 } });
                        jsPlumbHelper.changeEndShape(tmpcon, 'dependency');

                        tmpcon.removeOverlay("directedAssociation");
                        tmpcon.addOverlay(["Arrow", {
                            label: "Arrow",
                            foldback: 0.1,
                            id: "dependency",
                            location: 1
                        }]);

                        tmpcon.setPaintStyle({ dashstyle: "4 4", strokeStyle: "#000000", lineWidth: 2 });
                        tmpcon.setHoverPaintStyle({ dashstyle: "4 4", strokeStyle: "#42a62c", lineWidth: 2 });

                        var name = $(model_elements[i]).attr('name');
                        if (typeof name !== 'undefined')
                            tmpcon.addOverlay(["Label", { label: name, id: "label", cssClass: "connectionLabel" }]);
                    }
                }

                for (var i = 0; i < model_elements.length; i++) {
                    if ($(model_elements[i]).prop('tagName') === "UML:Generalization") {

                        var end0 = $(model_elements[i]).attr('child');
                        var end1 = $(model_elements[i]).attr('parent');

                        var tmpcon = jsPlumb.connect({ source: connections[end0], target: connections[end1], connector: ["Straight"], paintStyle: { strokeStyle: '#000000', lineWidth: 2 } });
                        jsPlumbHelper.changeEndShape(tmpcon, 'inheritance');

                        var name = $(model_elements[i]).attr('name');
                        if (typeof name !== 'undefined')
                            tmpcon.addOverlay(["Label", { label: name, id: "label", cssClass: "connectionLabel" }]);
                    }
                }

                jsPlumb.repaintEverything();





                $(".package").on('dragstop', function(event) {

                    jsPlumb.repaintEverything();
                });



            } //End Import Method

        $scope.getObserverLog = function() {
            observerService.addLogEntry("Hello this is a test entry from XMLController")
            var log = observerService.getLog();
            var blob = new Blob([log], {
                type: "text/csv"
            });
            saveAs(blob, "UOE" + Date.now().toString() + ".csv");

        }



    }
]);
