//import {Components, Doors} from   "game.js";

let player;
let entryDoor;
let exitDoor;
let floor;
let dashBoard;
let follower = [];
let obstacles = [];
let items = [];
let opponents = [];
let virus = [];
let shop;
let stat;
let health = 2;
let itemsLeft = 5;
let coins = 5;
let mask = 0;
let isCollLeft = false;
let isCollRight = false;
let isCollBtm = false;
let isCollTop = false;
let levels;
//let currentLevel = 1; //level
let playerPosX = [];
let playerPosY = [];
let audioControl;
let audioControlSrc;
let isMuted = false;

//sounds
let pointSound;
let winSound;
let lossSound;
let illegalsound;
let coughSound;
let lifeSound;
let clearThroatSound;
let footSteps;
let backgroundSound;
let soundA;
let soundB;

function startAnimation() {
  if (localStorage.getItem("currentLevel") !== null) {
    currentLevel = localStorage.getItem("currentLevel");
  } else {
    currentLevel = 1;
  }
  if (isMuted) {
    audioControlSrc = "assets/soff.png";
  } else {
    audioControlSrc = "assets/son.png";
  }
  fetch("src/data/levels.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      levels = data;
      floor = new Doors(0, 0, "assets/floor.jpg", 1000, 600);
      dashBoard = new Doors(1000, 0, "assets/dashboard.jpg", 200, 600);
      entryDoor = new Doors(45, 550, "assets/entry.png", 100, 60);
      shop = new Doors(
        levels[currentLevel].shopXCoordinates,
        levels[currentLevel].shopYCoordinates,
        "assets/mask.png",
        100,
        100
      );
      exitDoor = new Doors(880, 550, "assets/exit.png", 90, 50);
      player = new Components(
        70,
        550,
        "player",
        `rgba(52, 224, 2, 0.5)`,
        50,
        50
      );
      follower = getFollower(levels[currentLevel].followerNumber);
      opponents = getOpponents(levels[currentLevel].noOpp);
      obstacles = getObstacles(levels[currentLevel].obstacleNumber);
      items = getItems(itemsLeft);
      virus = getVirus(levels[currentLevel].virusNumber);
      audioControl = new SoundControl(1060, 50, audioControlSrc);

      pointSound = new Sound("assets/audio/point.mp3");
      winSound = new Sound("assets/audio/win.mp3");
      lossSound = new Sound("assets/audio/loss.mp3");
      illegalsound = new Sound("assets/audio/illegal.mp3");
      backgroundSound = new Sound("assets/audio/background.mp3");
      coughSound = new Sound("assets/audio/cough-female602.mp3");
      lifeSound = new Sound("assets/audio/life.mp3");
      clearThroatSound = new Sound("assets/audio/clearing-throat-female.mp3");
      footSteps = new Sound("assets/audio/footsteps2.mp3");

      soundA = setInterval(() => {
        clearThroatSound.play();
        setTimeout(() => {
          clearThroatSound.stop();
        }, 2000);
      }, 9000);
      soundB = setInterval(() => {
        coughSound.play();
        setTimeout(() => {
          coughSound.stop();
        }, 2000);
      }, 12000);
      animationArea.start();
    });
}

let animationArea = {
  container: document.getElementById("canvas-container"),
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = 1200;
    this.canvas.width1 = 1000;
    this.canvas.height = 600;
    this.context = this.canvas.getContext("2d");
    this.container.append(this.canvas);
    document.body.addEventListener("keydown", handleClick);
    document.body.addEventListener("keyup", handleClick1);
    document.body.addEventListener("mousedown", handleClick2);
    document.body.addEventListener("mousemove", handleClick3);

    this.interval = setInterval(updateAnimationArea, 16.67);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};

function updateAnimationArea() {
  animationArea.clear(); //clears everything on canvas
  floor.update();
  dashBoard.update();
  shop.update();
  entryDoor.update();
  exitDoor.update();
  player.update(); // updates the player

  //updates the opponents
  opponents.forEach((Components) => {
    Components.update();
  });

  //updates the obstacles
  obstacles.forEach((Components) => {
    Components.update();
  });

  //update the followers
  follower.forEach((Components) => {
    Components.update();
    Components.follow();
  });

  //updates the virus
  virus.forEach((Virus) => {
    Virus.update();
  });

  //opponent movement
  oppMovement();

  //audio icons update
  audioControl.update();

  healthCalculator(); //calculates health
  textDisplay(1020, 200, "Level", currentLevel, "black"); //displayes level
  textDisplay(1020, 250, "Health", health, "black"); //displays health
  textDisplay(1020, 300, "Items Left", itemsLeft, "black"); //displays number of remaining items
  textDisplay(1020, 350, "Coins", coins, "black"); //displays coins
  textDisplay(1020, 400, "Mask", mask, "black"); //displays mask

  // updates the items
  items.forEach((Items) => {
    Items.update();
  });

  checksCollision();
  checksOppCol();
  checksObsCol();
  collectItems(); //collects the items
  levelComplete();
  playSoundInInterval();
  maskIndicator();
}

