function calcDist(x1, y1, x2, y2) {
  let dx = x2 - x1;
  let dy = y2 - y1;
  let distance = Math.sqrt(dx * dx + dy * dy);
  return distance;
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
