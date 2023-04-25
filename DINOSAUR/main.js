var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var dino = {
  x: 10,
  y: 200,
  width: 50,
  height: 50,
  draw() {
    ctx.fillStyle = "green";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  },
};

class Cactus {
  constructor() {
    this.x = 500;
    this.y = 200;
    this.width = 50;
    this.height = 50;
  }
  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

var timer = 0;
var cactus여러개 = []; // 배열
var 점프timer = 0;
var animation;

/**
 * 1초에 60번 (참고) 실행횟수는 모니터 FPS에 따라 다름!!!!!
 */
function 프레임마다실행할함수() {
  animation = requestAnimationFrame(프레임마다실행할함수);
  timer++;

  ctx.clearRect(0, 0, canvas.width, canvas.height); //캔버스 완전 초기화!

  if (timer % 200 === 0) {
    // 즉, 컴퓨터에 설정에 맞게 1초마다 설정!
    // 장애물을 생성!
    var cactus = new Cactus();
    cactus여러개.push(cactus);
  }

  cactus여러개.forEach((a, i, o) => {
    //x 좌표가 0미만이면 제거
    if (a.x < 0) {
      o.splice(i, 1); //배열 비우기.
    }
    a.x--;

    충동하냐(dino, a);

    a.draw();
  });

  //점프기능
  if (점프중 === true) {
    dino.y -= 1; //점프!
    점프timer++;
  }
  if (점프중 === false) {
    if (dino.y < 200) {
      dino.y += 1;
    }
  }
  if (점프timer > 100) {
    //100프레임이 지나면
    점프중 = false;
    점프timer = 0;
  }

  dino.draw();
}

프레임마다실행할함수();

//충돌확인기능

function 충동하냐(dino, cactus) {
  var x축차이 = cactus.x - (dino.x + dino.width);
  var y축차이 = cactus.y - (dino.y + dino.height);
  if (x축차이 < 0 && y축차이 < 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //캔버스 완전 초기화!
    cancelAnimationFrame(animation); //게임중단(애니메이션 종료)
  }
}

var 점프중 = false;

/**
 * 스페이스바 누르면 점프
 */
document.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    점프중 = true;
  }
});
