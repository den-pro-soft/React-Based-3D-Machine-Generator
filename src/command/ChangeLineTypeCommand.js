/**
 * Created by dev on 07.02.19.
 */

import ElementModificationCommand from './ElementModificationCommand';
import ChangeLineTypeDataValidator from "./behaviors/ChangeLineTypeDataValidator";


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

        this.behaviors.push(new ChangeLineTypeDataValidator(this));
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