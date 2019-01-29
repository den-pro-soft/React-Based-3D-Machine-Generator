import Tool from './Tool';
import RectElementController from './RectElementControler';
import Point from './../../model/Point';
import ResizeTransformer from "./transformer/ResizeTransformer";
import RotateTransformer from './transformer/RotateTransformer';

/**
 * The tool can
 * 1. select elements by click and by select rect
 * 2. move canvas
 * Also the class use transformers for moving, resize and rotate elements 
 */
export default class PointerTool extends Tool{
    constructor(document){
        super(document);

        this._mouseDown = false;

        /** @var {RectElementController} */
        this.selectRect = null;
        
        this._selectMode = true;

        this.cursor=null;

        this.transformer = null;
    }

    set document(doc){
        this._document=doc;
        if(this.transformer) {
            this.transformer.document = doc;
        }
    }

    mouseMove(point){
        if(this.selectRect){
                this.selectRect.p2=point;
        }else {
            if(!this.transformer || !this.transformer.mouseMove(point)) {
                if (!this._mouseDown && this._selectMode) {
                    this._selectNearElements(point);
                }
            }
        }

        if(this._mouseDown){
            this._mouseDown=point;
        }
        super.mouseMove(point);
        return this._selectMode;
    }

    mouseDbClick(point){
        if(!this.transformer) {
            this._selectMode = !this._selectMode;
        }
    }

    mouseClick(point){}

    mouseDown(point){
        if(!this._selectMode) {
            return;
        }
        if(this.transformer){
            if(this.transformer.mouseDown(point)) {
                this.transformer = null;
                app.clearSelectElements();
                this.selectRect = new RectElementController(point, point);
            }
        }else{
            if(true) { //todo: if !Ctrl
                this.transformer = null;
                app.clearSelectElements();
            }
            this.selectRect = new RectElementController(point, point);
        }
        this._mouseDown=point;
    }

    mouseUp(point){
        this._mouseDown=null;

        if(this.transformer){
            if(this.transformer.mouseUp(point)){ //click
                if(this.transformer instanceof ResizeTransformer) {
                    this.transformer = new RotateTransformer(this._document);
                }else{
                    this.transformer = new ResizeTransformer(this._document);
                }
                this.transformer.addElements(app.selectElements);
            }
        }

        if(!this.selectRect) { //if selected mode
            return;
        }

        let newSelectElements = [];
        if(this.selectRect.getSquare()<1E-3){
            newSelectElements = this._getNearElements(point);
        }else {
            newSelectElements = this._document.getElementsIntoFigure(this.selectRect);
        }

        if(false) { //todo: if Ctrl
            app.addSelectElements(newSelectElements);
        }else{
            app.clearSelectElements(); 
            app.addSelectElements(newSelectElements);
        }

        if(newSelectElements.length>0) {
            if(!this.transformer) {
                this.transformer = new ResizeTransformer(this._document);
            }
            this.transformer.addElements(newSelectElements);
        }else{
            this.transformer = null;
        }
        this.selectRect = null;
    }

    render(){
        this.renderElement();
        super.render();
    }
    
    renderElement(){
        if(this.selectRect){
            let element = this.selectRect.toElement();
            element._renderer.drawAsNew();
            element.render();
        }

        if(this.transformer) {
            this.transformer.render();
        }
        for(let element of app.selectElements){
            element._renderer.setFocus(true);
            // element.render();
        }
    }

    _getNearElements(point){
        let scale = container.board._scale; //todo: container
        return this._document.getNearElements(point, (scale>1?0.2:0.05)/scale);
    }
    _selectNearElements(point){
        for(let element of this._getNearElements(point)){
            element._renderer.setFocus(true);
        }
    }
}