/**
 * Created by dev on 28.01.19.
 */


import ElementModificationCommand from './ElementModificationCommand';
import Group from '../model/elements/Group'

export default class RotateElementsCommand extends ElementModificationCommand{
    /**
     * @param {Document} document
     * @param {Array.<Element>} elements
     * @param {number} angle
     */
    constructor(document, elements, angle){
        super(document, elements);

        this.angle=angle;

        this.name= 'RotateElementsCommand';
    }

    /**
     * @inheritDoc
     */
    executeCommand(){
        let group = new Group();
        for(let el of this.elements) {
            group.addElement(el);
        }
        let center = group.getCenter();
        group.rotate(center, this.angle);
        return true;
    }
}