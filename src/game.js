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
  this.positionX = this.x;
  this.positionY = this.y;
  this.speed = 1;
  this.speedx = 1;
  this.speedy = 0;
  this.moveTurn = "x";
  this.imgIndex = 1;
  this.count = 0;
  //player images array
  this.playerImages = ["player-left.svg", "player-right.svg"];
  this.playerImagesD = ["playerleftdown.png", "playerrightdown.png"];
  this.playerImagesL = ["playerleftleft.png", "playerrightleft.png"];
  this.playerImagesR = ["playerleftright.png", "playerrightright.png"];
  //opponents images array
  this.oppImagesT = ["buyer1-left.svg", "buyer1-right.svg"];
  this.oppImagesR = ["buyer-left-right.png", "buyer-right-right.png"];
  this.oppImagesL = ["buyer-left-left.png", "buyer-right-left.png"];
  this.oppImagesD = ["buyer-left-down.png", "buyer-right-down.png"];

  this.img = document.createElement("img");
  this.interval = setInterval(() => {
    this.imgIndex = (this.imgIndex + 1) % 2;
  }, 400);
  this.isFollow = false;
  this.fSpeed = 1;
  this.minDistance = levels[currentLevel].followerRange;
  this.isMoving = false;
  this.isOppMoving = false;
  this.isPlayerDown = false;
  this.isOppDown = false;
  this.isPlayerTop = false;
  this.isOppTop = false;
  this.isPlayerRight = false;
  this.isOppRight = false;
  this.isPlayerLeft = false;
  this.isOppLeft = false;
  this.isMaskOn = false;

  //for follower
  this.oppCol = false;
  this.isFCollTop = false;
  this.isFCollBtm = false;
  this.isFCollRight = false;
  this.isFCollLeft = false;
  //update components
  this.update = function () {
    ctx = animationArea.context;
    ctx.fillStyle = this.color;

    //player update
    if (this.type == "player") {
      if (this.isMaskOn) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.x + 25, this.y + 25, 35, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
      }
      if (this.isPlayerDown) {
        if (!this.isMoving) {
          this.img.src = "assets/playerdown.png";
          ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } else {
          this.img.src = `assets/${this.playerImagesD[this.imgIndex]}`;
          ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
      } else if (this.isPlayerLeft) {
        if (!this.isMoving) {
          this.img.src = "assets/playerleft.png";
          ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } else {
          this.img.src = `assets/${this.playerImagesL[this.imgIndex]}`;
          ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
      } else if (this.isPlayerRight) {
        if (!this.isMoving) {
          this.img.src = "assets/playerright.png";
          ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } else {
          this.img.src = `assets/${this.playerImagesR[this.imgIndex]}`;
          ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
      } else {
        if (!this.isMoving) {
          this.img.src = "assets/player.svg";
          ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } else {
          this.img.src = `assets/${this.playerImages[this.imgIndex]}`;
          ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
      }

      // opponents update
    } else if (this.type == "opponents") {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(this.x + 25, this.y + 25, 35, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fill();
      if (this.isOppDown) {
        if (!this.isOppMoving) {
          this.img.src = "assets/opponent-down.png";
          ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } else {
          this.img.src = `assets/${this.oppImagesD[this.imgIndex]}`;
          ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
      } else if (this.isOppLeft) {
        if (!this.isOppMoving) {
          this.img.src = "assets/opponent-left.png";
          ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } else {
          this.img.src = `assets/${this.oppImagesL[this.imgIndex]}`;
          ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
      } else if (this.isOppTop) {
        if (!this.isOppMoving) {
          this.img.src = "assets/opponent-up.png";
          ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } else {
          this.img.src = `assets/${this.oppImagesT[this.imgIndex]}`;
          ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
      } else {
        // (this.isPlayerRight) {
        if (!this.isOppMoving) {
          this.img.src = "assets/opponent-right.png";
          ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } else {
          this.img.src = `assets/${this.oppImagesR[this.imgIndex]}`;
          ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
      }

      //obstacles update
    } else if (this.type == "obstacles") {
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  };

  //move left
  this.moveLeft = function () {
    if (this.x < 0) {
      return;
    }
    if (isCollLeft) return;
    this.isMoving = true;
    this.isPlayerLeft = true;
    this.x -= this.dx;
    footSteps.play();
    this.isPlayerDown = false;
    this.isPlayerRight = false;

    // playerPosY.push(this.y);
    // playerPosX.push(this.x);
  };

  //move right
  this.moveRight = function () {
    if (this.x > animationArea.canvas.width1 - (this.width + 3)) {
      return;
    }
    if (isCollRight) return;
    this.isMoving = true;
    this.isPlayerRight = true;
    this.x += this.dx;
    footSteps.play();
    this.isPlayerDown = false;
    this.isPlayerLeft = false;

    // playerPosY.push(this.y);
    // playerPosX.push(this.x);
  };

  //move top
  this.moveTop = function () {
    if (this.y < 0) {
      return;
    }
    if (isCollTop) return;
    this.isMoving = true;
    this.isPlayerTop = true;
    this.y -= this.dy;
    footSteps.play();
    this.isPlayerDown = false;
    this.isPlayerRight = false;
    this.isPlayerLeft = false;

    // playerPosY.push(this.y);
    // playerPosX.push(this.x);
  };

  //move bottom
  this.moveBottom = function () {
    if (this.y > animationArea.canvas.height - (this.height + 3)) {
      return;
    }
    if (isCollBtm) return;
    this.isMoving = true;
    this.isPlayerDown = true;
    this.y += this.dy;
    footSteps.play();
    this.isPlayerRight = false;
    this.isPlayerLeft = false;
    // playerPosY.push(this.y);
    // playerPosX.push(this.x);
  };

  // opponents movement
  this.moveOpponents = function (oppNo, left, right, top, btm) {
    this.isOppMoving = true;
    if (!collisionDetection(player, opponents[oppNo])) {
      // console.log('here...')
      if (Math.floor(Date.now() / 10) % 200 === 0) {
        if (this.moveTurn === "x") {
          this.speedy = 0;
          this.speedx = getRandom(0, 1);
          if (!this.speedx) this.speedx = -1;
          this.moveTurn = "y";
        } else {
          this.speedx = 0;
          this.speedy = getRandom(0, 1);
          if (!this.speedy) this.speedy = -1;
          this.moveTurn = "x";
        }
        // console.log(this.speedx, this.speedy);
      }

      if (this.x + this.speedx > left && this.x + this.speedx < right) {
        // console.log('inside...')
        this.x = this.x + this.speedx;
        this.changeAnimation();
      } else {
        if (this.moveTurn === "x") {
          this.speedy = 0;
          this.speedx = getRandom(0, 1);
          if (!this.speedx) this.speedx = -1;
          this.moveTurn = "y";
        } else {
          this.speedx = 0;
          this.speedy = getRandom(0, 1);
          if (!this.speedy) this.speedy = -1;
          this.moveTurn = "x";
        }
      }
      // console.log(this.btmPos1, this.topPos1);
      if (this.y + this.speedy > top && this.y + this.speedy < btm) {
        this.y = this.y + this.speedy;
        this.changeAnimation();
      } else {
        if (this.moveTurn === "x") {
          this.speedy = 0;
          this.speedx = getRandom(0, 1);
          if (!this.speedx) this.speedx = -1;
          this.moveTurn = "y";
        } else {
          this.speedx = 0;
          this.speedy = getRandom(0, 1);
          if (!this.speedy) this.speedy = -1;
          this.moveTurn = "x";
        }
      }
    }
  };
  this.changeAnimation = function () {
    if (this.speedx === 1) {
      console.log("moving right");
      this.isOppRight = true;
      this.isOppLeft = false;
      this.isOppTop = false;
      this.isOppDown = false;
    } else if (this.speedx === -1) {
      console.log("moving left");
      this.isOppRight = false;
      this.isOppLeft = true;
      this.isOppTop = false;
      this.isOppDown = false;
    }else if (this.speedy === 1) {
      console.log("moving btm");
      this.isOppRight = false;
      this.isOppLeft = false;
      this.isOppTop = false;
      this.isOppDown = true;
    } else if (this.speedy === -1){
      console.log("moving top");
      this.isOppRight = false;
      this.isOppLeft = false;
      this.isOppTop = true;
      this.isOppDown = false;
    }
  };
  //petroling opponents in x-axis
  // this.moveOpponentsXaxis = function () {
  //   this.isOppMoving = true;
  //   if (!collisionDetection(player, opponents[0])) {
  //     if (this.positionX >= this.rightPos) {
  //       this.speed = -this.speed;
  //       this.isOppLeft = true;
  //       this.isOppRight = false;
  //       // coughSound.play();
  //     } else if (this.positionX == this.leftPos) {
  //       this.speed = 1;
  //       this.isOppRight = true;
  //       this.isOppLeft = false;
  //     }

  //     this.positionX = this.positionX + this.speed;
  //     this.x = this.positionX;
  //   }
  // };

  //petroling opponents in y-axis
  // this.moveOpponentsYaxis = function () {
  //   this.isOppMoving = true;
  //   //this.isOppRight = false;
  //   if (!collisionDetection(player, opponents[1])) {
  //     if (this.positionY >= this.btmPos) {
  //       this.speed = -this.speed;
  //       this.isOppTop = true;
  //       this.isOppDown = false;
  //       // clearThroatSound.play();
  //     } else if (this.positionY == this.topPos) {
  //       this.speed = 1;
  //       this.isOppDown = true;
  //       this.isOppTop = false;
  //       // this.isOppRight = false;
  //       // this.isOppLeft = false;
  //     }

  //     this.positionY = this.positionY + this.speed;
  //     this.y = this.positionY;
  //   }
  // };

  this.follow = function () {
    this.isOppMoving = false;
    if (this.oppCol) return;

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
      this.isOppMoving = true;
      if (isPlayerRight) {
        if (!this.isFCollRight) {
          this.x += this.fSpeed;
          this.isOppRight = true;
          this.isOppDown = false;
          this.isOppLeft = false;
          this.isOppTop = false;
        } else {
          this.x -= this.fSpeed;
          this.isOppRight = false;
          this.isOppDown = false;
          this.isOppLeft = true;
          this.isOppTop = false;
        }
      } else if (isPlayerLeft) {
        if (!this.isFCollLeft) {
          this.x -= this.fSpeed;
          this.isOppRight = false;
          this.isOppDown = false;
          this.isOppLeft = true;
          this.isOppTop = false;
        } else {
          this.x += this.fSpeed;
          this.isOppRight = true;
          this.isOppDown = false;
          this.isOppLeft = false;
          this.isOppTop = false;
        }
      } else if (isPlayerTop) {
        if (!this.isFCollTop) {
          this.y -= this.fSpeed;
          this.isOppRight = false;
          this.isOppDown = false;
          this.isOppLeft = false;
          this.isOppTop = true;
        } else {
          this.y += this.fSpeed;
          this.isOppRight = false;
          this.isOppDown = true;
          this.isOppLeft = false;
          this.isOppTop = false;
        }
      } else if (isPlayerBottom) {
        if (!this.isFCollBtm) {
          this.y += this.fSpeed;
          this.isOppRight = false;
          this.isOppDown = true;
          this.isOppLeft = false;
          this.isOppTop = false;
        } else {
          this.y -= this.fSpeed;
          this.isOppRight = false;
          this.isOppDown = false;
          this.isOppLeft = false;
          this.isOppTop = true;
        }
      }
    } else {
      this.isOppMoving = false;
    }
  };

  //reset
  this.reset = function () {
    this.isMoving = false;
    isCollRight = false;
    isCollLeft = false;
    isCollTop = false;
    isCollBtm = false;
    this.oppCol = false;
    this.rotate = false;
    this.isFCollTop = false;
    this.isFCollBtm = false;
    this.isFCollRight = false;
    this.isFCollLeft = false;
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
