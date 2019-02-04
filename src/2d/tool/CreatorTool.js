/**
 * Created by dev on 31.01.19.
 */

import Tool from './Tool';
import AddElementCommand from './../../2d/command/AddElementCommand';

export default class CreatorTool extends Tool{
    constructor(document){
        super(document);

    }

    addElementToDocument(element){
        app.executeCommand(new AddElementCommand(this._document, element));
    }

    
    
}