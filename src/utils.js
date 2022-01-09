function calcDist(x1, y1, x2, y2) {
  let dx = x2 - x1;
  let dy = y2 - y1;
  let distance = Math.sqrt(dx * dx + dy * dy);
  return distance;
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

//collision detection
function collisionDetection(player, obstacles) {
  let playerLeft = player.x;
  let playerTop = player.y;
  let playerRight = player.x + player.width;
  let playerBtm = player.y + player.height;
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
}

//get items
function getItems(noOfBalls) {
  let newBall = [];
  let exportBall = [];
  let overlapping = false;
  let possilbeColors = [
    "blue",
    "green",
    "red",
    "orange",
    "yellow",
    "purple",
    "pink",
  ];
  while (newBall.length < noOfBalls) {
    balls = {};
    balls.randomColor =
      possilbeColors[Math.floor(Math.random() * possilbeColors.length)];

    balls.randomRadius = 10;
    balls.randomX = Math.floor(
      (950 - balls.randomRadius) * Math.random() + balls.randomRadius
    ); //(max-min)+min max= width
    balls.randomY = Math.floor(
      (500 - balls.randomRadius) * Math.random() + balls.randomRadius
    );

    for (let j = 0; j < newBall.length; j++) {
      var otherBall = newBall[j];

      var dx1 =
        balls.randomX +
        balls.randomRadius -
        (otherBall.randomX + otherBall.randomRadius);

      var dy1 =
        balls.randomY +
        balls.randomRadius -
        (otherBall.randomY + otherBall.randomRadius);
      var distance = Math.sqrt(dx1 * dx1 + dy1 * dy1);

      if (distance < balls.randomRadius + otherBall.randomRadius) {
        //overlapped
        overlapping = true;
        break;
      }
    }

    if (!overlapping) {
      newBall.push(balls);
    }
  }

  for (let i = 0; i < newBall.length; i++) {
    exportBall.push(
      new Components(
        newBall[i].randomX,
        newBall[i].randomY,
        "items",
        newBall[i].randomColor
      )
    );
  }

  return exportBall;
}

//get opponents
function getOpponents(number) {
  let newOpponents = [];
  let xCoordinates = levels[currentLevel].opponentXCoordinates;
  let yCoordinates = levels[currentLevel].opponentYCoordinates;
  for (let i = 0; i < number; i++) {
    newOpponents.push(
      new Components(
        xCoordinates[i],
        yCoordinates[i],
        "opponents",
        "blue",
        50,
        50
      )
    );
  }
  return newOpponents;
}

//get obstacles
function getObstacles(number) {
  let newObstacles = [];
  let xCoordinates = levels[currentLevel].obstacleXCoordinates;
  let yCoordinates = levels[currentLevel].obstacleYCoordinates;
  let widths = levels[currentLevel].obstacleWidths;
  let heights = levels[currentLevel].obstacleHeights;
  for (let i = 0; i < number; i++) {
    newObstacles.push(
      new Components(
        xCoordinates[i],
        yCoordinates[i],
        "obstacles",
        "black",
        widths[i],
        heights[i]
      )
    );
  }
  return newObstacles;
}
//destruct the items
const destruct = (Components) => {
  const updatedItems = items.filter((items, index) => Components !== index);
  items = updatedItems;
};

//display texts
function textDisplay(x, y, text, topic, color) {
  animationArea.context.fillStyle = color;
  animationArea.context.font = "20px Comic Sans MS";
  animationArea.context.fillText(text + " : " + topic, x, y);
}

//checks collision along with directions
function collide(player, obstacles) {
  let dx = player.x + player.width / 2 - (obstacles.x + obstacles.width / 2);
  let dy = player.y + player.height / 2 - (obstacles.y + obstacles.height / 2);
  let width = (player.width + obstacles.width) / 2;
  let height = (player.height + obstacles.height) / 2;
  let crossWidth = width * dy;
  let crossHeight = height * dx;
  let collision = "none";
  //
  if (Math.abs(dx) <= width && Math.abs(dy) <= height) {
    if (crossWidth > crossHeight) {
      collision = crossWidth > -crossHeight ? "bottom" : "left";
    } else {
      collision = crossWidth > -crossHeight ? "right" : "top";
    }
  }
  return collision;
}
