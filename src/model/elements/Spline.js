/**
 * Created by dev on 14.01.19.
 */

import Element from './../Element';
import Point from './../Point';
import SplineRenderer from './../../2d/renderer/SplineRenderer';

export default class Spline extends Element{
    constructor(startPoint, endPoint){
        super();
        this.startPoint = startPoint;
        this.endPoint = endPoint;

        this.controlPoint1=null;
        this.controlPoint2=null;



        this._renderer = new SplineRenderer(this);
    }

    /**
     * @returns {{max:{x:number, y:number}, min:{x:number, y:number}}}
     */
    getExtrenum(){
        return Point.getExtrenum([ //todo: isn't correct method
            this.startPoint, this.endPoint, this.controlPoint1, this.controlPoint2
        ]);
    }

    /**
     * @param {number} x
     * @param {number} y
     */
    move(x,y){
        this.startPoint.move(x,y,0);
        this.endPoint.move(x,y,0);
        this.controlPoint1.move(x,y,0);
        this.controlPoint2.move(x,y,0);
    }

    /**
     * @param {Point} point
     * @param {float} eps
     * @return {boolean}
     */
    isNear(point, eps){

    }


    /**
     * @deprecated The method can have an error if the figure is a concave element
     *
     * @param {ClosedFigure} figure
     * @return {boolean} - true if current elements into figure.
     */
    isIntoFigure(figure){

    }
    
}