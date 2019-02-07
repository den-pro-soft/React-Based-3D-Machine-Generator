/**
 * Created by dev on 04.02.19.
 */

import ElementModificationCommand from './ElementModificationCommand';
import Group from './../../model/elements/Group'

export default class MirrorElementsCommand extends ElementModificationCommand{
    /**
     * @param {Document} document
     * @param {Array.<Element>} elements
     * @param {string} axis - the const from Trigonometric class
     */
    constructor(document, elements, axis){
        super(document, elements);

        this.axis=axis;

        this.name= 'MirrorElementsCommand';
    }

    /**
     * @inheritDoc
     */
    executeCommand(){
        let group = new Group();
        for(let el of this.elements) {
            group.addElement(el);
        }
        group.mirror(this.axis);
        return true;
    }
}