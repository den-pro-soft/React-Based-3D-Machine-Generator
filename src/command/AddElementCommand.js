/**
 * Created by dev on 04.01.19.
 */

import Command from './Command';
import GraphicElement from '../model/GraphicElement'

export default class AddElementCommand extends Command{
    /**
     * @param {Document} document
     * @param {Element} element
     */
    constructor(document, element){
        super(document);

        this._element = element;

        this.name= 'AddElementCommand';
    }

    /**
     * @inheritDoc
     */
    executeCommand(){
        this._document.addElement(this._element);
        return true;
    }
}