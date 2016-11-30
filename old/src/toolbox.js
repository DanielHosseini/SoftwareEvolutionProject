//GLOBALS
var prev_node;
var node;
var UMLElements = new Array();
var tb;

var tt;

var xmlexp = new XMLExporter();
var cvsexp = new CSVExporter();

var uiObserver= new Observer();

//TOOLBOX

function Toolbox(arr, clonemode, divelement) {
	this.UMLElementList = $(arr).toArray();
    this.cloneMode=clonemode;
    this.divelement=divelement;
	this.show();

	//console.log(this);
}

Toolbox.prototype.addElement = function(element){
	this.UMLElementList.push(element);
	console.log(this);
};

Toolbox.prototype.show = function(){
	if (!this.node){
		//this.node = new HTMLRootNode('div','toolbox');
        element=this.divelement;
        this.node = $('#'+element).html();
        $('#'+element).append(new HTMLNode('h1',null,'title','UML Elements'));
        $('#'+element).append(new HTMLNode('hr',null,'seperator'));
		$.each(this.UMLElementList, function(index,item) {
               var t = $('#'+element).children().last().position().top; //get top (y-pos) of last child element
               var h = $('#'+element).children().last().outerHeight(true); //get height of last child
               $('#'+element).append(item.getNode());
               $('#'+element).children().last().css('top',t+h+"px"); //place new element after last
		});
        var t = $('#'+element).children().last().position().top; //get top (y-pos) of last child element
        var h = $('#'+element).children().last().outerHeight(true); //get height of last child
        $('#'+element).append(new HTMLNode('div','infobox','infobox'));
        $('#infobox').append('<h1></h1><p></p>');
        $('#infobox').append('<img id="avatar" width="100px" src="../images/DaveAvatar.png" style="margin-top: 120px;">');
        $('#'+element).children().last().css('top',t+h+"px"); //place new element after last

	}
};

function updatePosition(element){

                if($(element).position().top + $(element).height() > $('#diagram-canvas').height()+$('#diagram-canvas').position().top){
                    $(element).css('top',$('#diagram-canvas').height()+$('#diagram-canvas').position().top - $(element).height());
                }

                if($(element).position().left + $(element).width() > $('#diagram-canvas').width()+$('#diagram-canvas').position().left){
                    $(element).css('left',$('#diagram-canvas').width()+$('#diagram-canvas').position().left - $(element).width());
                }

                if($(element).position().top  < $('#diagram-canvas').position().top){
                    $(element).css('top',$('#diagram-canvas').position().top);
                }

                if($(element).position().left  < $('#diagram-canvas').position().left){
                    $(element).css('left',$('#diagram-canvas').position().left);
                }
}

