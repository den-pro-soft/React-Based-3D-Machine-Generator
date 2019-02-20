/**
 * Created by dev on 20.02.19.
 */


import ElementModificationCommand from './ElementModificationCommand';

import Arc from './../../model/elements/Arc';
import Exception from './../../Exception';


export default class ChangeCirclesRadiusCommand extends ElementModificationCommand{
    /**
     * @param {Document} document
     * @param {Array.<Arc>} circles
     * @param {number} radius
     */
    constructor(document, circles, radius){
        super(document, circles);

        for(let circle of circles){
            if(!circle instanceof Arc || circle.incrementAngle!=360){
                throw new Exception('The ChangeCirclesRadiusCommand available only for circles!', circle);
            }
        }
        this._radius = radius;

        this.name= 'ChangeCirclesRadiusCommand';
    }

    /**
     * @inheritDoc
     */
    executeCommand(){
        for(let el of this.elements) {
            el.radius=this._radius;
        }
        return true;
    }
}