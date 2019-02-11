/**
 * Created by dev on 11.02.19.
 */

import ElementModificationCommand from './ElementModificationCommand';

export default class ChangeTextCommand extends ElementModificationCommand{
    /**
     * @param {Document} document
     * @param {Array.<Element>} elements
     * @param {string} text
     */
    constructor(document, elements, text){
        super(document, elements);

        this.text=text;

        this.name= 'ChangeTextCommand';
    }

    /**
     * @inheritDoc
     */
    executeCommand(){
        this.elements[0].text=this.text;
        return true;
    }
}