//handle click
function handleClick(event) {
  if (event.keyCode == "37") {
    player.moveLeft();
    //player.isMoving = true;
    // moveLeft();
  } else if (event.keyCode == "39") {
    player.moveRight();
  } else if (event.keyCode == "38") {
    player.moveTop();
  } else if (event.keyCode == "40") {
    player.moveBottom();
  } else if (event.keyCode == "32") {
    if (coins >= 5 && collisionDetection(player, shop)) {
      pointSound.play();
      mask++;
      coins = coins - 5;
    } else {
      illegalsound.play();
    }
  }
}
function handleClick1(event) {
  if ((event.keyCode == "38", "39", "40", "37")) {
    player.reset();
    for (let i = 0; i < follower.length; i++) {
      follower[i].reset();
    }
  }
}

//calculates health and game over
function healthCalculator() {
  for (let i = 0; i < opponents.length; i++) {
    for (let j = 0; j < follower.length; j++) {
      for (let k = 0; k < virus.length; k++) {
        if (
          collisionDetection(player, opponents[i]) ||
          collisionDetection(player, follower[j]) ||
          collisionDetection(player, virus[k])
        ) {
          if (mask != 0) {
            mask--;
          } else {
            health--;
          }
          if (health !== 0) {
            lifeSound.play();
          }

          player.x = 70;
          player.y = 550; //reset player's position
        }
      }
    }
  }
  if (health <= 0) {
    health = 0;
    gameOver();
    lossSound.play();
  }
}

//collects items
function collectItems() {
  for (let i = 0; i < items.length; i++) {
    if (calcDist(player.x, player.y, items[i].x, items[i].y) < 40) {
      destruct(i);
      itemsLeft--;
      pointSound.play();
    }
  }
}

//moves the opponents
function oppMovement() {
  for (let i = 0; i < levels[currentLevel].noOpp; i++) {
    opponents[i].moveOpponents(
      i,
      levels[currentLevel].opponentLeftPosition[i],
      levels[currentLevel].opponentRightPosition[i],
      levels[currentLevel].opponentTopPosition[i],
      levels[currentLevel].opponentBtmPosition[i]
    );
  }
}

//detects completion of level
function levelComplete() {
  if (collisionDetection(player, exitDoor)) {
    if (itemsLeft == 0) {
      levelCompleted();
      winSound.play();
    } else {
      textDisplay(835, 475, "Collect all Items ", itemsLeft, "red");
      illegalsound.play();
    }
  }
}

function checksCollision() {
  for (let i = 0; i < obstacles.length; i++) {
    if (collide(player, obstacles[i]) === "right") {
      isCollLeft = true;
    } else if (collide(player, obstacles[i]) === "left") {
      isCollRight = true;
    } else if (collide(player, obstacles[i]) === "top") {
      isCollBtm = true;
    } else if (collide(player, obstacles[i]) === "bottom") {
      isCollTop = true;
    }
  }
}

function checksOppCol() {
  for (let i = 0; i < opponents.length; i++) {
    for (let j = 0; j < follower.length; j++) {
      if (
        collide(follower[j], opponents[i]) === "right" ||
        collide(follower[j], opponents[i]) === "left" ||
        collide(follower[j], opponents[i]) === "top" ||
        collide(follower[j], opponents[i]) === "bottom"
      ) {
        follower[j].oppCol = true;
      }
    }
  }
}
function checksObsCol() {
  for (let i = 0; i < obstacles.length; i++) {
    for (let j = 0; j < follower.length; j++) {
      if (collide(follower[j], obstacles[i]) === "right") {
        follower[j].isFCollLeft = true;
      } else if (collide(follower[j], obstacles[i]) === "left") {
        follower[j].isFCollRight = true;
      } else if (collide(follower[j], obstacles[i]) === "top") {
        follower[j].isFCollBtm = true;
      } else if (collide(follower[j], obstacles[i]) === "bottom") {
        follower[j].isFCollTop = true;
      }
    }
  }
}

function playSoundInInterval() {
  backgroundSound.play();
}

function handleClick2(event) {
  click.play();
  if (
    event.offsetX > audioControl.x &&
    event.offsetX < audioControl.x + audioControl.width &&
    event.offsetY > audioControl.y &&
    event.offsetY < audioControl.y + audioControl.height
  ) {
    if (!isMuted) {
      isMuted = true;
      backgroundSound.stop();
      audioControl.img.src = "assets/soff.png";
    } else if (isMuted) {
      isMuted = false;
      audioControl.img.src = "assets/son.png";
    }
  }
}

function handleClick3(event) {
  if (
    event.offsetX > audioControl.x &&
    event.offsetX < audioControl.x + audioControl.width &&
    event.offsetY > audioControl.y &&
    event.offsetY < audioControl.y + audioControl.height
  ) {
    animationArea.canvas.style.cursor = "pointer";
  } else {
    animationArea.canvas.style.cursor = "default";
  }
}

function maskIndicator() {
  if (mask > 0) {
    player.isMaskOn = true;
  } else {
    player.isMaskOn = false;
  }
}
