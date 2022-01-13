/**
 * To draw differents entities.
 *
 * @param {number} x x-coordinate.
 * @param {number} y y-coordinates.
 * @param {object} img image obejct.
 * @param {number} width width.
 * @param {number} height height.
 */
function Entity(x, y, img, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.img = img;
  /**
   * Udate entities.
   */
  this.update = function () {
    ctx = animationArea.context;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  };
}
