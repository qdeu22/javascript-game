var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");

canvas.width = 1000;
canvas.height = 700;

//이제 HTML에 넣기
document.body.appendChild(canvas);

var tankWidth = 50;
var tankHeight = 50;
var tankX = 0;
var tankSpeed = 3;

var tankLeftPressed = false;
var tankRightPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.key === "ArrowLeft") {
    tankLeftPressed = true;
  }
  if (e.key === "ArrowRight") {
    tankRightPressed = true;
  }
}
function keyUpHandler(e) {
  if (e.key === "ArrowLeft") {
    tankLeftPressed = false;
  }
  if (e.key === "ArrowRight") {
    tankRightPressed = false;
  }
}

function drawTank() {
  context.lineWidth = 5; // 선 굵기 5
  context.lineCap = "round"; // 선의 끝부분을 둥글게!
  context.beginPath();
  context.moveTo(tankX, canvas.height - tankHeight); // 탱크의 시작점
  context.lineTo(tankX + tankWidth, canvas.height - tankHeight); // 탱크의 오른쪽 상단 모서리
  context.lineTo(tankX + tankWidth, canvas.height); // 탱크의 오른쪽 하단 모서리
  context.lineTo(tankX, canvas.height); // 탱크의 왼쪽 하단 모서리
  context.lineTo(tankX, canvas.height - tankHeight); // 탱크의 왼쪽 상단 모서리
  context.stroke(); // 경로를 따라 선을 그림
  context.closePath();
}

drawTank();
