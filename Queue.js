export class Queue {
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
        if(this._arr.length == 0)
            return true;
        return false;
    }
  }

