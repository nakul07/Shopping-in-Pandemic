/**
 * after game over
 */
function gameOver() {
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
  loadedImages.replay.id = "replayBtn";
  loadedImages.replay.style.position = "absolute";
  loadedImages.replay.style.height = "60px";
  loadedImages.replay.style.width = "50%";
  loadedImages.replay.style.bottom = "0px";
  loadedImages.replay.style.left = "26%";
  loadedImages.replay.style.marginBottom = "30px";
  loadedImages.replay.style.borderRadius = "5px";
  loadedImages.replay.style.cursor = "pointer";
  popUp.append(loadedImages.replay);

  //gameover display
  loadedImages.gameOver.style.height = "100px";
  loadedImages.gameOver.style.width = "350px";
  loadedImages.gameOver.style.marginTop = "50px";
  popUp.append(loadedImages.gameOver);

  /**
   * on click replay button
   */
  loadedImages.replay.onclick = function () {
    localStorage.setItem("currentLevel", currentLevel);
    popUp.style.display = "none"; //hide popup
    health = 2;
    itemsLeft = 5;
    coins = coins;
    click.play();
    backgroundSound.stop();
    coughSound.stop();
    clearThroatSound.stop();
    clearInterval(soundA);
    clearInterval(soundB);
    startAnimation();
  };
}
