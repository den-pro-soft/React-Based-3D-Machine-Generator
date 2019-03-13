import DynamicChangeTool from './DynamicChangeTool';
import RectElement from '../../model/elements/RectElement';
import Point from './../../model/Point';
import ResizeTransformer from "./transformer/ResizeTransformer";
import RotateTransformer from './transformer/RotateTransformer';

/**
 * The tool can
 * 1. select elements by click and by select rect
 * 2. move canvas
 * Also the class use transformers for moving, resize and rotate elements
 *
 *
 * Specification for this tool
 *
 * the tool must to list of operation like as:
 * 1. select elements
 *      for selecting elements need do one of this operation:
 *      - press mouse (click) on not selected element
 *      - select square (all not selected elements in the square will be selected)
 *
 *      if do the operation without Ctrl key. every operations select new elements without before selected elements
 *      else new selected elements will be add to list with old selected elements
 *
 * 2. move elements
 *      for moving some elements they must be selected. After selected the elements, need press into the resize rectangle
 *      and drag it
 *
 * 3. resize elements
 *      for resizing some elements need select the elements, then press on resize handle and drag the handle.
 *      elements will be resizing in the opposite direction of the handle
 *
 * 4. rotate elements
 *
 * All selected elements can be move or resize without additional operations. For that all selected elements must
 * displaying in resize rectangle (the rect with handles for resizing).
 *
 *
 *
 */
export default class PointerTool extends DynamicChangeTool{

    constructor(document){
        super(document);

        this._mouseDown = false;

        /** @var {RectElement} */
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
        if(this.transformer){
            this.transformer.removeElemens();
        }
    }

    addSelectElements(elements){
        super.addSelectElements(elements);
        if(!this.transformer) {
            this.transformer = new ResizeTransformer(this._document);
        }
        this.transformer.addElements(elements);
    }

    /**
     * @inheritDoc
     */
    selectElement(element, addToApp=true){
        super.selectElement(element, addToApp);
        if(!this.transformer) {
            this.transformer = new ResizeTransformer(this._document);
        }
        this.transformer.addElements([element]);
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
                if(!Helper.Key.ctrlKey && needRect) {
                    this.transformer = null;
                }
            }
        }else{
            let selectedElement = super.mouseDown(point,e);
            this.addedElement=selectedElement;
            this.transformer.mouseDown(point);

            needRect= !selectedElement;
        }

        if(needRect){
            if(!Helper.Key.ctrlKey){
                this.clearSelectElements();
            }
            this.selectRect = new RectElement(point, point);
        }
        this._mouseDown=point;
        return true;
    }

    mouseUp(point, e){
        super.mouseUp(point,e);
        this._mouseDown=null;

        if(this.transformer){
            let res = this.transformer.mouseUp(point);
            if(res && !this.addedElement){
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
            return false;
        }
        //
        let newSelectElements = [];
        if(this.selectRect.getSquare()>1E-3){
            newSelectElements = this._document.getElementsIntoFigure(this.selectRect);
        }

        if(newSelectElements.length>0) {
            this.addSelectElements(newSelectElements);
        }else{
            if(!Helper.Key.ctrlKey) {
                this.transformer = null;
            }
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