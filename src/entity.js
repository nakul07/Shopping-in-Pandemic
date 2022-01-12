//for entry, exit and background
function Entity(x, y, img, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.img = img;
  this.update = function () {
    ctx = animationArea.context;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  };
}
