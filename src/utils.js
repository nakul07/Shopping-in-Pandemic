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
  let possilbeItems = [
    "assets/items/honey.svg",
    "assets/items/carrot.svg",
    "assets/items/milk.svg",
    "assets/items/paper.svg",
    "assets/items/tomato.svg",
    "assets/items/juice.svg",
    "assets/items/bread.svg",
  ];
  while (newBall.length < noOfBalls) {
    balls = {};
    balls.randomItem =
      possilbeItems[Math.floor(Math.random() * possilbeItems.length)];

    balls.width = 40;
    balls.randomX = Math.floor(
      (950 - balls.width) * Math.random() + balls.width
    ); //(max-min)+min max= width
    balls.randomY = Math.floor(
      (500 - balls.width) * Math.random() + balls.width
    );

    for (let j = 0; j < newBall.length; j++) {
      let otherBall = newBall[j];

      let distance = calcDist(
        balls.randomX,
        balls.randomY,
        otherBall.randomX,
        otherBall.randomY
      );

      if (distance < balls.width + otherBall.width) {
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
      new Items(newBall[i].randomX, newBall[i].randomY, newBall[i].randomItem)
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
