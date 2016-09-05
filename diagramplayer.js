//GLOBALS
var interval;

//DIAGRAMPLAYER
function DiagramPlayer(target, source){
    this.target = target;
    this.sourceLog = source;
    this.step=0;
    
    this.sourceLog = this.sourceLog.split("\n");
    this.sourceLog[0] = this.sourceLog[0].replace('undefined','');
    this.sourceLog.sort();
    
    var uniqueLog = [];
    $.each(this.sourceLog, function(i, el){
           if($.inArray(el, uniqueLog) === -1) uniqueLog.push(el);
           });
    this.sourceLog = uniqueLog;
}

DiagramPlayer.prototype.play = function(speed){
 
    
    interval = setInterval(this.replay.bind(this),speed);
    
}

DiagramPlayer.prototype.replay = function(speed){

    if (this.step < this.sourceLog.length){
       // console.log("playing step: ",this.step );
        this.playStep(this.step);
    }
    else{
        t1.initTools();
        window.clearInterval(interval);
    }
    
}


DiagramPlayer.prototype.playStep = function(step){
    
        var i = step;
    
        var command = this.sourceLog[i].split(",");
        var elementType, elementId, name;
        
        switch(command[1]) {
            case 'CREATE':
                elementType = command[2];
                elementId = command[3];
                
                switch(elementType) {
                    case 'CLASS':
                        name = command[4];
                        
                        ctemp = new Class(name);
                        console.log("replay: "+name);
                        ctemp.getNode().appendTo(this.target);
                        ctemp.getNode().attr('old_id',elementId);
                        jsPlumb.draggable(ctemp.getNode());
                        $(ctemp.getNode()).find('ul').addClass('connectedSortable');
                        jsPlumbHelper.initEndpoints("#000000", false) ;
                        jsPlumbHelper.initTargets();
                        break;
                    case 'ASSOCIATION':
                        asource = command[4];
                        atarget = command[5];
                       
                        asource = $('[old_id='+asource+']').attr('id');
                        atarget = $('[old_id='+atarget+']').attr('id');
                        
                        jsPlumb.connect({source: asource , target: atarget});
                        jsPlumb.revalidate(asource);
                        jsPlumb.revalidate(atarget);
                        break;
                }
                
                break;
            case 'SET':
                console.log('found set: ' + command);
                $('[old_id='+command[0]+']').find("h1").text(command[5]);
                break;
            case 'MOVE FROM':
                console.log('found move from');
                break;
            case 'MOVE TO':
                elementType = command[2];
                elementId = command[3];
                
                switch(elementType) {
                    case 'CLASS':
                        position = command[5].split(";");
                        $('[old_id='+elementId+']').css('left',Number(position[0])+"px");
                        $('[old_id='+elementId+']').css('top',Number(position[1])+"px");
                        jsPlumb.revalidate($('[old_id='+elementId+']').attr('id'));
                        console.log(elementId,$(this.target).position(),position[0],position[1]);
                        break;
                }
                break;
            case 'ADD':
                elementType = command[2];
                
                switch(elementType) {
                    case 'attribute':
                        name = command[4];
                        target = command[6];
                        var u= $('.class[old_id='+target+']').find("ul.attribute-list");
                        console.log('adding attr:', u);
                        var tmp_attribute = new Attribute(name);
                        u.append($(tmp_attribute.getNode()).find(".attribute"));
                        break;
                    case 'operation':
                        name = command[4];
                        target = command[6];
                        var u= $('.class[old_id='+target+']').find("ul.operation-list");
                        console.log('adding oper:', u);
                        var tmp_operation = new Operation(name);
                        u.append($(tmp_operation.getNode()).find(".operation"));
                        break;
                }

                break;
            case 'REMOVE':
                console.log('found remove');
                break;
                
        }
    this.step++;
};