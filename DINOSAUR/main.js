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
var cactus = new Cactus();
cactus.draw();

/**
 * 1초에 60번 코드 실행하기
 */
function 프레임마다실행할함수() {
  requestAnimationFrame(프레임마다실행할함수);
  //TOBE 실행할 것 적기

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  dino.x++;
  dino.draw();
}
프레임마다실행할함수();
