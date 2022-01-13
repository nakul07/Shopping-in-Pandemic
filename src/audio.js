/**
 * To play ingame sound.
 * 
 * @param {string} src-audio source.
 */
function Sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  /**
   * play audio
   */
  this.play = function () {
    if (!isMuted) {
      this.sound.play();
    }
  };
  /**
   * pause audio
   */
  this.stop = function () {
    this.sound.pause();
  };
}
