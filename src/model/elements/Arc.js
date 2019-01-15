/**
 * Created by dev on 14.01.19.
 */

import Element from '../Element';
import Point from '../Point';
import Line from './Line';
import ArcRenderer from './../../2d/renderer/ArcRenderer';

export default class Arc extends Element{
    constructor(center, radius){
        super();
        this.center=center;
        this.radius=radius;
        this._renderer = new ArcRenderer(this);
    }

    /**
     * @returns {{max:{x:number, y:number}, min:{x:number, y:number}}}
     */
    getExtrenum(){
        let points = this._getExtrenumPoints();
        return Point.getExtrenum(points);
    }

    /**
     * @param {number} x
     * @param {number} y
     */
    move(x,y){
        this.center.move(x,y,0);
    }

    /**
     * @param {Point} point
     * @param {float} eps
     * @return {boolean}
     */
    isNear(point, eps){
        let l = new Line(this.center, point).length();
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
            new Point(this.center.x+this.radius, this.center.y),
            new Point(this.center.x, this.center.y+this.radius),
            new Point(this.center.x-this.radius, this.center.y),
            new Point(this.center.x, this.center.y-this.radius)
        ];
    }
}