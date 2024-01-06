
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
        
    }

    init(){
        this.createBackgroundBlock();
        this.blockManager.startNew();
    }

    run(){
        // 블록 떨어지기
        if(!this.blockManager.moveDown()){
            if(this.isGameOver())
                return false;
            // 새 블록 생성
            this.blockManager.startNew()
            // 연속 블록 체크
            this.blockClearer.clearBlocks();
             
        }
        return true;
    }

    isGameOver(){
        if(this.blockManager.checkGameOver())
            return true;

        return false;
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

    // 배경 블록 생성
    createBackgroundBlock(){
        const container = document.querySelector(".content");
        
        // container의 모든 자식 요소를 제거
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

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
    
}

export default TetrisGame;
    
