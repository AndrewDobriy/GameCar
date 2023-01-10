(function () {
  let isPause = false;
  let animationId = null;

  const speed = 3;

  const car = document.querySelector('.car');
  const carWidth = car.clientWidth / 2;
  const carHeight = car.clientHeight;
  const carCoords = getCoords(car);
  const carMoveInfo = {
    top: null,
    bottom: null,
    left: null,
    right: null,
  };

  // const arrow = document.querySelector('.arrow');
  // const arrowCoord = getCoords(arrow);
  // const arrowWidth = arrow.clientWidth / 2;

  // const sign = document.querySelector('.sign');
  // const signCoord = getCoords(sign);
  // const signWidth = sign.clientWidth / 2;

  const coin = document.querySelector('.coin');
  const coinCoord = getCoords(coin);
  const coinWidth = coin.clientWidth / 2;
  const coinHeight = coin.clientHeight;

  const road = document.querySelector('.road');
  const roadHeidght = road.clientHeight;
  const roadWidth = road.clientWidth / 2;
  const trees = document.querySelectorAll('.tree');

  const treesCoords = [];

  for (let i = 0; i < trees.length; i++) {
    const tree = trees[i];
    const coordsTree = getCoords(tree);

    treesCoords.push(coordsTree);
  }

  // trees.forEach((elem) => {
  //     const coordsTree = getCoords(elem);
  //     treesCoords.push(coordsTree);
  // });

  document.addEventListener('keydown', (event) => {
    // if (isPause) {
    //   return; // Если игра на паузе, то код ниже не начнет выполняться
    // }

    const code = event.code;
    if (code === 'ArrowUp' || (code === 'KeyW' && carMoveInfo.top === null)) {
      carMoveInfo.top = requestAnimationFrame(carMoveToTop);
    } else if (
      code === 'ArrowDown' ||
      (code === 'KeyS' && carMoveInfo.bottom === null)
    ) {
      carMoveInfo.bottom = requestAnimationFrame(carMoveToBottom);
    } else if (
      code === 'ArrowLeft' ||
      (code === 'KeyA' && carMoveInfo.left === null)
    ) {
      carMoveInfo.left = requestAnimationFrame(carMoveToLeft);
    } else if (
      code === 'ArrowRight' ||
      (code === 'KeyD' && carMoveInfo.right === null)
    ) {
      carMoveInfo.right = requestAnimationFrame(carMoveToRight);
    }
  });

  document.addEventListener('keyup', (event) => {
    const code = event.code;

    if (code === 'ArrowUp' || code === 'KeyW') {
      cancelAnimationFrame(carMoveInfo.top);
      carMoveInfo.top = null;
    } else if (code === 'ArrowDown' || code === 'KeyS') {
      cancelAnimationFrame(carMoveInfo.bottom);
      carMoveInfo.bottom = null;
    } else if (code === 'ArrowLeft' || code === 'KeyA') {
      cancelAnimationFrame(carMoveInfo.left);
      carMoveInfo.left = null;
    } else if (code === 'ArrowRight' || code === 'KeyD') {
      cancelAnimationFrame(carMoveInfo.right);
      carMoveInfo.right = null;
    }
  });

  function carMoveToTop() {
    const newY = carCoords.y - 5;
    // if (newY < 0) {
    //   return;
    // }
    carCoords.y = newY;
    carMove(carCoords.x, newY);
    carMoveInfo.top = requestAnimationFrame(carMoveToTop);
  }

  function carMoveToBottom() {
    const newY = carCoords.y + 5;
    // if (newY + carHeight > roadHeidght) {
    //   return;
    // }
    carCoords.y = newY;
    carMove(carCoords.x, newY);
    carMoveInfo.bottom = requestAnimationFrame(carMoveToBottom);
  }

  function carMoveToLeft() {
    const newX = carCoords.x - 5;

    // if (newX < -roadWidth + carWidth) {
    //   return;
    // }
    carCoords.x = newX;
    carMove(newX, carCoords.y);
    carMoveInfo.left = requestAnimationFrame(carMoveToLeft);
  }

  function carMoveToRight() {
    const newX = carCoords.x + 5;
    // if (newX > roadWidth - carWidth) {
    //   return;
    // }
    carCoords.x = newX;
    carMove(newX, carCoords.y);
    carMoveInfo.right = requestAnimationFrame(carMoveToRight);
  }

  function carMove(x, y) {
    console.log(hasCollision());
    car.style.transform = `translate(${x}px, ${y}px)`;
  }

  animationId = requestAnimationFrame(startGame);

  function startGame() {
    treesAnimation();
    coinAnimation();
    // signAnimation();
    // arrowAnimation();
    animationId = requestAnimationFrame(startGame);
  }

  function treesAnimation() {
    for (let i = 0; i < trees.length; i++) {
      const tree = trees[i];
      const coords = treesCoords[i];

      let newYCoord = coords.y + speed;

      if (newYCoord > window.innerHeight) {
        newYCoord = -270;
      }

      treesCoords[i].y = newYCoord;
      tree.style.transform = `translate(${coords.x}px, ${newYCoord}px)`;
    }
  }

  function coinAnimation() {
    let newYCoord = coinCoord.y + speed;
    let newXCoord = coinCoord.x;

    if (newYCoord > window.innerHeight) {
      newYCoord = -100;

      const direction = parseInt(Math.random() * 2);
      const randomXCoord = parseInt(
        Math.random() * (roadWidth + 1 - coinWidth)
      );

      newXCoord = direction === 0 ? -randomXCoord : randomXCoord;

      // if ((direction = 0)) {
      //   // двигаем влево
      //   newXCoord = -randomXCoord;
      // } else if ((direction = 1)) {
      //   //двигаем вправо
      //   newXCoord = randomXCoord;
      // }
    }

    coinCoord.y = newYCoord;
    coinCoord.x = newXCoord;
    coin.style.transform = `translate(${newXCoord}px, ${newYCoord}px)`;
  }

  // function signAnimation() {
  //   let newYCoord = signCoord.y + speed;
  //   let newXCoord = signCoord.x;

  //   if (newYCoord > window.innerHeight) {
  //     newYCoord = -200;

  //     const direction = parseInt(Math.random() * 2);
  //     const randomXCoord = parseInt(
  //       Math.random() * (roadWidth + 1 - signWidth)
  //     );

  //     newXCoord = direction === 0 ? -randomXCoord : randomXCoord;
  //   }

  //   signCoord.y = newYCoord;
  //   signCoord.x = newXCoord;
  //   sign.style.transform = `translate(${newXCoord}px, ${newYCoord}px)`;
  // }

  // function arrowAnimation() {
  //   let newYCoord = arrowCoord.y + speed;
  //   let newXCoord = arrowCoord.x;

  //   if (newYCoord > window.innerHeight) {
  //     newYCoord = -1000;

  //     const direction = parseInt(Math.random() * 2);
  //     const randomXCoord = parseInt(
  //       Math.random() * (roadWidth + 1 - arrowWidth)
  //     );

  //     newXCoord = direction === 0 ? -randomXCoord : randomXCoord;
  //   }

  //   arrowCoord.y = newYCoord;
  //   arrowCoord.x = newXCoord;
  //   arrow.style.transform = `translate(${newXCoord}px, ${newYCoord}px)`;
  // }

  function getCoords(element) {
    const matrix = window.getComputedStyle(element).transform;
    const array = matrix.split(',');
    const y = array[array.length - 1];
    const x = array[array.length - 2];
    const numeriсY = parseFloat(y);
    const numeriсX = parseFloat(x);

    return {
      x: numeriсX,
      y: numeriсY,
    };
  }

  function hasCollision() {
    const carYTop = carCoords.y;
    const carYBottom = carCoords.y + carHeight;

    const carXLeft = carCoords.x;
    const carXRight = carCoords.x + carWidth * 2;

    const coinYTop = coinCoord.y;
    const coinYBotton = coinCoord.y + coinHeight;
    const coinXLeft = coinCoord.x;
    const coinXRight = coinCoord.x + coinWidth * 2;

    if (carYTop > coinYBotton || carYBottom < coinYTop) {
      return false;
    }

    if (carXLeft > coinXRight || carXRight < coinXLeft) {
      return false;
    }
    return true;
  }

  const gameButton = document.querySelector('.game-button');
  gameButton.addEventListener('click', () => {
    isPause = !isPause;
    if (isPause) {
      cancelAnimationFrame(animationId);
      cancelAnimationFrame(carMoveInfo.top);
      cancelAnimationFrame(carMoveInfo.right);
      cancelAnimationFrame(carMoveInfo.left);
      cancelAnimationFrame(carMoveInfo.bottom);
      gameButton.children[0].style.display = 'none';
      gameButton.children[1].style.display = 'initial';
    } else {
      animationId = requestAnimationFrame(startGame);
      gameButton.children[0].style.display = 'initial';
      gameButton.children[1].style.display = 'none';
    }
  });
})();
