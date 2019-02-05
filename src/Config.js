/**
 * Created by dev on 30.01.19.
 *
 */

let moveStep = 10;
let rotateStep = 15;

export default class Config{
    static get moveStep(){return moveStep};
    static set moveStep(value){moveStep=value};
    static get rotateStep(){return rotateStep};
    static set rotateStep(value){rotateStep=value};

    
}

