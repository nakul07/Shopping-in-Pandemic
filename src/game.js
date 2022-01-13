const fps = 60;

let timer = 0;
let gameTime;
let second;

let player;
let entryDoor;
let exitDoor;
let floor;
let dashBoard;
let follower = [];
let obstacles = [];
let items = [];
let opponents = [];
let virus = [];
let shop;
let stat;
let health = 2;
let itemsLeft = 6;
let coins = 5;
let mask = 0;
let levels;
let playerPosX = [];
let playerPosY = [];
let audioControl;
let audioControlSrc;
let isMuted = false;

//sounds
let pointSound;
let winSound;
let lossSound;
let illegalsound;
let coughSound;
let lifeSound;
let clearThroatSound;
let footSteps;
let backgroundSound;
let soundA; //cough sound
let soundB; //clear throat sound

// //for timer
// let gameTime = 60;
// let gameTimeInMs = 0;

/**
 * starts the game
 */
function startAnimation() {
  if (localStorage.getItem("currentLevel") !== null) {
    currentLevel = localStorage.getItem("currentLevel");
  } else {
    currentLevel = 1;
  }
  if (isMuted) {
    audioControlSrc = loadedImages.soundOff;
  } else {
    audioControlSrc = loadedImages.soundOn;
  }

  fetch("src/data/levels.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      levels = data;
      floor = new Entity(0, 0, loadedImages.floor, 1000, 600);
      dashBoard = new Entity(1000, 0, loadedImages.dashboard, 200, 600);
      entryDoor = new Entity(45, 550, loadedImages.entry, 100, 60);
      shop = new Entity(
        levels[currentLevel].shopXCoordinates,
        levels[currentLevel].shopYCoordinates,
        loadedImages.mask,
        100,
        100
      );
      exitDoor = new Entity(880, 550, loadedImages.exit, 90, 50);
      player = new Components(
        70,
        550,
        "player",
        `rgba(52, 224, 2, 0.5)`,
        50,
        50
      );
      follower = getFollower(levels[currentLevel].followerNumber);
      opponents = getOpponents(levels[currentLevel].noOpp);
      obstacles = getObstacles(levels[currentLevel].obstacleNumber);
      items = getItems(itemsLeft);
      virus = getVirus(levels[currentLevel].virusNumber);
      audioControl = new SoundControl(1070, 500, audioControlSrc);

      pointSound = new Sound("assets/audio/point.mp3");
      winSound = new Sound("assets/audio/win.mp3");
      lossSound = new Sound("assets/audio/loss.mp3");
      illegalsound = new Sound("assets/audio/illegal.mp3");
      backgroundSound = new Sound("assets/audio/background.mp3");
      coughSound = new Sound("assets/audio/cough-female602.mp3");
      lifeSound = new Sound("assets/audio/life.mp3");
      clearThroatSound = new Sound("assets/audio/clearing-throat-female.mp3");
      footSteps = new Sound("assets/audio/footsteps2.mp3");
      gameTime = levels[currentLevel].gameTime;

      soundA = setInterval(() => {
        clearThroatSound.play();
        setTimeout(() => {
          clearThroatSound.stop();
        }, 2000);
      }, 9000);
      soundB = setInterval(() => {
        coughSound.play();
        setTimeout(() => {
          coughSound.stop();
        }, 2000);
      }, 13000);

      animationArea.start();
    });
}

let animationArea = {
  container: document.getElementById("canvas-container"),
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = 1200;
    this.canvas.width1 = 1000;
    this.canvas.height = 600;
    this.context = this.canvas.getContext("2d");
    this.container.append(this.canvas);
    document.body.addEventListener("keydown", handleClick);
    document.body.addEventListener("keyup", handleClick1);
    document.body.addEventListener("mousedown", handleClick2);
    document.body.addEventListener("mousemove", handleClick3);

    this.interval = setInterval(updateAnimationArea, (1 / fps) * 1000);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};

/**
 * updates the games in each frame
 */
function updateAnimationArea() {
  animationArea.clear(); //clears everything on canvas
  floor.update();
  dashBoard.update();
  shop.update();
  entryDoor.update();
  exitDoor.update();
  player.update(); // updates the player

  //time
  timer += (1 / fps) * 1000;
  countdown(timer);
  displayTime();

  //updates the opponents
  opponents.forEach((Components) => {
    Components.update();
  });

  //updates the obstacles
  obstacles.forEach((Components) => {
    Components.update();
  });

  //update the followers
  follower.forEach((Components) => {
    Components.update();
    Components.follow();
  });

  //updates the virus
  virus.forEach((Virus) => {
    Virus.update();
  });

  //opponent movement
  oppMovement();

  //audio icons update
  audioControl.update();

  healthCalculator(); //calculates health
  textDisplay(1020, 200, "Level", currentLevel, "black"); //displayes level
  textDisplay(1020, 250, "Health", health, "black"); //displays health
  textDisplay(1020, 300, "Items Left", itemsLeft, "black"); //displays number of remaining items
  textDisplay(1020, 350, "Coins", coins, "black"); //displays coins
  textDisplay(1020, 400, "Mask", mask, "black"); //displays mask

  // updates the items
  items.forEach((Items) => {
    Items.update();
  });

  checksCollision();
  checksOppCol();
  checksObsCol();
  collectItems(); //collects the items
  levelComplete();
  playSoundInInterval();
  maskIndicator();
}

