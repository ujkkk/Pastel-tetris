class Block {
    constructor(_x, _y, _color){
        this.x = _x;
        this.y = _y;
        this.color = _color;
    }

    draw(){
        blocksDiv[this.x*COL+this.y].style.backgroundColor = this.color;
    }
}

const ROW = 10;
const COL = 10;
const container = document.querySelector(".content");
var blockLoc = 0;
var blocks = Array(100).fill(null);
var currentColor;
var blocksDiv = Array();

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
    // blocks[blockLoc].style.backgroundColor = getRandomColor();
    startNew();
    // timer set
	timerID = setInterval("moveDown()",300);
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
    let i = Math.floor(Math.random()*6);
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
    if(blockLoc%COL == COL-1)
        return;
    blocksDiv[blockLoc].style.backgroundColor = colors.gray;		
    blockLoc +=1;
    blocksDiv[blockLoc].style.backgroundColor = currentColor;
}

function moveLeft() {
    if(blockLoc%COL == 0)
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
    addBlock();
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
    }	
}

function addBlock(){
    let i = Math.floor(blockLoc/10);
    let j = blockLoc%10;

    blocks[blockLoc] = new Block(i,j, currentColor);
    blocks[blockLoc].draw();
    startNew();
}


function canDown() {
    if(checkCrushFloor() || checkCrushBlock())
        return false;
    return true;
}

function checkCrushFloor(){
     // 바닥 체크
    if(blockLoc >= 90) 
        return true;
    else
        return false;
}


// 쌓여있는 블록 체크
function checkCrushBlock(){	
    let x = Math.floor(blockLoc/10);
	let y = blockLoc%10;
    for(let i=0; i<blocks.length; i++){
        let currentBlock = blocks[i];
        // 충돌
        if(currentBlock == null)
            continue;
        
         if(x +1 == currentBlock.x && y == currentBlock.y){
            return true;
        }
    }
    return false;
}


// function getTetrominoPos(){
//     let startPos =  Math.floor( Math.random()*(COL-1));
//     let isVisited =  Array.from(Array(4), () => Array(10).fill(false))
//     return bfs(startPos,isVisited);
// }



// function bfs(startPos, isVisited){
//     let dr = [0, 1, 0, -1];
//     let dc = [1, 0, -1, 0];
//     let positionList = new Array();

//     let r =  Math.floor(startPos/COL);
//     let c =  Math.floor(startPos%COL);

//     const que = new Queue();
//     que.enqueue(startPos);
//     isVisited[r][c] = true;
//     positionList.push(startPos);
//     //console.log(startPos);

//     while(!que.isEmpty()){
//         let current = que.dequeue();
//         positionList.push(current);

//         if(positionList.length == 5)
//             return positionList;

//         i = Math.floor(Math.random()*4);
//            let newRow =  Math.floor(current/COL + dr[i]);
//            let newCol =  Math.floor(current%COL + dc[i]);
           
//            if(isRange(newRow, newCol) && !isVisited[newRow][newCol]){
//                 let pos = newRow*COL + newCol;
//                 console.log(pos);
//                 que.enqueue(pos);
//                 isVisited[newRow][newCol] = true;        
//         }
//     }
// }

// function isRange(row, col){
//     if(row >=0 && row <ROW && col >= 0 && col <COL){
//         return true;
//     }
//     return false;
// }
    // blocks.forEach((background_block) =>
    //     {
    //         if(i==4)
    //             return;
    //         let newBlock = document.createElement("div");
    //         newBlock.classList.add('block');
    //         background_block.appendChild(newBlock);
    //         i++;
    //     }
    // )
// function createBlock(parentIndex){
//     let blocks = document.querySelectorAll(".background_block");
//     let i =0;

//     let newBlock = document.createElement("div");
//     newBlock.classList.add('block');
//     blocks[parentIndex].appendChild(newBlock);
// }