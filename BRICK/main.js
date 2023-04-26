var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");

canvas.id = "myCanvas";
canvas.width = 400;
canvas.height = 700;

//이제 HTML에 넣기
document.body.appendChild(canvas);

context.beginPath();
context.arc(50, 50, 10, 0, Math.PI * 2);
context.fillStyle = "#0095DD";
context.fill();
context.closePath();
