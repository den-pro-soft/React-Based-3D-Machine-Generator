/**
 * Created by dev on 07.02.19.
 */

import RotateElementsCommand from './RotateElementsCommand';

export default class CopyRotateCommand extends RotateElementsCommand{
    /**
     * @param {Document} document
     * @param {Array.<Element>} elements
     * @param {number} angle
     */
    constructor(document, elements, angle){
        super(document, elements, angle);
        this.name='CopyRotateCommand';
    }

    /**
     * @inheritDoc
     */
    executeCommand(){
        for(let el of this._elements) {
            let temp = el.copy();
            temp.generateNewId();
            this._document.addElement(temp);
        }
        return super.executeCommand();
    }
}