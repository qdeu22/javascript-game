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

//true면 게임 종료, false라면 게임 진행
var gameOver = false;
var score = 0;

//우주선 좌표
var spaceshipX = canvas.width / 2 - 50;
var spaceshipY = canvas.height - 100;

var bulletList = []; //총알들을 저장하는 리스트

function Bullet() {
  this.x = 0;
  this.y = 0;
  this.alive = true; //true안 부딪친 총알 ,false 부딪친 총알
  this.init = function () {
    this.x = spaceshipX + 40;
    this.y = spaceshipY;

    bulletList.push(this);
  };
  this.update = function () {
    this.y -= 7;
  };
  this.checkHit = function () {
    for (let i = 0; i < meteorList.length; i++) {
      if (
        this.y <= meteorList[i].y &&
        this.x >= meteorList[i].x &&
        this.x <= meteorList[i].x + 60
      ) {
        //총알이 메테오랑 부딪치면 메테오는 사라짐, 즉, 점수획득!
        score++;
        this.alive = false; //부딪친 총알
        meteorList.splice(i, 1);
      }
    }
  };
}

function gernerateRandomValue(min, max) {
  var randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNum;
}

var meteorList = [];

function Meteor() {
  this.x = 0;
  this.y = 0;
  this.init = function () {
    this.y = 0;
    this.x = gernerateRandomValue(0, canvas.width - 60);
    meteorList.push(this);
  };
  this.update = function () {
    this.y += 2; //메테오 떨어지는 속도

    if (this.y >= canvas.height - 60) {
      gameOver = true;
      console.log("gameover");
    }
  };
}

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

    if (event.key === " ") {
      //스페이스바
      createBullet(); //총알 생성
    }
  });
}

function createBullet() {
  console.log("총알 생성!");
  var bullet = new Bullet();
  bullet.init();
  console.log("새로운 총알 리스트", bulletList);
}

function createMeteor() {
  const interval = setInterval(function () {
    let meteor = new Meteor();
    meteor.init();
  }, 1000); //1초 마다 생성
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

  //총알의 y좌표 업데이트하는 함수 호출
  for (let i = 0; i < bulletList.length; i++) {
    if (bulletList[i].alive) {
      bulletList[i].update();
      bulletList[i].checkHit();
    }
  }

  for (let i = 0; i < meteorList.length; i++) {
    meteorList[i].update();
  }
}

/**
 * 캔버스에 그리기
 */
function render() {
  context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height); //백그라운드 이미지 불러오기
  context.drawImage(spaceshipImage, spaceshipX, spaceshipY);
  context.fillText(`Score:${score}`, 20, 20);
  context.fillStyle = "white";
  context.font = "20px Arial";

  for (let i = 0; i < bulletList.length; i++) {
    if (bulletList[i].alive) {
      context.drawImage(bulletImage, bulletList[i].x, bulletList[i].y);
    }
  }
  for (let i = 0; i < meteorList.length; i++) {
    context.drawImage(meteorImage, meteorList[i].x, meteorList[i].y);
  }
}

/**
 * 총알 만들기
 * 1. 스페이스바를 누르면 총알 발사
 * 2. 총알이 발상 = 총알의 y값이 --, 총알의 x값은?  스페이스를 누른 순간의 우주선의 x값
 * 3. 발사된 총알들은 총알 배열에 저장을 한다.
 * 4. 총알들은 x, y좌표값이 있어야함
 * 5. 총알의 배열을 가지고 render 그려준다
 */

/**
 * 메테오 만들기
 * 1. 메테오 위치가 랜덤
 * 2. 메테오가 내려온다
 * 3. 1초마다 하나씩 적군이 나옴
 * 4. 메테오가 바닥에 닿으면 게임오버
 * 5. 메테오와 총알이 만나면 사라지고 점수 1점 획득
 */
function main() {
  if (!gameOver) {
    update(); //좌표값 업데이트
    render(); // 그리기
    //console.log("애니메이션 프레임 작동!");
    // 애니메이션 작동!
    requestAnimationFrame(main);
  } else {
    context.drawImage(gameOverImage, 10, 100, 380, 380);
  }
}

loadImage();
setupKeyBoardListenser();
createMeteor();
main();
