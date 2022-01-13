//initial screen setting up
let click; //sound
let currentLevel = 1;
/**
 * Initial screen.
 */
function onLoad() {
  click = new Sound("assets/audio/click1.wav");
  //background
  loadedImages.startScreenBg.id = "initialScreen";
  loadedImages.startScreenBg.style.height = "600px";
  loadedImages.startScreenBg.style.width = "100%";
  document.body.append(loadedImages.startScreenBg);

  //wrapper
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
  //instructions
  const instructions = document.createElement("h1");
  instructions.style.textAlign = "center";
  instructions.style.color = "purple";
  instructions.style.fontFamily = "'Ubuntu', sans-serif ";
  instructions.innerText =
    "Collect all the items without being contaminated with Corona Virus. Mask can save your health only once. You can buy a Mask at shop for 5 coins using Space Bar. Use arrow keys to move the player "; //instructions
  instructionWrapper.append(instructions);
  document.body.append(instructionWrapper);

  //start game btn

  loadedImages.continueGame.id = "startGame";
  loadedImages.continueGame.style.height = "70px";
  loadedImages.continueGame.style.width = "250px";
  loadedImages.continueGame.style.position = "absolute";
  loadedImages.continueGame.style.marginTop = "30px";
  loadedImages.continueGame.style.left = "55%";
  loadedImages.continueGame.style.cursor = "pointer";
  instructionWrapper.append(loadedImages.continueGame);

  //restart game btn

  loadedImages.newGame.id = "reStartGame";
  loadedImages.newGame.style.height = "70px";
  loadedImages.newGame.style.width = "250px";
  loadedImages.newGame.style.position = "absolute";
  loadedImages.newGame.style.marginTop = "30px";
  loadedImages.newGame.style.left = "10%";
  loadedImages.newGame.style.cursor = "pointer";
  instructionWrapper.append(loadedImages.newGame);

  /**
   * On click event for continue game btn.
   */
  loadedImages.continueGame.addEventListener("mousedown", (Event) => {
    click.play();
    startAnimation();
    instructionWrapper.style.display = "none";
    loadedImages.startScreenBg.style.display = "none";
  });
  /**
   * On click event for new game btn.
   */
  loadedImages.newGame.addEventListener("mousedown", (Event) => {
    click.play();
    localStorage.setItem("currentLevel", currentLevel);
    startAnimation();
    instructionWrapper.style.display = "none";
    loadedImages.startScreenBg.style.display = "none";
  });
}
