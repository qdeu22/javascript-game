//캔버스 셋팅
var canvas;
var context;

canvas = document.createElement("canvas");
context = canvas.getContext("2d"); //2d

canvas.width = 400;
canvas.height = 700;

//이제 HTML에 넣기
document.body.appendChild(canvas);

var backgroundImage;
var spaceshipImage;
var bulletImage;
var enemyImage;
var gameOverImage;

//우주선 좌표
var spaceshipX = canvas.width / 2 - 50;
var spaceshipY = canvas.height - 100;

/**
 * 게임 이미지 불러오기
 */
function loadImage() {
  backgroundImage = new Image();
  backgroundImage.src = "images/background.jpg";

  spaceshipImage = new Image();
  spaceshipImage.src = "images/spaceship.png";

  bulletImage = new Image();
  bulletImage.src = "images/bullet.png";

  enemyImage = new Image();
  enemyImage.src = "images/enemy.png";

  gameOverImage = new Image();
  gameOverImage.src = "images/gameOver.png";
}
/**
 * 키 작동 함수
 */
function setupKeyBoardListenser() {
  document.addEventListener("keydown", function (event) {
    console.log("입력된 키?", event.key);
  });
}

/**
 * 캔버스에 그리기
 */
function render() {
  context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height); //백그라운드 이미지 불러오기
  context.drawImage(spaceshipImage, spaceshipX, spaceshipY);
}

function main() {
  render();
  console.log("애니메이션 프레임 작동!");
  // 애니메이션 작동!
  requestAnimationFrame(main);
}

loadImage();
setupKeyBoardListenser();
main();
