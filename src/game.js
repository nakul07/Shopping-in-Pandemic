function Components(x, y, type, color, width , height) {
  this.type = type;
  this.color = color;
  this.height = height;
  this.width = width;
  this.x = x;
  this.y = y;
  this.r = 20;
  this.dx = 3;
  this.dy = 3;
  this.update = function () {
    ctx = animationArea.context;
    ctx.fillStyle = this.color;
    if (this.type == "player") {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fill();
    } else if (this.type == "opponents") {
      ctx.beginPath();
      ctx.arc(this.x + 100, this.y, this.r, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fill();
    } else if (this.type == "obstacles") {
      ctx.fillRect(this.x, this.y, this.width, this.height);
    } else if (this.type == "items") {
      ctx.beginPath();
      ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fill();
    }
  };
  this.moveLeft = function () {
    if (this.x > this.r+3) {
      this.x -= this.dx;
    }
  };
  this.moveRight = function () {
    if (this.x < animationArea.canvas.width - (this.r+3)) {
      this.x += this.dx;
    }
  };
  this.moveTop = function () {
    if (this.y > this.r+3) {
      this.y -= this.dy;
     
    }
  };
  this.moveBottom = function () {
    if (this.y < animationArea.canvas.height - (this.r+3)) {
      this.y += this.dy;
    }
  };
}
