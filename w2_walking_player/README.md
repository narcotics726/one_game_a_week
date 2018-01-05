# A Moving Box

Let's create a box moving from the left side to the right side repeatedly.

## 1. 使用 [`<canvas>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas) 绘画

在所有 HTML5 的新增特性中，`<canvas>` 元素也许是被运用最多的其中之一。相对于 DOM 动画有着更好的渲染性能，以及更复杂全面的图形控制。

起步非常简单，作为一个 DOM 元素，`<canvas>` 的属性少的可怜：`width` 与 `height` 几乎就是你要考虑的全部内容。

> 需要注意的一点是：使用 CSS 仍然可以控制 `<canvas>` 元素的尺寸，但画布内部所渲染的所有图像都将被自适应拉伸，所有坐标系仍然以 HTML 属性为基准进行计算。

```js
const GAME = {};
const stageDOM = document.createElement('canvas');
stageDOM.width = 400;
stageDOM.height = 400;
document.body.appendChild(stageDOM);
GAME.stage = stageDOM.getContext('2d');
```

让我们先画一个矩形来试试手：

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
## 3. Do some refactoring

```js
const box = {
    x: 0,
    y: 0,
    w: 50,
    h: 50,
    update: function () { ... },
    render: function () { ... }
};

const loop = function () {
    requestAnimationFrame(loop);
    GAME.stage.clearRect(0, 0, GAME.stage.width, GAME.stage.height);
    box.update();
    box.render();
};
```

## 4. Control the box moving

```js
document.onkeydown = function (e) {
    if (e.code === 'ArrowDown') {
        GAME.keydown.ArrowDown = true;
    }
};

document.onkeyup = function (e) {
    if (e.code === 'ArrowDown') {
        GAME.keydown.ArrowDown = false;
    }
};

const box = {
    ...,
    update: function () {
        if (GAME.keydown.ArrowDown) {
            this.y += this.velocity;
        }
        ...
    }
}
```