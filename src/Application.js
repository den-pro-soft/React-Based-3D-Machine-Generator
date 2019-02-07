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
import ChangeLineTypeCommand from './2d/command/ChangeLineTypeCommand';
import ChangeElementsHeightCommand from './2d/command/ChangeElementsHeightCommand';
import MoveElementsCommand from './2d/command/MoveElementsCommand';
import RotateElementsCommand from './2d/command/RotateElementsCommand';
import MirrorElementsCommand from './2d/command/MirrorElementsCommand';
import CopyMoveCommand from './2d/command/CopyMoveCommand';
import CopyRotateCommand from './2d/command/CopyRotateCommand';

import PointerTool from './2d/tool/PointerTool';
import ZoomTool from './2d/tool/ZoomTool';
import RulerTool from './2d/tool/RulerTool';
import EraserTool from './2d/tool/EraserTool';
import RectTool from './2d/tool/RectTool';
import SplineTool from './2d/tool/SplineTool';
import CircleTool from './2d/tool/CircleTool';
import MagnificationToolDecorator from './2d/tool/MagnificationToolDecorator';
import LineTool from './2d/tool/LineTool';
import FreehandTool from './2d/tool/FreehandTool';
import CreatorTool from './2d/tool/CreatorTool';

import config from './Config';

import FileLoader from './file/FileLoader';
import Observable from './Observable';

let idGenerator = 1;

/**
 * The main application class is a facade for board
 * the class can generate events like as:
 * 1. selectElement - the event will call for every selected element. The event has data the data is a selected element
 * 2. clearSelectElements - the event will call when clear select elements
 *
 */
class Application extends Observable{
    constructor(){
        super();

        /** @param {Document} */
        this.currentDocument = new Document();

        /** @param {CommandHistory} */
        this.commandHistory = new CommandHistory();

        /** @param {Board} */
        this._board = null;

        this.selectElements = [];

        this.config = config;

        this.elementIdGenerator = {
            generateId:function(){
                return idGenerator++;
            }
        }
        
        this._lastTool=null;
    }

    set board(board){
        this._board = board;
        board.setTool(this._getToolInstance('Pointer'));
        board.document=this.currentDocument;
    }
    
    get board(){
        return this._board;
    }

    set magnificationMode(val){
        this._magnificationMode=val;
        let tool=this.board.tool;
        if(!val && tool instanceof MagnificationToolDecorator){
            this._changeTool(tool._tool);
        }
        if(val){
            this._changeTool(tool);
        }
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
                return;
            }
        }
        this.selectElements.push(element);
        this._notifyHandlers('selectElement',element);
    }

    selectAll(){
        this.clearSelectElements();
        this.setTool('Pointer');
        for(let el of this.currentDocument._elements){
            this.addSelectElement(el);
            this._board.tool.selectElement(el);
        }
        if(this._board){
            this._board.renderDocument();
        }
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
                this._changeTool(this._getToolInstance('Pointer'));
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
            command.redo();
            this.commandHistory.push(command);
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
    
    setTool(name){
        if(!this._board){
            return;
        }
        this.clearSelectElements();
        let tool = this._getToolInstance(name);
        this._changeTool(tool);
    }

    useLastTool(){
        if(this.board.tool instanceof PointerTool) {
            this.clearSelectElements();
            this._lastTool.mousePosition = this.board.tool.mousePosition;
            this._changeTool(this._lastTool);
        }else{
            this._changeTool(this._getToolInstance('Pointer'));
        }
        this.board.renderDocument();
    }

    _changeTool(tool){
        if(!(tool instanceof PointerTool) && !(tool instanceof MagnificationToolDecorator)){
            this._lastTool=tool;
        }
        if(this._magnificationMode && tool instanceof CreatorTool){
            tool = new MagnificationToolDecorator(this.currentDocument, tool);
        }
        this.board.setTool(tool);
    }

    _getToolInstance(name){
        let tool;
        switch(name){
            case 'Line':
                tool = new LineTool(this.currentDocument);
                break;
            case 'Rectangle':
                tool = new RectTool(this.currentDocument);
                break;
            case 'Circle':
                tool = new CircleTool(this.currentDocument);
                break;
            case 'Spline':
                tool = new SplineTool(this.currentDocument);
                break;
            case 'Zoom':
                tool = new ZoomTool(this.currentDocument);
                break;
            case 'Eraser':
                tool = new EraserTool(this.currentDocument);
                break;
            case 'Freehand':
                tool = new FreehandTool(this.currentDocument);
                break;
            case 'Ruler':
                tool = new RulerTool(this.currentDocument);
                break;
            default:
                tool = new PointerTool(this.currentDocument);
        }
        return tool;
    }

    saveAs(file){
        console.log(file,'file-format');
        FileLoader.save(this.currentDocument);
    }

    //<editor-fold desc="decorate methods">

    group(){
        this.executeCommand(new GroupCommand(app.currentDocument, app.selectElements));
    }

    ungroup(){
        this.executeCommand(new UngroupCommand(app.currentDocument, app.selectElements));
    }

    /**
     * @param angle
     */
    rotateSelected(angle){
        this.executeCommand(new RotateElementsCommand(app.currentDocument, app.selectElements, angle));
        // this._board.tool.setSelectElements(app.selectElements);
        // this._board.renderDocument();
    }

    deleteSelected(){
        if(this.board){
            this._changeTool(this._getToolInstance('Pointer'));
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
        this.executeCommand(new MoveElementsCommand(app.currentDocument, app.selectElements.slice(), x,y));
        this._board.tool.setSelectElements(app.selectElements);
        this._board.renderDocument();
    }

    /**
     * @param {axisX|axisY} axis
     */
    mirrorSelected(axis){
        this.executeCommand(new MirrorElementsCommand(this.currentDocument, this.selectElements, axis));
        this._board.tool.setSelectElements(app.selectElements);
        this._board.renderDocument();
    }

    /**
     * @param {LineType} lineType
     */
    setElementsLineType(lineType){
        this.executeCommand(new ChangeLineTypeCommand(app.currentDocument, app.selectElements, lineType));
    }

    /**
     * @param {number} x
     * @param {number} y
     */
    copyMoveSelected(x,y){
        this.executeCommand(new CopyMoveCommand(app.currentDocument, app.selectElements.slice(), x,y));
        this._board.tool.setSelectElements(app.selectElements);
        this._board.renderDocument();
    }

    /**
     * @param angle
     */
    copyRotateSelected(angle){
        this.executeCommand(new CopyRotateCommand(app.currentDocument, app.selectElements.slice(), angle));
        this._board.tool.setSelectElements(app.selectElements);
        this._board.renderDocument();
    }
    
    //</editor-fold>
}

window.app = new Application();

Helper.Window.addHandler('keydown',(e)=>{
    console.log(e.keyCode);
    switch(e.keyCode){
        case 46: //delete
            app.deleteSelected();
            break;
        case 65: //Aa
            if(e.ctrlKey && e.target==document.body){
                app.selectAll();
                e.preventDefault();
            }
            break;
        case 83: //Ss
            if(e.ctrlKey){
                app.saveAs('xml');
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
        case 32:
            if(e.target==document.body){
                app.useLastTool();
            }
            break;
    }
});