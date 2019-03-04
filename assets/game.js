$(document).ready(function () {
  var countNumber = 10;
   //Questions Answers Array 
  var questions = [{
    question: "The process of making cow’s milk safe for human consumption is called what?",
    answers: ["Freezing",
              "Cooling", 
              "Pasteurization", 
              "All answers right"],
    correctAnswer: "Pasteurization",
   
  }, {
    question: "The name of the popular online battle royale game PUBG, is short for what?",
    answers: ["Player Battlegrounds", 
              "PlayerUnknown’s Battlegrounds", 
              "PlayerKnown's Battlegrounds", 
              "Fortnite"],
    correctAnswer: "PlayerUnknown’s Battlegrounds",
   
  }, {
    question: "What U.S. nonprofit organization sells about 200 million boxes of cookies per year?",
    answers: ["The Girl Scouts", 
               "Boys Scouts", 
               "Walmart"],
    correctAnswer: "The Girl Scouts",
   
  }, {
    question: "What is the name of the character played by Johnny Depp in the Pirates of the Caribbean film series?",
    answers: ["Captain Jack Sparrow", 
               "Captain Arrow", 
               "Robin Hood", 
               "The Ship"],
    correctAnswer: "Captain Jack Sparrow",
    
  }, {
    question: 'What song from the Disney film “Coco” won the 2018 Academy Award for Best Original Song?',
    answers: ["Remember me", 
              "Remember you", 
              "Despacito", 
              "None of this"],
    correctAnswer: "Remember me",
    
  }, {
    question: 'How the Grinch Stole Christmas is a 2000 American Christmas fantasy comedy film starring which actor as the Grinch?',
    answers: ["Jim Carrey", 
              "Johnny Depp", 
              "Brad Pitt", 
              "Bruce Willis"],
    correctAnswer: "Jim Carrey",
    
  }];
  

  //Reset game
  $(document).on('click', '#startAgain', function(e){
    game.reset();
    
  })
  //if answer button clicked
  $(document).on('click', '#ansBtn', function(e) {
    game.clicked(e);
  }); 

  // if START clicked
  $(".btn").on('click', function(){
    $(".btn").hide();
    $("#mainbox").append("<h1 id='logo'>Trivia Game</h1>");//show <h1>Trivia Game<h1>
    $('#time').append('<h2>Time Remaining: <span id = "counterNumber">30</span>Seconds</h2>')//show Timer
    game.newQuestion();

  })

  //objects
  var game = {
    questions: questions,
    currentQuestion: 0,
    counter: countNumber,
    correct: 0,
    wrong:0,
  ////////////FUNCTIONS/////////////////////////////////////////////////////////////////
    //timer////////////////////////////////////////////////////////////////////////////
    timeCount: function(){
      game.counter --;
      $("#counterNumber").html(game.counter);
      console.log(game.counter)

      if(game.counter === 0){
        game.timeUp();//if 0 call timeUp function
      }
    },

    //new question///////////////////////////////////////////////////////////////////////
    newQuestion: function(){
      timer = setInterval(game.timeCount, 1000);
      $('.question').html('<h2>' + questions[this.currentQuestion].question + '</h2>')//display question
      console.log("in new question function");
      console.log(questions[this.currentQuestion].question);
      for (var i = 0; i < questions[this.currentQuestion].answers.length; i++){ //display choices
        $('.question').append('<button type="button" class="btn btn-outline-primary" id="ansBtn"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i] + '</button>');
      }
      $('#logo').hide()
    },
    //next question//////////////////////////////////////////////////////////////////////
    nextQuestion: function(){
      game.counter = countNumber;
      $("#counterNumber").html(game.counter);
      game.currentQuestion++;
      game.newQuestion();
    },
    //if time over////////////////////////////////////////////////////////////////////////
    timeUp: function(){
      console.log("timeup function")
      clearInterval(timer);
      $("#counterNumber").html(game.counter);
      $("#mainbox").html("<h2>Time is up!!!</h2>");
      $("#mainbox").append("<h3>The correct answer was :" + questions[this.currentQuestion].correctAnswer);

      if (game.currentQuestion === questions.length - 1){
        setTimeout(game.results, 100);
        console.log("if statement in timeup")

      }else {
        setTimeout(game.nextQuestion, 1000)
        console.log("else statement in timeup")
      }
      
      } ,
      //results////////////////////////////////////////////////////////////////////////////////////
      results: function(){
        clearInterval(timer);
        $('#mainbox').append('<h2> Your Results</h2>');
        $("#counterNumber").html(game.counter);
        $("#mainbox").append('<h3>Correct Answers: ' + game.correct + '</h3>');
        $("#mainbox").append('<h3>Incorrect Answers: ' + game.wrong + '</h3>');
        $("#mainbox").append('<h3>Unanswered: ' + (questions.length - (game.wrong + game.correct)) + '</h3>');
        $("#mainbox").append('<br><button id="startAgain">Play again?</button>');
    },
    //clicked//////////////////////////////////////////////////////////////////////////////////////
    //executes if ansBtn clicked//////////////////////////////
  clicked: function(e){
    clearInterval(timer);
    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.ansRight();
    }else{
      this.ansWrong();
    }
  },

  //if wrong answer function//////////////////////////////////////////////////////////////////////
  ansWrong: function(){
    clearInterval(timer);
    game.wrong++;
    $("#mainbox").html('<h2>Wrong!</h2>');
    $('#mainbox').append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 100);
    }else {
      setTimeout(game.nextQuestion, 100);
    }
  },
  ansRight: function(){
    clearInterval(timer);
    game.correct++;
    $("#mainbox").html('<h2> Right!!!</h2>')
    
    if (game.currentQuestion === questions.length - 1) {
      console.log("if currentquestion=length if statement called")
      setTimeout(game.results, 100);
    }else {
      console.log("else currentquestion=length if statement called")
      setTimeout(game.nextQuestion, 100);
    }
  },
  //reset function///////////////////////////////////////////////////////////////////////////////
    reset: function(){
      this.currentQuestion = 0;
      this.counter = countNumber;
      this.correct = 0;
      this.wrong = 0;
    this.newQuestion();
    } 
  }
    
})