function SoundControl(x, y, src) {
  this.x = x;
  this.y = y;
  this.width = 30;
  this.height = 30;
  this.img = document.createElement("img");
  this.img.src = src;
  this.update = function () {
    ctx = animationArea.context;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  };
}


  
