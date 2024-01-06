import {ROW, COL} from "./constant.js"
import {drawBlock} from "./style.js"

import { Block } from "./component/block.js";
import { Colors, getRandomColor } from "./component/color.js";

/* 블록 이동 및 충돌 관리 클래스*/
class BlockManager{
    constructor(blockLoc, _blockMap){
        this.blockLoc = blockLoc;
        this.blockMap = _blockMap;

        /* 색상 관련 변수 */
        this.nextColor = null;
        this.currentColor = null;
    }

    moveRight() {
        if(this.blockLoc%COL == COL-1 || this.checkCrushWithSideBlock(true) || !this.canDown())
            return;
        drawBlock(this.blockLoc, Colors.gray);
        this.blockLoc +=1;
        drawBlock(this.blockLoc, this.currentColor);
    }
    
    moveLeft() {
        if(this.blockLoc%COL == 0 || this.checkCrushWithSideBlock(false) || !this.canDown())
            return; 		
        drawBlock(this.blockLoc, Colors.gray);
        this.blockLoc -= 1;
        drawBlock(this.blockLoc, this.currentColor);
    }
    
    moveDirect(){
        drawBlock(this.blockLoc, Colors.gray);
        while(this.canDown()){
            this.blockLoc += (COL);
            if(this.blockLoc >= ROW*COL){
                this.blockLoc -= COL;
                break;
            }
        }
        drawBlock(this.blockLoc, this.currentColor);
        // 더 이상 내려 갈 수 없는 경우, 블록 객체를 배열에 삽입함
        this.addBlock();
        this.startNew();
    
    }
    
    moveDown(){
        if(this.canDown()) {
            drawBlock(this.blockLoc, Colors.gray);		
            this.blockLoc += COL;
            drawBlock(this.blockLoc, this.currentColor);
            return true;
        }
        this.addBlock();
        return false;	
    }

    checkGameOver(){
        if(!this.canDown() &&Math.floor(this.blockLoc/COL) == 0)
            return true;
        return false;
    }
    
    // 블록 추가
    addBlock(){
        let row = Math.floor(this.blockLoc/COL);
        let col = this.blockLoc%COL;
    
        this.blockMap[this.blockLoc] = new Block(row,col, this.currentColor);
        drawBlock(this.blockLoc, this.currentColor);
    }

    // 새블록 시작
    startNew() {
        // new start
        this.blockLoc = 4;
        if(!this.currentColor)
            this.currentColor = getRandomColor();
        else 
            this.currentColor = this.nextColor;
        
        drawBlock(this.blockLoc, this.currentColor);
        this.selectNextColor();
    }
    
     selectNextColor(){
        this.nextColor = getRandomColor();
        $(".next-block").css("background-color", this.nextColor);
    }
    
    canDown() {
        if(this.checkCrushFloor() || this.checkCrushBlock())
            return false;
        return true;
    }
    
    checkCrushFloor(){
         // 바닥 체크
        if(this.blockLoc >= COL*ROW - COL) 
            return true;
        else
            return false;
    }
    
     checkCrushWithSideBlock(isRight){
        let row = Math.floor(this.blockLoc/COL);
        let col = this.blockLoc%COL;
    
        for(let i=0; i<this.blockMap.length; i++){
            let existedBlock = this.blockMap[i];
            // 충돌
            if(existedBlock == null)
                continue;
            
             if(row+1 == existedBlock.row && col == existedBlock.col+(isRight? -1 : 1)){
                return true;
            }
        }
        return false;
    }
    
    // 쌓여있는 블록 체크
     checkCrushBlock(){	
        let row = Math.floor(this.blockLoc/COL);
        let col = this.blockLoc%COL;
    
        for(let i=0; i< this.blockMap.length; i++){
            let existedBlock = this.blockMap[i];
            // 충돌
            if(existedBlock == null)
                continue;
            
             if(row+1 == existedBlock.row && col == existedBlock.col){
                return true;
            }
        }
        return false;
    }
    
}

export default BlockManager;