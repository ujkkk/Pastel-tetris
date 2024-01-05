import { poptAnimation, setColorOfBlock} from "./style.js"
import { ROW, COL, INCREASE_POINT} from "./constant.js"

import { Block } from "./component/block.js";
import { playLineClear } from './component/sound.js';
import { Colors } from "./component/color.js";

/* 블록 삭제 및 점수 관리 클래스 */
class BlockClearer{

    constructor( blockLoc, _blockMap){
        this.blockLoc = blockLoc;
        this.blockMap = _blockMap;
        this.isExist = false;
        this.deleteBlockMap = null;
        this.score = 0;
    }

    // 사라질 블럭 체크 후 삭제
    clearBlocks(){
        this.deleteBlockMap = Array.from(Array(ROW), () => Array(COL).fill(false));
        for(let block of this.blockMap){
            if(block != null){
                this.addClearblockMap(block.row*COL + block.col)
            }
            if(this.isExist){
                this.isExist = false;
                break;
            }
        }
    
        let isDelete = this.deleteClearblockMap();
        
        // 사라질 블록이 없을 때까지 반복
        if(isDelete){
            // 점수 증가
            this.increseScore();
            if(this.checkSpeed()){
                
            }
            // 블록 내려오기
            this.posChange();
            this.clearBlocks();
        }
    }
    
    checkSpeed(){
        return (this.score%(INCREASE_POINT*10))== 0? true : false;
    }
    
    increseScore(){
        this.score += INCREASE_POINT;
        $(".score").html(this.score);
    }

    // 삭제해야할 블록 삭제
    deleteClearblockMap(){
        let isDelete = false;
        
        for(let i=0; i<ROW; i++){
            for(let j=0; j<COL; j++){
                if(this.deleteBlockMap[i][j] == true){
                    if(isDelete == false){
                        // 소리 재생
                        playLineClear();
                        isDelete = true;
                    }
                    let deleteBlockLoc = i*COL + j;
                    poptAnimation(deleteBlockLoc, this.blockMap[deleteBlockLoc].color);
                    setColorOfBlock(deleteBlockLoc, Colors.gray);
                    
                    this.blockMap[deleteBlockLoc] = null;	
                }
            }
        }
        return isDelete;
    }
    
    deepCopy(arr) {
        return JSON.parse(JSON.stringify(arr));
    }
    
    
      posChange(){
        let cloneblockMap = this.deepCopy(this.blockMap);
    
        for(let i=ROW-2; i>=0; i--){
            for(let j = 0; j<COL; j++){
                var curPos = i*COL+j;
                if(this.blockMap[curPos] == null)
                    continue;
    
                var nextPos = curPos + COL;     
                while(this.isRange(Math.floor(nextPos/COL), nextPos%COL)){
                    
                    if(this.blockMap[nextPos]== null){
                        //setColorOfBlock(this.blockLoc, Colors.gray);
                        setColorOfBlock(curPos, Colors.gray);
                        this.blockMap[curPos] = null;
    
                        this.blockMap[nextPos] = new Block(Math.floor(nextPos/COL), nextPos%COL, cloneblockMap[curPos].color);
                        setColorOfBlock(nextPos, this.blockMap[nextPos].getColor())
                        break;
                    }
    
                    nextPos+= COL;
                }
                
            }
        }
        
    }
    
    // 연속된 블록 확인 후 deleteBlockMap 변경
      addClearblockMap(startPos){
        this.addClearBlockAtVertical(startPos);
        if(this.isExist) return;
        this.addClearBlockAtHorizon(startPos);
        if(this.isExist) return;
        this.addClearBlockAtDiagonal1(startPos);
        if(this.isExist) return;
        this.addClearBlockAtDiagonal2(startPos);
    }
    
    
    // 수직 방향으로 연속된 블록 체크
      addClearBlockAtVertical(startPos){
        let isVisited = Array.from(Array(ROW), () => Array(COL).fill(false));
        let dx = [0,0];
        let dy = [1, -1];
        this.dfs(startPos, 0, isVisited, Array(), dx, dy);
    }
    
    // 수평 방향으로 연속된 블록 체크
    addClearBlockAtHorizon(startPos){
        let isVisited = Array.from(Array(ROW), () => Array(COL).fill(false));
        let dx = [1,-1];
        let dy = [0, 0];
        this.dfs(startPos, 0, isVisited, Array(), dx, dy);
    }
    
    // 대각선 방향으로 연속된 블록 체크 (1)
    addClearBlockAtDiagonal1(startPos){
        let isVisited = Array.from(Array(ROW), () => Array(COL).fill(false));
        let dx = [1,-1];
        let dy = [-1, 1];
        this.dfs(startPos, 0, isVisited, Array(), dx, dy);
    }
    
    // 대각선 방향으로 연속된 블록 체크 (2)
    addClearBlockAtDiagonal2(startPos){
        let isVisited = Array.from(Array(ROW), () => Array(COL).fill(false));
        let dx = [1,-1];
        let dy = [1, -1];
        this.dfs(startPos, 0, isVisited, Array(), dx, dy);
    }
    
    isRange(row, col){
        if(row >=0 && row <ROW && col >= 0 && col <COL){
            return true;
        }
        return false;
    }
    
    dfs(pos, depth, isVisited, deleteBlockList, dx, dy){
        if(depth >= 3){
            deleteBlockList.forEach(pos => {
                this.deleteBlockMap[Math.floor(pos/COL)][pos%COL] = true; 
                this.isExist = true;
            });
        }
    
        for(let i=0; i< dx.length; i++){
            let newRow =  Math.floor(pos/COL + dy[i]);
            let newCol =  pos%COL + dx[i];
    
            if(this.isRange(newRow, newCol) && !isVisited[newRow][newCol]){
                let newPos = newRow*COL + newCol;
    
                if(this.blockMap[newPos] != null &&  this.blockMap[pos].color === this.blockMap[newPos].color){
                    deleteBlockList.push(newPos);
                    isVisited[newRow][newCol] = true;   
                    this.dfs(newPos, depth+1, isVisited, deleteBlockList,dx,dy);
                    deleteBlockList.pop();
                }
            }
        }
    }
}

export default BlockClearer;