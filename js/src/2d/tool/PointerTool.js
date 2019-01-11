import Tool from './Tool';
import RectElementController from './RectElementControler';

export default class PointerTool extends Tool{
    constructor(document){
        super(document);

        this._mouseDown = false;
                
        this._selectElements = [];

        /** @var {Element} */
        this.selectRect = null;
        
        this._selectMode = true;
    }

    mouseMove(point){
        if(this.selectRect){
            this.selectRect.p2=point;
        }else {
            if (!this._mouseDown && this._selectMode) {
                this._selectNearElements(point);
            }
        }

        return this._selectMode;
    }

    mouseDbClick(point){
        this._selectMode=!this._selectMode;
    }

    mouseClick(point){}

    mouseDown(point){
        if(this._selectMode) {
            this.selectRect = new RectElementController(point, point);
        }
        this._mouseDown=true;
    }

    mouseUp(point){
        if(this.selectRect) {
            if(this.selectRect.getSquare()<1E-3){
                this._selectElements = this._getNearElements(point);
            }else {
                this._selectElements = this.document.getElementsIntoFigure(this.selectRect);
            }
            this.selectRect = null;
        }
        this._mouseDown=false;
    }

    renderElement(){
        if(this.selectRect){
            let element = this.selectRect.toElement();
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
}