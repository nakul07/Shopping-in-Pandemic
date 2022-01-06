let player;
let opponents1;
let opponents2;
let obstacles1;
let obstacles2;
let obstacles3;
let items;
let stat;
function startAnimation() {
  player = new Components(80, 400, "player", "red");
  opponents1 = new Components(200, 100, "opponents", "blue");
  opponents2 = new Components(500, 400, "opponents", "blue");
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
  stat = collisionDetection(player, obstacles3);

}

//handle click
function handleClick(event) {
 // player.status = collisionDetection(player, obstacles3);
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
function collisionDetection(player, obstacles) {
  let playerLeft = player.x - player.r;
  let playerTop = player.y - player.r;
  let playerRight = player.x + player.r;
  let playerBtm = player.y + player.r;
  let obstacleLeft = obstacles.x;
  let obstacleTop = obstacles.y;
  let obstacleRight = obstacles.x + obstacles.width;
  let obstacleBtm = obstacles.y + obstacles.height;
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
  // if (playerBtm < obstacleTop) {
  //   collision = 1; //btn
  // } else if (playerTop > obstacleBtm) {
  //   collision = 2; //top
  // } else if (playerRight < obstacleLeft) {
  //   collision = 3; //right
  // } else if (playerLeft > obstacleRight) {
  //   collisionLeft = 4;
  // }
  // return collision;
}
