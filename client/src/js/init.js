import {ROW, COL} from "./constant.js";
import TetrisGame from "./tetrisGame.js";

var timerID;
var tetris;

window.focus();
window.onload =()=> {
    start();
}

window.onkeydown = function (e) {
    if(e.key == "ArrowRight") 
        tetris.moveRight();
    else if(e.key == "ArrowLeft") 
        tetris.moveLeft();		
    else if(e.key == " ")
        tetris.moveDirect();
}

function start(){
    tetris = new TetrisGame();
    tetris.init();
    
    if (timerID) {
        clearInterval(timerID);
    }

    // 새로운 타이머 설정
    timerID = setInterval(() => {
        // 게임 오버 체크
        if (!tetris.run()) {
            clearInterval(timerID);  // 타이머 해제
            alert("Game Over!");     // 또는 다른 처리를 수행

            // 다시 시작
            start();
        }
    }, 300);

}


