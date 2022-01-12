//to play audio
//takes audio source as a parameter
//import { Doors } from "game.js";
function Sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function () {
    if (!isMuted) {
      this.sound.play();
    }
  };
  this.stop = function () {
    this.sound.pause();
  };
}
