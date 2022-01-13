/**
 * to calculate distance between two points
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @returns distance between two points
 */
function calcDist(x1, y1, x2, y2) {
  let dx = x2 - x1;
  let dy = y2 - y1;
  let distance = Math.sqrt(dx * dx + dy * dy);
  return distance;
}

/**
 * random number between max and min
 * @param {number} min
 * @param {number} max
 * @returns random number
 */
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * collision detection between two objects
 * @param {object} player
 * @param {object} obstacles
 * @returns collision true or false
 */
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

/**
 * to delete the objects
 * @param {object} Components
 */
const destruct = (Components) => {
  const updatedItems = items.filter((items, index) => Components !== index);
  items = updatedItems;
};

/**
 * displays the text at desired position
 * @param {number} x
 * @param {number} y
 * @param {string} text
 * @param {any} topic
 * @param {string} color
 */
function textDisplay(x, y, text, topic, color) {
  animationArea.context.fillStyle = color;
  animationArea.context.textAlign = "left";
  animationArea.context.font = "25px Comic Sans MS";
  animationArea.context.fillText(text + " : " + topic, x, y);
}

/**
 * checks collision along with directions
 * @param {object} player
 * @param {object} obstacles
 * @returns side of collision
 */
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
