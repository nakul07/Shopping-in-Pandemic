function Components(x, y, type, color) {
  this.type = type;
  this.color = color;
  this.height = 500;
  this.x = x;
  this.y = y;
  this.r = 20;
  this.dx = 2;
  this.dy = 2;
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
      ctx.fillRect(this.x, this.y, 20, this.height);
    } else if (this.type == "items") {
      ctx.beginPath();
      ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fill();
    }
  };
  this.moveLeft = function(){
    
    this.x -= this.dx;
  }
  this.moveRight = function(){
    this.x += this.dx;
  }
  this.moveTop = function(){
    this.y -= this.dy;
  }
  this.moveBottom = function(){
    this.y += this.dy;
  }
}
