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

var tankCenterX; // 탱크의 중심 x좌표
var tankCenterY; // 탱크의 중심 y좌표
var cannonAngle = Math.PI / 4; // 캐논의 각도 (45도)
var cannonAngleDIF = Math.PI / 60; // 각도의 변화량
var cannonLength = tankWidth * Math.sqrt(2); // 캐논의 길이

var targetWidth = Math.floor(Math.random() * 100 + 30); // 표적의 가로길이
var targetHeight = Math.floor(Math.random() * 100 + 10); // 표적의 세로길이
var targetX = Math.floor(Math.random() * (500 - targetWidth + 500)); //표적의 x좌표
var targetY = canvas.height - targetHeight; // 표적의 y좌표

var missileRadius = 5; // 미사일의 반지름
var missileX; //미사일의 x좌표
var missileY; // 미사일의 y좌표
var isCharging = false; // 파워게이지 채우는 중인지
var isFired = false; // 공이 발사되었는지
var isHitted = false; // 공이 목표물에 명중했는지
var gauge = Math.PI; // 파워게이지
var gaugeDIF = Math.PI / 60; // 파워게이지가 충전되는 속도
var gaugeBarRadius = 30; // 파워게이지바의 반지름
var missilePower; // 미사일 파워
var missileSpeedX; // 미사일 x방향 속도
var missileSpeedY; // 미사일 y방향 속도
var GRAVITY_ACCELERATION = 0.098; // 공이 아래쪽을 받는 힘(중력가속도)

function drawMissile() {
  context.beginPath();
  context.arc(missileX, missileY, missileRadius, 0, Math.PI * 2);
  context.fillStyle = "blue";
  context.fill();
  context.closePath();
}

function drawGausing() {
  context.beginPath();
  context.arc(
    tankCenterX,
    tankCenterY - cannonLength,
    gaugeBarRadius,
    Math.PI,
    gauge,
    false
  );
  context.stroke();
}

function drawTarget() {
  context.fillRect(targetX, targetY, targetWidth, targetHeight);
  context.fillStyle = "red";
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.key === "ArrowLeft") {
    tankLeftPressed = true;
  }
  if (e.key === "ArrowRight") {
    tankRightPressed = true;
  }
  if (e.key === "ArrowUp" && cannonAngle <= Math.PI) {
    cannonAngle += cannonAngleDIF;
  }
  if (e.key === "ArrowDown" && cannonAngle >= 0) {
    cannonAngle -= cannonAngleDIF;
  }
  if (e.key === " " && !isFired) {
    isCharging = true;
  }
}
function keyUpHandler(e) {
  if (e.key === "ArrowLeft") {
    tankLeftPressed = false;
  }
  if (e.key === "ArrowRight") {
    tankRightPressed = false;
  }
  if (e.key === " " && !isFired) {
    isCharging = false;
    isFired = true;
    gauge = Math.PI;
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

  context.moveTo(tankCenterX, tankCenterY);
  context.lineTo(
    tankCenterX + cannonLength * Math.cos(cannonAngle),
    tankCenterY - cannonLength * Math.sin(cannonAngle)
  );

  context.stroke(); // 경로를 따라 선을 그림
  context.closePath();
}

function main() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  tankCenterX = tankX + 0.5 * tankWidth;
  tankCenterY = canvas.height - 0.5 * tankHeight;

  if (tankLeftPressed && tankX > 0) {
    tankX -= tankSpeed;
  }
  if (tankRightPressed && tankX + tankWidth < canvas.width) {
    tankX += tankSpeed;
  }
  if (isCharging && !isFired) {
    if (gauge < Math.PI * 2) {
      gauge += gaugeDIF;
    }
    drawGausing();
  }
  if (!isFired) {
    missileX = tankCenterX + cannonLength * Math.cos(cannonAngle);
    missileY = tankCenterY - cannonLength * Math.sin(cannonAngle);
  }
  drawTank();
  drawTarget();
  drawMissile();
  requestAnimationFrame(main);
}

main();
