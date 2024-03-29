/**
 * Created by dev on 17.01.19.
 */

import Command from './command/Command';
import CommandHistory from './CommandHistory';
import Document from './model/Document';

import GroupCommand from './command/GroupCommand';
import UngroupCommand from './command/UngroupCommand';
import DeleteElementCommand from './command/DeleteElementCommand';
import ChangeLineTypeCommand from './command/ChangeLineTypeCommand';
import ChangeElementsHeightCommand from './command/ChangeElementsHeightCommand';
import IntersectElementsCommand from './command/IntersectElementsCommand';
import ChangeTextCommand from './command/ChangeTextCommand';
import ChangeFontSizeCommand from './command/ChangeFontSizeCommand';
import MoveElementsCommand from './command/MoveElementsCommand';
import RotateElementsCommand from './command/RotateElementsCommand';
import MirrorElementsCommand from './command/MirrorElementsCommand';
import CopyDecorator from './command/CopyDecorator';
import ElementModificationCommand from './command/ElementModificationCommand';
import ChangeArcsRadiusCommand from './command/ChangeArcsRadiusCommand';
import ChangeLineLengthCommand from './command/ChangeLineLengthCommand';
import ChangeLineAngleCommand from './command/ChangeLineAngleCommand';
import ResizeElementsCommand from './command/ResizeElementsCommand';
import ChangeArcAngleCommand from './command/ChangeArcAngleCommand';
import TangentsArcsCommand from './command/TangentsArcsCommand';
import EraserNearElementsCommand from './command/EraserNearElements';
import RoundCornerCommand from "./command/Corner";

import PointerTool from './ui/2d/tool/PointerTool';
import CreatorTool from './ui/2d/tool/CreatorTool';
import EditLineTool from './ui/2d/tool/EditLineTool';

import MagnificationDecorator from './ui/2d/tool/decorators/MagnificationDecorator';
import MagnificationCreatorToolDecorator from './ui/2d/tool/decorators/MagnificationCreatorToolDecorator';
import MagnificationEditLineDecorator from './ui/2d/tool/decorators/MagnificationEditLineDecorator';
import MagnificationTransformerDecorator from './ui/2d/tool/decorators/MagnificationTransformerDecorator';

import Text from './model/elements/Text';
import Vector from './model/math/Vector';


import FormatNotSupportedException from './file/FormatNotSupportedException';

import Observable from './Observable';
import FileNameModal from "./ui/modal/FileName";
import LineElement from "./model/elements/LineElement";
import Exception from "./Exception";

let idGenerator = 1;

/**
 * The main application class is a facade for board
 * the class can generate events like as:
 * 1. selectElements - The event has data the data is a array of selected element
 * 2. clearSelectElements - the event will call when clear select elements
 * 3. openNewFile - the event will call when change or init currentDocument. The event has data the data is a new document
 *
 */
export default class Application extends Observable{


    /**
     *
     * @param {Config} config
     */
    constructor(config, board){
        super();

        /** @param {Document} */
        this._currentDocument = new Document();

        /** @param {CommandHistory} */
        this.commandHistory = new CommandHistory();

        /** @param {InteractiveBoard} */
        this._board = null;

        /** @type {Array.<GraphicElement>} */
        this.selectElements = [];

        this.config = config;

        this._lastTool=null;

        this.saved = true;
        this.loaded = true;

        this.board=board;
        this.magnificationMode = config.magnificationMode;

        setInterval(()=>{
            if(!this.saved) {
                /** @type {XmlFileLoader} */
                let fileloader = container.resolve('fileLoaderFactory', 'xml');
                let xml = fileloader.convertInXML(this.currentDocument);
                localStorage.setItem('backup', xml);
                this.saved=true;
            }
        },500);
    }

    /**
     * @return {Document}
     */
    get currentDocument(){
        return this._currentDocument;
    }

    /**
     * @param {Document} document
     */
    set currentDocument(document){
        this.saved=false;
        this.loaded=false;
        localStorage.setItem('loaded', false);
        this._currentDocument=document;
        this.commandHistory = new CommandHistory();
        this.selectElements=[];
        this._changeTool(this._getToolInstance('Pointer'));
        idGenerator = 1;
        this.board.document=document;
        this.board.zoomToFitScreen();
        this._notifyHandlers('openNewFile', document)
        this.board.renderDocument();
    }

    /**
     * @param {InteractiveBoard} board
     */
    set board(board){
        this._board = board;
        board.setTool(this._getToolInstance('Pointer'));
        board.document=this.currentDocument;
    }

