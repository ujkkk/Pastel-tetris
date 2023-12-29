function Block(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;

    // 필요한 메소드 삽입하세요.
    this.draw = function () {
        tds[x*10+y].style.backgroundColor = this.color;
    }
}