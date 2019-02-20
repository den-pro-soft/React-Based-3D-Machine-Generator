/**
 * Created by dev on 20.02.19.
 */

import ElementModificationCommand from './ElementModificationCommand';

import LineElement from './../../model/elements/LineElement';
import Trigonometric from './../../model/math/Trigonometric';
import Vector from './../../model/math/Vector';


export default class ChangeLineAngleCommand extends ElementModificationCommand{
    /**
     * @param {Document} document
     * @param {Array.<Element>} elements
     * @param {number} angle
     */
    constructor(document, elements, angle){
        super(document, elements);

        if(!elements || elements.length!=1){
            throw new Exception('For use the function must be selected only one Line element!');
        }
        if(!elements[0] instanceof LineElement){
            throw new Exception('For use the function must be selected Line element!');
        }

        this.angle=angle;

        this.name= 'ChangeLineAngleCommand';
    }

    /**
     * @inheritDoc
     */
    executeCommand(){
        /** @type {Line} */
        let line  = this.elements[0]._line;

        let angle  = new Vector(1,0,0).getAngle(line.toVector());

        let deltaAngle = angle-this.angle;

        let center = this.elements[0].getCenter();

        this.elements[0].rotate(center, deltaAngle);

        return true;
    }
}