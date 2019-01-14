import Tool from './Tool';
import RectElementController from './RectElementControler';
import Point from './../../model/Point';

/**
 * The tool can
 * 1. select elements by click and by select rect
 * 2. move canvas
 * 3. resize elements
 * 4. rotate elements
 * 5. move elements on board
 */
export default class PointerTool extends Tool{
    constructor(document){
        super(document);

        this._mouseDown = false;
                
        this._selectElements = [];

        /** @var {RectElementController} */
        this.selectRect = null;

        /** @var {RectElementController} */
        this.resizeRect = null;
        
        this._selectMode = true;

        this.cursor=null;
    }

    mouseMove(point){
        if(this.selectRect){
                this.selectRect.p2=point;
        }else {
            if(this.resizeRect && this._mouseDown){
                let dx = point.x-this._mouseDown.x;
                let dy = point.y-this._mouseDown.y;
                for(let element of this._selectElements) {
                    element.move(dx,dy);
                }
                this.resizeRect.toElement().move(dx,dy);
            }else{
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
        if(this._selectElements.length==0) {
            this._selectMode = !this._selectMode;
        }
    }

    mouseClick(point){}

    mouseDown(point){
        if(this._selectMode) {
            if(!(this.resizeRect && this.resizeRect.contain(point))){
                this.resizeRect = null; //todo: if not ctrl
                this.selectRect = new RectElementController(point, point);
            }
        }
        this._mouseDown=point;
    }

    mouseUp(point){
        if(this.selectRect) {
            if(this.selectRect.getSquare()<1E-3){
                this._selectElements = this._getNearElements(point); //todo: if Ctrl this._selectElements += ...
            }else {
                this._selectElements = this.document.getElementsIntoFigure(this.selectRect); //todo: if Ctrl this._selectElements += ...
            }
            if(this._selectElements.length>0) {
                this._createResizeRect();
            }else{
                this.resizeRect = null;
            }
            this.selectRect = null;
        }
        this._mouseDown=null;
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

        if(this.resizeRect) {
            let element = this.resizeRect.toElement();
            element._renderer.drawAsNew();
            element.render();
        }
        for(let element of this._selectElements){
            element._renderer.setFocus(true);
        }
    }

    _getNearElements(point){
        let scale = container.board._scale; //todo: container
        return this.document.getNearElements(point, (scale>1?0.2:0.05)/scale);
    }
    _selectNearElements(point){
        for(let element of this._getNearElements(point)){
            element._renderer.setFocus(true);
        }
    }

    _createResizeRect(){
        let scale = container.board._scale; //todo: container
        let paddingSelectedRect = 0.3 / scale;
        let extrenum = this.document.getExtrenum(this._selectElements);
        this.resizeRect = new RectElementController(
            new Point(extrenum.min.x - paddingSelectedRect, extrenum.max.y + paddingSelectedRect)
            , new Point(extrenum.max.x + paddingSelectedRect, extrenum.min.y - paddingSelectedRect));
    }
}