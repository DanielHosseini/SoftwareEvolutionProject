angular.module('myApp')
.controller('XMLController', ['$scope', 'observerService', 'diagramService', 'classObject', 'packageObject', 'attributeObject', 'operationObject',
    function(scope, observerService, diagramService, classObject, packageObject, attributeObject, operationObject) {
        function toXMIClass(childs, namespace) {
            var returnString = "";
            if (typeof namespace !== 'undefined')
                namespace = 'namespace="' + namespace + '"';
            else
                namespace = 'namespace="model1"';


            for (var i = 0; i < childs.length; i++) {
                var atts = angular.element(childs[i]).find('ul').children();

                var class_name = angular.element(childs[i]).find('h1').text();
                var class_id = $(childs[i]).children()[0].id;


                returnString += '<UML:Class name="' + class_name + '" ' + namespace + ' xmi.id="' + class_id + '"><UML:Classifier.feature>';
                for (var j = 0; j < atts.length; j++) {
                    if ($(atts[j]).attr('class').search('attributeElement') !== -1)
                        returnString += '<UML:Attribute name="' + $(atts[j]).text().trim() + '" xmi.id="att' + j + '_' + class_id + '" />'

                    if ($(atts[j]).attr('class').search('operationElement') !== -1)
                        returnString += '<UML:Operation name="' + $(atts[j]).text().trim() + '" xmi.id="oper' + j + '_' + class_id + '" />'
                }
                returnString += '</UML:Classifier.feature></UML:Class>';
            }
            return returnString;
        }

        function addAssociations(conns){
            var returnString = "";


            for (var i = 0; i < conns.length; i++) {

                var name, nav, agr, gen, dep;
                name = '';
                nav = '';
                agr = '';
                gen = false;
                dep = false;
                //below can be done much nicer
                var overlays = jsPlumb.getAllConnections()[i].getOverlays();
                for (var index = 0; index < overlays.length; index++) {
                    var overlayid = jsPlumb.getAllConnections()[i].getOverlays()[index].id;
                    switch(overlayid) {
                        case "directedAssociation":
                            nav = ' isNavigable="true"';
                            break;
                        case "aggregation":
                            agr = '     aggregation="aggregate"';
                            break;
                        case "composition":
                            agr = '     aggregation="composite"';
                            break;
                        case "label":
                            name = ' name="' + jsPlumb.getAllConnections()[i].getOverlays()[index].labelText + '"';
                            break;
                        //multiplicity source
                        case "m_l":
                            var ms = jsPlumb.getAllConnections()[i].getOverlays()[index].labelText;
                            break;
                        //multiplicity target
                        case "m_r":
                            var mt = jsPlumb.getAllConnections()[i].getOverlays()[index].labelText;
                            break;
                        case "inheritance":
                            gen = true;
                            break;
                        case "dependency":
                            dep = true;
                            break;
                        default:
                            break;
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
                    returnString += '<UML:Dependency xmi.id="' + conns[i].id + '" ' + name + ' client="' + conns[i].sourceId + '" supplier="' + conns[i].targetId + '" />';
                } else if (gen) {
                    returnString += '<UML:Generalization xmi.id="' + conns[i].id + '" ' + name + ' visibility="public" isSpecification="false" namespace="model1" discriminator="" child="' + conns[i].sourceId + '" parent="' + conns[i].targetId + '" />';
                } else {
                    returnString += '<UML:Association ' + name + ' namespace="model1" xmi.id="' + conns[i].id + '"><UML:Association.connection>';

                    returnString += '<UML:AssociationEnd association="ass' + i + '" type="' + conns[i].sourceId + '" xmi.id="end' + i + '">' + mStringSource + '<UML:AssociationEnd.participant></UML:AssociationEnd.participant></UML:AssociationEnd>';

                    returnString += '<UML:AssociationEnd' + nav + ' ' + agr + ' association="ass' + i + '" type="' + conns[i].targetId + '" xmi.id="end' + i + '">' + mStringTarget + '<UML:AssociationEnd.participant></UML:AssociationEnd.participant></UML:AssociationEnd>';

                    returnString += '</UML:Association.connection></UML:Association>';
                }
            }
            return returnString;
        }

        function classToDiagram(childs, id) {
            var returnString = "";
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

                returnString += '<UML:DiagramElement xmi.id="UMLClassView.' + $(childs[i]).children()[0].id + '" geometry="' + Math.round(left) + ',' + Math.round(top) + ',' + Number(Math.round(left) + elementWidth) + ',' + Number(Math.round(top) + elementHeight) + '," style="LineColor.Red=128,LineColor.Green=0,LineColor.Blue=0,FillColor.Red=255,FillColor.Green=255,FillColor.Blue=185,Font.Red=0,Font.Green=0,Font.Blue=0,Font.FaceName=Tahoma,Font.Size=8,Font.Bold=0,Font.Italic=0,Font.Underline=0,Font.Strikethrough=0,AutomaticResize=0,ShowAllAttributes=1,SuppressAttributes=0,ShowAllOperations=1,SuppressOperations=0,ShowOperationSignature=1," subject="' + $(childs[i]).children()[0].id + '">';

                if (typeof idref !== 'undefined')
                    returnString += '<parentDiagramElement idref="' + idref + '"/>';

                returnString += '</UML:DiagramElement>';
            }
            return returnString;

        }

        scope.exportXML = function() {

                var XMLstring = '<?xml version="1.0" encoding="UTF-8"?><XMI xmi.version="1.1" xmlns:UML="href://org.omg/UML/1.3"><XMI.header><XMI.documentation><XMI.owner></XMI.owner><XMI.contact></XMI.contact><XMI.exporter>UML WEB Editor</XMI.exporter><XMI.exporterVersion>1.0</XMI.exporterVersion><XMI.notice></XMI.notice></XMI.documentation><XMI.metamodel xmi.name="UML" xmi.version="1.3" /></XMI.header><XMI.content><UML:Model xmi.id="UMLModel.3" name="Design Model" visibility="public" isSpecification="false" namespace="UMLModel.2" isRoot="false" isLeaf="false" isAbstract="false"><UML:Namespace.ownedElement>';



                var childs = angular.element('#diagram-canvas').children().children('.class');
                XMLstring+= toXMIClass(childs);

                var packages = angular.element('#diagram-canvas').children().children('.package');

                for (var i = 0; i < packages.length; i++) {
                    XMLstring += '<UML:Package isAbstract="false" isLeaf="false" isRoot="false" name="' + $(packages[i]).children('h1').text() + '" xmi.id="' +$(packages[i]).children()[0].id + '">';
                    XMLstring += '<UML:Namespace.ownedElement>';
                    var classesInPackage = angular.element(packages[i]).find('.class');
                    XMLstring+= toXMIClass(classesInPackage, $(packages[i]).children()[0].id);
                    XMLstring += '</UML:Namespace.ownedElement>';
                    XMLstring += '</UML:Package>';


                }

                var conns = jsPlumb.getAllConnections();
                XMLstring += addAssociations(conns);

                XMLstring += '</UML:Namespace.ownedElement></UML:Model>';

                //start of diagram part of XMI file

                XMLstring += '<UML:Diagram xmi.id="UMLClassDiagram.4" name="OnlineUMLExport" diagramType="ClassDiagram" toolName="Rational Rose 98" owner="UMLModel.3"><UML:Diagram.element>';

                childs = $('#diagram-canvas').find('.class');
                XMLstring += classToDiagram(childs);

                childs = $('#diagram-canvas').find('.package');
                for (var j = 0; j < childs.length; j++) {
                    XMLstring += classToDiagram(new Array(childs[j]));

                    var classes = $(childs[j]).children('.class');
                    XMLstring += classToDiagram(classes, 'UMLClassView.' + $(childs[j]).attr('id'));
                }

                //add associations
                for (var k = 0; k < conns.length; k++) {
                    XMLstring += '<UML:DiagramElement xmi.id="UMLAssociationView' + conns[k].id + '" style="Association:LineColor.Red=128,LineColor.Green=0,LineColor.Blue=0,Font.Red=0,Font.Green=0,Font.Blue=0,Font.FaceName=Tahoma,Font.Size=8,Font.Bold=0,Font.Italic=0,Font.Underline=0,Font.Strikethrough=0," subject="' + conns[k].id + '" />';
                }

                XMLstring += '</UML:Diagram.element></UML:Diagram></XMI.content></XMI>';
                XMLstring=vkbeautify.xml(XMLstring);
                var blob = new Blob([XMLstring], {
                    type: "text/xml"
                });
                saveAs(blob, "UOE" + Date.now().toString() + ".xml");

            } //END ALERT FUNC

        //XMLImporter
        scope.XMLImporter = function() {
            
            angular.element("#xmi-input-dialog").dialog({
                autoOpen: false
            });
            angular.element("#xmi-input-dialog").dialog("open");
            angular.element("#xmi-input-dialog").dialog({
                buttons: {
                    ImportXMI: function() {
                        scope.importXML(angular.element("#xmi-input").val());
                        scope.$apply();
                        angular.element("#xmi-input-dialog").dialog("close");
                    }
                }
            });
        }

        function getClasses(model_elements, diagram_elements){
            var classes = [];
            for (var i = 0; i < model_elements.length; i++) {
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
            return classes;
        }

        function getPackages(model_elements, diagram_elements){
            var packages = [];
            for (var i = 0; i < model_elements.length; i++) {

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



                    packages.push({id: packageId, pack: new packageObject(packageName, [x, y])});

                }
            }
            return packages;
        }

        function getFeatures(features, classes){
            for (var j = 0; j < features.length; j++) {
                console.log($(features[j]).prop('tagName'))
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

        scope.importXML = function(element) {
                var XMI = $.parseXML(element);
                var model_elements = $(XMI).find('UML\\:Model, \\Model').find('UML\\:Namespace\\.ownedElement, \\Namespace\\.ownedElement').children();
                var diagram_elements = $(XMI).find('UML\\:Diagram, \\Diagram').find('UML\\:Diagram\\.element, Diagram\\.element');


                var ymax = 0;
                var xmax = 0;
                $(XMI).find('UML\\:Diagram, \\Diagram').find('UML\\:Diagram\\.element, Diagram\\.element').children().each(function() {
                    if (typeof $(scope).attr('geometry') !== 'undefined') {
                        var xnew = Number($(scope).attr('geometry').split(',')[0]) + Number($(scope).attr('geometry').split(',')[2]);
                        var ynew = Number($(scope).attr('geometry').split(',')[1]) + Number($(scope).attr('geometry').split(',')[3]);

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


                var packages = getPackages(model_elements, diagram_elements);
                var classes = getClasses(model_elements, diagram_elements);

                for (var i = 0; i < model_elements.length; i++) {
                    var features = ($(model_elements[i]).prop('tagName', 'UML:Class').children().children());
                    getFeatures(features, classes);
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
                    diagramService.addPackage(packag.pack);
                })



                for (var i = 0; i < model_elements.length; i++) {
                    if ($(model_elements[i]).prop('tagName') === "UML:Association") {

                        var check_in_diagram = $(diagram_elements).children('[subject|="' + $(model_elements[i]).attr('xmi.id') + '"]');

                        var end0 = $($($(model_elements[i]).children()[0]).children()[0]).attr('type');
                        var end1 = $($($(model_elements[i]).children()[0]).children()[1]).attr('type');
                        var aggr1 = $($($(model_elements[i]).children()[0]).children()[1]).attr('aggregation');
                        var navig = $($($(model_elements[i]).children()[0]).children()[1]).attr('isNavigable');
                        if (navig)
                           var aggr1 = 'directed';
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





                $(".package").on('dragstop', function() {

                    jsPlumb.repaintEverything();
                });



            } //End Import Method

        scope.getObserverLog = function() {
            observerService.addLogEntry("Hello this is a test entry from XMLController")
            var log = observerService.getLog();
            var blob = new Blob([log], {
                type: "text/csv"
            });
            saveAs(blob, "UOE" + Date.now().toString() + ".csv");

        }



    }
]);
