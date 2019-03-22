/**
 * Created by dev on 15.01.19.
 */

import Transformer from './Transformer';
import RectElement from '../../../model/elements/RectElement';
import Point from './../../../model/Point';
import Group from './../../../model/elements/Group';
import Arc from './../../../model/elements/Arc';
import Rect from "../../../model/math/Rect";
import ResizeElementsCommand from './../../command/ResizeElementsCommand';
import Vector from './../../../model/math/Vector';
import Document from './../../../model/Document';

class ControlPoint{
    constructor(x,y, alignX, alignY){
        this.x=x;
        this.y=y;
        this.alignX = alignX;
        this.alignY = alignY;
    }
}


class ResizeRect extends RectElement{
    constructor(el){
        super(new Point(),new Point());
        this.board = container.resolve('mainBoard'); //todo: maybe set from the using place

        this.pointPadding = 4;
        this.rectPadding = 10;

        this._elements = [];
        this._document = null;

        this.elements = el;
        // this.command = new ChangeElementsSizeCommand(this._document, el, 0, 0, ChangeElementsSizeCommand.ALIGN_X.canter, ChangeElementsSizeCommand.ALIGN_Y.center);
    }

    set elements(elements){
        this._elements = elements;
        if(elements.length>0) {
            this._resize();
        }
    }

    _resize(){
        let ext = Document.getExtrenumForElements(this._elements);
        this.p1 = new Point(ext.min.x, ext.max.y);
        this.p2 = new Point(ext.max.x, ext.min.y);
    }


    /**
     * @param {Point} point
     */
    contain(point){
        let res = super.contain(point);

        return res;
    }

    getControlPoints(){
        let p1Local = this.board._convertToLocalCoordinateSystem(this.p1);
        let p2Local = this.board._convertToLocalCoordinateSystem(this.p2);

        let p1 = new ControlPoint(p1Local.x-this.rectPadding,p1Local.y-this.rectPadding,ResizeElementsCommand.CONTROL_POINT_X.left, ResizeElementsCommand.CONTROL_POINT_Y.top);
        let p2 = new ControlPoint(p2Local.x+this.rectPadding, p2Local.y+this.rectPadding, ResizeElementsCommand.CONTROL_POINT_X.right, ResizeElementsCommand.CONTROL_POINT_Y.bottom);

        let controlPoints = [
            p1,
            p2,
            new ControlPoint(p2.x, p1.y, ResizeElementsCommand.CONTROL_POINT_X.right, ResizeElementsCommand.CONTROL_POINT_Y.top),
            new ControlPoint(p1.x, p2.y, ResizeElementsCommand.CONTROL_POINT_X.left, ResizeElementsCommand.CONTROL_POINT_Y.bottom),
            new ControlPoint(p1.x+(p2.x-p1.x)/2 , p1.y, ResizeElementsCommand.CONTROL_POINT_X.canter, ResizeElementsCommand.CONTROL_POINT_Y.top),
            new ControlPoint(p1.x+(p2.x-p1.x)/2 ,p2.y, ResizeElementsCommand.CONTROL_POINT_X.canter, ResizeElementsCommand.CONTROL_POINT_Y.bottom),
            new ControlPoint(p1.x ,p1.y+(p2.y-p1.y)/2, ResizeElementsCommand.CONTROL_POINT_X.left, ResizeElementsCommand.CONTROL_POINT_Y.center),
            new ControlPoint(p2.x ,p1.y+(p2.y-p1.y)/2, ResizeElementsCommand.CONTROL_POINT_X.right, ResizeElementsCommand.CONTROL_POINT_Y.center)];

        return controlPoints;
    }

    render(){
        let p1Local = this.board._convertToLocalCoordinateSystem(this.p1);
        let p2Local = this.board._convertToLocalCoordinateSystem(this.p2);

        let p1 = {x:p1Local.x-this.rectPadding, y:p1Local.y-this.rectPadding};
        let p2 = {x:p2Local.x+this.rectPadding, y:p2Local.y+this.rectPadding};
        this.board.style('strokeStyle', '#000000');
        this.board.style('lineWidth', 1);   //todo: use theme
        this.board.style('dash', [4,4]);
        this.board._drawLine(p1, {x:p2.x, y:p1.y});
        this.board._drawLine({x:p2.x, y:p1.y}, p2);
        this.board._drawLine(p2, {x:p1.x, y:p2.y});
        this.board._drawLine({x:p1.x, y:p2.y}, p1); 

        let controlPoints = this.getControlPoints();

        for(let p of controlPoints) {
            this._drawControlPoint(p);
        }
    }

    move(x,y){
        this.p1 = new Point(this.p1.x+x, this.p1.y+y);
        this._p1.x+=x;
    }

    _createControlPointRect(p){
        return new Rect(new Point(p.x-this.pointPadding, p.y+this.pointPadding),
            new Point(p.x+this.pointPadding, p.y-this.pointPadding));
    }
    _drawControlPoint(p){
        let r = this._createControlPointRect(p);
        this.board.style('fillStyle','#000000');
        this.board._drawRect(r._p1, r._p2,true);
    }

