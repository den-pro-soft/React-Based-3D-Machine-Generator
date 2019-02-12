/**
 * Created by dev on 11.02.19.
 */

import ElementModificationCommand from './ElementModificationCommand';

export default class ChangeFontSizeCommand extends ElementModificationCommand{
    /**
     * @param {Document} document
     * @param {Array.<Element>} elements
     * @param {number} fontSize
     */
    constructor(document, elements, fontSize){
        super(document, elements);

        this.fontSize=fontSize;

        this.name= 'ChangeFontSizeCommand';
    }

    /**
     * @inheritDoc
     */
    executeCommand(){
        this.elements[0].fontSize=this.fontSize;
        return true;
    }
}