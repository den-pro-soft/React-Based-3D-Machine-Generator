/**
 * Created by dev on 07.02.19.
 */

import Command from './Command';

export default class ElementModificationCommand extends Command{
    /**
     * @param {Document} document
     * @param {Array.<GraphicElement>} elements
     */
    constructor(document, elements){
        super(document);
        this.elements = elements;
    }
    
    
}