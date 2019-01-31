/**
 * Created by dev on 18.01.19.
 */

import Command from './Command';
import Group from './../../model/elements/Group';

export default class UngroupCommand extends Command{
    /**
     * @param {Document} document
     * @param {Array.<Element>} elements
     */
    constructor(document, elements){
        super(document);

        this._elements=elements;

        this.name= 'UngroupCommand';
    }

    /**
     * @inheritDoc
     */
    execute(){
        super.execute();
        for(let el of this._elements) {
            if(el.typeName == 'Group') {
                for(let element of el.elements) {
                    this._document.addElement(element);
                }
                this._document.removeElement(el);
            }
        }
        return true;
    }
}