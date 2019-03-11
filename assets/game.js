$(document).ready(function () {
    var countNumber = 40;
//Questions Answers Array 
    var questions = [{
      question: "The process of making cow’s milk safe for human consumption is called what?",
      answers: ["Freezing",
                "Cooling", 
                "Pasteurization", 
                "All answers right"],
      correctAnswer: "Pasteurization",
   
  }, 
  {
      question: "The name of the popular online battle royale game PUBG, is short for what?",
      answers: ["Player Battlegrounds", 
                "PlayerUnknown’s Battlegrounds", 
                "PlayerKnown's Battlegrounds", 
                "Fortnite"],
      correctAnswer: "PlayerUnknown’s Battlegrounds",
   
  }, 
  {
      question: "What U.S. nonprofit organization sells about 200 million boxes of cookies per year?",
      answers: [ "Boys Scouts", 
                "Walmart",
                "The Girl Scouts"],
      correctAnswer: "The Girl Scouts",
   
  }, 
  {
      question: "What is the name of the character played by Johnny Depp in the Pirates of the Caribbean film series?",
      answers: [ "Captain Arrow",
                "Robin Hood",
               "Captain Jack Sparrow", 
               "The Ship"],
      correctAnswer: "Captain Jack Sparrow",
    
  }, 
  {
      question: 'What song from the Disney film “Coco” won the 2018 Academy Award for Best Original Song?',
      answers: [ "Remember you", 
                "Despacito",
                "Remember me", 
                "None of this"],
      correctAnswer: "Remember me",
    
  }, 
  {
      question: 'How the Grinch Stole Christmas is a 2000 American Christmas fantasy comedy film starring which actor as the Grinch?',
      answers: ["Jim Carrey", 
                "Johnny Depp", 
                "Brad Pitt", 
                "Bruce Willis"],
      correctAnswer: "Jim Carrey",
    
  }];
  

//RESET GAME
$(document).on('click', '#startAgain', function(e){
        game.reset();
        game.resultsHide();
        
})

//IF ANSWER BTN CLICKED
$(document).on('click', '#ansBtn', function(e) {
        game.clicked(e);
}); 

// IF START CLICKED
$(".btn").on('click', function(){
        $(".btn").hide();
        $('#logo').hide();
        $('#welcome').hide();
        $('#instuctions').hide();
        game.newQuestion();
})

//OBJECTS
  var game = {
    questions: questions,
    currentQuestion: 0,
    counter: countNumber,
    correct: 0,
    wrong:0,

                    /////////FUNCTIONS/////////////

//TIMER
timeCount: function(){
    game.counter --;
      $("#counterNumber").html(game.counter);
    console.log(game.counter)

    if(game.counter === 0){
       game.timeUp();//IF === 0, CALL TIMEUP FUNCTION
  }
},

//NEW QUESTION
newQuestion: function(){
      $('#time').fadeIn();
      $('#time').html('<h2>Time Remaining: <span id = "counterNumber">30</span>Seconds</h2>')//show Timer

    timer = setInterval(game.timeCount, 1000);

      $('#counterNumber').html(game.counter);
      $('.question').fadeIn()
      $('.question').html('<h2>' + questions[this.currentQuestion].question + '</h2>')//display question
    
    console.log("in new question function");
    console.log(questions[this.currentQuestion].question);
    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++){ 
      //DISPLAY CHOICES
      $('.answerList').append('<button type="button" class="btn btn-primary btn-lg" id="ansBtn"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i] + '</button>');
  }
},
//NEXT QUESTION
nextQuestion: function(){
    game.counter = countNumber;
      
      
      $("#counterNumber").append(game.counter);

    game.currentQuestion++;
    game.newQuestion();
     
},
//IF TIME OVER
timeUp: function(){
    console.log("timeup function")
    clearInterval(timer);

      $("#counterNumber").html(game.counter);
      $('#time').fadeIn()
      $("#time").html("<h2 id = 'timeUp1'>Time is up!!!</h2>");
      $('.question').fadeIn()
      $(".question").append("<h3 id = 'correctAns'>The correct answer was :</h3>" + '<h3 id="showAns">' + questions[this.currentQuestion].correctAnswer)+ '</h3>';
      $('.btn').fadeOut()
     
    if (game.currentQuestion === questions.length - 1){
         setTimeout(game.results, 1000);
         
         $("#time").fadeOut()
         $('.question').fadeOut()
        console.log("if statement in timeup")
         }else {
         setTimeout(game.nextQuestion, 3000)
        console.log("else statement in timeup")
    }
},

//RESULTS
results: function(){
    clearInterval(timer);
    $('#resultsText').show()
      $('#resultsText').html('<h2> Your Results</h2>');
      //$("#resultsText").html(game.counter);
      $("#resultsText").append('<h3>Correct Answers: ' + game.correct + '</h3>');
      $("#resultsText").append('<h3>Incorrect Answers: ' + game.wrong + '</h3>');
      $("#resultsText").append('<h3>Unanswered: ' + (questions.length - (game.wrong + game.correct)) + '</h3>');
      $("#resultsText").append('<br><button id="startAgain">Play again?</button>');
},
resultsHide: function(){
  $('#resultsText').empty('<h2> Your Results</h2>');
  $("#resultsText").html(game.counter);
  $("#resultsText").empty('<h3>Correct Answers: ' + game.correct + '</h3>');
  $("#resultsText").empty('<h3>Incorrect Answers: ' + game.wrong + '</h3>');
  $("#resultsText").empty('<h3>Unanswered: ' + (questions.length - (game.wrong + game.correct)) + '</h3>');
  $("#resultsText").empty('<br><button id="startAgain">Play again?</button>');

},

   
    
//EXECUTES IF ANSWERBTN IS CLICKED
clicked: function(e){
      $('#time').fadeOut()
      $('.btn').fadeOut()

    clearInterval(timer);

    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
          this.ansRight();
    }else{
          this.ansWrong();
  }
},

//IF WRONG ANSWER FUNCTION
ansWrong: function(){
    clearInterval(timer);
    game.wrong++;

      $('.question').html('<h2 id="wrongFuncAns"> Wrong!!! </h2> <h3 id = "correctAns">The Correct Answer was: '+ '<h3 id="showAns">' + questions[game.currentQuestion].correctAnswer +'</h3>' +'</h3>');
    
    if (game.currentQuestion === questions.length - 1){
         setTimeout(game.results, 100);
    }else{
         setTimeout(game.nextQuestion, 3000);
  }
},
//IF CORRECT ANSWER FUNCTION
ansRight: function(){
    clearInterval(timer);
    game.correct++;
      $(".question").html('<h2 id="rightFuncAns"> Right!!!</h2>')
    
    if (game.currentQuestion === questions.length - 1) {
         console.log("if currentquestion=length if statement called")
         setTimeout(game.results, 100)
        
    }else{
         console.log("else currentquestion=length if statement called")
         setTimeout(game.nextQuestion, 3000);
  }
},
//RESET FUNCTION
reset: function(){
       this.currentQuestion = 0;
       this.counter = countNumber;
       this.correct = 0;
       this.wrong = 0;
       this.newQuestion();
    } 
  }

    
})
