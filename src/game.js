var question;

//Game
function Game(elementname, toolbox) {
    this.questiondiv=elementname;
    this.toolBox = new Object();
    this.toolBox = toolbox;
    this.tools = [];
}

var game;
//loadquestion expects a XML file
Game.prototype.loadQuestion = function(questionFile, targetElement){
    
    var me = this;
    
    $.get(questionFile, function(respons) {
          question = respons;
          $("#"+targetElement).empty();
          $("#"+targetElement).append('<h1 class="question-title">'+$(question).find('title').text()+'</h1>');
          $("#"+targetElement).append('<img src="images/help.png" class="question-hint"/><br/>');
          $("#"+targetElement).append('<p class="question-text">'+$(question).find('text').text()+'</p>');
          
          
          $('.question-hint').on("click", function() {
                                 $(this).showBalloon({classname:"question-hint-balloon",position:"right",contents:$(question).find('hint').text(),css:{fontSize:"2em"}});
                                 $('.question-hint-balloon').on("click", function() {
                                                                $('.question-hint').hideBalloon();                                                                                                                                                                                                                                  });
                                 setTimeout("$('.question-hint').hideBalloon();shown = false;console.log('time');", 10000);
                                 });
          var model;
          if(model = $(question).find('model').text()){
          $.get(model, function(respons) {
                jsPlumb.detachEveryConnection();$("#diagram-canvas").find(".class, .package").remove(); //[ANDERE PLEK!!]
                XMLImporter.prototype.importXML( respons );
                });
          
          }
          
          me.tools = [];
          
          
          
          var i=0;
          
          
          $(question).find('toolbox').find('class').each(function(){
                                                             me.tools[i] = new Class($(this).text());
                                                             i++;
                                                             
                                                             });
          
          
          $(question).find('toolbox').find('attribute').each(function(){
                                                          me.tools[i] = new Attribute($(this).text());
                                                             i++;
                                                             
                                                          });
          
         // var i=0;
          $(question).find('toolbox').find('operation').each(function(){
                                                             me.tools[i] = new Operation($(this).text());
                                                             i++;
                                                             
                                                             });
          
        

          
          if (typeof(me.toolBox)!="undefined"){
          $('#'+me.toolBox.divelement).empty();
            jsPlumb.detachEveryConnection(); //is everything cleared now?
          }
          
          me.toolBox = new Toolbox(me.tools, false,'toolbox');
          me.toolBox.initTools();
        
          
          });
    
};
var dbug;

//loadGame expects a XML file
Game.prototype.loadGame = function(gameFile, targetElement){
     var me=this;
        $.get("game.xml", function(respons) {
             
              gamebox = respons;
              $("#"+targetElement).append('<h1 class="game-title">'+$(gamebox).find('title').text()+'</h1>');
              $("#"+targetElement).append('<div class="game-description">'+$(gamebox).find('description').text()+'</div>');
              $("#"+targetElement).append("<select name='gamemenu' id='gamemenu'>");
          
              
              $(gamebox).find('questions').find('question').each(function(){
                     $("#gamemenu").append('<option>'+$(this).text()+'</option>');
              });
             

              
               dbug = $( "#gamemenu" ).selectmenu({
                                          select: function( event, ui ) { me.loadQuestion(ui.item.label, me.questiondiv)},
                                          create: function (event, ui){ me.loadQuestion($(this).find('option').first().text(), me.questiondiv)}
                                          
                                });
               $('#gamemenu').val('');
            
              
          });
};


