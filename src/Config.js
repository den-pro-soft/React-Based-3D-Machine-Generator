/**
 * Created by dev on 30.01.19.
 *
 */
import AutoLineType from './model/line_types/Auto';
import CommentToSelfLineType from './model/line_types/CommentToSelf';




let moveStep = 10;
let rotateStep = 15;

let demensions;
let lengthLine = '';
let mouseX = 0;
let mouseY = 0;

let lineType = new AutoLineType();

let fontSize = 3;

export default class Config{
    static get moveStep(){return moveStep};
    static set moveStep(value){moveStep=value};
    static get rotateStep(){return rotateStep};
    static set rotateStep(value){rotateStep=value};

    static get demensions(){return demensions};
    static set demensions(value){demensions=value};

    static get lengthLine(){return lengthLine};
    static set lengthLine(value){lengthLine=value};
    static get mouseX(){return mouseX};
    static set mouseX(value){mouseX=value};
    static get mouseY(){return mouseY};
    static set mouseY(value){mouseY=value};

    static get lineType(){return lineType};
    static set lineType(value){lineType=value};

    static get defaultLineTypes(){
        return [
            new AutoLineType(),
            new CommentToSelfLineType()
        ];
    }

    static get fontSize(){return fontSize};
}

