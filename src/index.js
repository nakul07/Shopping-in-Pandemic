let loadedImages = {};
const assets = [
  //background
  "./assets/floor.jpg",
  "./assets/dashboard.jpg",

  //player-up "assets/soff.png";
  "./assets/player.svg",
  "./assets/player-left.svg",
  "./assets/player-right.svg",

  //player- down
  "./assets/playerleftdown.png",
  "./assets/playerrightdown.png",
  "./assets/playerdown.png",

  //player left
  "./assets/playerleftleft.png",
  "./assets/playerrightleft.png",
  "./assets/playerleft.png",

  //player right
  "./assets/playerleftright.png",
  "./assets/playerrightright.png",
  "./assets/playerright.png",

  //opponent up
  "./assets/opponent-up.png",
  "./assets/buyer1-left.svg",
  "./assets/buyer1-right.svg",

  //opponent left
  "./assets/opponent-left.png",
  "./assets/buyer-left-left.png",
  "./assets/buyer-right-left.png",

  //opponent right
  "./assets/opponent-right.png",
  "./assets/buyer-left-right.png",
  "./assets/buyer-right-right.png",

  //opponent down
  "./assets/opponent-down.png",
  "./assets/buyer-left-down.png",
  "./assets/buyer-right-down.png",

  //sound on /off
  "./assets/soff.png",
  "./assets/son.png",

  //continue and replay
  "./assets/replay.png",
  "./assets/replay1.png",

  //mask
  "./assets/mask.png",

  //gameover and level up
  "./assets/gameover.png",
  "./assets/complete.png",

  //exit and entry
  "./assets/exit.png",
  "./assets/entry.png",

  //items
  "./assets/items/honey.svg",
  "./assets/items/carrot.svg",
  "./assets/items/milk.svg",
  "./assets/items/paper.svg",
  "./assets/items/tomato.svg",
  "./assets/items/juice.svg",
  "./assets/items/bread.svg",
  "./assets/items/avocado.svg",
  "./assets/items/broccoli.svg",
  "./assets/items/cabbage.svg",
  "./assets/items/cereal.svg",

  //virus
  "./assets/items/virus.svg",

  //start screen bg
  "./assets/bg.jpg",

  //new game and continue
  "./assets/continue.png",
  "assets/newgame.png",

  //coin and heart
  "./assets/coin.png",
  "./assets/heart.png",
];

/**
 * Loading the game initially.
 */
function loadingGame() {
  const loading = document.createElement("div");
  loading.id = "loading";
  loading.innerText = "LOADING...";
  document.body.append(loading);

  const assetsLoaded = assets.map(
    (url) =>
      new Promise((resolve) => {
        const img = new Image();
        img.onerror = (e) => reject(`${url} failed to load`);
        img.onload = (e) => resolve(img);
        img.src = url;
      })
  );
  Promise.all(assetsLoaded).then((images) => {
    loading.style.display = "none";
    //background
    loadedImages.floor = images[0];
    loadedImages.dashboard = images[1];
    //player up
    loadedImages.playerUp = images[2];
    loadedImages.playerLeft1 = images[3];
    loadedImages.playerRight1 = images[4];
    //player down
    loadedImages.playerLeftDown = images[5];
    loadedImages.playerRightDown = images[6];
    loadedImages.PlayerDown = images[7];
    //player Left
    loadedImages.playerLeftLeft = images[8];
    loadedImages.playerRightLeft = images[9];
    loadedImages.playerLeft = images[10];
    //player right
    loadedImages.playerLeftRight = images[11];
    loadedImages.playerRightRight = images[12];
    loadedImages.playerRight = images[13];
    //opponent up
    loadedImages.opponentUp = images[14];
    loadedImages.opponentLeft1 = images[15];
    loadedImages.opponentRight1 = images[16];
    //opponent left
    loadedImages.opponentLeft = images[17];
    loadedImages.opponentLeftLeft = images[18];
    loadedImages.opponentRightLeft = images[19];
    //opponent right
    loadedImages.opponentRight = images[20];
    loadedImages.opponentLeftRight = images[21];
    loadedImages.opponentRightRight = images[22];
    //opponent down
    loadedImages.opponentDown = images[23];
    loadedImages.opponentLeftDown = images[24];
    loadedImages.opponentRightDown = images[25];
    //sound on and off
    loadedImages.soundOff = images[26];
    loadedImages.soundOn = images[27];
    //continue and replay
    loadedImages.continue = images[28]; // level complete
    loadedImages.replay = images[29]; //game over
    //mask
    loadedImages.mask = images[30];
    //gameover and levelup
    loadedImages.gameOver = images[31]; //game over diplay
    loadedImages.levelUp = images[32]; //level up display
    //exit and entry
    loadedImages.exit = images[33];
    loadedImages.entry = images[34];
    //items
    loadedImages.i1 = images[35];
    loadedImages.i2 = images[36];
    loadedImages.i3 = images[37];
    loadedImages.i4 = images[38];
    loadedImages.i5 = images[39];
    loadedImages.i6 = images[40];
    loadedImages.i7 = images[41];
    loadedImages.i8 = images[42];
    loadedImages.i9 = images[43];
    loadedImages.i10 = images[44];
    loadedImages.i11 = images[45];
    //virus
    loadedImages.virus = images[46];

    //start screen
    loadedImages.startScreenBg = images[47];
    loadedImages.continueGame = images[48];
    loadedImages.newGame = images[49];

    //coin and heart
    loadedImages.coin = images[50];
    loadedImages.heart = images[51];
    //load initial screen
    onLoad();
  });
}
