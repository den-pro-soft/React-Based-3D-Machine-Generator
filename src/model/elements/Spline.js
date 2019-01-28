/**
 * Created by dev on 14.01.19.
 */

import GraphicElement from './../GraphicElement';
import Point from './../Point';
import SplineRenderer from './../../2d/renderer/SplineRenderer';
import Line from './Line';

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
     * @return {Array.<Point>}
     */
    get polyLinePoints(){
        let l1 = new Line(this.startPoint, this.controlPoint1);
        let l2 = new Line(this.controlPoint1, this.controlPoint2);
        let l3 = new Line(this.controlPoint2, this.endPoint);

        let x=l1.p1.x;
        let y=l1.p1.y;
        let discret = 200;
        let polyLine = [];

        for(let t=1; t<=discret; t++){
            polyLine.push(new Point(x,y));
            let p1 = l1.getPointOffset(t/discret);
            let p2 = l2.getPointOffset(t/discret);

            let pt1 = new Line(p1,p2).getPointOffset(t/discret);
            p1 = l2.getPointOffset(t/discret);
            p2 = l3.getPointOffset(t/discret);

            let pt2 = new Line(p1,p2).getPointOffset(t/discret);
            let pt = new Line(pt1, pt2).getPointOffset(t/discret);
            x = pt.x;
            y = pt.y;
        }
        return polyLine;
    }


    /**
     * @returns {{max:{x:number, y:number}, min:{x:number, y:number}}}
     */
    getExtrenum(){
        return Point.getExtrenum(this.polyLinePoints);
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
        let points = this.polyLinePoints;

        let res = false;
        for(let i=1; i<points.length; i++){
            res|=new Line(points[i-1], points[i]).isNear(point,eps);
        }
        return res;
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
        let points = this.polyLinePoints;

        let res = true;
        for(let i=1; i<points.length; i++){
            res&=new Line(points[i-1], points[i]).isIntoFigure(figure);
        }
        return res;
    }


    copy(){
        let res = new Spline(this._points[0].copy(),this._points[1].copy());
        res.controlPoint1 = this._points[2].copy();
        res.controlPoint2 = this._points[3].copy();
        res.hight=this.height;
        return res;
    }
}