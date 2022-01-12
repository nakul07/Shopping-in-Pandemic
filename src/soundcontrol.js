function SoundControl(x, y, src) {
  this.x = x;
  this.y = y;
  this.width = 50;
  this.height = 50;
  this.img = document.createElement("img");
  this.img.src = src;
  this.update = function () {
    ctx = animationArea.context;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  };
}


  
