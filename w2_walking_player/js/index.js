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

        const consoleDOM = document.createElement('canvas');
        consoleDOM.width = 400;
        consoleDOM.height = 400;
        document.body.appendChild(consoleDOM);
        GAME.console = consoleDOM.getContext('2d');
        GAME.console.width = consoleDOM.width;
        GAME.console.height = consoleDOM.height;
        GAME.console.font = '24px serif';

        GAME.sprites = {};
        GAME.keyDown = {};
        GAME.lastTS = 0;

        return Promise.all(playerImgsPromises).then(frames => {
            GAME.sprites.player = {};
            frames.forEach(f => GAME.sprites.player[f.name] = f.img);
        });
    };

    const log = function (msg) {
        GAME.console.clearRect(0, 0, GAME.console.width, GAME.console.height);
        GAME.console.fillText(msg, 10, 50);
    };

    const playerImgFileNames = [
        'player_action1.png',
        'player_action2.png',
        'player_back.png',
        'player_cheer1.png',
        'player_cheer2.png',
        'player_climb1.png',
        'player_climb2.png',
        'player_duck.png',
        'player_fall.png',
        'player_hang.png',
        'player_hold1.png',
        'player_hold2.png',
        'player_hurt.png',
        'player_idle.png',
        'player_jump.png',
        'player_kick.png',
        'player_skid.png',
        'player_slide.png',
        'player_stand.png',
        'player_swim1.png',
        'player_swim2.png',
        'player_talk.png',
        'player_walk1.png',
        'player_walk2.png'
    ];

    const playerImgsPromises = playerImgFileNames.map(f => {
        const urlStr = `assets/sprites/player/${f}`;
        const img = new Image();
        img.src = urlStr;
        return new Promise((resolve) => {
            img.onload = () => {
                return resolve(img);
            };
        }).then(img => {
            return {
                name: f.slice(0, f.indexOf('.')),
                img: img
            };
        });
    });
    


    const player = {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        frame: 'player_idle',
        status: 'idle',
        animation: {
            currentFrameIdx: 0,
            animDict: {
                'idle': { frameOrder: ['player_idle'], duration: [0] },
                'walk': { frameOrder: ['player_walk1', 'player_stand', 'player_walk2', 'player_stand'], duration: [100, 80, 100, 80] }
            }
        },
        lastUpdateTS: 0,
        render: function () {
            try {
                GAME.stage.drawImage(GAME.sprites.player[this.frame], this.x, this.y);
            } catch (e) {
                console.log(
                    this.animation.currentFrameIdx, 
                    this.status, this.animation.animDict[this.status], 
                    this.animation.currentFrameIdx,
                    this.frame
                );
                throw e;
            }
        },
        update: function (delta) {
            log(`${this.x}, ${this.status}, ${this.frame}`);
            this.lastUpdateTS += delta;

            if (GAME.keyDown['ArrowRight']) {
                this.status = 'walk';
                this.move({x: this.x + 1, y: this.y});
            } else if (GAME.keyDown['ArrowLeft']) {
                this.status = 'walk';
                this.move({ x: this.x - 1, y: this.y });
            } else {
                this.status = 'idle';
                this.animation.currentFrameIdx = 0;
            }
            this.playAnim();
        },
        move: function (dest) {
            if (dest.x - this.w > GAME.stage.width || dest.x < 0) {
                this.status = 'idle';
                this.animation.currentFrameIdx = 0;
            } else {
                this.x = dest.x;
            }
        },
        playAnim: function () {
            if (this.lastUpdateTS < this.animation.animDict[this.status].duration[this.animation.currentFrameIdx]) {
                return;
            } else {
                this.lastUpdateTS = 0;
            }

            this.frame = this.animation.animDict[this.status].frameOrder[this.animation.currentFrameIdx];
            this.animation.currentFrameIdx += 1;
            if (this.animation.currentFrameIdx >= this.animation.animDict[this.status].frameOrder.length) {
                this.animation.currentFrameIdx = 0;
            }
        }
    };


    document.onreadystatechange = function (e) {
        if (e.target.readyState === 'complete') {
            init().then(() => {
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

                const mainLoop = function (ts) {
                    const delta = ts - GAME.lastTS;
                    GAME.lastTS = ts;
                    requestAnimationFrame(mainLoop);
                    GAME.stage.clearRect(0, 0, GAME.stage.width, GAME.stage.height);

                    player.update(delta);
                    player.render(delta);
                };

                mainLoop();
            });
        }
    };



})(window.SAT);