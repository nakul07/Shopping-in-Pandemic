let player;
let follower;
let entryDoor;
let exitDoor;
let obstacles = [];
let items = [];
let opponents = [];
let stat;
let health = 5;
let itemsLeft = 5;
function startAnimation() {
  entryDoor = new Doors(45, 550, "assets/entry.png", 100, 60);
  exitDoor = new Doors(880, 540, "assets/exit.png", 100, 80);
  player = new Components(70, 575, "player", "red", 50, 50);
  follower = new Components(300, 400, "opponents", "blue", 50, 50);
  opponents = getOpponents(2);
  obstacles = getObstacles(3);
  items = getItems(itemsLeft);
  animationArea.start();
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

    this.interval = setInterval(updateAnimationArea, 16);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};

function updateAnimationArea() {
  animationArea.clear(); //clears everything on canvas
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

  follower.update();
  follower.follow();

  //opponent movement
  oppMovement();

  healthCalculator(); //calculates health
  textDisplay(880, 30, "Health", health); //displays health
  textDisplay(700, 30, "Items Left", itemsLeft); //displays number of remaining items

  //updates the items
  items.forEach((Components) => {
    Components.update();
  });

  collectItems(); //collects the items
  levelComplete();
}

//handle click
function handleClick(event) {
  if (event.keyCode == "37") {
    player.moveLeft();
  } else if (event.keyCode == "39") {
    player.moveRight();
  } else if (event.keyCode == "38") {
    player.moveTop();
  } else if (event.keyCode == "40") {
    player.moveBottom();
  }
}

//calculates health
function healthCalculator() {
  for (let i = 0; i < opponents.length; i++) {
    if (collisionDetection(player, opponents[i])) {
      health--;
      player.x = 70;
      player.y = 575;
    }
  }
  if (health == 0) {
    gameOver();
  }
}

//collects items
function collectItems() {
  for (let i = 0; i < items.length; i++) {
    if (calcDist(player.x, player.y, items[i].x, items[i].y) < 50) {
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
      console.log("missed sth");
    }
  }
}
