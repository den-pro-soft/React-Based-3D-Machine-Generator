/**
 * Created by dev on 07.02.19.
 */

import ElementModificationCommand from './ElementModificationCommand';


export default class ChangeLineTypeCommand extends ElementModificationCommand{
    /**
     * @param {Document} document
     * @param {Array.<Element>} elements
     * @param {LineType} lineType
     */
    constructor(document, elements, lineType){
        super(document, elements);

        this.lineType=lineType;

        this.name= 'ChangeLineTypeCommand';
    }

    /**
     * @inheritDoc
     */
    executeCommand(){
        for(let el of this.elements) {
            el.lineType=this.lineType;
        }
        return true;
    }
}