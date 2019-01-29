/**
 * Created by dev on 18.01.19.
 */

import Command from './Command';

export default class ChangeElementsHeightCommand extends Command{
    /**
     * @param {Document} document
     * @param {Array.<Element>} elements
     * @param {number} height
     */
    constructor(document, elements, height){
        super(document);

        this._elements=elements;

        this._height = height;

        this.name= 'ChangeElementsHeightCommand';
    }

    /**
     * @inheritDoc
     */
    execute(){
        super.execute();
        for(let el of this._elements) {
            el.height=this._height;
        }
        return true;
    }
}