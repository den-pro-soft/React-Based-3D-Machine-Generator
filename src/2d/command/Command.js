/**
 * Created by dev on 04.01.19.
 */

import Exception from '../../Exception';
// import Document from '../../model/Document';


/**
 * Command is an abstract class. The class need for document modification.
 * If you need to modify a current document, you need use one of command instance or create new implementation a command.
 *
 * Command need for making snapshot current document and delegate modification to document object.
 */
export default class Command{
    constructor(document){
        // if(!document instanceof Document){
        //     throw new Exception("Document is required parameter");
        // }

        this.id=app.elementIdGenerator.generateId();
        /** @var {Document} */
        this._document = document;

        this._snapshotBefore = null;
        this._snapshotAfter = null;

        this.name= 'Command';
    }

    /**
     * The method create snapshot on current document and execute command.
     *
     * @return {boolean} true if the command must be save in commandHistory
     */
    execute(){
        this._snapshotBefore = this._document.getSnapshot();
        let res = this.executeCommand();
        this._snapshotAfter = this._document.getSnapshot();
        return res;
    }

    /**
     * The method should be extensions in children classes
     */
    executeCommand(){
        throw new Exception('The method dosn\'t have implementation');
    }

    /**
     * The method need for revert current command from snapshot
     */
    undo(){
        this._document.load(this._snapshotBefore);
    }

    redo(){
        this._document.load(this._snapshotAfter);
    }

    compare(command){
        return this.id==command.id;
    }
}