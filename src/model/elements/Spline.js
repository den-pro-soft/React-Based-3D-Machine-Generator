/**
 * Created by dev on 14.01.19.
 */

import GraphicElement from './../GraphicElement';
import Point from './../Point';
import SplineRenderer from './../../2d/renderer/SplineRenderer';

export default class Spline extends GraphicElement{
    constructor(startPoint, endPoint){
        super();
        this._points = [startPoint, endPoint, null, null];
        this._renderer = new SplineRenderer(this);

        this.typeName= 'Spline';
    }

    set startPoint(p){
        this._points[0]=p;
    }
    get startPoint(){
        return this._points[0];
    }


    set endPoint(p){
        this._points[1]=p;
    }
    get endPoint(){
        return this._points[1];
    }


    set controlPoint1(p){
        this._points[2]=p;
    }
    get controlPoint1(){
        return this._points[2];
    }


    set controlPoint2(p){
        this._points[3]=p;
    }
    get controlPoint2(){
        return this._points[3];
    }



    /**
     * @returns {{max:{x:number, y:number}, min:{x:number, y:number}}}
     */
    getExtrenum(){
        return Point.getExtrenum(this._points); //todo: isn't correct method
    }

    /**
     * @param {number} x
     * @param {number} y
     */
    move(x,y){
        let moveMatrix = this.createMoveMatrix(x,y);
        for(let p of this._points){
            p.changeByMatrix(moveMatrix);
        }
    }

    /**
     * @param {Point} point
     * @param {float} eps
     * @return {boolean}
     */
    isNear(point, eps){
        return true;
    }

    getCenter(){
        let res = new Point(0,0);
        for(let p of this._points){
            res.x+=p.x;
            res.y+=p.y;
            res.y+=p.y;
        }
        res.x/=this._points.length;
        res.y/=this._points.length;
        res.y/=this._points.length;
        return res;
    }

    /**
     * @deprecated The method can have an error if the figure is a concave element
     *
     * @param {ClosedFigure} figure
     * @return {boolean} - true if current elements into figure.
     */
    isIntoFigure(figure){

    }


    copy(){
        let res = new Spline(this._points[0].copy(),this._points[1].copy());
        res.controlPoint1 = this._points[2].copy();
        res.controlPoint2 = this._points[3].copy();
        res.hight=this.height;
        return res;
    }
}