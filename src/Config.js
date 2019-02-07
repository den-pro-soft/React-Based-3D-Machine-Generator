/**
 * Created by dev on 30.01.19.
 *
 */
import AutoLineType from './model/line_types/Auto';
import CommentToSelfLineType from './model/line_types/CommentToSelf';




let moveStep = 10;
let rotateStep = 15;

let lineType = new AutoLineType();

export default class Config{
    static get moveStep(){return moveStep};
    static set moveStep(value){moveStep=value};
    static get rotateStep(){return rotateStep};
    static set rotateStep(value){rotateStep=value};

    static get lineType(){return lineType};
    static set lineType(value){lineType=value};

    static get defaultLineTypes(){
        return [
            new AutoLineType(),
            new CommentToSelfLineType()
        ];
    }
}

