/**
 * Created by dev on 22.03.19.
 */

import Solution from './../Solution';

import DeleteElementCommand from '../../command/DeleteElementCommand';

export default class RemoveElement extends Solution{

    /**
     * @param {Document} document
     * @param {GraphicElement} element
     */
    constructor(document, element){
        super(document);
        this.element = element;
    }

    execute(){
        console.log()
        app.executeCommand(new DeleteElementCommand(this.document, [this.element]));
    }

}
