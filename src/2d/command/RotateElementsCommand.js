/**
 * Created by dev on 28.01.19.
 */


import Command from './Command';
import Group from './../../model/elements/Group'

export default class RotateElementsCommand extends Command{
    /**
     * @param {Document} document
     * @param {Array.<Element>} elements
     * @param {number} angle
     */
    constructor(document, elements, angle){
        super(document);

        this._elements=elements;

        this.angle=angle;

        this.name= 'RotateElementsCommand';
    }

    /**
     * @inheritDoc
     */
    executeCommand(){
        let group = new Group();
        for(let el of this._elements) {
            group.addElement(el);
        }
        let center = group.getCenter();
        for(let el of this._elements) {
            el.rotate(center, this.angle);
        }
        return true;
    }
}