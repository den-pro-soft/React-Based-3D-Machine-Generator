/**
 * Created by dev on 04.01.19.
 */

import Exception from '../../Exception';
import Document from '../../model/Document';


let id = 0;


/**
 * Command is an abstract class. The class need for document modification.
 * If you need to modify a current document, you need use one of command instance or create new implementation a command.
 *
 * Command need for makeing snapshot current document and delegate modification to document object.
 */
export default class Command{
    constructor(document){
        if(!document instanceof Document){
            throw new Exception("Document is required parameter");
        }

        this.id=id++;
        /** @var {Document} */
        this._document = document;

        this._snapshot = null;
    }

    /**
     * The method create snapshot on current document and execute command.
     * The method should be extensions in children classes
     *
     * @return {boolean} true if the command must be save in commandHistory
     */
    execute(){
        if(this._snapshot){
            throw new Exception("The command was execute.");
        }
        this._snapshot = this._document.getSnapshot();
        return false;
    }

    /**
     * The method need for revert current command from snapshot
     */
    undo(){
        if(!this._snapshot){
            throw new Exception("The command wasn't execute.");
        }
        this._document.load(this._snapshot);
        this._snapshot = null;
    }

    compare(command){
        return this.id==command.id;
    }
}