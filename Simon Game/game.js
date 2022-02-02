var buttonColors = ["red","blue", "green", "yellow"];
var gamePattern = [];
var userCLickedPattern = [];
var gameStarted = true;
var level = 0;

function nextSequence(){
  var randomNumber = Math.floor(Math.random()*4);
  var randomChoosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChoosenColor);
  playSound(randomChoosenColor);
  animatePress(randomChoosenColor);
  $("h1").text("Level "+level);
  level++;
  userCLickedPattern=[];
}

function playSound(color){

  var btnID = "#"+color;
  $(btnID).fadeOut(100).fadeIn(100);
  var audio = new Audio("sounds/"+color+".mp3");
  audio.play();
}

function handler(color){
  userCLickedPattern.push(color);
  console.log(color);
  console.log(userCLickedPattern);
  playSound(color);
  animatePress(color);
}


function animatePress(color){
  var btn_id = "#"+color;
  $(btn_id).addClass("pressed");
  setTimeout(function(){
    $(btn_id).removeClass("pressed"),100
  });
}

document.addEventListener("keypress",function(){
  if(gameStarted){
    gameStarted = false;
    nextSequence();
  }
});

function checkAnswer(currentLevel){
    if(userCLickedPattern[currentLevel] === gamePattern[currentLevel]){
    }
    else{
      gameStarted = true;
      pattern = [];
      level = 0;
      $("h1").text("Game Over, Press any key to Restart");
      var wrongAudio = new Audio("sounds/wrong.mp3");
      wrongAudio.play();
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
    }
    if(userCLickedPattern.length=== level){
      setTimeout(nextSequence,1000);
    }
}
$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
  handler(userChosenColor);
  checkAnswer(userCLickedPattern.length-1);
});
