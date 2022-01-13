/**
 * for sound control buttons.
 *
 * @param {number} x x-coordinate.
 * @param {number} y y-coordinate.
 * @param {object} img image object.
 */
function SoundControl(x, y, img) {
  this.x = x;
  this.y = y;
  this.width = 50;
  this.height = 50;
  this.img = img;
  /**
   * update.
   */
  this.update = function () {
    ctx = animationArea.context;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  };
}
