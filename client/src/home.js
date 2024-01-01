
import { playLineClear } from './sound.js';

class Block {
    constructor(_row, _col, _color){
        this.row = _row;
        this.col = _col;
        this.color = _color;
    }

    draw(){
        blocksDiv[this.row*COL+this.col].style.backgroundColor = this.color;
    }
}

const COLOR_SIZE = 6;
const ROW = 10;
const COL = 10;
const container = document.querySelector(".content");
var blockLoc = 0;
var blocks = Array(100).fill(null);
var currentColor;
var blocksDiv = Array();
var deleteBlockMap = Array.from(Array(10), () => Array(10).fill(false));
let timerID;
let timerID2;

const colors = {
    gray: "#EFEFEF",
    red: "#F59C9D",
    orange : "#F5C4A2",
    mint:"#98D7DD",
    pink : "#F5D0D4",
    violet : "#D0D0DF",
    yellow : "#F4E5CB"
}


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
    createBackgroundBlock();
    startNew();
    // timer set
	timerID = setInterval(moveDown,300);
}


// 배경 블록 생성
function createBackgroundBlock(){
    for(let i=0; i< ROW; i++){
        for(let j= 0; j< COL; j++){
            let block = document.createElement("div");
            block.classList.add('background_block');
            container.appendChild(block);
            blocksDiv.push(block);
        }
    }
}

function startNew() {
    // new start
    blockLoc = Math.floor(Math.random()*10);
    currentColor = getRandomColor();
    blocksDiv[blockLoc].style.backgroundColor = currentColor;
}

function getRandomColor(){
    let i = Math.floor(Math.random()*COLOR_SIZE);
    switch(i) {
        case 0:  // if (x === 'value1')
          return colors.red;
        case 1:
            return colors.orange;
        case 2:
            return colors.mint;
        case 3:
            return colors.pink;
        case 4:
            return colors.violet;
        case 5:
            return colors.yellow;  
    }          
}

function moveRight() {
    if(blockLoc%COL == COL-1 || checkCrushWithSideBlock(true))
        return;
    blocksDiv[blockLoc].style.backgroundColor = colors.gray;		
    blockLoc +=1;
    blocksDiv[blockLoc].style.backgroundColor = currentColor;
}

function moveLeft() {
    if(blockLoc%COL == 0 || checkCrushWithSideBlock(false))
        return; 		
    blocksDiv[blockLoc].style.backgroundColor = colors.gray;	
    blockLoc -= 1;
    blocksDiv[blockLoc].style.backgroundColor = currentColor;
}

function moveDirect(){
    blocksDiv[blockLoc].style.backgroundColor = colors.gray;
    while(!checkCrushBlock() && !checkCrushFloor()){
        blockLoc += (10);
        if(blockLoc >= 100){
            blockLoc -= 10;
            break;
        }
    }
    blocksDiv[blockLoc].style.backgroundColor = currentColor;
    // 더 이상 내려 갈 수 없는 경우, 블록 객체를 배열에 삽입함
    addBlock();
    // 연속 블록 체크
    checkClearBlocks();
}

function moveDown(){
	if(canDown()) {
        blocksDiv[blockLoc].style.backgroundColor = colors.gray;			
        blockLoc += 10;
        blocksDiv[blockLoc].style.backgroundColor = currentColor;
    }
    else {
        // 더 이상 내려 갈 수 없는 경우, 블록 객체를 배열에 삽입함
        addBlock();
        // 연속 블록 체크
        checkClearBlocks();
    }	
}

function addBlock(){
    let row = Math.floor(blockLoc/10);
    let col = blockLoc%10;

    blocks[blockLoc] = new Block(row,col, currentColor);
    blocks[blockLoc].draw();
    animation();

    startNew();
}

function animation(){
    $(".background_block").bind('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function(){
        $(this).removeClass('active');
    })
     $(this).addClass("active");
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
    let row = Math.floor(blockLoc/10);
	let col = blockLoc%10;

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
    let row = Math.floor(blockLoc/10);
	let col = blockLoc%10;

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
    deleteBlockMap = Array.from(Array(10), () => Array(10).fill(false));
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
        // 블록 내려오기
        posChange();
        checkClearBlocks();
    }
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
                blocksDiv[deleteBlockLoc].style.backgroundColor = colors.gray;
                blocks[deleteBlockLoc] = null;	
            }
        }
    }
    return isDelete;
}

function repaint(){
    for(let i=0; i<COL*ROW; i++){
        if(blocks[i] == null){
            blocksDiv[i].style.backgroundColor = colors.gray;
            continue;
        }
        blocks[i].draw();
    }
}


function deepCopy(arr) {
    return JSON.parse(JSON.stringify(arr));
}

// 사라진 블록에 맞춰 블록 떨어지기
function posChange(){
    let cloneBlocks = deepCopy(blocks);
    let deleteCounts = Array(COL).fill(0);

    for(let i=0; i<ROW; i++){
        for(let j=0; j<COL; j++){
            if(deleteBlockMap[i][j] == true)
                deleteCounts[j]++;
        }
    }
     
    for(let col=0; col<COL; col++){
        let row = 0;
        let isFirst = true;
        while(row<ROW && deleteBlockMap[row][col] != true){
            let curPos = row*COL + col;
            row++;
            if(blocks[curPos]== null){
                continue;
            }
                
            // 가장 위에 있는 칸 삭제
            if(isFirst){
                for(let i=0; i<deleteCounts[col]; i++){
                    blocks[curPos+i*ROW] = null;
                    blocksDiv[curPos+i*ROW].style.backgroundColor = colors.gray;
                    isFirst = false;
                }
            }

            let nextPos = curPos + COL*deleteCounts[col];
            blocks[nextPos] = new Block(Math.floor(nextPos/COL),nextPos%COL, cloneBlocks[curPos].color);
            blocks[nextPos].draw();
        
        }
    }
}

var isExist = false;

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
function addClearBlockAtVertical(startPos){
    let isVisited = Array.from(Array(10), () => Array(10).fill(false));
    let dx = [0,0];
    let dy = [1, -1];
    dfs(startPos, 0, isVisited, Array(), dx, dy);
}

// 수평 방향으로 연속된 블록 체크
function addClearBlockAtHorizon(startPos){
    let isVisited = Array.from(Array(10), () => Array(10).fill(false));
    let dx = [1,-1];
    let dy = [0, 0];
    dfs(startPos, 0, isVisited, Array(), dx, dy);
}

// 대각선 방향으로 연속된 블록 체크 (1)
function addClearBlockAtDiagonal1(startPos){
    let isVisited = Array.from(Array(10), () => Array(10).fill(false));
    let dx = [1,-1];
    let dy = [-1, 1];
    dfs(startPos, 0, isVisited, Array(), dx, dy);
}

// 대각선 방향으로 연속된 블록 체크 (2)
function addClearBlockAtDiagonal2(startPos){
    let isVisited = Array.from(Array(10), () => Array(10).fill(false));
    let dx = [1,-1];
    let dy = [1, -1];
    dfs(startPos, 0, isVisited, Array(), dx, dy);
}

function isRange(row, col){
    if(row >=0 && row <ROW && col >= 0 && col <COL){
        return true;
    }
    return false;
}

function dfs(pos, depth, isVisited, deleteBlockList, dx, dy){
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
