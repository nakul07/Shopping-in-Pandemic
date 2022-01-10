function Virus(x, y) {
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 40;
    this.img = document.createElement("img");
    this.img.src = "assets/items/virus.svg";
    this.update = function () {
      ctx = animationArea.context;
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    };
  }