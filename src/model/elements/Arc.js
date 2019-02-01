/**
 * Created by dev on 14.01.19.
 */

import GraphicElement from '../GraphicElement';
import Point from '../Point';
import Line from './Line';
import ArcRenderer from './../../2d/renderer/ArcRenderer';
import PolyLine from './../math/PolyLine';

export default class Arc extends GraphicElement{
    constructor(center, radius){
        super();
        this._center=center;
        this._points[0]=center;
        this.radius=radius;
        this._renderer = new ArcRenderer(this);

        this.typeName = 'Arc';
    }

    set center(point){
        this._center = point;
        this._points[0]=point;
    }

    get center(){
        return this._center;
    }
    
    /**
     * @returns {{max:{x:number, y:number}, min:{x:number, y:number}}}
     */
    getExtrenum(){
        let points = this._getExtrenumPoints();
        return Point.getExtrenum(points);
    }


    getCenter(){
        return this._center;
    }

    /**
     * @param {Point} point
     * @param {float} eps
     * @return {boolean}
     */
    isNear(point, eps){
        let l = new Line(this._center, point).length();
        return this.radius+eps>l && this.radius-eps<l;
    }


    /**
     * @deprecated The method can have an error if the figure is a concave element
     *
     * @param {ClosedFigure} figure
     * @return {boolean} - true if current elements into figure.
     */
    isIntoFigure(figure){
        let points = this._getExtrenumPoints();
        let res = true;
        for(let p of points){
            res &= figure.contain(p);
        }
        return res;
    }

    _getExtrenumPoints(){
        return [
            new Point(this._center.x+this.radius, this._center.y),
            new Point(this._center.x, this._center.y+this.radius),
            new Point(this._center.x-this.radius, this._center.y),
            new Point(this._center.x, this._center.y-this.radius)
        ];
    }

    copy(){
        let arc = new Arc(this.center.copy(), this.radius);
        arc.height=this.height;
        arc.id=this.id;
        return arc;
    }

    /**
     * @inheritDoc
     */
    toPolyLines(){
        let res = new PolyLine();

        var start = 0;
        var end = 2 * Math.PI;

        for (var a = start; a <= end; a += Math.PI / 100){
            res.addPoint(new Point(this._center.x+this.radius*Math.cos(a), this._center.y+this.radius*Math.sin(a)));
        }
        return [res];
    }
}