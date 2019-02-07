/**
 * Created by dev on 07.02.19.
 */

import MoveElementsCommand from './MoveElementsCommand';

export default class CopyMoveCommand extends MoveElementsCommand{
    /**
     * @inheritDoc
     */
    constructor(document, elements, x, y){
        super(document, elements, x, y);
        this.name= 'CopyMoveCommand';
    }

    /**
     * @inheritDoc
     */
    executeCommand(){
        for(let el of this._elements) {
            let temp = el.copy();
            temp.generateNewId();
            this._document.addElement(temp);
        }
        return super.executeCommand();
    }
}