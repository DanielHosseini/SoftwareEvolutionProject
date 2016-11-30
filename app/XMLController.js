'use strict';
var myApp = angular.module('myApp');
myApp.controller('XMLController', function ($scope) {

 $scope.exportXML = function(){

var XMLstring = '<?xml version="1.0" encoding="UTF-8"?><XMI xmi.version="1.1" xmlns:UML="href://org.omg/UML/1.3"><XMI.header><XMI.documentation><XMI.owner></XMI.owner><XMI.contact></XMI.contact><XMI.exporter>UML WEB Editor</XMI.exporter><XMI.exporterVersion>1.0</XMI.exporterVersion><XMI.notice></XMI.notice></XMI.documentation><XMI.metamodel xmi.name="UML" xmi.version="1.3" /></XMI.header><XMI.content><UML:Model xmi.id="UMLModel.3" name="Design Model" visibility="public" isSpecification="false" namespace="UMLModel.2" isRoot="false" isLeaf="false" isAbstract="false"><UML:Namespace.ownedElement>';
  		console.log("FIRST", XMLstring)

    
    function toXMIClass(childs, namespace){
    	console.log("toxmi method")
        if (typeof namespace != 'undefined')
            namespace = 'namespace="'+namespace+'"';
        else
            namespace = 'namespace="model1"';

        
        for (var i = 0 ; i < childs.length ; i++){
        	console.log("loop")
            var atts = $(childs[i]).find('ul').children();
            
            var class_name = $(childs[i]).children('h1').text();
            var class_id = $(childs[i]).attr('id');
            
            
            
            XMLstring += '<UML:Class name="'+class_name+'" '+namespace+' xmi.id="'+class_id+'"><UML:Classifier.feature>';

            for (var j = 0 ; j < atts.length ; j++){
                if ($(atts[j]).attr('class').search('dummy')==-1){
                    if ($(atts[j]).attr('class').search('attribute')!=-1)
                        XMLstring += '<UML:Attribute name="'+$(atts[j]).text()+'" xmi.id="att'+j+'_'+class_id+'" />'
                        
                        if ($(atts[j]).attr('class').search('operation')!=-1)
                            XMLstring += '<UML:Operation name="'+$(atts[j]).text().replace('()','')+'" xmi.id="oper'+j+'_'+class_id+'" />'
                            }
            }
            XMLstring += '</UML:Classifier.feature></UML:Class>';
        }
    }

  var childs = $('#diagram-canvas').find('.class');
    toXMIClass(childs);
    
    var packages = $('#diagram-canvas').find('.package');


    for (var i = 0 ; i < packages.length ; i++){
        XMLstring += '<UML:Package isAbstract="false" isLeaf="false" isRoot="false" name="'+$(packages[i]).children('h1').text()+'" xmi.id="'+$(packages[i]).attr('id')+'">';
        XMLstring += '<UML:Namespace.ownedElement>';
        var classes = $(packages[i]).children('.class');
        toXMIClass(classes, $(packages[i]).attr('id') );
        XMLstring += '</UML:Namespace.ownedElement>';
        XMLstring += '</UML:Package>';


    }
        console.log("BOTH CLASS AND PACKAGE", XMLstring)

  
    //add association to xml string
    var conns = jsPlumb.getAllConnections();
    for (var i = 0 ; i < conns.length ; i++){
        
        var name,nav,agr,gen,dep;
        name = '';
        nav = '';
        agr = '';
        gen = false;
        dep = false;
    //below can be done much nicer
        var overlays = jsPlumb.getAllConnections()[i].getOverlays();
        if (overlays.length==1){
            if( (jsPlumb.getAllConnections()[i].getOverlays()[0].id ) == "directedAssociation" )
                nav = ' isNavigable="true"';
            if( (jsPlumb.getAllConnections()[i].getOverlays()[0].id ) == "aggregation" )
                agr = '     aggregation="aggregate"';
            if( (jsPlumb.getAllConnections()[i].getOverlays()[0].id ) == "composition" )
                agr = '     aggregation="composite"';
            if( (jsPlumb.getAllConnections()[i].getOverlays()[0].id ) == "label")
                name = ' name="'+jsPlumb.getAllConnections()[i].getOverlays()[0].labelText+'"';
            if( (jsPlumb.getAllConnections()[i].getOverlays()[0].id ) == "inheritance")
                gen = true;
            if( (jsPlumb.getAllConnections()[i].getOverlays()[0].id ) == "dependency")
                dep = true;
        }
        if (overlays.length==2){
            if( (jsPlumb.getAllConnections()[i].getOverlays()[0].id ) == "directedAssociation" || (jsPlumb.getAllConnections()[i].getOverlays()[1].id ) == "directedAssociation" )
                nav = ' isNavigable="true"';
            if( (jsPlumb.getAllConnections()[i].getOverlays()[0].id ) == "aggregation" || (jsPlumb.getAllConnections()[i].getOverlays()[1].id ) == "agregation" )
                agr = '     aggregation="aggregate"';
            if( (jsPlumb.getAllConnections()[i].getOverlays()[0].id ) == "composition" || (jsPlumb.getAllConnections()[i].getOverlays()[1].id ) == "composition" )
                agr = '     aggregation="composite"';
            if( (jsPlumb.getAllConnections()[i].getOverlays()[0].id ) == "label")
                name = ' name="'+jsPlumb.getAllConnections()[i].getOverlays()[0].labelText+'"';
            if( (jsPlumb.getAllConnections()[i].getOverlays()[1].id ) == "label")
                name = ' name="'+jsPlumb.getAllConnections()[i].getOverlays()[1].labelText+'"';
            if( (jsPlumb.getAllConnections()[i].getOverlays()[0].id ) == "inheritance")
                gen = true;
            if( (jsPlumb.getAllConnections()[i].getOverlays()[1].id ) == "inheritance")
                gen = true;
            if( (jsPlumb.getAllConnections()[i].getOverlays()[0].id ) == "dependency")
                dep = true;
            if( (jsPlumb.getAllConnections()[i].getOverlays()[1].id ) == "dependency")
                dep = true;
        }
        
        
        if (overlays.length>2){
            for (var index=0; index<overlays.length; index++){
                var overlayid = jsPlumb.getAllConnections()[i].getOverlays()[index].id;
                if (overlayid == "directedAssociation")
                    nav = ' isNavigable="true"';
                if( overlayid  == "aggregation")
                    agr = '     aggregation="aggregate"';
                if( overlayid == "composition" )
                    agr = '     aggregation="composite"';
                if( overlayid == "label")
                    name = ' name="'+jsPlumb.getAllConnections()[i].getOverlays()[index].labelText+'"';
                //multiplicity source
                if( overlayid == "m_l")
                    var ms = jsPlumb.getAllConnections()[i].getOverlays()[index].labelText;
                //multiplicity target
                if( overlayid == "m_r")
                    var mt = jsPlumb.getAllConnections()[i].getOverlays()[index].labelText;
            }
        }
        
        if(typeof ms!='undefined'){
            var lower_source= ms.split('..')[0];
            var upper_source= ms.split('..')[1];
        }
        else{
            var lower_source= "";
            var upper_source= "";
        }
        if(typeof mt!='undefined'){
            var lower_target= mt.split('..')[0];
            var upper_target= mt.split('..')[1];
        }
        else{
            var lower_target= "";
            var upper_target= "";
        }
    
        var mStringSource = '<UML:AssociationEnd.multiplicity><UML:Multiplicity><UML:Multiplicity.range><UML:MultiplicityRange lower="'+lower_source+'" upper="'+upper_source+'"/></UML:Multiplicity.range></UML:Multiplicity></UML:AssociationEnd.multiplicity>';
        var mStringTarget = '<UML:AssociationEnd.multiplicity><UML:Multiplicity><UML:Multiplicity.range><UML:MultiplicityRange lower="'+lower_target+'" upper="'+upper_target+'"/></UML:Multiplicity.range></UML:Multiplicity></UML:AssociationEnd.multiplicity>';
        
        //in case lower or upperbound are not there
        mStringSource = mStringSource.replace("undefined", "");
        mStringTarget = mStringTarget.replace("undefined", "");
        
        if (dep){
            XMLstring += '<UML:Dependency xmi.id="'+conns[i].id+'" '+name+' client="'+conns[i].sourceId+'" supplier="'+conns[i].targetId+'" />';
        }
        
        else if (gen){
            XMLstring += '<UML:Generalization xmi.id="'+conns[i].id+'" '+name+' visibility="public" isSpecification="false" namespace="model1" discriminator="" child="'+conns[i].sourceId+'" parent="'+conns[i].targetId+'" />';
        }else{
            XMLstring += '<UML:Association '+name+' namespace="model1" xmi.id="'+conns[i].id+'"><UML:Association.connection>';
            
            XMLstring += '<UML:AssociationEnd association="ass'+i+'" type="'+conns[i].sourceId+'" xmi.id="end'+i+'">'+mStringSource+'<UML:AssociationEnd.participant></UML:AssociationEnd.participant></UML:AssociationEnd>';
            
            XMLstring += '<UML:AssociationEnd'+nav+' '+agr+' association="ass'+i+'" type="'+conns[i].targetId+'" xmi.id="end'+i+'">'+mStringTarget+'<UML:AssociationEnd.participant></UML:AssociationEnd.participant></UML:AssociationEnd>';
            
            XMLstring += '</UML:Association.connection></UML:Association>';
        }
    }



   
    XMLstring += '</UML:Namespace.ownedElement></UML:Model>';
    
    //start of diagram part of XMI file
    
    XMLstring += '<UML:Diagram xmi.id="UMLClassDiagram.4" name="OnlineUMLExport" diagramType="ClassDiagram" toolName="Rational Rose 98" owner="UMLModel.3"><UML:Diagram.element>';
    
    function classToDiagram(childs, id){
        for (var i = 0 ; i < childs.length ; i++){
            
            var top = $(childs[i]).offset().top - $(childs[i]).parent().offset().top;
            var left = $(childs[i]).offset().left - $(childs[i]).parent().offset().left;
            
           if (typeof id != 'undefined'){
                //console.log('blaat');
                top = $(childs[i]).offset().top - $(childs[i]).parent().parent().offset().top;
                left = $(childs[i]).offset().left - $(childs[i]).parent().parent().offset().left;
            }
            
                
            var elementWidth = $(childs[i]).width();
            var elementHeight = $(childs[i]).height();
            var idref = id;
            
            
            XMLstring += '<UML:DiagramElement xmi.id="UMLClassView.'+$(childs[i]).attr('id')+'" geometry="'+Math.round(left)+','+Math.round(top)+','+Number(Math.round(left)+elementWidth)+','+Number(Math.round(top)+elementHeight)+'," style="LineColor.Red=128,LineColor.Green=0,LineColor.Blue=0,FillColor.Red=255,FillColor.Green=255,FillColor.Blue=185,Font.Red=0,Font.Green=0,Font.Blue=0,Font.FaceName=Tahoma,Font.Size=8,Font.Bold=0,Font.Italic=0,Font.Underline=0,Font.Strikethrough=0,AutomaticResize=0,ShowAllAttributes=1,SuppressAttributes=0,ShowAllOperations=1,SuppressOperations=0,ShowOperationSignature=1," subject="'+$(childs[i]).attr('id')+'">';
            
            if (typeof idref != 'undefined')
                XMLstring += '<parentDiagramElement idref="'+idref+'"/>';
            
            XMLstring += '</UML:DiagramElement>';
        }
    
    }
    
    childs = $('#diagram-canvas').find('.class');
    classToDiagram(childs);
    
    childs = $('#diagram-canvas').find('.package');
    for (var i = 0 ; i < childs.length ; i++){
        classToDiagram(new Array(childs[i]));
        var classes = $(childs[i]).children('.class');
        classToDiagram(classes, 'UMLClassView.'+$(childs[i]).attr('id'));
    }
    
   
    
    //add associations
    for (var i = 0 ; i < conns.length ; i++){
        XMLstring += '<UML:DiagramElement xmi.id="UMLAssociationView'+conns[i].id+'" style="Association:LineColor.Red=128,LineColor.Green=0,LineColor.Blue=0,Font.Red=0,Font.Green=0,Font.Blue=0,Font.FaceName=Tahoma,Font.Size=8,Font.Bold=0,Font.Italic=0,Font.Underline=0,Font.Strikethrough=0," subject="'+conns[i].id+'" />';
    }
    
    XMLstring += '</UML:Diagram.element></UML:Diagram></XMI.content></XMI>';

    console.log("Final XML", XMLstring)








 
	   } //END ALERT FUNC





});