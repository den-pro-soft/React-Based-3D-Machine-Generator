/**
 * Created by dev on 17.01.19.
 */

import ElementModificationCommand from './ElementModificationCommand';
import Group from '../model/elements/Group';

export default class GroupCommand extends ElementModificationCommand{
    /**
     * @param {Document} document
     * @param {Array.<Element>} elements
     */
    constructor(document, elements){
        super(document,elements);

        this.name= 'GroupCommand';

        this.group = null;
    }

    /**
     * @inheritDoc
     */
    executeCommand(){
        this.group = new Group();
        for(let el of this.elements) {
            this.group.addElement(el);
            this._document.removeElement(el);
        }
        this._document.addElement(this.group);
        return true;
    }

    isReplacedElements(){
        return true;
    }

    /**
     * The realisation of the  @see {@link isReplacedElements} method.
     * @return {Array.<GraphicElement>|null} - new elements or null
     * @protected
     */
    getReplaceElements(){
        return [this.group];
    }
}