Toolbox.prototype.initTools = function(){
    var toolbox = this;
    tb=toolbox;
    $(".class").draggable();
    $(".package").draggable();

    $(".package").on('dragstart', function (event) {
       if ($(this).parent().attr('id')=='toolbox'){
            var tmp_x = $(this).position().left;
            var tmp_y = $(this).position().top;
            var tmp = new Package('Package');
            $(this).parent().append(tmp.getNode());
            $(tmp.getNode()).css('top',tmp_y+'px');
            $(tmp.getNode()).css('left',tmp_x+'px');
            $(this).attr('class','package');
            $(this).detach().appendTo('#diagram-canvas');
            $(this).resizable();
            jsPlumb.draggable(this,{
              drag:function(){jsPlumb.repaintEverything();},
              stop:function(){jsPlumb.repaintEverything();}
              }
            );
            $(this).droppable({
                    accept: ".class",
                    hoverClass: "ui-state-highlight",
                    drop: function(e,ui){
                            var lastparent = $(ui.draggable).parent().attr('id');
                              console.log("lastparent: "+lastparent);
                            $(ui.draggable).draggable({drag:function(){jsPlumb.repaintEverything()},stop:function(){jsPlumb.repaintEverything()}});
                            console.log('#'+$(this).attr('id'));
                            $(ui.draggable).detach().appendTo($(this));
                              if ( $(ui.draggable).parent().children().length != 0){
                               console.log($(ui.draggable).parent());
                                 //   jsPlumb.recalculateOffsets($(ui.draggable).parent());

                              }
                            if(lastparent != $(this).attr('id') && $(ui.draggable).parent().length != 0 ){
                                if(typeof $('#'+lastparent).attr('class') == 'undefined'){
                                    $(ui.draggable).css("top",$(ui.draggable).position().top - $(this).position().top + 'px');
                                    $(ui.draggable).css("left",$(ui.draggable).position().left - $(this).position().left + 'px');
                                }
                                else{
                                    $(ui.draggable).css("left",$(ui.draggable).position().left + $('#'+lastparent).position().left - $(this).position().left+ 'px');
                                }
                            }

                              // fix for dispositioniong after drop on package
                             // j=jsPlumb.connect({source:$(ui.draggable).attr('id'), target:$(ui.draggable).attr('id'), paintStyle:{lineWidth:15,strokeStyle:'rgb(243,230,18)'}});
                             // setTimeout('jsPlumb.detach(j);', 1);


                               jsPlumb.revalidate($(ui.draggable).attr('id'));
                          }
            });

            tmp.observer.addLogEntry('CREATE','PACKAGE', $(this).attr('id'), 'Package', 'Diagram' ); //event logger CREATE <OBT> <OBID> <OBN> <RECN>

            toolbox.initTools();
       }

            uiObserver.addLogEntry('MOVE FROM','PACKAGE', $(this).attr('id'), $($(this).children("h1")[0]).text(), $(this).position().left+';'+$(this).position().top); //event logger
   });

    $(".package").on('dragstop', function (event) {
                   //xmlexp.exportXML();
                   //cvsexp.exportCSV();
                   //jsPlumb.repaintEverything();
                   updatePosition(this);
                   uiObserver.addLogEntry('MOVE TO','PACKAGE', $(this).attr('id'), $($(this).children("h1")[0]).text(), $(this).position().left+';'+$(this).position().top); //event logger <DT> MOVE <OBT><OBID> <OBN> <COOR1> <COOR2>
    });

    $(".class").on('dragstart', function (event) {
                   event.stopImmediatePropagation();
       if ($(this).parent().attr('id')=='toolbox'){
            var tmp = new Class('Class');
            $(this).parent().append(tmp.getNode());
            $(this).find('ul').addClass('connectedSortable');
            $(this).attr('class','class');
            $(this).detach().appendTo('#diagram-canvas');

            jsPlumb.draggable(this);
            jsPlumbHelper.initEndpoints("#000000", false) ;
            jsPlumbHelper.initTargets();
            toolbox.initTools();
                   //console.log("created new class"); //event logger
                   tmp.observer.addLogEntry('CREATE','CLASS', $(this).attr('id'), 'Class', 'Diagram' ); //event logger CREATE <OBT> <OBID> <OBN> <RECN>
        }
                   uiObserver.addLogEntry('MOVE FROM','CLASS', $(this).attr('id'), $(this).find("h1").text(), $(this).position().left+';'+$(this).position().top); //event logger
    });

    $(".class").on('dragstop', function (event) {
                   //xmlexp.exportXML();
                  // cvsexp.exportCSV();
                   updatePosition(this);
                   event.stopImmediatePropagation();
                   uiObserver.addLogEntry('MOVE TO','CLASS', $(this).attr('id'), $(this).find("h1").text(), $(this).position().left+';'+$(this).position().top); //event logger <DT> MOVE <OBT><OBID> <OBN> <COOR1> <COOR2>


    });



    $(".toolboxAttribute").({
        connectWith: ".connectedSortable",
        dropOnEmpty: false,
        remove: function(event, ui) {
            if (tb.cloneMode){
                var tmp_attribute = new Attribute("Attribute"); //also makes ul -> has to be changed
                $(this).append($(tmp_attribute.getNode()).find(".attribute"));
                tmp_attribute.observer.addLogEntry('CREATE','ATTRIBUTE', 'NULL', 'Attribute', $(this).parent().attr('id'));//event logger
                                    //console.log('attribute created'); //event logger
            }
        }
    }).disableSelection();

    $(".toolboxOperation").sortable({
        connectWith: ".connectedSortable",
        dropOnEmpty: false,
        remove: function(event, ui) {
            if (tb.cloneMode){
                var tmp_operation = new Operation("Operation()"); //also makes ul -> has to be changed
                $(this).append($(tmp_operation.getNode()).find(".operation"));
                tmp_operation.observer.addLogEntry('CREATE','OPERATION', 'NULL', 'Operation', $(this).parent().attr('id'));//event logger

            }
        }
    }).disableSelection();

    $(".connectedSortable").sortable({
         connectWith: ".connectedSortable",
         dropOnEmpty: true,
         receive: function(event, ui) {
             var className = ui.item.attr("class");
             var classNameList = $(this).attr("class");
             if (className.indexOf('operation') != -1 && classNameList.indexOf('attribute-list') != -1) {
                 $(this).parent().find('.operation-list').append(ui.item);
                                     $(ui.item).showBalloon({contents:"operations are placed in the lower part of a class element",classname:"help-balloon",css:{backgroundColor:"yellow"}});

                 u=ui.item;
                                     tt=u;
                 setTimeout("$(u).hideBalloon();console.log('time');", 3000);
             }
             if (className.indexOf('attribute') != -1 && classNameList.indexOf('operation-list') != -1) {
                 $(this).parent().find('.attribute-list').append(ui.item);
                                     $(ui.item).showBalloon({contents:"attributes are placed in the upper part of a class element",classname:"help-balloon",css:{backgroundColor:"yellow"}});
                 u=ui.item;
                 setTimeout("$(u).hideBalloon();console.log('time');", 3000);
             }
            // console.log('added '+className.split(" ",1)+' to: '+$(this).parent().find("h1").text()); //event logger
             uiObserver.addLogEntry('ADD', className.split(" ",1), 'NULL' , ui.item.text(), ui.sender.parent().attr('id'), $(this).parent().attr('id')); //event logger

            jsPlumb.repaintEverything();
         }
     }).disableSelection();
};


