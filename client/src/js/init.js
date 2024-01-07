import {INCREASE_SPEED, START_INTERVAL} from "./constant.js";
import TetrisGame from "./tetrisGame.js";

var timerID;
var tetris;
var intervalTime = START_INTERVAL;

window.focus();
window.onload =()=> {
    start();
}

window.onkeydown = function (e) {
    if(e.key === "ArrowRight")
        tetris.moveRight();
    else if(e.key === "ArrowLeft")
        tetris.moveLeft();		
    else if(e.key === " ")
        tetris.moveDirect();
}


function start() {
    tetris = new TetrisGame();
    tetris.init();

    if (timerID) {
        clearInterval(timerID);
    }

    // 함수 안에서 사용할 intervalTime 초기화
    let intervalTime = START_INTERVAL;

    function runGame() {
        // 게임 오버 체크
        if (!tetris.run()) {
            clearInterval(timerID);  // 타이머 해제
            intervalTime = START_INTERVAL;
            alert("Game Over!");     // 또는 다른 처리를 수행

            // 다시 시작
            start();
        }

        if (tetris.isSpeedUp()) {
            console.log("speed up");
            intervalTime -= INCREASE_SPEED;
            clearInterval(timerID);

            // 새로운 타이머 설정
            timerID = setInterval(runGame, intervalTime);
        }
    }

    // 최초의 타이머 설정
    timerID = setInterval(runGame, intervalTime);
}




