import { COLOR_SIZE } from "../constant.js";

export function getRandomColor(){
    let i = Math.floor(Math.random() * COLOR_SIZE);
    switch(i) {
        case 0:  // if (x === 'value1')
          return Colors.red;
        case 1:
            return Colors.orange;
        case 2:
            return Colors.mint;
        case 3:
            return Colors.pink;
        case 4:
            return Colors.violet;
        case 5:
            return Colors.yellow;  
    }          
}

export const Colors = {
    gray: "#EFEFEF",
    red: "#F59C9D",
    orange : "#F5C4A2",
    mint:"#98D7DD",
    pink : "#F5D0D4",
    violet : "#D0D0DF",
    yellow : "#F4E5CB"
}