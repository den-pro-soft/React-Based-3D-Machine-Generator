/**
 * Created by dev on 04.01.19.
 */

import Command from './Command';
import GraphicElement from '../model/GraphicElement'
import LineElement from "../model/elements/LineElement";
import Bend from "../model/line_types/Bend";
import Auto from "../model/line_types/Auto";

export default class AddElementCommand extends Command{
    /**
     * @param {Document} document
     * @param {GraphicElement} element
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
        if(!(this._element instanceof LineElement) && (this._element.lineType instanceof Bend)){
            this._element.lineType = new Auto();
        }

        this._document.addElement(this._element);
        return true;
    }
}