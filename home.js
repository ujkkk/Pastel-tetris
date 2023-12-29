// import Queue from "./Queue.js";
class Queue {
    constructor() {
      this._arr = [];
    }
    enqueue(item) {
      this._arr.push(item);
    }
    dequeue() {
      return this._arr.shift();
    }

    isEmpty(){
        if(this._arr.length === 0)
            return true;
        return false;
    }
  }



const ROW = 10;
const COL = 10;
const container = document.querySelector(".content");

window.onload =()=> {
    init();

}


function createBlock(parentIndex){
    let blocks = document.querySelectorAll(".background_block");
    let i =0;

    let newBlock = document.createElement("div");
    newBlock.classList.add('block');
    blocks[parentIndex].appendChild(newBlock);
}

function init(){
    createBackgroundBlock()

    // timer set
	//timerID = setInterval("moveDown()",1000);
}

// 테스리스 배경 블록 생성
function createBackgroundBlock(){
    for(let i=0; i< ROW; i++){
        for(let j= 0; j< COL; j++){
            let bolck = document.createElement("div");
            bolck.classList.add('background_block');
            container.appendChild(bolck);
        }
    }
}


function moveDown(){
    const positionList = getTetrominoPos();

    positionList.forEach(position => createBlock(position));

}

function getTetrominoPos(){
    let startPos =  Math.floor( Math.random()*(COL-1));
    let isVisited =  Array.from(Array(4), () => Array(10).fill(false))
    
    return bfs(startPos,isVisited);
}

function bfs(startPos, isVisited){
    let dr = [0, 1, 0, -1];
    let dc = [1, 0, -1, 0];
    let positionList = new Array();

    let r =  Math.floor(startPos/COL);
    let c =  Math.floor(startPos%COL);

    const que = new Queue();
    que.enqueue(startPos);
    isVisited[r][c] = true;
    positionList.push(startPos);
    //console.log(startPos);

    while(!que.isEmpty()){
        let current = que.dequeue();
        positionList.push(current);

        if(positionList.length == 5)
            return positionList;

        i = Math.floor(Math.random()*4);
           let newRow =  Math.floor(current/COL + dr[i]);
           let newCol =  Math.floor(current%COL + dc[i]);
           
           if(isRange(newRow, newCol) && !isVisited[newRow][newCol]){
                let pos = newRow*COL + newCol;
                console.log(pos);
                que.enqueue(pos);
                isVisited[newRow][newCol] = true;
           
        }
    }



}

function isRange(row, col){
    if(row >=0 && row <ROW && col >= 0 && col <COL){
        return true;
    }
    return false;
}
    



    
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
