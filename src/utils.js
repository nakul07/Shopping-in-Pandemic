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
function getItems(noOfItems) {
  let newItems = [];

  for (let i = 0; i < noOfItems; i++) {
    let x = getRandom(10, 880);
    let y = getRandom(10, 580);
    newItems.push(new Components(x, y, "items", "blue"));
  }

  return newItems;
}

//get opponents
function getOpponents(number) {
  let newOpponents = [];
  let xCoordinates = [200, 500];
  let yCoordinates = [100, 400];
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
  let xCoordinates = [280, 800, 150];
  let yCoordinates = [260, 200, 0];
  let widths = [400, 20, 20];
  let heights = [20, 400, 400];
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

function textDisplay(x, y, text, topic) {
  animationArea.context.font = "20px Comic Sans MS";
  animationArea.context.fillText(text + " : " + topic, x, y);
}
