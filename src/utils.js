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
    newItems.push(
      new Components(getRandom(10, 880), getRandom(10, 580), "items", "blue")
    );
  }

  return newItems;
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
