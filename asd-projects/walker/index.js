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
  
  // Game Item Objects
  var walker_1 = {
    positionX: 0,
    positionY: 0,
    speedX: 0,
    speedY: 0
  }

  var walker_2 = {
    positionX: 390,
    positionY: 390,
    speedX: 0,
    speedY: 0
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
    repositionGameItem();
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

  function handleKeyUp() {
    walker_1.speedX = 0;
    walker_1.speedY = 0;
    walker_2.speedX = 0;
    walker_2.speedY = 0;
  }


  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repositionGameItem() {
    walker_1.positionX += walker_1.speedX;
    if (walker_1.positionX >= 390) {
      walker_1.positionX = 390;
    } else if (walker_1.positionX <= 0) {
      walker_1.positionX = 0;
    }
    walker_1.positionY += walker_1.speedY;
    if (walker_1.positionY >= 390) {
      walker_1.positionY = 390;
    } else if (walker_1.positionY <= 0) {
      walker_1.positionY = 0;
    }

    walker_2.positionX += walker_2.speedX;
    if (walker_2.positionX >= 390) {
      walker_2.positionX = 390;
    } else if (walker_2.positionX <= 0) {
      walker_2.positionX = 0;
    }
    walker_2.positionY += walker_2.speedY;
    if (walker_2.positionY >= 390) {
      walker_2.positionY = 390;
    } else if (walker_2.positionY <= 0) {
      walker_2.positionY = 0;
    }
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
