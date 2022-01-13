/**
 * generates the virus at required position
 * @param {number} x x-coordinates
 * @param {number} y y-coordinates
 */
function Virus(x, y) {
  this.x = x;
  this.y = y;
  this.width = 40;
  this.height = 40;
  this.img = loadedImages.virus;
  /**
   * updates image
   */
  this.update = function () {
    ctx = animationArea.context;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  };
}
