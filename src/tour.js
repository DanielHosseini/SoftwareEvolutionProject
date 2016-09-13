function showTour(){
    $('#toolbox').showBalloon({classname:"tour",position:"right",contents:"This is the toolbox. You can drag UML elements to the modeling area.",css:{width:"200px",color:"red",fontSize:"1.4em"}});
    $('#diagram-canvas').showBalloon({classname:"tour",position:"null",contents:"This is the modeling area. Here you can create your models.",css:{color:"red",fontSize:"1.4em"}});
    $('#top_menu').showBalloon({offsetX: 200, classname:"tour",position:"left bottom",contents:"This is the menu-bar",css:{color:"red",fontSize:"1.4em"}});
    $('#question').showBalloon({classname:"tour",position:"top",contents:"Here you can read the questions",css:{color:"red",fontSize:"1.4em"}});

    
};

$(document).ready(function(){
                  $('body').on("click", function(event) {
                               
                               if($( ".tour").is(":visible" )){
                                event.stopPropagation();
                                $('#toolbox').hideBalloon();
                                $('#diagram-canvas').hideBalloon();
                                $('#top_menu').hideBalloon();
                                $('#question').hideBalloon();

                               }
                               
                               
                               if($(".question-hint-balloon").is(":visible")){
                                    $('.question-hint').hideBalloon();
                               }
                    });
                  });