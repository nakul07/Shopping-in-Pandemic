function Components(x, y, type, color, width, height) {
  this.type = type;
  this.color = color;
  this.height = height;
  this.width = width;
  this.x = x;
  this.y = y;
  this.r = 20;
  this.dx = 5;
  this.dy = 5;
  this.collided = false;
  this.position = this.x;
  this.speed = 1;
  this.leftPos = 200;
  this.rightPos = 600;
  this.topPos = 400;
  this.btmPos = 550;
  this.img = document.createElement("img");
  this.isFollow = false;
  this.followerSpeed = 0.3;
  //update components
  this.update = function () {
    ctx = animationArea.context;
    ctx.fillStyle = this.color;
    if (this.type == "player") {
      this.img.src = "assets/player.svg";
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } else if (this.type == "opponents") {
      this.img.src = "assets/buyer1-left.svg";
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
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
      if (this.x > 0) {
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
      if (this.x < animationArea.canvas.width - (this.width + 3)) {
        this.x += this.dx;
      }
    } else {
      // this.collided = false;
      stat = false;
    }
  };

  //move top
  this.moveTop = function () {
    if (this.y > 0) {
      this.y -= this.dy;
    }
  };

  //move bottom
  this.moveBottom = function () {
    if (this.y < animationArea.canvas.height - (this.height + 3)) {
      this.y += this.dy;
    }
  }; // ball.style.top = position + "px";

  this.moveOpponentsXaxis = function () {
    if (!collisionDetection(player, opponents1)) {
      if (this.position >= this.rightPos) {
        this.speed = -this.speed;
      } else if (this.position == this.leftPos) {
        this.speed = 1;
      }

      this.position = this.position + this.speed;
      this.x = this.position;
    }
  };
  this.moveOpponentsYaxis = function () {
    if (!collisionDetection(player, opponents2)) {
      if (this.position >= this.btmPos) {
        this.speed = -this.speed;
      } else if (this.position == this.topPos) {
        this.speed = 1;
      }

      this.position = this.position + this.speed;
      this.y = this.position;
    }
    //  console.log(this.position);
  };
  this.follow = function () {
    // if (calcDist(player.x, player.y, this.x, this.y) < 80) {
    //   this.isFollow = true;
    // } else {
    //   this.isFollow = false;
    // }
    // if(this.isFollow){
    //   this.x = player.x -60;
    //   this.y = player.y -60
    // }
    setInterval(() => {
      if (calcDist(player.x, player.y, this.x, this.y) < 80) {
        this.x = player.x - 50;
        this.y = player.y - 50;
      }
    }, 5000);
  };
}
