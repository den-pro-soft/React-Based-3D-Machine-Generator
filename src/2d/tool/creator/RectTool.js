/**
 * Created by dev on 11.01.19.
 */

import CreatorToolsInTwoSteps from './CreatorToolsInTwoSteps';
import RectElementController from '../RectElementControler'

export default class RectTool extends CreatorToolsInTwoSteps{
    constructor(document){
        super(document);

        this.cursor.src = 'images/Rectangle.png';
    }

    get graphicElement(){
        if(this._element) {
            return this._element.toElement();
        }else{
            return null;
        }
    }

    /**
     * @return {RectElementController}
     */
    get rect(){
        return this._element;
    }

    setPosition2(point){
        this.rect.p2=point;
    }

    createElement(point){
        return new RectElementController(point, point);
    }
}