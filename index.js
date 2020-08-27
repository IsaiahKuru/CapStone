var rand;
var ballX = 320;
var ballY = 240;
var scoreP1 = 0;
var scoreP2 = 0;
var wait = false;
var oppDirectionX;
var oppDirectionY;
var paddle1Y = 200;
var paddle2Y = 200;
var ballDirectionX;
var ballDirectionY;
let speed = 5;

function setup() {
  let canvas = createCanvas(640, 480);
  canvas.parent('game');
  reset();
}

function reset() {
  
  ballX = 320;
  ballY = 240;
  paddle1Y = 200;
  paddle2Y = 200;
  
  rand = random(1);
  ballDirectionX = rand > 0.5 ? '+' : '-';
  rand = random(1);
  ballDirectionY = rand > 0.5 ? '+' : '-';
  
  if(ballDirectionY === '+') {
    oppDirectionY = '-';
  } else {
    oppDirectionY = '+';
  }
  
  if(ballDirectionX === '+') {
    oppDirectionX = '-';
  } else {
    oppDirectionX = '+';
  }
  
}

function draw() {
  
  if(wait === false) {
    background('#228b22');
    if(ballY > 30 && ballY < 450 && ballX > -31 && ballX < 671) {
      
      if(ballDirectionX === '+') {
        ballX -= speed;
      } else {
        ballX += speed;
      }
      
      if(ballDirectionY === '+') {
        ballY -= speed;
      } else {
        ballY += speed;
      }
      
    } else if(ballY === 30 || ballY === 450) {
      
      ballDirectionY = oppDirectionY;
      if(ballDirectionY === '+') {
        ballY -= speed;
        oppDirectionY = '-';
      } else {
        ballY += speed;
        oppDirectionY = '+';
      }
      
    } else {
      
      wait = true;
      setTimeout(score, 333);
      function score() {
        
        if(ballX === -31) {
          scoreP1++;
          document.getElementById('score1').innerHTML = "Player 1: "+scoreP1;
        } else {
          scoreP2++;
          document.getElementById('score2').innerHTML = "Player 2: "+scoreP2;
        }
        
        reset();
        background('#007');
        rect(40, 200, 20, 80);
        rect(580, 200, 20, 80);
        ellipse(320, 240, 56, 56);
        setTimeout(function() { wait = false; }, 2000);
        
      }
      
    }
    
    if(keyIsDown(87)) {
      if(paddle1Y > 6) {
        paddle1Y -= speed;
      }
    } else if(keyIsDown(83)) {
      if(paddle1Y < 394) {
        paddle1Y += speed;
      }
    }
    
    if(keyIsDown(38)) {
      if(paddle2Y > 6) {
        paddle2Y -= speed;
      }
    } else if(keyIsDown(40)) {
      if(paddle2Y < 394) {
        paddle2Y += speed;
      }
    }
    
    let ball = {
      x: ballX, 
      y: ballY, 
      r: 28
    };
    
    let rect1 = {
      x: 40, 
      y: paddle1Y, 
      w: 20, 
      h: 80
    };
    
    let rect2 = {
      x: 580, 
      y: paddle2Y, 
      w: 20, 
      h: 80
    };
    
    rect(rect1.x, rect1.y, rect1.w, rect1.h);
    rect(rect2.x, rect2.y, rect1.w, rect2.h);
    ellipse(ball.x, ball.y, ball.r * 2, ball.r * 2);
    
    if(RectCircleCollidingX(ball, rect1) || RectCircleCollidingX(ball, rect2)) {
      
      ballDirectionX = oppDirectionX;
      if(ballDirectionX === '+') {
        oppDirectionX = '-';
      } else {
        oppDirectionX = '+';
      }
      
    } else if(RectCircleCollidingY(ball, rect1) || RectCircleCollidingY(ball, rect2)) {
      
      ballDirectionY = oppDirectionY;
      if(ballDirectionY === '+') {
        oppDirectionY = '-';
      } else {
        oppDirectionY = '+';
      }
      
    }
    
    function RectCircleCollidingX(circle, rect) {
      
      let distX = Math.abs(circle.x - rect.x - rect.w / 2);
      let distY = Math.abs(circle.y - rect.y - rect.h / 2);
      
      if (distX > (rect.w / 2 + circle.r)) {
        return false;
      } else if (distY > (rect.h / 2 + circle.r)) {
        return false;
      } else {
        return true;
      }
      
    }
    
    function RectCircleCollidingY(circle, rect) {
      
      let distX = Math.abs(circle.x - rect.x - rect.w / 2);
      let distY = Math.abs(circle.y - rect.y - rect.h / 2);
      
    
      
      if (distX > (rect.w / 2 + circle.r)) {
        return false;
      } else if (distY > (rect.h / 2 + circle.r)) {
        return false;
      } else {
        return true;
      }
      
    }
  }
  
}