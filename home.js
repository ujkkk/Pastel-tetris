const ROW = 20;
const COL = 10;
const container = document.querySelector(".content");

window.onload =()=> {
    init();

}


function init(){
    createBackgroundBlock()

    // timer set
	timerID = setInterval("moveDown()",300);
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



function createBlock(){
    let blocks = document.querySelectorAll(".background_block");
    let i =0;

    let newBlock = document.createElement("div");
    newBlock.classList.add('block');
    blocks[1].appendChild(newBlock);

    newBlock = document.createElement("div");
    newBlock.classList.add('block');
    blocks[3].appendChild(newBlock);

    newBlock = document.createElement("div");
    newBlock.classList.add('block');
    blocks[5].appendChild(newBlock);

    newBlock = document.createElement("div");
    newBlock.classList.add('block');
    blocks[11].appendChild(newBlock);
    
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
}