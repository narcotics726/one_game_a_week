(function (SAT) {
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
            };

            const paddle = {
                x: 0,
                y: 0,
                w: 50,
                h: 50,
                velocity: 2,
                update: function () {
                    const oldX = this.x;
                    const oldY = this.y;

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
                    GAME.stage.fillStyle = '#00bcd4';
                    GAME.stage.fill();
                    GAME.stage.closePath();
                }
            };

            const ball = {
                x: 100,
                y: 100,
                r: 10,
                velocity: {
                    x: 1,
                    y: 1,
                },
                update: function () {
                    const oldX = this.x;
                    const oldY = this.y;
                    this.x += this.velocity.x;
                    this.y += this.velocity.y;
                    if (this.x >= GAME.stage.width - this.r || this.x <= this.r) {
                        this.x = oldX;
                        this.velocity.x *= -1;
                    }

                    if (this.x > GAME.stage.width - this.r) {
                        this.x = GAME.stage.width - this.r;
                        this.velocity.x *= -1;
                    } else if (this.x < this.r) {
                        this.x = this.r;
                        this.velocity.x *= -1;
                    }

                    if (this.y > GAME.stage.height - this.r) {
                        this.y = GAME.stage.height - this.r;
                        this.velocity.y *= -1;
                    } else if (this.y < this.r) {
                        this.y = this.r;
                        this.velocity.y *= -1;
                    }

                    const satCircle = new SAT.Circle(new SAT.Vector(this.x, this.y), this.r);
                    const satBox = new SAT.Box(new SAT.Vector(paddle.x, paddle.y), paddle.w, paddle.h).toPolygon();
                    const satRes = new SAT.Response();
                    const collided = SAT.testCirclePolygon(satCircle, satBox, satRes);
                    if (collided) {
                        this.x = this.x - satRes.overlapV.x;
                        this.y = this.y - satRes.overlapV.y;
                        if (satRes.overlapV.x) {
                            this.velocity.x *= -1;
                        }

                        if (satRes.overlapV.y) {
                            this.velocity.y *= -1;
                        }
                    }

                },
                render: function () {
                    GAME.stage.beginPath();
                    GAME.stage.arc(this.x, this.y, this.r, 0, Math.PI * 2);
                    GAME.stage.fillStyle = '#0095DD';
                    GAME.stage.fill();
                    GAME.stage.closePath();
                }
            };

            const mainLoop = function () {
                requestAnimationFrame(mainLoop);
                GAME.stage.clearRect(0, 0, GAME.stage.width, GAME.stage.height);
                paddle.update();
                ball.update();
                paddle.render();
                ball.render();
            };

            mainLoop();
        }
    };



})(window.SAT);