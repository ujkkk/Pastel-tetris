import { moveRight, moveLeft, moveDirect } from "./game.js";
import {init as GameInit, start as GameStart}  from "./game.js";


window.focus();
window.onload =()=> {
    init();
}

window.onkeydown = function (e) {
    if(e.key == "ArrowRight") 
        moveRight();
    else if(e.key == "ArrowLeft") 
        moveLeft();		
    else if(e.key == " ")
        moveDirect();
}

function init(){
    GameInit();
    GameStart();
}
