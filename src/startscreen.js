//initial screen setting up
//let swoosh; //sound
function onLoad() {
  // swoosh = new sound("audio/swoosh.wav");
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
    "Collect all the items without being contaminated with Corona Virus. Mask can save your health only once. You can buy a Mask at shop for 5 coins "; //instructions
  instructionWrapper.append(instructions);
  initialScreen.append(instructionWrapper);
  const startGame = document.createElement("div");
  startGame.id = "startGame";
  startGame.style.height = "150px";
  startGame.style.width = "510px";
  startGame.style.backgroundImage = "url('assets/letsgo.png')";
  startGame.style.backgroundSize = "cover";
  startGame.style.backgroundRepeat = "no-repeat";
  startGame.style.position = "absolute";
  startGame.style.marginTop = "39px";
  startGame.style.left = "15%";
  startGame.style.cursor = "pointer";
  instructionWrapper.append(startGame);

  //click event on start game
  startGame.addEventListener("mousedown", (Event) => {
    // swoosh.play();
    startAnimation();
    initialScreen.style.display = "none";
  });
}
