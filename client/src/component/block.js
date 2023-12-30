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

export default Block;