(function () {
    const GAME = {};

    const init = function () {
        const stageDOM = document.createElement('canvas');
        stageDOM.width = 400;
        stageDOM.height = 400;
        document.body.appendChild(stageDOM);
        GAME.stage = stageDOM.getContext('2d');
        GAME.stage.width = stageDOM.width;
        GAME.stage.height = stageDOM.height;

        GAME.keyDown = {};
    };

    const drawBox = function (x, y) {
        GAME.stage.beginPath();
        GAME.stage.rect(x, y, 50, 50);
        GAME.stage.fillStyle = "#00bcd4";
        GAME.stage.fill();
        GAME.stage.closePath();
    };

    document.onreadystatechange = function (e) {
        if (e.target.readyState === 'complete') {
            init();

            document.onkeydown = function (e) {
                if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].indexOf(e.code) > -1) {
                    GAME.keyDown[e.code] = true;
                }
            };

            document.onkeyup = function (e) {
                if (GAME.keyDown[e.code]) {
                    GAME.keyDown[e.code] = false;
                }
            }

            const box = {
                x: 0,
                y: 0,
                w: 50,
                h: 50,
                velocity: 2,
                update: function () {
                    console.log(GAME.keyDown);
                    const oldX = this.x;
                    const oldY = this.y;

                    //here is a time-consuming process
                    // const tStart = window.performance.now();
                    // while(window.performance.now() - tStart < 200) {
                    //     ;
                    // }
                    if (GAME.keyDown.ArrowLeft) {
                        this.x -= this.velocity;
                    }

                    if (GAME.keyDown.ArrowRight) {
                        this.x += this.velocity;
                    }

                    if (GAME.keyDown.ArrowDown) {
                        this.y += this.velocity;
                    }

                    if (GAME.keyDown.ArrowUp) {
                        this.y -= this.velocity;
                    }
                    
                    if (this.x >= GAME.stage.width - this.w || this.x <= 0) {
                        this.x = oldX;
                    }

                    if (this.y >= GAME.stage.height - this.h || this.y <= 0) {
                        this.y = oldY;
                    }
                },
                render: function () {
                    GAME.stage.beginPath();
                    GAME.stage.rect(this.x, this.y, this.w, this.h);
                    GAME.stage.fillStyle = "#00bcd4";
                    GAME.stage.fill();
                    GAME.stage.closePath();
                }
            };

            const mainLoop = function () {
                requestAnimationFrame(mainLoop);

                GAME.stage.clearRect(0, 0, GAME.stage.width, GAME.stage.height);
                box.update();
                box.render();
            };

            // setInterval(() => {
            //     GAME.stage.clearRect(0, 0, GAME.stage.width, GAME.stage.height);
            //     box.update();
            //     box.render();
            // }, 1000/60);

            mainLoop();
        }
    };



})();