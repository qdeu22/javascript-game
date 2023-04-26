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

  meteorImage = new Image();
  meteorImage.src = "images/meteor.png";

  gameOverImage = new Image();
  gameOverImage.src = "images/gameOver.png";
}

//객체형태..
var keysDown = {};
/**
 * 키 작동 함수
 */
function setupKeyBoardListenser() {
  document.addEventListener("keydown", function (event) {
    keysDown[event.key] = true;
    console.log("키 다운 객체에 들어간 값은?", keysDown);
  });
  document.addEventListener("keyup", function (event) {
    delete keysDown[event.key];
    console.log("버튼 클릭후?", keysDown);
  });
}

function update() {
  if ("ArrowRight" in keysDown) {
    //오른쪽
    spaceshipX += 3; // 우주선의 속도
  }
  if ("ArrowLeft" in keysDown) {
    //오른쪽
    spaceshipX -= 3; // 우주선의 속도
  }

  //canvas 크기에 맞게 이동하게 제한
  if (spaceshipX <= 0) {
    spaceshipX = 0;
  }
  if (spaceshipX >= canvas.width - 100) {
    spaceshipX = canvas.width - 100;
  }
}

/**
 * 캔버스에 그리기
 */
function render() {
  context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height); //백그라운드 이미지 불러오기
  context.drawImage(spaceshipImage, spaceshipX, spaceshipY);
}

function main() {
  update(); //좌표값 업데이트
  render(); // 그리기
  console.log("애니메이션 프레임 작동!");
  // 애니메이션 작동!
  requestAnimationFrame(main);
}

loadImage();
setupKeyBoardListenser();
main();
