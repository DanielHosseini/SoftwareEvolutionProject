'use strict';
var myApp = angular.module('myApp');
myApp.controller('XMLController', ['$scope', 'observerService', function($scope, observerService) {

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

    function download(content, filename, contentType)
    {
        if(!contentType) contentType = 'application/octet-stream';
        content=vkbeautify.xml(content);
        var a = document.createElement('a');
        var blob = new Blob([content], {'type':contentType});
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("Trident/");
        if (msie > 0){
            var newWindow = window.open('','_blank','toolbar=0, location=0, directories=0, status=0, scrollbars=1, resizable=1, copyhistory=1, menuBar=1, width=640, height=480, left=50, top=50', true);
            var preEl = newWindow.document.createElement("pre");
            var codeEl = newWindow.document.createElement("code");
            codeEl.appendChild(newWindow.document.createTextNode(content));
            preEl.appendChild(codeEl);
            newWindow.document.body.appendChild(preEl);
        }
        else{
            a.href = window.URL.createObjectURL(blob);
            a.download = filename;
        }
        a.click();
    }
    var txt = new XMLSerializer().serializeToString($.parseXML(XMLstring));
    var reg = /(>)\s*(<)(\/*)/g;
    txt = txt.replace(reg, '$1\r\n$2$3');
    //if(typeof element !='undefined')
    download(txt,'OUE_Export_'+Date.now()+'.xml','text/xml');
    localStorage.XMIencoded=txt;

} //END ALERT FUNC
 
  $scope.importXML = function(){
    var element = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><XMI xmi.version=\"1.1\" xmlns:UML=\"href://org.omg/UML/1.3\"><XMI.header><XMI.documentation><XMI.owner></XMI.owner><XMI.contact></XMI.contact><XMI.exporter>UML WEB Editor</XMI.exporter><XMI.exporterVersion>1.0</XMI.exporterVersion><XMI.notice></XMI.notice></XMI.documentation><XMI.metamodel xmi.name=\"UML\" xmi.version=\"1.3\" /></XMI.header><XMI.content><UML:Model xmi.id=\"UMLModel.3\" name=\"Design Model\" visibility=\"public\" isSpecification=\"false\" namespace=\"UMLModel.2\" isRoot=\"false\" isLeaf=\"false\" isAbstract=\"false\"><UML:Namespace.ownedElement><UML:Class name=\"Daniel\" namespace=\"model1\" xmi.id=\"jsPlumb_1_5\"><UML:Classifier.feature></UML:Classifier.feature></UML:Class><UML:Package isAbstract=\"false\" isLeaf=\"false\" isRoot=\"false\" name=\"Kalle\" xmi.id=\"jsPlumb_1_6\"><UML:Namespace.ownedElement></UML:Namespace.ownedElement></UML:Package></UML:Namespace.ownedElement></UML:Model><UML:Diagram xmi.id=\"UMLClassDiagram.4\" name=\"OnlineUMLExport\" diagramType=\"ClassDiagram\" toolName=\"Rational Rose 98\" owner=\"UMLModel.3\"><UML:Diagram.element><UML:DiagramElement xmi.id=\"UMLClassView.jsPlumb_1_5\" geometry=\"73,51,198,96,\" style=\"LineColor.Red=128,LineColor.Green=0,LineColor.Blue=0,FillColor.Red=255,FillColor.Green=255,FillColor.Blue=185,Font.Red=0,Font.Green=0,Font.Blue=0,Font.FaceName=Tahoma,Font.Size=8,Font.Bold=0,Font.Italic=0,Font.Underline=0,Font.Strikethrough=0,AutomaticResize=0,ShowAllAttributes=1,SuppressAttributes=0,ShowAllOperations=1,SuppressOperations=0,ShowOperationSignature=1,\" subject=\"jsPlumb_1_5\"></UML:DiagramElement><UML:DiagramElement xmi.id=\"UMLClassView.jsPlumb_1_6\" geometry=\"113,119,238,199,\" style=\"LineColor.Red=128,LineColor.Green=0,LineColor.Blue=0,FillColor.Red=255,FillColor.Green=255,FillColor.Blue=185,Font.Red=0,Font.Green=0,Font.Blue=0,Font.FaceName=Tahoma,Font.Size=8,Font.Bold=0,Font.Italic=0,Font.Underline=0,Font.Strikethrough=0,AutomaticResize=0,ShowAllAttributes=1,SuppressAttributes=0,ShowAllOperations=1,SuppressOperations=0,ShowOperationSignature=1,\" subject=\"jsPlumb_1_6\"></UML:DiagramElement></UML:Diagram.element></UML:Diagram></XMI.content></XMI>";

var XMI = $.parseXML(element);
console.log(XMI)
console.log(element)
    var XMItest = XMI;
    var model_elements = $(XMI).find('UML\\:Model, \\Model').find('UML\\:Namespace\\.ownedElement, \\Namespace\\.ownedElement').children();
    var diagram_elements = $(XMI).find('UML\\:Diagram, \\Diagram').find('UML\\:Diagram\\.element, Diagram\\.element');

    console.log(model_elements);
    
  var ymax=0;
  var xmax=0;
    $(XMI).find('UML\\:Diagram, \\Diagram').find('UML\\:Diagram\\.element, Diagram\\.element').children().each(function(){
               if (typeof $(this).attr('geometry') !='undefined' ){
                          var  xnew = Number($(this).attr('geometry').split(',')[0]) + Number($(this).attr('geometry').split(',')[2]);
                          var ynew = Number($(this).attr('geometry').split(',')[1]) + Number($(this).attr('geometry').split(',')[3]);
                                                                                                               
                            if (xnew > xmax)
                                xmax = xnew
                            if (ynew > ymax)
                                ymax = ynew
               }
                                                                                                               
                            
        });
    
    if (xmax > Number($('#diagram-canvas').width()) )
      var  xratio = xmax / Number($('#diagram-canvas').width());
    else
        xratio = 1;
    
    if (ymax > Number($('#diagram-canvas').height()) )
       var yratio = ymax / Number($('#diagram-canvas').height());
    else
        yratio = 1;
    
    
    console.log(xratio +' '+yratio);

     for (i=0;i<model_elements.length;i++){ //
        
        if ( $(model_elements[i]).prop('tagName') == "UML:Package"){
            var p = new Package( $(model_elements[i]).attr('name'));
            $(p.getNode()).appendTo('#diagram-canvas');
            
            var pp = p.getNode();
            
            jsPlumb.draggable(pp,{
                              drag:function(){jsPlumb.repaintEverything();},
                              stop:function(){jsPlumb.repaintEverything();}
                              }
                              );
            $(pp).droppable({
                              accept: ".class",
                              hoverClass: "ui-state-highlight",
                            
                              drop: function(e,ui){
                                var lastparent = $(ui.draggable).parent().attr('id');
                                console.log("lastparent: "+lastparent);
                                $(ui.draggable).draggable({drag:function(){jsPlumb.repaintEverything()},stop:function(){jsPlumb.repaintEverything()}});
                                console.log('#'+$(this).attr('id'));
                                $(ui.draggable).detach().appendTo($(this));
                                
                                if (typeof $(ui.draggable).parent() != 'undefined'){
                                    //jsPlumb.recalculateOffsets($(ui.draggable).parent());
                                }
                            
                                if(lastparent != $(this).attr('id') ){
                                        if(typeof $('#'+lastparent).attr('class') == 'undefined'){
                                        $(ui.draggable).css("top",$(ui.draggable).position().top - $(this).position().top + 'px');
                                        $(ui.draggable).css("left",$(ui.draggable).position().left - $(this).position().left + 'px');
                                        }
                                        else{
                                        $(ui.draggable).css("left",$(ui.draggable).position().left + $('#'+lastparent).position().left - $(this).position().left+ 'px');
                                        }
                                }
                            
                            
                                    // fix for dispositioniong after drop on package
                                if(jsPlumb.isSourceEnabled($(ui.draggable).attr('id'))){
                                  //  j=jsPlumb.connect({source:$(ui.draggable).attr('id'), target:$(ui.draggable).attr('id'), paintStyle:{lineWidth:0}});
                                  //  setTimeout('jsPlumb.detach(j);', 1);
                               }
                            jsPlumb.revalidate($(ui.draggable).attr('id'));
                            
                                // $('#'+$(ui.draggable).attr('id')).simulate('drag-n-drop', {dx: 1});
                               //  $('#'+$(ui.draggable).attr('id')).simulate('drag-n-drop', {dx: -1});
                                console.log('just been dropped', $(ui.draggable).attr('id'));
                            
                                }
                              });
            $(pp).resizable();
      
            var x = $(diagram_elements).children('[subject|="'+$(model_elements[i]).attr('xmi.id')+'"]');
            if (x !='undefined')
                x = $(x).attr('geometry').split(',')[0];
            else
                x = 0;
            var y = $(diagram_elements).children('[subject|="'+$(model_elements[i]).attr('xmi.id')+'"]');
            if (y != 'undefined')
                y = $(y).attr('geometry').split(',')[1];
            else
                y = 0;
            
            
             var w = $(diagram_elements).children('[subject|="'+$(model_elements[i]).attr('xmi.id')+'"]');
             var h = $(diagram_elements).children('[subject|="'+$(model_elements[i]).attr('xmi.id')+'"]');
            var pwidth = ($(w).attr('geometry').split(',')[2]) - x;
            var pheight = ($(h).attr('geometry').split(',')[3]) -y ;
            
            // console.log(x+' '+y+'\n');
            $(p.getNode()).css('top', Number($('#diagram-canvas').position().top)+Number(y/yratio)+"px");
            $(p.getNode()).css('left', Number($('#diagram-canvas').position().left)+Number(x/xratio)+"px");
            
            $(p.getNode()).css('width', Number(pwidth/xratio)+"px");
            $(p.getNode()).css('height', Number(pheight/xratio)+"px");
            
            jsPlumb.draggable(p.getNode());
            
            $(p.getNode()).find('ul').addClass('connectedSortable');
            connections[$(model_elements[i]).attr('xmi.id')] = $(p.getNode()).attr('id');
            $(p.getNode()).attr('old_id',$(model_elements[i]).attr('xmi.id'));
        }
        
        if ( $(model_elements[i]).prop('tagName') == "UML:Class"){
            var c = new Class( $(model_elements[i]).attr('name'));
            $(c.getNode()).appendTo('#diagram-canvas');
            
            //change color if an anti-pattern is recognised
            if($(model_elements[i]).attr('antipattern')=='10'){
               $(c.getNode()).css('background-color','red')
            }
            
            //resizing of class element
            var tmpw = ( parseInt( $(c.getNode()).css('font-size') ) * $(model_elements[i]).attr('name').length ) / 1.6;

            if( tmpw > $(c.getNode()).width()){
                $(c.getNode()).width(tmpw + 10);
               // jsPlumb.repaintEverything();  //cleanup , should not be here I think?
            }
            
           // console.log(i+' '+$(model_elements[i]).attr('name'));
          //  console.log($(model_elements[i]).attr('xmi.id'));
            
            
            
            var x = $(diagram_elements).children('[subject|="'+$(model_elements[i]).attr('xmi.id')+'"]');
            if (x !='undefined')
                x = $(x).attr('geometry').split(',')[0];
            else
                x = 0;
            var y = $(diagram_elements).children('[subject|="'+$(model_elements[i]).attr('xmi.id')+'"]');
            if (y != 'undefined')
                y = $(y).attr('geometry').split(',')[1];
            else
                y = 0;
           // console.log(x+' '+y+'\n');
            $(c.getNode()).css('top', Number($('#diagram-canvas').position().top)+Number(y/yratio)+"px");
            $(c.getNode()).css('left', Number($('#diagram-canvas').position().left)+Number(x/xratio)+"px");
            jsPlumb.draggable(c.getNode());
            $(c.getNode()).find('ul').addClass('connectedSortable');
            connections[$(model_elements[i]).attr('xmi.id')] = $(c.getNode()).attr('id');
            $(c.getNode()).attr('old_id',$(model_elements[i]).attr('xmi.id'));
            
            if ( $(model_elements[i]).attr('namespace') ){
                var u= $('[old_id|=\''+$(model_elements[i]).attr('namespace')+'\']');
                console.log(u);
                if (c.getNode().appendTo(u).length){
                    $(c.getNode()).css('left',Number($(c.getNode()).position().left-$(u).position().left)+"px");
                    $(c.getNode()).css('top',Number($(c.getNode()).position().top-$(u).position().top)+"px");
                }
             }
            
        }
        
    }
    
    for (var i=0;i<model_elements.length;i++){
        var features = $(model_elements[i]).prop('tagName','UML:Class').children().children();
        for (var j=0;j<features.length;j++){
            if ( $(features[j]).prop('tagName') == "UML:Attribute" ){
                //var u=$('#'+$(model_elements[i]).prop('tagName','UML:Class').attr('xmi.id')).find("ul.attribute-list");
                var u= $('.class[old_id=\''+$(model_elements[i]).prop('tagName','UML:Class').attr('xmi.id')+'\']').find("ul.attribute-list");
                                // u.append( '<li class="attribute ui-sortable-handle">'+ $(features[j]).attr('name') + '</li>' );//maybe later with new Operation()?
                var tmp_attribute = new Attribute($(features[j]).attr('name')); //also makes ul -> has to be changed
                u.append($(tmp_attribute.getNode()).find(".attribute"));
                
                //resizing of class element
                var tmpw = ( parseInt( $(u).css('font-size') ) * $(features[j]).attr('name').length ) / 1.9;
                if( tmpw > $(u).parents('.class').width()){
                    $(u).parents('.class').width(tmpw + 10);
                }
                
            }
            if ( $(features[j]).prop('tagName') == "UML:Operation" ){
                //var u=$('#'+$(model_elements[i]).prop('tagName','UML:Class').attr('xmi.id')).find("ul.operation-list");
                 var u= $('.class[old_id=\''+$(model_elements[i]).prop('tagName','UML:Class').attr('xmi.id')+'\']').find("ul.operation-list");
                //u.append( '<li class="operation ui-sortable-handle">'+ $(features[j]).attr('name') + '()</li>' );//maybe later with new Operation()?
                var tmp_operation = new Operation($(features[j]).attr('name')+'()'); //also makes ul -> has to be changed
                u.append($(tmp_operation.getNode()).find(".operation"));
            
                //resizing of class element
                var tmpw = ( parseInt( $(u).css('font-size') ) * $(features[j]).attr('name').length ) / 1.9;
                if( tmpw > $(u).parents('.class').width()){
                    $(u).parents('.class').width(tmpw + 10);
                }
            
            }
            
        }
    }

    
    
    jsPlumbHelper.initEndpoints("#000000", false) ; //[cleanup]
    jsPlumbHelper.initTargets();

     t1.initTools(); //[needed?]
    
    for (var i=0;i<model_elements.length;i++){ //
        if ( $(model_elements[i]).prop('tagName') == "UML:Association"){
            
            var check_in_diagram = $(diagram_elements).children('[subject|="'+$(model_elements[i]).attr('xmi.id')+'"]');
            
            var end0 = $($($(model_elements[i]).children()[0]).children()[0]).attr('type');
            var end1 = $($($(model_elements[i]).children()[0]).children()[1]).attr('type');
            var aggr0 = $($($(model_elements[i]).children()[0]).children()[0]).attr('aggregation');
            var aggr1 = $($($(model_elements[i]).children()[0]).children()[1]).attr('aggregation');
            var navig = $($($(model_elements[i]).children()[0]).children()[1]).attr('isNavigable');
            if(navig)
                agr1 = 'directed';
            console.log(navig+' '+aggr1);
            var tmpcon = jsPlumb.connect({source: connections[end0], target: connections[end1], connector:[ "Straight" ], paintStyle: {strokeStyle: '#000000', lineWidth: 2}});
          //  tmpcon.addOverlay(["Arrow", {id: "directedAssociation"}]);
            if (typeof aggr1!='undefined' || typeof navig != 'undefined')
                jsPlumbHelper.changeEndShape(tmpcon,aggr1);
            var name = $(model_elements[i]).attr('name');
            if (typeof name != 'undefined')
                tmpcon.addOverlay(["Label", {label: name,id: "label",cssClass: "connectionLabel"}]);
            
            if (check_in_diagram.length == 0)
                tmpcon.setPaintStyle({strokeStyle: 'red' });
        }
    }

    for (var i=0;i<model_elements.length;i++){ //
        if ( $(model_elements[i]).prop('tagName') == "UML:Dependency"){
            console.log('found dependency');
            var end0 = $(model_elements[i]).attr('client');
            var end1 = $(model_elements[i]).attr('supplier');

            var tmpcon = jsPlumb.connect({source: connections[end0], target: connections[end1], connector:[ "Straight" ], paintStyle: {strokeStyle: '#000000', lineWidth: 2}});
            jsPlumbHelper.changeEndShape(tmpcon,'dependency');
            
            tmpcon.removeOverlay("directedAssociation");
            tmpcon.addOverlay(["Arrow", {
                              label: "Arrow",
                              foldback: 0.1,
                              id: "dependency",
                              location: 1
                              }]);
            
            tmpcon.setPaintStyle({dashstyle: "4 4", strokeStyle:"#000000", lineWidth:2});
            tmpcon.setHoverPaintStyle({dashstyle: "4 4", strokeStyle:"#42a62c", lineWidth:2});
            
            var name = $(model_elements[i]).attr('name');
            if (typeof name != 'undefined')
                tmpcon.addOverlay(["Label", {label: name,id: "label",cssClass: "connectionLabel"}]);
        }
    }
    
    for (var i=0;i<model_elements.length;i++){ //
        if ( $(model_elements[i]).prop('tagName') == "UML:Generalization"){
            
            var end0 = $(model_elements[i]).attr('child');
            var end1 = $(model_elements[i]).attr('parent');

            var tmpcon = jsPlumb.connect({source: connections[end0], target: connections[end1], connector:[ "Straight" ], paintStyle: {strokeStyle: '#000000', lineWidth: 2}});
            jsPlumbHelper.changeEndShape(tmpcon,'inheritance');
            
            var name = $(model_elements[i]).attr('name');
            if (typeof name != 'undefined')
                tmpcon.addOverlay(["Label", {label: name,id: "label",cssClass: "connectionLabel"}]);
        }
    }

    jsPlumb.repaintEverything();
    
   
    
   t1.initTools();//[\cleanup]


    $(".package").on('dragstop', function (event) {

                     jsPlumb.repaintEverything();
                     });
    
$('#diagram-canvas .class').each( function(){
                                  //   jsPlumb.toggleSourceEnabled(this);
                                 //    jsPlumb.toggleTargetEnabled(this);
                                     $(this).simulate('drag-n-drop', {dx: 1});
                                     //$(this).simulate('drag-n-drop', {dx: -1});
                                 //    jsPlumb.toggleSourceEnabled(this);
                                //     jsPlumb.toggleTargetEnabled(this);
                                   })

  } //End Import Method

  $scope.getObserverLog = function(){
    var log = observerService.getLog();
    console.log(log)

  }



}]);