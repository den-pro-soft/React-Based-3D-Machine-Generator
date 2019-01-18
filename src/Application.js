/**
 * Created by dev on 17.01.19.
 */

import Board from './2d/Board';
import Command from './2d/command/Command';
import CommandHistory from './CommandHistory';
import Document from './model/Document';
import GroupCommand from './2d/command/GroupCommand';

class Application{
    constructor(){
        /** @param {Document} */
        this.currentDocument = new Document();

        /** @param {CommandHistory} */
        this.commandHistory = new CommandHistory();

        /** @param {Board} */
        this._board = null;

        this.selectElements = [];
    }

    set board(board){
        this._board = board;
        board.document=this.currentDocument;
    }
    
    get board(){
        return this._board;
    }

    /**
     * @param {Command} command
     */
    executeCommand(command){
        let res = command.execute();
        if(res){
            this.commandHistory.push(command);
        }

        if(this._board){
            this._board.renderDocument();
        }
    }

    /**
     * Redo command which was undo
     */
    redo(){
        if(this.commandHistory.hasRedo()){
            let command = this.commandHistory.getRedo();
            this.commandHistory.push(command);
            command.execute();
        }
        if(this._board){
            this._board.renderDocument();
        }
    }
    
    /**
     * The method need for revert last command
     */
    undo(){
        let command = this.commandHistory.pop();
        if(command){
            command.undo();
        }

        if(this._board){
            this._board.renderDocument();
        }
    }
    
    group(){
        this.executeCommand(new GroupCommand(app.currentDocument, app.selectElements));
    }

}

window.app = new Application();