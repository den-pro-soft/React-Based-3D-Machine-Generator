/**
 * Created by dev on 17.01.19.
 */

import Board from './2d/Board';
import Command from './2d/command/Command';
import CommandHistory from './CommandHistory';
import Document from './model/Document';
import GroupCommand from './2d/command/GroupCommand';
import UngroupCommand from './2d/command/UngroupCommand';
import DeleteElementCommand from './2d/command/DeleteElementCommand';
import ChangeElementsHeightCommand from './2d/command/ChangeElementsHeightCommand';
import MoveElementsCommand from './2d/command/MoveElementsCommand';
import RotateElementsCommand from './2d/command/RotateElementsCommand';
import config from './Config';

let idGenerator = 1;

/**
 * The main application class is a facade for board
 * the class can generate events like as:
 * 1. selectElement - the event will call for every selected element. The event has data the data is a selected element
 * 2. clearSelectElements - the event will call when clear select elements
 *
 */
class Application{
    constructor(){
        /** @param {Document} */
        this.currentDocument = new Document();

        /** @param {CommandHistory} */
        this.commandHistory = new CommandHistory();

        /** @param {Board} */
        this._board = null;

        this.selectElements = [];

        this._handlers = {
            selectElement: [],
            clearSelectElements: []
        }

        this.config = config;

        this.elementIdGenerator = {
            generateId:function(){
                return idGenerator++;
            }
        }
    }

    set board(board){
        this._board = board;
        board.document=this.currentDocument;
    }
    
    get board(){
        return this._board;
    }

    /**
     * The method need for interface reflection flow
     * Pointer tool use the method
     * @param {Array.<GraphicElement>} elements
     */
    addSelectElements(elements){
        for(let element of elements){
            this.addSelectElement(element);
        }
    }

    /**
     * The method need for interface reflection flow
     * Pointer tool use the method
     * @param {GraphicElement} element
     */
    addSelectElement(element){
        for(let el of this.selectElements){
            if(el.compare(element)){
                console.log("compare");
                console.log(element);
                return;
            }
        }
        this.selectElements.push(element);
        this._notifyHandlers('selectElement',element);
    }

    clearSelectElements(){
        this.selectElements.splice(0,this.selectElements.length);
        this._notifyHandlers('clearSelectElements');
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
            if(command.name == 'AddElementCommand'){
                this.clearSelectElements();
                this._board.setTool('Pointer');
                this._board.tool.selectElement(command._element);
            }
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

    ungroup(){
        this.executeCommand(new UngroupCommand(app.currentDocument, app.selectElements));
    }

    deleteSelected(){
        if(this.board){
            this.board.setTool('Pointer');
        }
        this.executeCommand(new DeleteElementCommand(this.currentDocument, this.selectElements));
        this.clearSelectElements();
    }

    setElementsHeight(height){
        this.executeCommand(new ChangeElementsHeightCommand(app.currentDocument, app.selectElements, height));
    }

    /**
     * 
     * @param {number} x
     * @param {number} y
     */
    moveSelected(x,y){
        this.executeCommand(new MoveElementsCommand(app.currentDocument, app.selectElements, x,y));
    }

    /**
     * @param angle
     */
    rotateSelected(angle){
        this.executeCommand(new RotateElementsCommand(app.currentDocument, app.selectElements, angle));
    }

    selectAll(){
        this.clearSelectElements();
        this.board.setTool('Pointer');
        for(let el of this.currentDocument._elements){
            this.addSelectElement(el);
            this._board.tool.selectElement(el);
        }
        if(this._board){
            this._board.renderDocument();
        }
    }

    addHandler(eventName, handler){
        this._handlers[eventName].push(handler);
    }

    _notifyHandlers(eventName, data){
        if(this._handlers[eventName]) {
            for (let handler of this._handlers[eventName]) {
                handler(data);
            }
        }
    }
}

window.app = new Application();

Helper.Window.addHandler('keydown',(e)=>{
    console.log(e.keyCode);
    switch(e.keyCode){
        case 46: //delete
            app.deleteSelected();
            break;
        case 65: //Aa
            if(e.ctrlKey){
                app.selectAll();
                e.preventDefault();
            }
            break;
        case 90: //Zz
            if(e.ctrlKey){
                if(e.shiftKey){
                    app.redo();
                }else {
                    app.undo();
                }
            }
            break;
        case 37: //left
            app.moveSelected(-config.moveStep,0);
            break;
        case 38: //up
            app.moveSelected(0,config.moveStep);
            break;
        case 39: //right
            app.moveSelected(config.moveStep,0);
            break;
        case 40: //down
            app.moveSelected(0,-config.moveStep);
            break;
    }
});