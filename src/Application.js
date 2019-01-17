/**
 * Created by dev on 17.01.19.
 */

import Board from './2d/Board';
import Command from './2d/command/Command';
import CommandHistory from './CommandHistory';
import Document from './model/Document';


class Application{
    constructor(){
        /** @param {Document} */
        this.currentDocument = new Document();

        /** @param {CommandHistory} */
        this.commandHistory = new CommandHistory();

        /** @param {Board} */
        this.board = null;
    }

    /**
     * @param {Command} command
     */
    executeCommand(command){
        let res = command.execute();
        if(res){
            this.commandHistory.push(command);
        }

        if(this.board){
            this.board.renderDocument();
        }
    }

    /**
     * Redo command which was undo
     */
    redo(){
        if(this.commandHistory.hasRedo()){
            this.executeCommand(this.commandHistory.getRedo());
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

        if(this.board){
            this.board.renderDocument();
        }
    }



}

window.app = new Application();