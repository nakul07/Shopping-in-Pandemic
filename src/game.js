function Components(x, y, type, color, width, height) {
  this.type = type;
  this.color = color;
  this.height = height;
  this.width = width;
  this.x = x;
  this.y = y;
  this.r = 20;
  this.dx = 3;
  this.dy = 3;
  this.collided = false;
  this.position = this.x;
  this.speed = 1;
  this.leftPos = 100;
  this.rightPos = 600;
  this.topPos = 400;
  this.btmPos = 550;
  //update components
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

  //move left
  this.moveLeft = function () {
    if (!stat) {
      //this.status = collisionDetection(player, obstacles3);
      if (this.x > this.r + 3) {
        this.x -= this.dx;
      }
    } else {
      stat = false;
      //this.collided = false;
      // console.log(this.collided);
    }
  };

  //move right
  this.moveRight = function () {
    if (!stat) {
      // this.status = collisionDetection(player, obstacles3);
      if (this.x < animationArea.canvas.width - (this.r + 3)) {
        this.x += this.dx;
      }
    } else {
      // this.collided = false;
      stat = false;
    }
  };

  //move top
  this.moveTop = function () {
    if (this.y > this.r + 3) {
      this.y -= this.dy;
    }
  };

  //move bottom
  this.moveBottom = function () {
    if (this.y < animationArea.canvas.height - (this.r + 3)) {
      this.y += this.dy;
    }
  };// ball.style.top = position + "px";

  this.moveOpponentsXaxis = function () {
    if (this.position >=  this.rightPos) {
      this.speed = -this.speed;
    } else if (this.position == this.leftPos) {
      this.speed = 1;
    }

    this.position = this.position + this.speed;
    this.x = this.position;
  };
  this.moveOpponentsYaxis = function () {
    if (this.position >=  this.btmPos) {
      this.speed = -this.speed;
    } else if (this.position == this.topPos) {
      this.speed = 1;
    }

    this.position = this.position + this.speed;
    this.y = this.position;
  //  console.log(this.position);
  };
}
