import DynamicChangeTool from './DynamicChangeTool';
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
export default class PointerTool extends DynamicChangeTool{
    //todo: remove code for selecting elements by mouse click. That code is on the SelectTool class

    constructor(document){
        super(document);

        this._mouseDown = false;

        /** @var {RectElementController} */
        this.selectRect = null;
        
        this._selectMode = true;

        this.cursor=null;

        this.transformer = null;

        this.addedElement=false;
    }

    set document(doc){
        this._document=doc;
        if(this.transformer) {
            this.transformer.document = doc;
        }
    }

    clearSelectElements(){
        super.clearSelectElements();
        this.transformer = null;
    }

    addSelectElements(elements){
        super.addSelectElements(elements);
        if(!this.transformer) {
            this.transformer = new ResizeTransformer(this._document);
        }
        this.transformer.addElements(elements);
    }

    mouseMove(point){
        if(this.selectRect){
            this.selectRect.p2=point;
        }
        else {
            if(!this.transformer || !this.transformer.mouseMove(point)) {
                if (!this._mouseDown && this._selectMode) {
                    this.selectNearElements(point);
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
            if(!this._selectMode){
                app.board._canvas.style.cursor = "-webkit-grab";
            }else{
                app.board._canvas.style.cursor = "default";
            }
            return true;
        }
        return false;
    }

    mouseClick(point){}

    mouseDown(point, e){
        this.addedElement=false;
        if(!this._selectMode) {
            return;
        }

        let needRect = false;

        if(this.transformer){
            if(this.transformer.mouseDown(point)) { //not on transform area
                needRect = !super.mouseDown(point,e);
                this.addedElement=!needRect;
            }
        }else{
            needRect= !super.mouseDown(point,e);
            this.addedElement=!needRect;
        }

        if(needRect){
            if(!Helper.Key.ctrlKey){
                this.clearSelectElements();
            }
            this.selectRect = new RectElementController(point, point);
        }
        this._mouseDown=point;
        return true;
    }

    mouseUp(point, e){
        super.mouseUp(point,e);
        this._mouseDown=null;

        if(this.transformer){
            let res = this.transformer.mouseUp(point);
            if(res){ //click не менять иструмент елси выбрано новое значеине, потому что инстумент уже установлено
                //инстумент меняется если был клик на инстументе
                if(this.transformer instanceof ResizeTransformer) {
                    this.transformer = new RotateTransformer(this._document);
                }else{
                    this.transformer = new ResizeTransformer(this._document);
                }
                if(app.selectElements.length>0) {
                    this.transformer.addElements(app.selectElements);
                }
                return true;
            }else{
                //fomthing change
            }
        }

        if(!this.selectRect) { //if selected mode
            return;
        }
        //
        let newSelectElements = [];
        if(this.selectRect.getSquare()>1E-3){
            newSelectElements = this._document.getElementsIntoFigure(this.selectRect);
        }

        if(newSelectElements.length>0) {
            this.addSelectElements(newSelectElements);
        }else{
            this.transformer = null;
        }
        this.selectRect = null;
    }

    render(){
        if(this.selectRect){
            let element = this.selectRect.toElement();
            element._renderer.drawAsNew();
            element.render();
        }

        if(this.transformer) {
            this.transformer.render();
        }
    }

}