//Observer
function Observer(){
    this.log = "";
}

Observer.prototype.addLogEntry = function(){
    this.log+=Date.now().toString()+',';
    for(var i=0; i<arguments.length; i++) {
        this.log+=arguments[i]+',';
    }
    this.log+="\r\n";
};

Observer.prototype.empty = function(){
    this.log="";
};

//DRAWABLEELEMENT
function DrawableElement() {
    this.observer=new Observer();
}

//UMLELEMENT
function UMLElement() {
	DrawableElement.call(this);
    UMLElements.push(this);
}

UMLElement.prototype = Object.create(DrawableElement.prototype);

UMLElement.prototype.getNode = function(element){
	return this.node;
};


UMLElement.prototype.initEvents = function(e){
    var active_element =  this;

    var nameDblClick = function(e) {
        if($(this).parent().parent().attr('id')!="toolbox"){ //kan netter denk ik
                if ($('.edittext')){
                    $('.edittext').blur(); //to force blur when double clicking other item while one is in edit mode dbclick seems to have a higher priority then blur
                }
                var p = $(this).parent();
                console.log($(this).parent().parent());
                node=this;
                prev_node = node;
                node = $(this).clone();
                $(this).replaceWith("<input class=\"edittext\" type=\"text\" value=\"" + $(this).html() + "\">");
                p.children('.edittext').focus();
                p.children('.edittext').on("keypress blur", blurClick);
        }

    };

    var blurClick = function(e) {
        console.log('in blur');
                if (e.keyCode === 13 || !e.keyCode) {
            var value = $(this).val();
            if (value !== null && value !== "") {
                $(node).text(value);
                $(this).replaceWith(node);
            } else {
                alert("Do not leave the name blank!");
                if (prev_node !== null && $(prev_node).text() !== "") {
                    console.log("test:"+$(prev_node).text());
                    node=prev_node;
                    $(this).replaceWith(node);
                } else {
                    $(this).replaceWith(node);
                }
            }

            var tmpw;

            if($(node).css('font-weight')=="bold")
                tmpw = ( parseInt( $(node).css('font-size') ) * $(node).text().length ) / 1.6;
            else
                tmpw = ( parseInt( $(node).css('font-size') ) * $(node).text().length ) / 1.9;

            if( tmpw > $(node).parents('.class').width()){
                $(node).parents('.class').width(tmpw + 10);
                jsPlumb.repaintEverything();  //cleanup , should not be here I think?
            }



            $(node).on("dblclick", nameDblClick);
        }

        var element_type = ($(node).attr('class')).split(" ",1);
        element_type=element_type.toString();
        if (element_type == "heading")
            element_type = "Class";

        if($(node).text() != $(prev_node).text() && $(prev_node).text()!="" ){
            active_element.observer.addLogEntry('SET',(element_type).toUpperCase(),$(node).attr('id'),element_type,$(node).text()); //event logger
           // console.log('name of '+element_type+' changed to '+node.text());//event logger
        }
        if($(node).text() != "" && $(prev_node).text()=="" ){
            active_element.observer.addLogEntry('SET',(element_type).toUpperCase(),$(node).attr('id'),$(node).attr('id'),$(prev_node).text(),$(node).text());//event logger
        }

    };

    var nameClick = function(e) {
        console.log('click op iets');
    };

    $(e).on("dblclick", nameDblClick);
    $(e).on("click", nameClick);
};



//CONNECTABLEUMLELEMENT
function ConnectableUMLElement() {
	UMLElement.call(this);
}

ConnectableUMLElement.prototype = Object.create(UMLElement.prototype);

//NONCONNECTABLEUMLELEMENT
function NonConnectableUMLElement() {
	UMLElement.call(this);
}

NonConnectableUMLElement.prototype = Object.create(UMLElement.prototype);

