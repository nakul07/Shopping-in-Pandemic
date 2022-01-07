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
  this.leftPos = 200;
  this.rightPos = 600;
  this.topPos = 300;
  this.btmPos = 550;
  this.img = document.createElement("img");
  this.isFollow = false;
  this.fSpeed = 1;
  this.minDistance = 200;

  //update components
  this.update = function () {
    ctx = animationArea.context;
    ctx.fillStyle = this.color;
    if (this.type == "player") {
      this.img.src = "assets/player.svg";
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
      // console.log(this.x + "annnd"+ this.y);
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
    for (let i = 0; i < obstacles.length; i++) {
      if (this.x > 0 && collide(player, obstacles[i]) != "right") {
        this.x -= this.dx;
      }
      // console.log(collide(player, obstacles[i]));
    }
  };

  //move right
  this.moveRight = function () {
    for (let i = 0; i < obstacles.length; i++) {
      if (
        this.x < animationArea.canvas.width - (this.width + 3) &&
        collide(player, obstacles[i]) != "left"
      ) {
        this.x += this.dx;
      }
      // console.log(collide(player, obstacles[i]));
    }
  };

  //move top
  this.moveTop = function () {
    for (let i = 0; i < obstacles.length; i++) {
      if (this.y > 0 && collide(player, obstacles[i]) != "bottom") {
        this.y -= this.dy;
      }
    }
  };

  //move bottom
  this.moveBottom = function () {
    for (let i = 0; i < obstacles.length; i++) {
      if (
        this.y < animationArea.canvas.height - (this.height + 3) &&
        collide(player, obstacles[i]) != "top"
      ) {
        this.y += this.dy;
      }
    }
  };

  this.moveOpponentsXaxis = function () {
    if (!collisionDetection(player, opponents[0])) {
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
    if (!collisionDetection(player, opponents[1])) {
      if (this.position >= this.btmPos) {
        this.speed = -this.speed;
      } else if (this.position == this.topPos) {
        this.speed = 1;
      }

      this.position = this.position + this.speed;
      this.y = this.position;
    }
  };

  this.follow = function () {
    let isPlayerLeft = false;
    let isPlayerRight = false;
    let isPlayerTop = false;
    let isPlayerBottom = false;

    if (player.x > this.x) {
      isPlayerRight = true;
    } else if (player.x < this.x) {
      isPlayerLeft = true;
    }

    if (player.y < this.y) {
      isPlayerTop = true;
    } else if (player.y > this.y) {
      isPlayerBottom = true;
    }

    if (calcDist(player.x, player.y, this.x, this.y) < this.minDistance) {
      if (isPlayerRight) {
        this.x += this.fSpeed;
      } else if (isPlayerLeft) {
        this.x -= this.fSpeed;
      } else if (isPlayerTop) {
        this.y -= this.fSpeed;
      } else if (isPlayerBottom) {
        this.y += this.fSpeed;
      }
    }
  };
}

//for entry , exit and background
function Doors(x, y, imgSrc, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.imgSrc = imgSrc;
  this.img = document.createElement("img");
  this.update = function () {
    ctx = animationArea.context;
    this.img.src = this.imgSrc;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  };
}
