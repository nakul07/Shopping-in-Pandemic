let player;
let entryDoor;
let exitDoor;
let floor;
let follower = [];
let obstacles = [];
let items = [];
let opponents = [];
let virus = [];
let shop;
let stat;
let health = 2;
let itemsLeft = 5;
let coins = 3;
let mask = 0;
let isCollLeft = false;
let isCollRight = false;
let isCollBtm = false;
let isCollTop = false;
let levels;
let currentLevel = 1; //level
let playerPosX = [];
let playerPosY = [];

function startAnimation() {
  // if (localStorage.getItem("currentLevel") !== null) {
  //   currentLevel = localStorage.getItem("currentLevel");
  // }
  fetch("src/data/levels.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      levels = data;
      floor = new Doors(0, 0, "assets/floor.jpg", 1000, 600);
      entryDoor = new Doors(45, 550, "assets/entry.png", 100, 60);
      shop = new Doors(
        levels[currentLevel].shopXCoordinates,
        levels[currentLevel].shopYCoordinates,
        "assets/mask.png",
        100,
        100
      );
      exitDoor = new Doors(880, 550, "assets/exit.png", 90, 50);
      player = new Components(70, 550, "player", "red", 50, 50);
      follower = getFollower(levels[currentLevel].followerNumber);
      opponents = getOpponents(2);
      obstacles = getObstacles(levels[currentLevel].obstacleNumber);
      items = getItems(itemsLeft);
      virus = getVirus(levels[currentLevel].virusNumber);
      animationArea.start();
    });
}

let animationArea = {
  container: document.getElementById("canvas-container"),
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = 1000;
    this.canvas.height = 600;
    this.context = this.canvas.getContext("2d");
    this.container.append(this.canvas);
    document.body.addEventListener("keydown", handleClick);
    document.body.addEventListener("keyup", handleClick1);

    this.interval = setInterval(updateAnimationArea, 16.67);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};

function updateAnimationArea() {
  animationArea.clear(); //clears everything on canvas
  floor.update();
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

  healthCalculator(); //calculates health
  textDisplay(885, 30, "Health", health, "black"); //displays health
  textDisplay(725, 30, "Items Left", itemsLeft, "black"); //displays number of remaining items
  textDisplay(620, 30, "Coins", coins, "black"); //displays coins
  textDisplay(520, 30, "Mask", mask, "black"); //displays mask
  textDisplay(420, 30, "Level", currentLevel, "black"); //displayes level

  // updates the items
  items.forEach((Items) => {
    Items.update();
  });
  checksCollision();
  checksOppCol();
  checksObsCol();
  collectItems(); //collects the items
  levelComplete();
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
  } else if (
    event.keyCode == "32" &&
    coins >= 5 &&
    collisionDetection(player, shop)
  ) {
    mask++;
    coins = coins - 5;
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

          player.x = 70;
          player.y = 550; //reset player's position
        }
      }
    }
  }
  if (health <= 0) {
    health = 0;
    gameOver();
  }
}

//collects items
function collectItems() {
  for (let i = 0; i < items.length; i++) {
    if (calcDist(player.x, player.y, items[i].x, items[i].y) < 40) {
      destruct(i);
      itemsLeft--;
    }
  }
}

//moves the opponents
function oppMovement() {
  opponents[0].moveOpponentsXaxis();
  opponents[1].moveOpponentsYaxis();
}

//detects completion of level
function levelComplete() {
  if (collisionDetection(player, exitDoor)) {
    if (itemsLeft == 0) {
      levelCompleted();
    } else {
      textDisplay(835, 475, "Collect all Items ", itemsLeft, "red");
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
