import { Block } from "./component/block.js";
import { Colors, getRandomColor } from "./component/color.js";
import { poptAnimation} from "./style.js"
import {ROW, COL, INCREASE_POINT} from "./constant.js"
import { playLineClear } from './component/sound.js';

var blockLoc;
var blocks;
var nextColor;
var currentColor;
var blocksDiv;
var deleteBlockMap;
var score;
var timerID;
var isExist;

export function init(){
    isExist = false;
    blockLoc = 0;
    score = 0;
    blocks = Array(ROW*COL).fill(null);
    blocksDiv = Array(ROW*COL).fill(null);
    deleteBlockMap = Array.from(Array(ROW), () => Array(COL).fill(false));
}

export function start(){
    createBackgroundBlock();
    startNew();
    // timer set
    timerID = setInterval(moveDown,300);
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
            block.classList.add('background_block');
            fancy_block.appendChild(block);
            blocksDiv[i*COL + j] = block;

            container.appendChild(fancy_block);
        }
    }
}

export function moveRight() {
    if(blockLoc%COL == COL-1 || checkCrushWithSideBlock(true) || !canDown())
        return;
    blocksDiv[blockLoc].style.backgroundColor = Colors.gray;		
    blockLoc +=1;
    blocksDiv[blockLoc].style.backgroundColor = currentColor;
}

export function moveLeft() {
    if(blockLoc%COL == 0 || checkCrushWithSideBlock(false) || !canDown())
        return; 		
    blocksDiv[blockLoc].style.backgroundColor = Colors.gray;	
    blockLoc -= 1;
    blocksDiv[blockLoc].style.backgroundColor = currentColor;
}

export function moveDirect(){
    blocksDiv[blockLoc].style.backgroundColor = Colors.gray;
    while(!checkCrushBlock() && !checkCrushFloor()){
        blockLoc += (COL);
        if(blockLoc >= ROW*COL){
            blockLoc -= COL;
            break;
        }
    }
    blocksDiv[blockLoc].style.backgroundColor = currentColor;
    // 더 이상 내려 갈 수 없는 경우, 블록 객체를 배열에 삽입함
    addBlock();
    // 연속 블록 체크
    checkClearBlocks();
}

