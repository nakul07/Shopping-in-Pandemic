/**
 * to generate items
 * @param {number} x x-coordinates
 * @param {number} y y-coordinates
 * @param {object} img image object
 */
function Items(x, y, img) {
  this.x = x;
  this.y = y;
  this.width = 40;
  this.height = 40;
  this.img = img;
  /**
   * object items
   */
  this.update = function () {
    ctx = animationArea.context;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  };
}