    /**
     * @return {InteractiveBoard}
     */
    get board(){
        return this._board;
    }

    set magnificationMode(val){
        this._magnificationMode=val;
        let tool=this.board.tool;
        if(!val && tool instanceof MagnificationDecorator){
            this._changeTool(tool.tool);
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
        this._notifyHandlers('selectElements',elements);
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
    }

    selectAll(){
        this.setTool('Pointer');
        this.addSelectElements(this.currentDocument._elements);
        for(let el of this.currentDocument._elements){
            this._board.tool.selectElement(el, false);
        }
        if(this._board){
            this._board.renderDocument();
        }
    }

    clearSelectElements(){
        this.selectElements.map(e=>e._renderer.setFocus(false));
        if(this.selectElements.length==1 && this.selectElements[0].typeName == 'Text' && this.selectElements[0].text == ""){
            this.undo(false);
        }
        this.selectElements=[];
        this._notifyHandlers('clearSelectElements');
    }

    /**
     * @param {Command} command
     * @return {Promise.<boolean>}
     */
    executeCommand(command){
        return new Promise(resolve=>{
            command.execute().then((res)=>{
                if(res && command.needSave){
                    this.saved=false;
                    this.loaded=false;
                    localStorage.setItem('loaded', false);
                    this.commandHistory.push(command);
                }
                if(this._board){
                    if(command.name == 'AddElementCommand'){
                        this.clearSelectElements();
                        this._changeTool(this._getToolInstance('Pointer'));
                        this.board.tool.clearSelectElements(false);
                        this.board.tool.selectElement(command._element);
                        this.addSelectElements([command._element]);
                    }

                    if(command instanceof ElementModificationCommand){
                        let elements = this.selectElements;
                        if(command instanceof ChangeTextCommand) {
                            this.board.tool.clearSelectElements(false);
                            for (let el of elements) {
                                this.board.tool.selectElement(el, false);
                            }
                        }else if(command instanceof MoveElementsCommand){ //hack for performance. The nudge was too slow
                            this.board.tool.clearSelectElements(false);
                            for (let el of elements) {
                                this.board.tool.selectElement(el, false);
                            }
                        }else{
                            if (command.isReplacedElements()) {
                                elements = command.getElements();
                                if (command.selectOneElement) {
                                    elements = [elements[0]];
                                }
                                this.addSelectElements(elements);
                            }

                            if (!(command instanceof EraserNearElementsCommand)) {
                                this.board.tool.clearSelectElements();
                                for (let el of elements) {
                                    this.board.tool.selectElement(el);
                                }
                            }
                        }
                    }
                    this._board.renderDocument();
                    resolve(true);
                }
            });
        });
    }

    /**
     * Redo command which was undo
     */
    redo(){
        if(this.commandHistory.hasRedo()){
            let command = this.commandHistory.getRedo();
            command.redo();
            this.saved=false;
            this.loaded=false;
            localStorage.setItem('loaded', false);
            this.clearSelectElements();
            this.commandHistory.push(command);
        }
        if(this._board){
            this._changeTool(this._getToolInstance('Pointer'));
            this.board.renderDocument();
        }
    }
    
    /**
     * The method need for revert last command
     * @param [clearSelect=true]
     */
    undo(clearSelect=true){
        let command = this.commandHistory.pop();
        if(command){
            command.undo();
            if(clearSelect) {
                this.clearSelectElements();
            }
            this.saved=false;
            this.loaded=false;
            localStorage.setItem('loaded', false);
        }

        if(this._board){
            this._changeTool(this._getToolInstance('Pointer'));
            this.board.renderDocument();
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
        if(this.board.tool instanceof PointerTool || this.board.tool instanceof  MagnificationTransformerDecorator) {
            this.clearSelectElements();
            if(this.board.tool instanceof PointerTool) {
                this._lastTool.mousePosition = this.board.tool.mousePosition;
            }else{
                this._lastTool.mousePosition = this.board.tool.tool.mousePosition;
            }
            this._changeTool(this._lastTool);
        }else{
            this._changeTool(this._getToolInstance('Pointer'));
        }
        this.board.renderDocument();
    }

    _changeTool(tool){
        if(!(tool instanceof PointerTool)){
            this._lastTool=tool;
        }
        if(this._magnificationMode && !(tool instanceof MagnificationDecorator)){

            if(tool instanceof CreatorTool){
                tool = new MagnificationCreatorToolDecorator(this.currentDocument, tool);
            } else if(tool instanceof EditLineTool){
                tool = new MagnificationEditLineDecorator(this.currentDocument, tool);
            } else if(tool instanceof PointerTool){
                tool = new MagnificationTransformerDecorator(this.currentDocument, tool);
            }
        }
        this.board.setTool(tool);
    }

    _getToolInstance(name){
        return container.resolve('toolFactory', [name, this.currentDocument]);
    }

    /**
     * @param {string} fileFormat
     * @return {Promise.<boolean>}
     * @throws {FormatNotSupportedException}
     */
    saveAs(fileFormat){
        return new Promise((resolve, reject)=>{
            /** @var {FileLoader} */
            let fileLoader = container.resolve('fileLoaderFactory', fileFormat);

            new FileNameModal((name)=>{
                this.currentDocument.fileName=name;
                fileLoader.save(this.currentDocument).then(res=>{
                    if(res){
                        this.loaded=true;
                        localStorage.setItem('loaded', true);
                        this._notifyHandlers('openNewFile', this.currentDocument);
                        resolve(true);
                    }
                });
            }, ()=>{
                resolve(false);
            }).show();
        });
    }

    /**
     * @param {File} file
     * @throws {FormatNotSupportedException}
     */
    open(file){
        if (!file) {
            return;
        }

        let format  = file.name.split('.');
        format = format[format.length-1];

        /** @var {FileLoader} */
        let fileLoader = container.resolve('fileLoaderFactory', format);

        fileLoader.load(file).then(data=>{
            this.currentDocument=data;
        }); //todo: check exception
    }

    restore(){
        /** @type {XmlFileLoader} */
        let fileloader = container.resolve('fileLoaderFactory', 'xml');
        fileloader.convertDataToDocument(localStorage.getItem('backup')).then(doc=>{
            this.currentDocument = doc;
        });
    }

    appZoomToActualSize(){
        let ppi = localStorage.getItem('PPI');
        if(!ppi){
            container.resolve('confirmChangeArcToSplinesDialog').modalNonWorkFeature("Please calibrate your screen. " +
                "Draw a five-inch line and zoom so it measures the same with a ruler. Select the line. Choose Edit | Preferences | Calibrate.");
        }else{
            this.board.zoomToActualSize(ppi);
        }
    }

    screenCalibrate(){
        if(this.selectElements.length==1 && this.selectElements[0] instanceof LineElement) {
            /** @type {LineElement} */
            let line = this.selectElements[0];

            let p1 = this.board._convertToLocalCoordinateSystem(line.p1);
            let p2 = this.board._convertToLocalCoordinateSystem(line.p2);
            let pixels = Math.sqrt(Math.pow(p2.x-p1.x,2)+Math.pow(p2.y-p1.y,2));
            let ppi = pixels/5;
            localStorage.setItem('PPI', ppi);
            container.resolve('confirmChangeArcToSplinesDialog').modalNonWorkFeature("Calibration completed.");
        }else{
            container.resolve('confirmChangeArcToSplinesDialog').modalNonWorkFeature("Please select a straight line.");
        }
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
    }

    /**
     * @param {axisX|axisY} axis
     */
    mirrorSelected(axis){
        this.executeCommand(new MirrorElementsCommand(this.currentDocument, this.selectElements, axis));
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
        this.pasteElements(this.selectElements, x, y);
    }

    /**
     * @param angle
     */
    copyRotateSelected(angle){
        let rotateCommand = new RotateElementsCommand(app.currentDocument, [], angle);
        let command = new CopyDecorator(app.currentDocument, app.selectElements.slice(), rotateCommand);
        this.executeCommand(command);
    }

    /**
     *
     * @param {Array.<GraphicElement>} elements
     * @param {number} x
     * @param {number} y
     * @return {Promise<boolean>}
     */
    pasteElements(elements, x, y){
        return new Promise(resolve=>{
            let moveCommand = new MoveElementsCommand(app.currentDocument, [], x, y);
            let command = new CopyDecorator(app.currentDocument, elements, moveCommand);
            this.executeCommand(command).then(res=>{
                resolve(res);
            });
        });
    }
    
    /**
     * @param {string} text
     * @throws {Exception} -if selected a few elements or if currently selected element isn't text element
     */
    setTextForSelectedElement(text){
        this.executeCommand(new ChangeTextCommand(app.currentDocument, this.selectElements, text));
    }

    /**
     * @param {number} fontSize
     * @throws {Exception} -if selected elements aren't only text element
     */
    setFontSizeForSelectedElement(fontSize){
        this.executeCommand(new ChangeFontSizeCommand(app.currentDocument, this.selectElements, fontSize));
    }

    intersectSelectedElements(){
        if(this.selectElements.length==0){
            //todo: message "For intersecting select element"
            return;
        }
        this.executeCommand(new IntersectElementsCommand(this.currentDocument, this.selectElements));
    }

    /**
     * @param {number} radius - new radius of circles is millimeters
     * @throws {Exception} - if selected not only circles
     */
    setRadiusForSelectedElements(radius){
        this.executeCommand(new ChangeArcsRadiusCommand(this.currentDocument, this.selectElements, radius));
    }

    /**
     * @param {number} length - new length of line is millimeters
     * @throws {Exception} - if selected not only single line
     */
    setLineLengthElement(length){
        this.executeCommand(new ChangeLineLengthCommand(this.currentDocument, this.selectElements, length));
    }

    /**
     *
     * @param {number} angle - new line angle
     * @throw {Exception} - if selected not only line elements
     */
    setLineAngleElement(angle){
        this.executeCommand(new ChangeLineAngleCommand(this.currentDocument, this.selectElements, angle));
    }

    /**
     *
     * @param {number} width - new width 
     * @param {number} height - new height
     * @param {boolean} convertCircleToSplines - if is true all Ars will be transformation to list of splines,
     *  if is false and selected some Arc then will be throw Exception
     * @throw {Exception} - if list of resizing elements contain any Arc and flag convertCircleToSplines is false
     */
    setSelectedElementsSize(width, height, convertCircleToSplines=true){
        let extrenum = this.currentDocument.getExtrenum(this.selectElements);

        let oldWidth = extrenum.max.x- extrenum.min.x;
        let oldHeight = extrenum.max.y- extrenum.min.y;

        let vector = new Vector(width-oldWidth, height-oldHeight);

        let command = new ResizeElementsCommand(this.currentDocument, this.selectElements, vector
                    , ResizeElementsCommand.CONTROL_POINT_X.right, ResizeElementsCommand.CONTROL_POINT_Y.top, convertCircleToSplines);

        this.executeCommand(command);
    }

    /**
     *
     * @param {number} startAngle - the new start angle. Can be null if insideAngle isn't null
     * @param {number} insideAngle - the new inside angle. Can be null if insideAngle isn't null
     */
    setArcAngles(startAngle, insideAngle){
        this.executeCommand(new ChangeArcAngleCommand(this.currentDocument, this.selectElements, insideAngle, startAngle));
    }

    tangentsSelectedArcs(){
        this.executeCommand(new TangentsArcsCommand(this.currentDocument, this.selectElements));
    }

    corner(){
        this.executeCommand(new RoundCornerCommand(this.currentDocument, this.selectElements));
    }

    priceAnalyze(){
        container.resolve('analyzer', this.currentDocument).analyze().then(res=>{
            if(!res){
                return;
            }
            /** @type {FileLoader} */
            let loader = container.resolve('fileLoaderFactory', 'xml');

            let xml = loader.getBlobData(this.currentDocument).then((design)=>{
                let fd = new FormData();
                fd.append('password','price');
                fd.append('design', design, this.currentDocument.fileName==""?"NewDocument.emsx":this.currentDocument.fileName);
                fd.append('pquantity',1);
                fd.append('pmaterial','Aluminum 2024');
                fd.append('pmaterialid',131);
                fd.append('pfinish','As Machined (0)');
                fd.append('pcountry-field','Sweden');
                fd.append('pstate','');
                fd.append('pusername','webesmcad');
                fd.append('puseremail','webemscad@emachineshop.com');

                Helper.Request.httpPost(
                    'https://www.emachineshop.com/irfqserver',
                    fd,
                    (response)=>{
                        let json = JSON.parse(response);
                        let formData = new FormData();
                        formData.append("prfqid",parseInt(json.server_rfqid));
                        formData.append('prequest_type','result');
                        formData.append('password','price');
                        setTimeout(()=> {
                            Helper.Request.httpPost(
                                'https://www.emachineshop.com/irfqserver',
                                formData,
                                (prices) => {
                                    let pricesJSON = JSON.parse(prices);
                                    console.log(pricesJSON);
                                }
                            );
                        }, 10000);
                    }
                );
            });
        });
    }

    //</editor-fold>
}