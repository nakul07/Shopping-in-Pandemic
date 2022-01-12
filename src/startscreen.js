//initial screen setting up
let click; //sound
let currentLevel = 1;
function onLoad() {
  click = new Sound("assets/audio/click1.wav");
  //background.play();
  const initialScreen = document.createElement("div");
  initialScreen.id = "initialScreen";
  initialScreen.style.height = "600px";
  initialScreen.style.width = "100%";
  initialScreen.style.backgroundImage = "url('assets/bg.jpg')";
  initialScreen.style.backgroundRepeat = "no-repeat";
  initialScreen.style.backgroundSize = "cover";
  document.body.append(initialScreen);
  const instructionWrapper = document.createElement("div");
  instructionWrapper.id = "instructionWrapper";
  instructionWrapper.style.backgroundColor = `rgba(205, 205, 100, 0.8)`;
  instructionWrapper.style.width = "50%";
  instructionWrapper.style.borderRadius = "10px";
  instructionWrapper.style.height = window.screen.height / 2 + "px";
  instructionWrapper.style.position = "absolute";
  instructionWrapper.style.top = "100px";
  instructionWrapper.style.padding = "10px";
  instructionWrapper.style.left = "25%";
  const instructions = document.createElement("h1");
  instructions.style.textAlign = "center";
  instructions.style.color = "purple";
  instructions.style.fontFamily = "'Ubuntu', sans-serif ";
  instructions.innerText =
    "Collect all the items without being contaminated with Corona Virus. Mask can save your health only once. You can buy a Mask at shop for 5 coins using Space Bar. Use arrow keys to move the player "; //instructions
  instructionWrapper.append(instructions);
  initialScreen.append(instructionWrapper);
  const startGame = document.createElement("div");
  startGame.id = "startGame";
  startGame.style.height = "80px";
  startGame.style.width = "250px";
  startGame.style.backgroundImage = "url('assets/continue.png')";
  startGame.style.backgroundSize = "contain";
  startGame.style.backgroundRepeat = "no-repeat";
  startGame.style.position = "absolute";
  startGame.style.marginTop = "30px";
  startGame.style.left = "60%";
  startGame.style.cursor = "pointer";
  instructionWrapper.append(startGame);

  const reStartGame = document.createElement("div");

  reStartGame.id = "reStartGame";
  reStartGame.style.height = "80px";
  reStartGame.style.width = "250px";
  reStartGame.style.backgroundImage = "url('assets/newgame.png')";
  reStartGame.style.backgroundSize = "contain";
  reStartGame.style.backgroundRepeat = "no-repeat";
  reStartGame.style.position = "absolute";
  reStartGame.style.marginTop = "30px";
  reStartGame.style.left = "10%";
  reStartGame.style.cursor = "pointer";
  instructionWrapper.append(reStartGame);

  //click event on start game
  startGame.addEventListener("mousedown", (Event) => {
    click.play();
    startAnimation();
    initialScreen.style.display = "none";
  });
  reStartGame.addEventListener("mousedown", (Event) => {
    click.play();
    localStorage.setItem("currentLevel", currentLevel);
    startAnimation();
    initialScreen.style.display = "none";
  });
}
