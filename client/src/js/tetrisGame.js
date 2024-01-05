
import {ROW, COL} from "./constant.js"

import BlockManager from "./blockManager.js";
import BlockClearer from "./blockClearer.js"


class TetrisGame{
    constructor() {
        /* 주요 변수 */
        this.blockLoc = 0;// 블록의 현재 위치
        this.blockMap = Array(ROW * COL).fill(null); // Block list
        this.deleteBlockMap = Array.from(Array(ROW), () => Array(COL).fill(false));
        
        this.blockManager = new BlockManager(this.blockLoc, this.blockMap);
        this.blockClearer = new BlockClearer(this.blockLoc, this.blockMap);
        // this.isExist = false;
        // this.score = 0;
        // this.timerID = null;
    }

    init(){
        this.blockManager.startNew();
    }

    /* 블록 조작 관련 함수 */
    moveRight() {
        this.blockManager.moveRight();
    }
    
    moveLeft() {
        this.blockManager.moveLeft();
    }
    
    moveDirect(){
        this.blockManager.moveDirect();
        // 연속 블록 체크
        this.blockClearer.clearBlocks();
    }
    
    moveDown(){
        if(!this.blockManager.moveDown()){
            // 연속 블록 체크
            this.blockClearer.clearBlocks();
        }
	
    }
}

export default TetrisGame;
    
