/**
 * Created by dev on 20.02.19.
 */


import ElementModificationCommand from './ElementModificationCommand';

import LineElement from './../../model/elements/LineElement';
import Trigonometric from './../../model/math/Trigonometric';
import Vector from './../../model/math/Vector';


export default class ChangeLineLengthCommand extends ElementModificationCommand{
    /**
     * @param {Document} document
     * @param {Array.<Element>} elements
     * @param {number} length
     */
    constructor(document, elements, length){
        super(document, elements);

        if(!elements || elements.length!=1){
            throw new Exception('For use the function must be selected only one Line element!');
        }
        if(!elements[0] instanceof LineElement){
            throw new Exception('For use the function must be selected Line element!');
        }

        this.length=length;

        this.name= 'ChangeLineLengthCommand';
    }

    /**
     * @inheritDoc
     */
    executeCommand(){
        /** @type {Line} */
        let line  = this.elements[0]._line;

        let angle  = new Vector(1,0,0).getAngle(line.toVector());
        let dx = this.length * Math.cos(Trigonometric.gradToRad(angle));
        let dy = this.length * Math.sin(Trigonometric.gradToRad(angle));

        this.elements[0].p2.y = this.elements[0].p1.y + dy;
        this.elements[0].p2.x = this.elements[0].p1.x + dx;

        return true;
    }
}