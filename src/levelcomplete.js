/**
 * after the completion of level
 */
function levelCompleted() {
  clearInterval(animationArea.interval);
  animationArea.container.position = "relative";

  //popup div
  const popUp = document.createElement("div");
  popUp.id = "popUp";
  popUp.style.width = "30%";
  popUp.style.height = "300px";
  popUp.style.position = "absolute";
  popUp.style.top = "100px";
  popUp.style.marginLeft = "35%";
  popUp.style.backgroundColor = `rgba(255, 255, 255, 0.9)`;
  popUp.style.borderRadius = "15px";
  animationArea.container.append(popUp);

  //reload button
  loadedImages.continue.id = "continueBtn";
  loadedImages.continue.style.position = "absolute";
  loadedImages.continue.style.height = "100px";
  loadedImages.continue.style.width = "50%";
  loadedImages.continue.style.bottom = "0px";
  loadedImages.continue.style.left = "26%";
  loadedImages.continue.style.marginBottom = "30px";
  loadedImages.continue.style.borderRadius = "5px";
  loadedImages.continue.style.cursor = "pointer";
  popUp.append(loadedImages.continue);

  //level completed display
  loadedImages.levelUp.style.height = "200px";
  loadedImages.levelUp.style.width = "350px";
  loadedImages.gameOver.style.marginTop = "50px";
  popUp.append(loadedImages.levelUp);

  /**
   * reload button on click
   */
  loadedImages.continue.onclick = function () {
    popUp.style.display = "none"; //hide popup
    click.play();
    health = 2;
    itemsLeft = 5;
    coins = coins + 3;
    currentLevel++;
    if (currentLevel > 5) {
      currentLevel = 1;
    }
    localStorage.setItem("currentLevel", currentLevel);
    timer = 0;
    gameTime = levels[currentLevel].gameTime;
    backgroundSound.stop();
    coughSound.stop();
    clearThroatSound.stop();
    clearInterval(soundA);
    clearInterval(soundB);
    // console.log(coins);
    startAnimation();
  };
}
