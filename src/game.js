function Components(x, y, type, color, width, height) {
  this.type = type;
  this.color = color;
  this.height = height;
  this.width = width;
  this.x = x;
  this.y = y;
  this.r = 20;
  this.dx = 4;
  this.dy = 4;
  this.collided = false;
  this.position = this.x;
  this.speed = 1;
  this.leftPos = 200;
  this.rightPos = 600;
  this.topPos = 300;
  this.btmPos = 550;
  this.imgIndex = 1;
  this.playerImages = ["player-left.svg", "player-right.svg"];
  this.img = document.createElement("img");
  this.interval = setInterval(() => {
    this.imgIndex = (this.imgIndex + 1) % 2;
  }, 400);
  this.isFollow = false;
  this.fSpeed = 1;
  this.minDistance = 350; // area of a follower
  this.isMoving = false;
  this.rotate = false;

  //update components
  this.update = function () {
    ctx = animationArea.context;
    ctx.fillStyle = this.color;

    //player update
    if (this.type == "player") {
      if (!this.isMoving) {
        this.img.src = "assets/player.svg";
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
      } else {
        this.img.src = `assets/${this.playerImages[this.imgIndex]}`;
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
      }

      // opponents update
    } else if (this.type == "opponents") {
      ctx.fillStyle = `rgba(0, 255, 255, 0.4)`;
      this.img.src = "assets/buyer1-left.svg";
      ctx.beginPath();
      ctx.arc(this.x + 25, this.y + 25, 35, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fill();
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

      //obstacles update
    } else if (this.type == "obstacles") {
      ctx.fillRect(this.x, this.y, this.width, this.height);

      //items update
    } else if (this.type == "items") {
      ctx.beginPath();
      ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fill();
    }
  };

  //move left
  this.moveLeft = function () {
    if (this.x < 0) {
      return;
    }
    if (isCollLeft) return;
    this.isMoving = true;
    this.x -= this.dx;
    isCollLeft = false;
  };

  //move right
  this.moveRight = function () {
    if (this.x > animationArea.canvas.width - (this.width + 3)) {
      return;
    }
    if (isCollRight) return;
    this.rotate = true;
    this.isMoving = true;
    this.x += this.dx;
  };

  //move top
  this.moveTop = function () {
    if (this.y < 0) {
      return;
    }
    if (isCollTop) return;
    this.isMoving = true;
    this.y -= this.dy;
  };

  //move bottom
  this.moveBottom = function () {
    if (this.y > animationArea.canvas.height - (this.height + 3)) {
      return;
    }
    if (isCollBtm) return;
    this.isMoving = true;
    this.y += this.dy;
  };

  //petroling opponents in x-axis
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

  //petroling opponents in y-axis
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
    if (oppCol) return;

    let isPlayerLeft = false;
    let isPlayerRight = false;
    let isPlayerTop = false;
    let isPlayerBottom = false;

    if (player.x > this.x) {
      isPlayerRight = true;
    } else if (player.x < this.x) {
      isPlayerLeft = true;
    } else if (player.y < this.y) {
      isPlayerTop = true;
    } else if (player.y > this.y) {
      isPlayerBottom = true;
    }

    if (calcDist(player.x, player.y, this.x, this.y) < this.minDistance) {
      if (isPlayerRight) {
        if (!isFCollRight) {
          this.x += this.fSpeed;
        } else {
          this.x -= this.fSpeed;
        }
      } else if (isPlayerLeft) {
        if (!isFCollLeft) {
          this.x -= this.fSpeed;
        } else {
          this.x += this.fSpeed;
        }
      } else if (isPlayerTop) {
        if (!isFCollTop) {
          this.y -= this.fSpeed;
        } else {
          this.y += this.fSpeed;
        }
      } else if (isPlayerBottom) {
        if (!isFCollBtm) {
          this.y += this.fSpeed;
        } else {
          this.y -= this.fSpeed;
        }
      }
    }
  };

  //reset
  this.reset = function () {
    this.isMoving = false;
    isCollRight = false;
    isCollLeft = false;
    isCollTop = false;
    isCollBtm = false;
    oppCol = false;
    this.rotate = false;
    isFCollTop = false;
    isFCollBtm = false;
    isFCollRight = false;
    isFCollLeft = false;
  };
}

//for entry, exit and background
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
