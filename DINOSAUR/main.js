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

/**
 * (참고) 실행횟수는 모니터 FPS에 따라 다름!!!!!
 */
function 프레임마다실행할함수() {
  requestAnimationFrame(프레임마다실행할함수);
  timer++;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (timer % 144 === 0) {
    //144프레임마다. 즉, 컴퓨터에 설정에 맞게 1초마다 설정!
    // 장애물을 생성!
    var cactus = new Cactus();
    cactus여러개.push(cactus);
  }

  cactus여러개.forEach((a) => {
    a.x--;
    a.draw();
  });

  dino.draw();
}

프레임마다실행할함수();