    /**
     * @param point
     * @return {ControlPoint|null}
     * @private
     */
    _getControlPointByPoint(point){
        let controlPoints = this.getControlPoints();
        let checkPoint = this.board._convertToLocalCoordinateSystem(point);
        for(let p of controlPoints){
            /** @Var {Rect} */
            let r = this._createControlPointRect(p);
            if(r.contain(checkPoint)){
                return p;
            }
        }
        return null;
    }

    isControlPoint(point){
        let controlPoint = this._getControlPointByPoint(point);
        return controlPoint!=null;
    }

    contain(point){
        if(this._elements.length>0) {
            let extr = Document.getExtrenumForElements(this._elements);
            let p1Local = this.board._convertToLocalCoordinateSystem(new Point(extr.min.x, extr.max.y));
            let p2Local = this.board._convertToLocalCoordinateSystem(new Point(extr.max.x, extr.min.y));

            let p1 = {
                x: p1Local.x - this.rectPadding - this.pointPadding,
                y: p1Local.y - this.rectPadding - this.pointPadding
            };
            let p2 = {
                x: p2Local.x + this.rectPadding + this.pointPadding,
                y: p2Local.y + this.rectPadding + this.pointPadding
            };

            let checkPoint = this.board._convertToLocalCoordinateSystem(point);
            return new Rect(p1,p2).contain(checkPoint) || this.isControlPoint(point);
        }
        return false;
    }
}




/**
 * 3. resize elements
 * 5. move elements on board
 */
export default class ResizeTransformer extends Transformer{
    constructor(document){
        super(document);

        /** @var {ResizeRect} */
        this.resizeRect = null;
            
        this._downPosition = null;

        this.activeControllPoint = null;

        this.dx = 0;
        this.dy = 0;
    }

    addElements(elements){
        this._elements.push(...elements);
        if(!this.resizeRect){
            this.resizeRect = new ResizeRect(this._elements);
        }
        this.resizeRect.elements = this._elements;
    }

    /**
     * @param {Point} point
     * @return {boolean} - false if transformer do some work
     */
    mouseDown(point){
        super.mouseDown();
        if(this.resizeRect && this.resizeRect.contain(point)){
            this._downPosition = point;
            if (this.resizeRect.isControlPoint(point)){
                this.activeControllPoint = this.resizeRect._getControlPointByPoint(point);
            }
            return false;
        }
        return true;
    }

    /**
     * @param {Point} point
     * @return {boolean} - false if transformer do some work
     */
    mouseUp(point){
        this._downPosition = null;
        if(this.resizeRect) {
            if(this.dx!=0 || this.dy!=0){
                if(!this.activeControllPoint) {
                    app.moveSelected(this.dx, this.dy);
                }else{
                    app.executeCommand(new ResizeElementsCommand(this.board.document, this._elements,
                        new Vector(this.dx, this.dy), this.activeControllPoint.alignX, this.activeControllPoint.alignY));
                }
                this.dx = 0;
                this.dy = 0;
            }
            this.activeControllPoint=null;
            return super.mouseUp(point) && this.resizeRect.contain(point);
        }
        return super.mouseUp(point);
    }
    
    mouseMove(point){
        super.mouseMove(point);
        if(this._downPosition){
            let dx = point.x - this._downPosition.x;
            let dy = point.y - this._downPosition.y;
            this.dx+=dx;
            this.dy+=dy;
            if(!this.activeControllPoint) {
                this.resizeRect.move(dx,dy);
            }
            this._downPosition = point;
            return false;
        }

        return true;
    }

    render(){
        let changeElements = this._elements.map(e=>e.copy());
        if(!this.activeControllPoint){
            for(let element of changeElements){
                element.move(this.dx,this.dy);
            }
            this.renderElements(changeElements);
        }else{
            if(this._downPosition) {
                let hasArcs = changeElements.reduce((el,res)=>res|(el instanceof Arc && el.incrementAngle!=360),false);
                let command = new ResizeElementsCommand(new Document(), changeElements,
                    new Vector(this.dx, this.dy), this.activeControllPoint.alignX, this.activeControllPoint.alignY, true);
                command.needSave = false;

                if(hasArcs) {
                    command.execute().then((res) => {
                        if (res) {
                            if (command.isReplacedElements()) {
                                changeElements = command.getElements();
                            }
                        } else {
                            this._downPosition = null;
                            this.activeControllPoint = null;
                        }
                        this.renderElements(changeElements);
                    });
                }else{
                    command.executeCommand();
                    if(command.isReplacedElements()) {
                        changeElements = command.getElements();
                    }
                    this.renderElements(changeElements);
                }
            }else{
                this.renderElements(changeElements);
            }
        }

    }

    renderElements(elements){
        for(let element of elements){
            element._renderer.setFocus(true);
            element.render();
        }

        if(this.resizeRect){
            this.resizeRect.elements=elements;
            this.resizeRect.render();
        }
    }

}