//CLASS
function Class(name) {
	ConnectableUMLElement.call(this);
	this.name=name;
	this.attributeList = new Array();
	this.node = new HTMLNode('div','','class')
    $(this.node).append(new HTMLNode('div',null,'ep','&#10140;'));
    $(this.node).children().last().hide();
    $(this.node).append(new HTMLNode('h1',null,'heading',name));
    this.initEvents($(this.node).children().last()); //make name editable
    $(this.node).append(new HTMLNode('hr'));
    $(this.node).append(new HTMLNode('ul',null,'attribute-list'));
    $(this.node).children().last().append(new HTMLNode('li',null,'attribute dummy','dummy-attribute'));
    $(this.node).append(new HTMLNode('hr'));
    $(this.node).append(new HTMLNode('ul',null,'operation-list'));
    $(this.node).children().last().append(new HTMLNode('li',null,'operation dummy','dummy-operation'));

    //events

    $(this.node).on("click",function(e){

                        $(".selected").removeClass('selected');
                        $(this).addClass('selected');
                       e.stopPropagation();

                    console.log('classclick');
                });

    $(this.node).hover(function(){$(this).find('.ep').show()});

    $(this.node).mouseleave(function(){$(this).find('.ep').hide()});


}

Class.prototype = Object.create(ConnectableUMLElement.prototype);

Class.prototype.addAttribute = function(element){
	this.attributeList.push(element);
};

//Package
function Package(name) {
	ConnectableUMLElement.call(this);
	this.name=name;
	this.node = new HTMLNode('div','','package')
    $(this.node).append(new HTMLNode('div',null,'top_left',null));
    $(this.node).append(new HTMLNode('h1',null,'heading',name));
    this.initEvents($(this.node).children().last()); //make name editable
    $(this.node).append(new HTMLNode('div',null,'content',null));


    //events

    $(this.node).on("click",function(){
                    $(".selected").removeClass('selected');
                    $(this).addClass('selected');
                   // $('#infobox').text($(this).find('h1').text());
                    console.log('packageclick');
                    });

   // $(this.node).hover(function(){$(this).find('.ep').show()});

   // $(this.node).mouseleave(function(){$(this).find('.ep').hide()});
}

Package.prototype = Object.create(ConnectableUMLElement.prototype);


//ATTRIBUTE
function Attribute(name) {
    NonConnectableUMLElement.call(this);
	this.name = name;
    this.node = new HTMLNode('ul',null,'toolboxAttribute')
    $(this.node).append(new HTMLNode('li',null,'attribute',name));

    $(this.node).find('li').on("click",function(e){
                        $(".selected").removeClass('selected');
                        $(this).addClass('selected');
                        e.stopPropagation();

    });

    this.initEvents($(this.node).children().last());
}

Attribute.prototype = Object.create(NonConnectableUMLElement.prototype);

//OPERATION
function Operation(name) {
    NonConnectableUMLElement.call(this);
	this.name = name;
    this.node = new HTMLNode('ul',null,'toolboxOperation')
    $(this.node).append(new HTMLNode('li',null,'operation',name));

    $(this.node).find('li').on("click",function(e){

                               $(".selected").removeClass('selected');
                               $(this).addClass('selected');
                               e.stopPropagation();

                               });
    this.initEvents($(this.node).children().last());
}

Operation.prototype = Object.create(NonConnectableUMLElement.prototype);

//ASSOCIATION
function Association(name) {
    ConnectableUMLElement.call(this);
}

Association.prototype = Object.create(ConnectableUMLElement.prototype);

//HTMLRootNode
function HTMLRootNode(name, id){
	$('body').append('<'+name+' id=\''+id+'\'></'+name+'>');
}

//HTMLNode
function HTMLNode(name, id, type, inner){
    var node = '<'+name;
    if(id)
        node = node + ' id=\"'+id+'\"';
    if(type)
        node = node + ' class=\"'+type+'\"';
    node = node + '>';
    if (inner)
        node = node + inner;
    node = node +'</'+name+'>';
    return $(node);

}


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
                 $(name).bind("click", function(c, e) {console.log('click')});
            $elm = connector.getOverlay("label");
            $elm.hide();
            var theelm = $elm.getElement();
            var par = theelm.parentElement;
            $(par).append("<input id=\"label-edit\" type=\"text\" size=\"10\" value=\"" + name + "\">");
            $("#label-edit").css({position: 'absolute', top: $(theelm).css("top"), left: $(theelm).css("left")});
            $("#label-edit").focus();
            $("#label-edit").on("keypress blur", function(e) {
                 if (e.keyCode == 13 || !e.keyCode) {
                     connector.getOverlay("label").setLabel($(this).val());
                     $elm.show();
                     $("#label-edit").remove();
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
    $(".ep").each(function(i, e) {
      var p = $(e).parent();
      if ($(e).attr('id') == undefined) { //check if endpoint already exsists [toolbox-demo]
        jsPlumb.makeSource($(e), {
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
