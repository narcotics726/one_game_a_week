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
        GAME.waitForNextFrame = true;
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

            const boxPos = {
                x: 0,
                y: 0,
                direction: 1,
                velocity: 2
            }

            setInterval(() => {
                GAME.stage.clearRect(0, 0, GAME.stage.width, GAME.stage.height);
                boxPos.x += boxPos.velocity * boxPos.direction;
                if (boxPos.x + 50 >= GAME.stage.width || boxPos.x <=0) {
                    boxPos.direction *= -1;
                }
                drawBox(boxPos.x, boxPos.y);
            }, 1000 / 60);
        }
    };



})();