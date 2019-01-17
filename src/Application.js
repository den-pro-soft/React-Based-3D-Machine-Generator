/**
 * Created by dev on 17.01.19.
 */

import Document from './model/Document';
import Board from './2d/Board';
import Command from './2d/command/Command';
import CommandHistory from './CommandHistory';


export default class Application{
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
     * The method need for revert last command
     */
    redo(){
        let command = this.commandHistory.pop();
        if(command){
            command.redo();
        }

        if(this.board){
            this.board.renderDocument();
        }
    }



}

global.app = new Application();