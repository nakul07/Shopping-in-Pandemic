let player;
let opponents1;
let opponents2;
let obstacles1;
let obstacles2;
let obstacles3;
let items;
let stat;
function startAnimation() {
  player = new Components(70, 575, "player", "red", 50, 50);
  opponents1 = new Components(200, 100, "opponents", "blue", 50, 50);
  opponents2 = new Components(500, 400, "opponents", "blue", 50, 50);
  obstacles1 = new Components(280, 260, "obstacles", "black", 400, 20);
  obstacles2 = new Components(800, 200, "obstacles", "black", 20, 400);
  obstacles3 = new Components(150, 0, "obstacles", "black", 20, 400);
  animationArea.start();
}

let animationArea = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = 1000;
    this.canvas.height = 600;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
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
  opponents1.moveOpponentsXaxis();
  opponents2.moveOpponentsYaxis();
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
function collisionDetection(player, obstacles) {
  let playerLeft = player.x;
  let playerTop = player.y;
  let playerRight = player.x + player.width;
  let playerBtm = player.y + player.height;
  let obstacleLeft = obstacles.x;
  let obstacleTop = obstacles.y;
  // let obstacleLeft;
  // let obstacleTop;
  // let obstacleRight;
  // let obstacleBtm;
  // if (obstacleType == "wall") {
  //not needed when image is placed in place of circles
  let obstacleRight = obstacles.x + obstacles.width;
  let obstacleBtm = obstacles.y + obstacles.height;
  // obstacleLeft = obstacles.x;
  // obstacleTop = obstacles.y;
  // } else if (obstacleType == "opp") {
  //   obstacleRight = obstacles.x + obstacles.r;
  //   obstacleBtm = obstacles.y + obstacles.r;
  //   obstacleLeft = obstacles.x - obstacles.r;
  //   obstacleTop = obstacles.y - obstacles.r;
  // }
  let collision = true;

  if (
    playerBtm < obstacleTop ||
    playerTop > obstacleBtm ||
    playerRight < obstacleLeft ||
    playerLeft > obstacleRight
  ) {
    collision = false;
  }
  return collision;
}
