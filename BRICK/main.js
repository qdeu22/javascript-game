var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");

canvas.id = "myCanvas";
canvas.width = 400;
canvas.height = 700;

//이제 HTML에 넣기
document.body.appendChild(canvas);

var ballX = canvas.width / 2;
var bally = canvas.height - 30;

var dx = 2;
var dy = -2;

var ballRadius = 10; // 원의 반지름

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;

var rightPressed = false;
var leftPressed = false;

var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

// 벽돌 생성 배열
var bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0 };
  }
}

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      bricks[c][r].x = 0;
      bricks[c][r].y = 0;
      context.beginPath();
      context.rect(0, 0, brickWidth, brickHeight);
      context.fillStyle = "#0095DD";
      context.fill();
      context.closePath();
    }
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.key === "ArrowLeft") {
    leftPressed = true;
  }
  if (e.key === "ArrowRight") {
    rightPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === "ArrowLeft") {
    leftPressed = false;
  }
  if (e.key === "ArrowRight") {
    rightPressed = false;
  }
}

function drawPaddle() {
  context.beginPath();
  context.rect(
    paddleX,
    canvas.height - paddleHeight,
    paddleWidth,
    paddleHeight
  );
  context.fillStyle = "#0095DD";
  context.fill();
  context.closePath();
}

function drawBall() {
  context.beginPath();
  context.arc(ballX, bally, ballRadius, 0, Math.PI * 2);
  context.fillStyle = "#0095DD";
  context.fill();
  context.closePath();
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height); //이전 프레임 캔버스 지우기!
  drawBricks();
  drawBall();
  drawPaddle();

  if (ballX + dx > canvas.width - ballRadius || ballX + dx < ballRadius) {
    dx = -dx;
  }
  if (bally + dy < ballRadius) {
    dy = -dy;
  } else if (bally + dy > canvas.height - ballRadius) {
    if (ballX > paddleX && ballX < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      alert("GAME OVER");
      document.location.reload(); // 현재 웹페이지를 새로고침
    }
  }

  if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  }

  ballX += dx;
  bally += dy;
}

setInterval(draw, 10);
