let player;
let opponents;
let obstacles;
let items;

function startAnimation() {
  player = new Components(100, 100, "player", "red");
  opponents = new Components(200,100,"opponents", "blue");
  obstacles = new Components(150,0,"obstacles", "black");
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

    this.interval = setInterval(updateAnimationArea, 20);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};

function updateAnimationArea() {
  animationArea.clear();
  player.update();
  opponents.update();
  obstacles.update();
}


//handle click 
function handleClick(event){
  if (event.keyCode == "37") {
    player.moveLeft();
  } else if (event.keyCode == "39") {
    player.moveRight();
  }else if (event.keyCode == "38"){
    player.moveTop();
  }
  else if (event.keyCode == "40"){
    player.moveBottom();
  }
}