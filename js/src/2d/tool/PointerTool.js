import Tool from './Tool';
import RectElementController from './RectElementControler';
import Point from './../../model/Point';
import Rect from "../../model/Rect";

/**
 * The tool can
 * 1. select elements by click and by select rect
 * 2. move canvas
 * 3. resize elements
 * 4. rotate elements
 */
export default class PointerTool extends Tool{
    constructor(document){
        super(document);

        this._mouseDown = false;
                
        this._selectElements = [];

        /** @var {RectElementController} */
        this.selectRect = null;

        /** @var {ResizeRect} */
        this.resizeRect = null;
        
        this._selectMode = true;
    }

    mouseMove(point){
        if(this.selectRect){
                this.selectRect.p2=point;
        }else {
            if(this.resizeRect && this._mouseDown){
                let dx = point.x-this._mouseDown.x;
                let dy = point.y-this._mouseDown.y;
                if(this.resizeRect.haveActiveControlPoint()){
                    for (let element of this._selectElements) {
                        element.resize(dx, dy);
                    }
                }else {
                    for (let element of this._selectElements) {
                        element.move(dx, dy);
                    }
                }
                this._createResizeRect();
            }else{
                if (!this._mouseDown && this._selectMode) {
                    this._selectNearElements(point);
                }
            }
        }

        if(this._mouseDown){
            this._mouseDown=point;
        }
        return this._selectMode;
    }

    mouseDbClick(point){
        this._selectMode=!this._selectMode;
    }

    mouseClick(point){}

    mouseDown(point){
        if(this._selectMode) {
            if(this.resizeRect){
                console.log(this.resizeRect.isControllPoint(point));
                if(this.resizeRect.isControllPoint(point)){
                    this.resizeRect.activeControlPoint();
                }else{
                    if(!this.resizeRect.contain(point)) {
                        this.resizeRect = null; //todo: if not ctrl
                        this.selectRect = new RectElementController(point, point);
                    }
                }
            }else{
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

    renderElement(){
        if(this.selectRect){
            let element = this.selectRect.toElement();
            element._renderer.drawAsNew();
            element.render();
        }

        if(this.resizeRect) {
            this.resizeRect.render();
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
        this.resizeRect = new ResizeRect(
            new Point(extrenum.min.x - paddingSelectedRect, extrenum.max.y + paddingSelectedRect)
            , new Point(extrenum.max.x + paddingSelectedRect, extrenum.min.y - paddingSelectedRect));
    }
}

class ResizeRect extends RectElementController{
    constructor(p1,p2){
        super(p1,p2);
        this.board = container.board;

        this.pointPadding = 4;
        this.activeCP = false;
    }

    activeControlPoint(){
        this.activeCP = true;
    }

    haveActiveControlPoint(){
        return this.activeCP;
    }

    /**
     * @param {Point} point
     */
    isControllPoint(point){
        let cPoints = this.getListControllPoints();
        point = this.board._convertToLocalCoordinateSystem(point);

        for(let p of cPoints){
            p = this.board._convertToLocalCoordinateSystem(p);
            let rect = new Rect(new Point(p.x-this.pointPadding,p.y+this.pointPadding),
                                new Point(p.x+this.pointPadding,p.y-this.pointPadding));
            if(rect.contain(point)){
                return true;
            }
        }
        return false;
    }

    getListControllPoints(){
        let res = [];
        let element = this.toElement();
        let ext = element.getExtrenum();
        let px1 = ext.min.x+this.l1.length()/2;
        let py1 = ext.min.y+this.l2.length()/2;

        res.push(new Point(px1, ext.min.y,0));
        res.push(new Point(px1, ext.max.y,0));
        res.push(new Point(ext.min.x, py1, 0));
        res.push(new Point(ext.max.x, py1, 0));
        res.push(new Point(ext.min.x, ext.min.y,0));
        res.push(new Point(ext.max.x, ext.min.y,0));
        res.push(new Point(ext.min.x, ext.max.y,0));
        res.push(new Point(ext.max.x, ext.max.y,0));
        return res;
    }

    render(){
        let element = this.toElement();
        element._renderer.drawAsNew();
        element.render();

        let points = this.getListControllPoints();
        for(let point of points){
            let p = this.board._convertToLocalCoordinateSystem(point);
            this._drawControlPoint(p);
        }
    }

    _drawControlPoint(p){

        this.board._drawRect({x:p.x-this.pointPadding,y:p.y+this.pointPadding}
            ,{x:p.x+this.pointPadding,y:p.y-this.pointPadding},'#000000',true);
    }
}