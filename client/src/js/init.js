import {ROW, COL} from "./constant.js";
import TetrisGame from "./tetrisGame.js";


var tetris;
var timerID;

window.focus();
window.onload =()=> {
    tetris = new TetrisGame();
    init();
}

window.onkeydown = function (e) {
    if(e.key == "ArrowRight") 
        tetris.moveRight();
    else if(e.key == "ArrowLeft") 
        tetris.moveLeft();		
    else if(e.key == " ")
        tetris.moveDirect();
}

function init(){
    createBackgroundBlock();
    start();
}

function start(){
    tetris = new TetrisGame();
    tetris.init();
    
    // timer set
    timerID = setInterval(() => tetris.moveDown(),300);
}

// 배경 블록 생성
 function createBackgroundBlock(){
    const container = document.querySelector(".content");

    for(let i=0; i< ROW; i++){
        for(let j= 0; j< COL; j++){
            let fancy_block = document.createElement("div");
            fancy_block.classList.add('fancy-block');
            
            let left = document.createElement("div");
            left.classList.add('left-frills');
            left.classList.add('frills');
            fancy_block.appendChild(left);

            let block = document.createElement("div");
            block.classList.add('block');
            fancy_block.appendChild(block);
            //blockMapDiv[i*COL + j] = block;

            container.appendChild(fancy_block);
        }
    }
}