/**
 * Created by dev on 15.01.19.
 */

import Transformer from './Transformer';
import RectElementController from './../RectElementControler';
import Point from './../../../model/Point';
import Group from './../../../model/elements/Group';
import Rect from "./../../../model/Rect";

class ControlPoint{
    constructor(x,y,name){
        this.x=x;
        this.y=y;
        this.name =name;
    }
}


class ResizeRect extends RectElementController{
    constructor(el){
        super(new Point(),new Point());
        this.board = container.board;

        this.pointPadding = 4;
        this.rectPadding = 10;

        this.elements = el;

    }

    set elements(el){
        this._elements=el;
        this._resize();
    }

    _resize(){
        let ext = this.board.document.getExtrenum(this._elements);
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

        let p1 = new ControlPoint(p1Local.x-this.rectPadding,p1Local.y-this.rectPadding,'left-top');
        let p2 = new ControlPoint(p2Local.x+this.rectPadding, p2Local.y+this.rectPadding, 'right-bottom');

        let controlPoints = [
            p1,
            p2,
            new ControlPoint(p2.x, p1.y, 'right-top'),
            new ControlPoint(p1.x, p2.y, 'left-bottom'),
            new ControlPoint(p1.x+(p2.x-p1.x)/2 , p1.y, 'center-top'),
            new ControlPoint(p1.x+(p2.x-p1.x)/2 ,p2.y, 'center-bottom'),
            new ControlPoint(p1.x ,p1.y+(p2.y-p1.y)/2, 'left-center'),
            new ControlPoint(p2.x ,p1.y+(p2.y-p1.y)/2, 'right-center')];

        return controlPoints;
    }

    render(){
        this._resize();
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
        this._p1.x+=x;
        this._p1.y+=y;

        this._p2.x+=x;
        this._p2.y+=y;
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
        let extr = this.board.document.getExtrenum(this._elements);
        let p1Local = this.board._convertToLocalCoordinateSystem(new Point(extr.min.x, extr.max.y));
        let p2Local = this.board._convertToLocalCoordinateSystem(new Point(extr.max.x, extr.min.y));

        let p1 = {x:p1Local.x-this.rectPadding-this.pointPadding, y:p1Local.y-this.rectPadding-this.pointPadding};
        let p2 = {x:p2Local.x+this.rectPadding+this.pointPadding, y:p2Local.y+this.rectPadding+this.pointPadding};

        let checkPoint = this.board._convertToLocalCoordinateSystem(point);


        return new Rect(p1,p2).contain(checkPoint) || this.isControlPoint(point);
    }

    resizeElements(controlPoint, dx, dy){
        let pName = controlPoint.name.split('-');
        let lcr =pName[0];
        let ucd =pName[1];

        if(lcr == 'left'){
            dx = -dx;
        }
        if(ucd == 'bottom'){
            dy = -dy;
        }
        if(ucd == 'center'){
            dy=0;
        }
        if(lcr == 'center'){
            dx=0;
        }
        let group = new Group();

        for(let element of this._elements){
            group.addElement(element);
        }

        group.resize(dx,dy);

        let dxDelta =dx/2;
        let dyDelta =dy/2;
        if(lcr == 'left'){
            dxDelta = -dxDelta;
        }
        if(ucd == 'bottom'){
            dyDelta = -dyDelta;
        }
        group.move(dxDelta, dyDelta);
    }
}




/**
 * If resize a circle the circle translates to group with four splines (ask user)
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
        super.addElements(elements);
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
        this._downPosition = point;
        if(this.resizeRect){
            if(this.resizeRect.contain(point)){
                if (this.resizeRect.isControlPoint(point)){
                    this.activeControllPoint = this.resizeRect._getControlPointByPoint(point);
                }
                return false;
            }else{
                return true;
            }
        }
    }

    /**
     * @param {Point} point
     * @return {boolean} - false if transformer do some work
     */
    mouseUp(point){
        this._downPosition = null;
        if(this.resizeRect) {
            this.activeControllPoint=null;
            if(this.dx!=0 || this.dy!=0){
                app.moveSelected(this.dx, this.dy);
                this.dx = 0;
                this.dy = 0;
            }
            return super.mouseUp(point) && this.resizeRect.contain(point);
        }else{
            return super.mouseUp(point);
        }
    }
    
    mouseMove(point){
        super.mouseMove(point);
        if(this._downPosition){
            if(this.resizeRect.contain(this._downPosition)) {
                let dx = point.x - this._downPosition.x;
                let dy = point.y - this._downPosition.y;

                if (this.resizeRect.isControlPoint(this._downPosition) || this.activeControllPoint) {
                    this.resizeRect.resizeElements(this.activeControllPoint, dx,dy);
                } else {
                    this.dx+=dx;
                    this.dy+=dy;
                    for (let element of this._elements) {
                        element.move(dx, dy);
                        this.resizeRect.move(dx,dy);
                    }
                }
                this._downPosition = point;
                return false;
            }
        }

        return true;
    }

    render(){
        super.render();
        if(this.resizeRect){
            this.resizeRect.render();
        }
    }

}