/**
 * getting opponents
 * @param {number} number number of opponents
 * @returns  array of opponents
 */
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
        `rgba(0, 255, 255, 0.4)`,
        50,
        50
      )
    );
  }
  return newOpponents;
}

/**
 * getting obstacles
 * @param {number} number of obstacle
 * @returns array of obstacles
 */
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

/**
 * getting followers
 * @param {number} number number of followers
 * @returns array of followers
 */
function getFollower(number) {
  let newFollower = [];
  let xCoordinates = levels[currentLevel].followerXCoordinates;
  let yCoordinates = levels[currentLevel].followerYCoordinates;
  for (let i = 0; i < number; i++) {
    newFollower.push(
      new Components(
        xCoordinates[i],
        yCoordinates[i],
        "opponents",
        `rgba(255, 0, 0, 0.5)`,
        50,
        50
      )
    );
  }
  return newFollower;
}

/**
 * getting virus
 * @param {number} number number of virus
 * @returns array of virus
 */
function getVirus(number) {
  let newVirus = [];
  let xCoordinates = levels[currentLevel].virusXCoordinates;
  let yCoordinates = levels[currentLevel].virusYCoordinates;
  for (let i = 0; i < number; i++) {
    newVirus.push(new Virus(xCoordinates[i], yCoordinates[i]));
  }
  return newVirus;
}

/**
 * getting items
 * @param {number} noOfBalls number of items
 * @returns array of items
 */
function getItems(noOfBalls) {
  //let newBall = [];
  let exportBall = [];
  //let overlapping = false;
  let possilbeItems = [
    loadedImages.i1,
    loadedImages.i2,
    loadedImages.i3,
    loadedImages.i4,
    loadedImages.i5,
    loadedImages.i6,
    loadedImages.i7,
    loadedImages.i8,
    loadedImages.i9,
    loadedImages.i10,
    loadedImages.i11,
  ];

  for (let i = 0; i < noOfBalls; i++) {
    let randomItem =
      possilbeItems[Math.floor(Math.random() * possilbeItems.length)];
    let randomX = Math.floor((950 - 40) * Math.random() + 40);
    let randomY = Math.floor((500 - 40) * Math.random() + 40);
    exportBall.push(new Items(randomX, randomY, randomItem));
  }

  return exportBall;
}

/**
 * key press handle
 * @param {event} event on key press event
 */
function handleClick(event) {
  if (event.keyCode == "37") {
    player.moveLeft();
  } else if (event.keyCode == "39") {
    player.moveRight();
  } else if (event.keyCode == "38") {
    player.moveTop();
  } else if (event.keyCode == "40") {
    player.moveBottom();
  } else if (event.keyCode == "32") {
    if (coins >= 4 && collisionDetection(player, shop)) {
      pointSound.play();
      mask++;
      coins = coins - 4;
    } else {
      illegalsound.play();
    }
  }
}

/**
 * key up events
 * @param {event} event on key up events
 */
function handleClick1(event) {
  if ((event.keyCode == "38", "39", "40", "37")) {
    player.reset();
    for (let i = 0; i < follower.length; i++) {
      follower[i].reset();
    }
  }
}

/**
 * calculates the health and detects the game over
 */
function healthCalculator() {
  for (let i = 0; i < opponents.length; i++) {
    for (let j = 0; j < follower.length; j++) {
      for (let k = 0; k < virus.length; k++) {
        if (
          collisionDetection(player, opponents[i]) ||
          collisionDetection(player, follower[j]) ||
          collisionDetection(player, virus[k])
        ) {
          if (mask != 0) {
            mask--;
          } else {
            health--;
          }
          if (health !== 0) {
            lifeSound.play();
          }

          player.x = 70;
          player.y = 550; //reset player's position
        }
      }
    }
  }
  if (health <= 0) {
    health = 0;
    gameOver();
    lossSound.play();
  }
}

/**
 * collects the items
 */
function collectItems() {
  for (let i = 0; i < items.length; i++) {
    if (calcDist(player.x, player.y, items[i].x, items[i].y) < 40) {
      destruct(i);
      itemsLeft--;
      pointSound.play();
    }
  }
}

/**
 * Moves the opponents in ramdom.
 */
