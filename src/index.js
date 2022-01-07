let player;
let opponents1;
let opponents2;
let obstacles1;
let obstacles2;
let obstacles3;
let follower;
let items = [];
let stat;
let health = 5;
let itemsLeft = 5;
function startAnimation() {
  player = new Components(70, 575, "player", "red", 50, 50);
  opponents1 = new Components(200, 100, "opponents", "blue", 50, 50);
  opponents2 = new Components(500, 400, "opponents", "blue", 50, 50);
  follower = new Components(300, 400, "opponents", "blue", 50, 50);
  obstacles1 = new Components(280, 260, "obstacles", "black", 400, 20);
  obstacles2 = new Components(800, 200, "obstacles", "black", 20, 400);
  obstacles3 = new Components(150, 0, "obstacles", "black", 20, 400);
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
  animationArea.clear();
  player.update();
  opponents1.update();
  opponents2.update();
  obstacles1.update();
  obstacles2.update();
  obstacles3.update();
  follower.update();
  opponents1.moveOpponentsXaxis();
  opponents2.moveOpponentsYaxis();
  follower.follow();
  healthCalculator();
  textDisplay(880, 30, "Health", health);
  textDisplay(700,30,"Items Left",itemsLeft)
  items.forEach((Components) => {
    Components.update();
  });
  collectItems();
  stat = collisionDetection(player, obstacles3);
}

//handle click
function handleClick(event) {
  // player.status = collisionDetection(player, obstacles3);
  if (event.keyCode == "37") {
    // } else if(obstacleType == "opp"){
    //   obstacleRight = obstacles.x + obstacles.r;
    //   obstacleBtm = obstacles.y + obstacles.r;
    // }
    player.moveLeft();
  } else if (event.keyCode == "39") {
    player.moveRight();
  } else if (event.keyCode == "38") {
    player.moveTop();
  } else if (event.keyCode == "40") {
    player.moveBottom();
  }
}

function healthCalculator() {
  if (collisionDetection(player, opponents1)) {
    health--;
    player.x = 70;
    player.y = 575;
    //console.log(health);
  }
  if (health == 0) {
    //console.log("game over");
    gameOver();
  }
}


function collectItems() {
  for (let i = 0; i < items.length; i++) {
    if (calcDist(player.x, player.y, items[i].x, items[i].y) < 50) {
      destruct(i);
      itemsLeft --;
     // console.log(calcDist(player.x, player.y, items[i].x, items[i].y));
    }
  }
}
