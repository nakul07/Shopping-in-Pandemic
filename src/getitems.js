function getItems(noOfBalls) {
  //let newBall = [];
  let exportBall = [];
  //let overlapping = false;
  let possilbeItems = [
    "assets/items/honey.svg",
    "assets/items/carrot.svg",
    "assets/items/milk.svg",
    "assets/items/paper.svg",
    "assets/items/tomato.svg",
    "assets/items/juice.svg",
    "assets/items/bread.svg",
  ];

  for (let i = 0; i < noOfBalls; i++) {
    let randomItem =
      possilbeItems[Math.floor(Math.random() * possilbeItems.length)];
    let randomX = Math.floor((950 - 40) * Math.random() + 40);
    let randomY = Math.floor((500 - 40) * Math.random() + 40);
    exportBall.push(new Items(randomX, randomY, randomItem));
  }

  //   do {
  //     balls = {};
  //     balls.randomItem =
  //       possilbeItems[Math.floor(Math.random() * possilbeItems.length)];

  //     balls.width = 40;
  //     balls.randomX = Math.floor(
  //       (950 - balls.width) * Math.random() + balls.width
  //     ); //(max-min)+min max= width
  //     balls.randomY = Math.floor(
  //       (500 - balls.width) * Math.random() + balls.width
  //     );

  //     for (let j = 0; j < newBall.length; j++) {
  //       let otherBall = newBall[j];

  //       let distance = calcDist(
  //         balls.randomX,
  //         balls.randomY,
  //         otherBall.randomX,
  //         otherBall.randomY
  //       );

  //       if (distance < balls.width + otherBall.width) {
  //         //overlapped
  //         overlapping = true;
  //         break;
  //       }
  //     }

  //     if (!overlapping) {
  //       newBall.push(balls);
  //     }
  //   } while (newBall.length < noOfBalls);

  //   for (let i = 0; i < newBall.length; i++) {
  //     exportBall.push(
  //       new Items(newBall[i].randomX, newBall[i].randomY, newBall[i].randomItem)
  //     );
  //   }

  return exportBall;
}