function oppMovement() {
  for (let i = 0; i < levels[currentLevel].noOpp; i++) {
    opponents[i].moveOpponents(
      i,
      levels[currentLevel].opponentLeftPosition[i],
      levels[currentLevel].opponentRightPosition[i],
      levels[currentLevel].opponentTopPosition[i],
      levels[currentLevel].opponentBtmPosition[i]
    );
  }
}

/**
 * Detects the completion of level.
 */
function levelComplete() {
  if (collisionDetection(player, exitDoor)) {
    if (itemsLeft == 0) {
      levelCompleted();
      winSound.play();
    } else {
      textDisplay(835, 475, "Collect all Items ", itemsLeft, "red");
      illegalsound.play();
    }
  }
}
/**
 * Checks the collision between player and obstacles.
 */
function checksCollision() {
  for (let i = 0; i < obstacles.length; i++) {
    if (collide(player, obstacles[i]) === "right") {
      player.isCollLeft = true;
    } else if (collide(player, obstacles[i]) === "left") {
      player.isCollRight = true;
    } else if (collide(player, obstacles[i]) === "top") {
      player.isCollBtm = true;
    } else if (collide(player, obstacles[i]) === "bottom") {
      player.isCollTop = true;
    }
  }
}

/**
 * Checks collision between follower and opponents.
 */
function checksOppCol() {
  for (let i = 0; i < opponents.length; i++) {
    for (let j = 0; j < follower.length; j++) {
      if (
        collide(follower[j], opponents[i]) === "right" ||
        collide(follower[j], opponents[i]) === "left" ||
        collide(follower[j], opponents[i]) === "top" ||
        collide(follower[j], opponents[i]) === "bottom"
      ) {
        follower[j].oppCol = true;
      }

      if (collide(follower[j], opponents[i]) === "right") {
        opponents[i].oppColRight = true;
        follower[j].oppColLeft = true;
      } else if (collide(follower[j], opponents[i]) === "left") {
        opponents[i].oppColLeft = true;
        follower[j].oppColRight = true;
      } else if (collide(follower[j], opponents[i]) === "top") {
        opponents[i].oppColTop = true;
        follower[j].oppColBtm = true;
      } else if (collide(follower[j], opponents[i]) === "bottom") {
        opponents[i].oppColBtm = true;
        follower[j].oppColTop = true;
      }
    }
  }
}

/**
 * Checks collision between obstacles and follwer.
 */
function checksObsCol() {
  for (let i = 0; i < obstacles.length; i++) {
    for (let j = 0; j < follower.length; j++) {
      if (collide(follower[j], obstacles[i]) === "right") {
        follower[j].isFCollLeft = true;
      } else if (collide(follower[j], obstacles[i]) === "left") {
        follower[j].isFCollRight = true;
      } else if (collide(follower[j], obstacles[i]) === "top") {
        follower[j].isFCollBtm = true;
      } else if (collide(follower[j], obstacles[i]) === "bottom") {
        follower[j].isFCollTop = true;
      }
    }
  }
}
/**
 * Playes the background music.
 */
function playSoundInInterval() {
  backgroundSound.play();
}

/**
 * For mute and unmute.
 *
 * @param {*} event-mouse click event.
 */
function handleClick2(event) {
  click.play();
  if (
    event.offsetX > audioControl.x &&
    event.offsetX < audioControl.x + audioControl.width &&
    event.offsetY > audioControl.y &&
    event.offsetY < audioControl.y + audioControl.height
  ) {
    if (!isMuted) {
      isMuted = true;
      backgroundSound.stop();
      audioControl.img = loadedImages.soundOff;
    } else if (isMuted) {
      isMuted = false;
      audioControl.img = loadedImages.soundOn;
    }
  }
}
/**
 * For pointing  cursor.
 *
 * @param {event} event-mouse click event.
 */
function handleClick3(event) {
  if (
    event.offsetX > audioControl.x &&
    event.offsetX < audioControl.x + audioControl.width &&
    event.offsetY > audioControl.y &&
    event.offsetY < audioControl.y + audioControl.height
  ) {
    animationArea.canvas.style.cursor = "pointer";
  } else {
    animationArea.canvas.style.cursor = "default";
  }
}
/**
 * Mask indicator.
 */
function maskIndicator() {
  if (mask > 0) {
    player.isMaskOn = true;
  } else {
    player.isMaskOn = false;
  }
}

function countdown(time) {
  second = Math.floor(time / 1000);
  if (second == gameTime) {
    gameOver();
  }
}
function displayTime() {
  let timeDisplay = gameTime - second;
  let color = "black";
  if (displayTime < 10) {
    color = "red";
  }
  animationArea.context.fillStyle = color;
  animationArea.context.font = "800 60px Comic Sans MS";
  animationArea.context.textAlign = "center";
  animationArea.context.fillText(timeDisplay, 1090, 100);
}
