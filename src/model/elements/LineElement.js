/**
 * Created by dev on 04.01.19.
 */

import GraphicElement from './../GraphicElement';
import LineRenderer from './../../2d/renderer/LineRenderer';
import PolyLine from '../math/PolyLine';
import Line from './../math/Line';

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

    set p1(point){
        this._points[0]=point;
        this._line._p1=point;
    }
    get p1(){
        return this._line._p1;
    }

    set p2(point){
        this._points[1]=point;
        this._line._p2=point;
    }
    get p2(){
        return this._line._p2;
    }

    /**
     * @inheritDoc
     */
    isIntoFigure(figure){
        return figure.contain(this.p1) && figure.contain(this.p2);
    }

    isNear(point, eps){
        return this._line.isNear(point, eps);
    }


    length(){
        return this._line.length();
    }

    getCenter(){
        return this._line.getPointOffset(0.5);
    }

    copy(){
        let line = new LineElement(this.p1.copy(), this.p2.copy());
        line.height=this.height;
        line.id=this.id;
        line.lineType = this.lineType.copy();
        return line;
    }

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
            res.push(new Line(points[i-1].copy(), points[i].copy()));
        }
        return res;
    }
}