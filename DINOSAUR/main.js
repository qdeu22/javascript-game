var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

ctx.fillStyle = "green"; //초록색 네모
ctx.fillRect(10, 10, 100, 100); // 10,10 좌표에 100x100크기 생성
