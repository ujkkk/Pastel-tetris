class Block {
    constructor(_x, _y, _color){
        this.x = _x;
        this.y = _y;
        this.color = _color;
    }

    // 필요한 메소드 삽입하세요.
    draw(){
        tds[x*10+y].style.backgroundColor = this.color;
    }
}

export default Block;