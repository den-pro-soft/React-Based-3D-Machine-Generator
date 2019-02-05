/**
 * Created by dev on 04.02.19.
 */

import Command from './Command';
import Group from './../../model/elements/Group'

export default class MirrorElementsCommand extends Command{
    /**
     * @param {Document} document
     * @param {Array.<Element>} elements
     * @param {string} axis - the const from Trigonometric class
     */
    constructor(document, elements, axis){
        super(document);

        this._elements=elements;

        this.axis=axis;

        this.name= 'MirrorElementsCommand';
    }

    /**
     * @inheritDoc
     */
    executeCommand(){
        let group = new Group();
        for(let el of this._elements) {
            group.addElement(el);
        }
        group.mirror(this.axis);
        return true;
    }
}