/**
 * Created by dev on 17.01.19.
 */

import Command from './Command';
import Group from './../../model/elements/Group';

export default class GroupCommand extends Command{
    /**
     * @param {Document} document
     * @param {Array.<Element>} elements
     */
    constructor(document, elements){
        super(document);

        this._elements=elements;

        this.name= 'GroupCommand';
    }

    /**
     * @inheritDoc
     */
    executeCommand(){
        let group = new Group();
        for(let el of this._elements) {
            group.addElement(el);
            this._document.removeElement(el);
        }
        this._document.addElement(group);
        return true;
    }
}