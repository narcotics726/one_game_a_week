# A Walking Player

Create a charactor which can walk and jump.

> 本示例中的图像资源来自于 [www.kenney.nl](www.kenney.nl)

## 1. Animation

> 动画是指由许多帧静止的画面，以一定的速度（如每秒16张）连续播放时，肉眼因视觉残象产生错觉，而误以为画面活动的作品。
> [维基百科 - 动画](https://zh.wikipedia.org/wiki/%E5%8A%A8%E7%94%BB)

从 w1 的示例中其实我们已经利用了这一点，在每一次 `requestAnimationFrame` 的 callback 中，小球/方块 的位置都被稍作偏移后渲染到画面上，营造出不停移动的视觉效果。一个四处走动的人物形象也并没有什么差别：

```js
const drawPlayer = function () {
    GAME.stage.drawImage(playerImg, playerX, playerY);
};
```


不过是把 `rect` 函数替换成了 [`drawImage`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage) 而已。

但这样的效果无疑过于简陋了，我们当然希望画面上的人物在位置变换的同时也能做出相应的动作。亦即，连续循环的播放一组动作图片。（我想你小时候或许玩过“在书页的角落画上不同的火柴人然后快速翻动”这样的游戏？）

来试着实现一下：

```js
const player = {
    x: 0,
    y: 0,
    currentFrame: 0,
    frames: ['assets/player_walk1.png', 'assets/player_walk2.png'],
    update: function () {
        //handle user input and update player's position
        //...
        this.currentFrame += 1;
        if (this.currentFrame >= this.frames.length) {
            this.currentFrame = 0;
        }
    },
    render: function () {
        GAME.stage.drawImage(this.frames[this.currentFrame], this.x, this.y);
    }
}
```

唔，效果是有了，不过感觉有点蠢，由于游戏非常简单，只要电脑性能不是太差劲，就会看到由于渲染的帧数过高，人物的动作就像是在抽风。

`requestAnimationFrame` 的 callback 实际上接受一个类型为 [`DOMHighResTimeStamp`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMHighResTimeStamp) 的参数，该参数表示了这次回调函数被触发的时间戳。利用它我们可以方便的计算出每一帧距离上一帧的时间差：

```js
let lastTS = null;
const mainLoop = function (ts) {
    if (lastTS === null) {
        lastTS = ts;
    }
    const delta = ts - lastTS;
    lastTS = ts;
    requestAnimationFrame(mainLoop);
};
```


...