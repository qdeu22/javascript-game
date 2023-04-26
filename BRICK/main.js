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

function drawBall() {
  context.beginPath();
  context.arc(ballX, bally, 10, 0, Math.PI * 2);
  context.fillStyle = "#0095DD";
  context.fill();
  context.closePath();
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height); //이전 프레임 캔버스 지우기!
  drawBall();
  ballX += dx;
  bally += dy;
}

setInterval(draw, 10);
