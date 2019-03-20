/**
 * Created by dev on 04.01.19.
 */

import GraphicElement from './../GraphicElement';
import LineRenderer from './../../2d/renderer/LineRenderer';
import PolyLine from '../math/PolyLine';
import Line from './../math/Line';
import Matrix from './../math/Matrix';
import Vector from './../math/Vector';

/**
 * @inheritDoc
 */
export default class LineElement extends GraphicElement{
    constructor(p1, p2){
        super();
        this._line = new Line(p1,p2);
        this._points=[p1,p2];
        this._renderer = new LineRenderer(this);

        this.typeName = 'Line'; //todo: change to LineElement
    }

    /**
     * @inheritDoc
     * @return {Array.<Point>} -
     */
    get extremePoints(){
        return [this.p1, this.p2];
    }

    get angle(){
        return new Vector(1,0,0).getAngle(this._line.toVector());
    }

    /**
     * @param {Point} point
     */
    set p1(point){
        this._points[0]=point;
        this._line._p1=point;
    }

    /**
     * @return {Point}
     */
    get p1(){
        return this._line._p1;
    }

    /**
     * @param {Point} point
     */
    set p2(point){
        this._points[1]=point;
        this._line._p2=point;
    }

    /**
     * @return {Point}
     */
    get p2(){
        return this._line._p2;
    }

    /**
     * @inheritDoc
     */
    isIntoFigure(figure){
        return figure.contain(this.p1) && figure.contain(this.p2);
    }

    /**
     * @inheritDoc
     * @param {Point} point
     * @return {boolean}
     */
    isBelongsToTheElement(point){
        return this._line.isBelongsToTheLine(point);
    }
    
    /**
     * @inheritDoc
     */
    isNear(point, eps){
        return this._line.isNear(point, eps);
    }


    length(){
        return this._line.length();
    }

    /**
     * @inheritDoc
     */
    getCenter(){
        return this._line.getPointOffset(0.5);
    }

    /**
     * @inheritDoc
     */
    resize(x, y, point, extr){

        let wX = Math.abs(extr.max.x-extr.min.x);

        let wY = Math.abs(extr.max.y-extr.min.y);

        let dx = 0;
        let dy = 0;
        if(wX!=0){
            dx = (wX+x)/wX-1;
        }

        if(wY!=0){
            dy = (wY+y)/wY-1;
        }

        let resizeMatrix = Matrix.createResizeMatrix(dx,dy);


        let moveMatrix = Matrix.createMoveMatrix(-point.x, -point.y);
        let removeMatrix = Matrix.createMoveMatrix(point.x, point.y);

        for(let point of this._points){
            point.changeByMatrix(moveMatrix);
            point.changeByMatrix(resizeMatrix);
            point.changeByMatrix(removeMatrix);
        }
    }

    /**
     * @inheritDoc
     * @return {LineElement}
     */
    copy(){
        let line = new LineElement(this.p1.copy(), this.p2.copy());
        line.height=this.height;
        line.id=this.id;
        line.lineType = this.lineType.copy();
        return line;
    }

    /**
     * @inheritDoc
     */
    toPolyLines(){
        return [new PolyLine(this._points)];
    }

    /**
     * @inheritDoc
     */
    intersectByPoints(points){
        points.push(this.p1.copy());
        points.push(this.p2.copy());
        let res = [];
        points = points.sort((a, b)=>this.p1.distanceTo(a)<=this.p1.distanceTo(b)?-1:1);

        for(let i=1; i<points.length; i++){
            if(!points[i-1].compare(points[i])) {
                res.push(new LineElement(points[i - 1].copy(), points[i].copy()));
            }
        }
        return res;
    }
}