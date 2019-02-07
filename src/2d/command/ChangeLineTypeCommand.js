/**
 * Created by dev on 07.02.19.
 */

import Command from './Command';


export default class ChangeLineTypeCommand extends Command{
    /**
     * @param {Document} document
     * @param {Array.<Element>} elements
     * @param {LineType} lineType
     */
    constructor(document, elements, lineType){
        super(document);

        this._elements=elements;

        this.lineType=lineType;

        this.name= 'ChangeLineTypeCommand';
    }

    /**
     * @inheritDoc
     */
    executeCommand(){
        for(let el of this._elements) {
            el.setLineType(this.lineType);
        }
        return true;
    }
}