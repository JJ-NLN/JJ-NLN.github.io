/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEY = {
    "UP": 38,
    "DOWN": 40,
    "W": 87,
    "S": 83,
  }
  const BOARD_WIDTH = $("#board").width();
  const BOARD_HEIGHT = $("#board").height();
  const PADDLE_HEIGHT = $("#leftPaddle").height();
  const PADDLE_WIDTH = $("#leftPaddle").width();
  const BALL_WIDTH = $("#ball").width();
  const BALL_HEIGHT = $("#ball").height();
  
  // Game Item Objects
  var player1 = Player("#leftPaddle", parseFloat($("#leftPaddle").css("left")), parseFloat($("#leftPaddle").css("top")));
  var player2 = Player("#rightPaddle", parseFloat($("#rightPaddle").css("left")), parseFloat($("#rightPaddle").css("top")));

  var ball = {};
  ball.x;
  ball.y;
  ball.speedX;
  ball.speedY;
  ball.id = "#ball";  
  
  function Player(id, x, y) {
    var player = {};
    player.id = id;
    player.speed = 5;
    player.x = x;
    player.y = y;
    player.points = 0;
    return player;
  }

  // Move Game Item Objects Functions
  function movePlayer(player) {
    $(player.id).css("top", player.y);  // draw the paddle in the new location, positionY pixels away from the "Top"
  }

  


  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp); 
  startBall();
 
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    moveBall(); 
    paddleDeflect();
    detectWallCollision();
    determineWinner();
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.UP) {
      player1.y += -BALL_HEIGHT;
      if (player1.y < 0) {
        player1.y = 0;
      }
      movePlayer(player1);
    } else if (event.which === KEY.DOWN) {
      player1.y += BALL_HEIGHT;
      console.log(player1.y);
      if (player1.y > BOARD_HEIGHT - PADDLE_HEIGHT) {
        player1.y = BOARD_HEIGHT - PADDLE_HEIGHT;
      } 
      movePlayer(player1);
    }

    if (event.which === KEY.W) {
      player2.y += -BALL_HEIGHT;
      if (player2.y < 0) {
        player2.y = 0;
      }
      movePlayer(player2);
    } else if (event.which === KEY.S) {
      player2.y += BALL_HEIGHT;
      if (player2.y > BOARD_HEIGHT - PADDLE_HEIGHT) {
        player2.y = BOARD_HEIGHT - PADDLE_HEIGHT;
      } 
      movePlayer(player2);
    }
  }

  function handleKeyUp() {
    player1.speedY = 0;
    player2.speedY = 0;
  }


  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function startBall() {
    ball.x = parseFloat(BOARD_WIDTH/2);
    ball.y = parseFloat(BOARD_HEIGHT/2);
    ball.speedX = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
    ball.speedY = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
  }

  function moveBall() {
    ball.x += ball.speedX;
    ball.y += ball.speedY;
    $("#ball").css("top", ball.y);
    $("#ball").css("left", ball.x);
  }

  function paddleDeflect() {
    if (doCollide(ball, player2)) {
      ball.speedX = -ball.speedX;
    } else if (doCollide(ball, player1)) {
      ball.speedX = -ball.speedX;
    }
  }

  function detectWallCollision() {
    if (ball.y > BOARD_HEIGHT - BALL_HEIGHT) {
      ball.speedY = -ball.speedY;
    } else if (ball.y < 0) {
      ball.speedY = -ball.speedY;
    }
    if (ball.x > BOARD_WIDTH - BALL_WIDTH) {
      $("#playerOneScore").text(`Player One Score: ${++player1.points}`);
      startBall();
      ball.speedX = -ball.speedX;
    } else if (ball.x < 0) {
      $("#playerTwoScore").text(`Player Two Score: ${++player2.points}`);
      startBall();
      ball.speedX = -ball.speedX;
    }
  }

  function doCollide(obj1, obj2) {
    // the right side of ball is past the left side of paddle
    if (obj1.x + BALL_WIDTH > obj2.x
    // the left side of ball is past the right side of paddle
        && obj1.x < obj2.x + PADDLE_WIDTH
    // the bottom side of ball is past the top side of paddle
        && obj1.y + BALL_HEIGHT > obj2.y
    // the top side of ball is not past the bottom side of paddle
        && obj1.y < obj2.y + PADDLE_HEIGHT) {
      return true;
    } else {
      return false;
    }
  }

  function determineWinner() {
    if (player1.points == 11) {
      endGame();
      alert("Player 1 Wins!!!");
    } else if (player2.points == 11) {
      endGame();
      alert("Player 2 Wins!!");
    }
  }
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