export function moveDown(){
	if(canDown()) {
        blocksDiv[blockLoc].style.backgroundColor = Colors.gray;			
        blockLoc += COL;
        blocksDiv[blockLoc].style.backgroundColor = currentColor;
    }
    else {
        // 더 이상 내려 갈 수 없는 경우, 블록 객체를 배열에 삽입함
        addBlock();
        // 연속 블록 체크
        checkClearBlocks();
    }	
}

 function startNew() {
    // new start
    blockLoc = Math.floor(Math.random()*COL);
    if(currentColor == null)
        currentColor = getRandomColor();
    else currentColor = nextColor;
    
    blocksDiv[blockLoc].style.backgroundColor = currentColor;
    selectNextColor();
}

 function addBlock(){
    let row = Math.floor(blockLoc/COL);
    let col = blockLoc%COL;

    blocks[blockLoc] = new Block(row,col, currentColor);
    drawBlockOnMap(blockLoc, currentColor);
   // blocks[blockLoc].draw();

    startNew();
}

 function drawBlockOnMap(index, color){
    blocksDiv[index].style.backgroundColor = color;
}

 function selectNextColor(){
    nextColor = getRandomColor();
    $(".next-block").css("background-color", nextColor);
}

 function canDown() {
    if(checkCrushFloor() || checkCrushBlock())
        return false;
    return true;
}

 function checkCrushFloor(){
     // 바닥 체크
    if(blockLoc >= COL*ROW - COL) 
        return true;
    else
        return false;
}

 function checkCrushWithSideBlock(isRight){
    let row = Math.floor(blockLoc/COL);
	let col = blockLoc%COL;

    for(let i=0; i<blocks.length; i++){
        let existedBlock = blocks[i];
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
 function checkCrushBlock(){	
    let row = Math.floor(blockLoc/COL);
	let col = blockLoc%COL;

    for(let i=0; i<blocks.length; i++){
        let existedBlock = blocks[i];
        // 충돌
        if(existedBlock == null)
            continue;
        
         if(row+1 == existedBlock.row && col == existedBlock.col){
            return true;
        }
    }
    return false;
}

function sleep(ms) {
    const wakeUpTime = Date.now() + ms;
    while (Date.now() < wakeUpTime) {}
}

// 사라질 블럭 체크 후 삭제
 function checkClearBlocks(){
    deleteBlockMap = Array.from(Array(ROW), () => Array(COL).fill(false));
    for(let block of blocks){
        if(block != null){
            addClearBlocks(block.row*COL + block.col)
        }
        if(isExist){
            isExist = false;
            break;
        }
    }

    let isDelete = deleteClearBlocks();
    
    // 사라질 블록이 없을 때까지 반복
    if(isDelete){
        // 점수 증가
        increseScore();
        if(checkSpeed){
            
        }
        // 블록 내려오기
        posChange();
        checkClearBlocks();
    }
}

 function checkSpeed(){
    return (score%(INCREASE_POINT*10))== 0? true : false;
}

 function increseScore(){
    score += INCREASE_POINT;
    $(".score").html(score);
    
}
// 삭제해야할 블록 삭제
 function deleteClearBlocks(){
    let isDelete = false;
    
    for(let i=0; i<ROW; i++){
        for(let j=0; j<COL; j++){
            if(deleteBlockMap[i][j] == true){
                if(isDelete == false){
                    // 소리 재생
                    playLineClear();
                    isDelete = true;
                }
                let deleteBlockLoc = i*COL + j;
                poptAnimation(deleteBlockLoc, blocks[deleteBlockLoc].color);
                blocksDiv[deleteBlockLoc].style.backgroundColor = Colors.gray;
                blocks[deleteBlockLoc] = null;	
            }
        }
    }
    return isDelete;
}

 function deepCopy(arr) {
    return JSON.parse(JSON.stringify(arr));
}


 function posChange(){
    let cloneBlocks = deepCopy(blocks);

    for(let i=ROW-2; i>=0; i--){
        for(let j = 0; j<COL; j++){
            var curPos = i*COL+j;
            if(blocks[curPos] == null)
                continue;

            var nextPos = curPos + COL; 
            //      
            while(isRange(Math.floor(nextPos/COL), nextPos%COL)){
                
                if(blocks[nextPos]== null){
                    blocksDiv[curPos].style.backgroundColor = Colors.gray;
                    blocks[curPos] = null;

                    blocks[nextPos] = new Block(Math.floor(nextPos/COL), nextPos%COL, cloneBlocks[curPos].color);
                    drawBlockOnMap(nextPos, blocks[nextPos].getColor());
                    //blocks[nextPos].draw();
                    break;
                }

                nextPos+= COL;
            }
            
        }
    }
    
}


// 연속된 블록 확인 후 deleteBlockMap 변경
 function addClearBlocks(startPos){
    addClearBlockAtVertical(startPos);
    if(isExist) return;
    addClearBlockAtHorizon(startPos);
    if(isExist) return;
    addClearBlockAtDiagonal1(startPos);
    if(isExist) return;
    addClearBlockAtDiagonal2(startPos);
}


// 수직 방향으로 연속된 블록 체크
export function addClearBlockAtVertical(startPos){
    let isVisited = Array.from(Array(ROW), () => Array(COL).fill(false));
    let dx = [0,0];
    let dy = [1, -1];
    dfs(startPos, 0, isVisited, Array(), dx, dy);
}

// 수평 방향으로 연속된 블록 체크
export function addClearBlockAtHorizon(startPos){
    let isVisited = Array.from(Array(ROW), () => Array(COL).fill(false));
    let dx = [1,-1];
    let dy = [0, 0];
    dfs(startPos, 0, isVisited, Array(), dx, dy);
}

// 대각선 방향으로 연속된 블록 체크 (1)
export function addClearBlockAtDiagonal1(startPos){
    let isVisited = Array.from(Array(ROW), () => Array(COL).fill(false));
    let dx = [1,-1];
    let dy = [-1, 1];
    dfs(startPos, 0, isVisited, Array(), dx, dy);
}

// 대각선 방향으로 연속된 블록 체크 (2)
export function addClearBlockAtDiagonal2(startPos){
    let isVisited = Array.from(Array(ROW), () => Array(COL).fill(false));
    let dx = [1,-1];
    let dy = [1, -1];
    dfs(startPos, 0, isVisited, Array(), dx, dy);
}

export function isRange(row, col){
    if(row >=0 && row <ROW && col >= 0 && col <COL){
        return true;
    }
    return false;
}

export function dfs(pos, depth, isVisited, deleteBlockList, dx, dy){
    if(depth >= 3){
        deleteBlockList.forEach(pos => {
            deleteBlockMap[Math.floor(pos/COL)][pos%COL] = true; 
            isExist = true;
        });
    }

    for(let i=0; i< dx.length; i++){
        let newRow =  Math.floor(pos/COL + dy[i]);
        let newCol =  pos%COL + dx[i];

        if(isRange(newRow, newCol) && !isVisited[newRow][newCol]){
            let newPos = newRow*COL + newCol;

            if(blocks[newPos] != null &&  blocks[pos].color === blocks[newPos].color){
                deleteBlockList.push(newPos);
                isVisited[newRow][newCol] = true;   
                dfs(newPos, depth+1, isVisited, deleteBlockList,dx,dy);
                deleteBlockList.pop();
            }
        }
    }
}
