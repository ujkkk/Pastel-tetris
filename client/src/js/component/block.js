export class Block {
    constructor(_row, _col, _color){
        this.row = _row;
        this.col = _col;
        this.color = _color;
    }

    getColor(){
        return this.color;
    }

    // draw(blockMapDiv){
    //     blockMapDiv[this.row*COL+this.col].style.backgroundColor = this.color;
    // }
}
