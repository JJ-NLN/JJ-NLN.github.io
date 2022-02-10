/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEY = {
    "UP": 38,
    "DOWN": 40,
    "LEFT": 37,
    "RIGHT": 39,
    "W": 87,
    "S": 83,
    "A": 65,
    "D": 68,
  }

  // Board width, height
  var BOARD_WIDTH = $("#board").width();

  // Board Walls
  var BOARD_WALL;
  
  // Game Item Objects
  var walker_1 = {
    positionX: 0,
    positionY: 0,
    speedX: 0,
    speedY: 0,
    width: $("#walker").width()
  }

  var walker_2 = {
    positionX: 390,
    positionY: 390,
    speedX: 0,
    speedY: 0,
    width: $("#walker_2").width()
  }


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp); 

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem(walker_1);
    repositionGameItem(walker_2);
    redrawGameItem(); 
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.LEFT) {
      walker_1.speedX = -5;
    } else if (event.which === KEY.RIGHT) {
      walker_1.speedX = 5;
    } else if (event.which === KEY.UP) {
      walker_1.speedY = -5;
    } else if (event.which === KEY.DOWN) {
      walker_1.speedY = 5;
    }

    if (event.which === KEY.A) {
      walker_2.speedX = -5;
    } else if (event.which === KEY.D) {
      walker_2.speedX = 5;
    } else if (event.which === KEY.W) {
      walker_2.speedY = -5;
    } else if (event.which === KEY.S) {
      walker_2.speedY = 5;
    }
  }

  function handleKeyUp(event) {
    if (event.which === KEY.LEFT || event.which === KEY.RIGHT) {
      walker_1.speedX = 0;
    } else if (event.which === KEY.UP || event.which === KEY.DOWN) {
      walker_1.speedY = 0;
    }

    if (event.which === KEY.A || event.which === KEY.D) {
      walker_2.speedX = 0;
    } else if (event.which === KEY.W || event.which === KEY.S) {
      walker_2.speedY = 0;
    } 
  }


  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repositionGameItem(walker) {
    BOARD_WALL = BOARD_WIDTH - walker.width;

    walker.positionX += walker.speedX;

    walker.positionX = Math.min(walker.positionX, BOARD_WALL)
    walker.positionX = Math.max(walker.positionX, 0);

    // if (walker_1.positionX >= BOARD_WALL) {
    //   walker_1.positionX = BOARD_WALL;
    // } else if (walker_1.positionX <= 0) {
    //   walker_1.positionX = 0;
    // }

    walker.positionY += walker.speedY;

    walker.positionY = Math.min(walker.positionY, BOARD_WALL);
    walker.positionY = Math.max(walker.positionY, 0);

    // if (walker_1.positionY >= BOARD_WALL) {
    //   walker_1.positionY = BOARD_WALL;
    // } else if (walker_1.positionY <= 0) {
    //   walker_1.positionY = 0;
    // }

    // walker_2.positionX += walker_2.speedX;
    // if (walker_2.positionX >= BOARD_WALL) {
    //   walker_2.positionX = BOARD_WALL;
    // } else if (walker_2.positionX <= 0) {
    //   walker_2.positionX = 0;
    // }
    // walker_2.positionY += walker_2.speedY;
    // if (walker_2.positionY >= BOARD_WALL) {
    //   walker_2.positionY = BOARD_WALL;
    // } else if (walker_2.positionY <= 0) {
    //   walker_2.positionY = 0;
    // }
  }

  function redrawGameItem() {
    $("#walker").css("left", walker_1.positionX);
    $("#walker").css("top", walker_1.positionY);
    $("#walker_2").css("left", walker_2.positionX);
    $("#walker_2").css("top", walker_2.positionY);
    
  }
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
