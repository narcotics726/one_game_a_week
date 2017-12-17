# A Moving Box

Let's create a box moving from the left side to the right side repeatly.

## 1. Create a Canvas and draw a box on it

```js
const GAME = {};
const stageDOM = document.createElement('canvas');
stageDOM.width = 400;
stageDOM.height = 400;
document.body.appendChild(stageDOM);
GAME.stage = stageDOM.getContext('2d');
```

```js
const drawBox = function () {
    GAME.stage.beginPath();
    GAME.stage.rect(0, 0, 50, 50);
    GAME.stage.fillStyle = "#00bcd4";
    GAME.stage.fill();
    GAME.stage.closePath();
};
```

## 2. Let the box move over time

```js
const drawBox = function (x, y) {
    //...
    GAME.stage.rect(x, y, 50, 50);
    //...
};

let boxX = 0;
let boxY = 0;
setInterval(() => {
    //clear all from the canvas
    GAME.stage.clearRect(0, 0, GAME.stage.width, GAME.stage.height);
    boxX += 1;
    drawBox(boxX, boxY);
}, 1000/60);
```