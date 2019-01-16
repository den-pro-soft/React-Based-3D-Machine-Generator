/**
 * Created by dev on 15.01.19.
 */

import Transformer from './Transformer';
import Point from './../../../model/Point';
import Line from './../../../model/elements/Line';

/**
 *  rotate elements
 */
export default class RotateTransformer extends Transformer{
    constructor(document){
        super(document);

    }

    /**
     * @param {Point} point
     * @return {boolean} - false if transformer do some work
     */
    mouseDown(point){
        return false;
    }

    /**
     * @param {Point} point
     * @return {boolean} - false if transformer do some work
     */
    mouseUp(point){
        return super.mouseUp(point);
    }

    /**
     * @param {Point} point
     * @return {boolean} - false if transformer do some work
     */
    mouseMove(point){
        return true;
    }

    render(){
        let center = new Point(0,0);

        for(let p of this._elements){
            let c = p.getCenter();
            center.x+=c.x;
            center.y+=c.y;
            center.z+=c.z;
        }
        center.x/=this._elements.length;
        center.y/=this._elements.length;
        center.z/=this._elements.length;
        
        let extr = this.document.getExtrenum(this._elements);

        let line = new Line(center, new Point(extr.max.x, extr.max.y));
        let radius = line.length();

        let centerPoint = this.board._convertToLocalCoordinateSystem(center);
        let localRadius = this.board._scale*this.board._pixelPerOne*radius+10;
        this.board._drawArc(centerPoint, localRadius, '#ff0000',1,[4,4]);

        let grad45 = this.gradToRad(45);
        this.board._drawArc({x:centerPoint.x+localRadius*Math.sin(grad45),y:centerPoint.y-localRadius*Math.cos(grad45)}, 3, '#00ff00',1,[]);
        this.board._drawArc({x:centerPoint.x-localRadius*Math.sin(grad45),y:centerPoint.y+localRadius*Math.cos(grad45)}, 3, '#00ff00',1,[]);
        this.board._drawArc({x:centerPoint.x-localRadius*Math.sin(grad45),y:centerPoint.y-localRadius*Math.cos(grad45)}, 3, '#00ff00',1,[]);
        this.board._drawArc({x:centerPoint.x+localRadius*Math.sin(grad45),y:centerPoint.y+localRadius*Math.cos(grad45)}, 3, '#00ff00',1,[]);


    }

    gradToRad(grad){
        return (grad*180)/Math.PI;
    }
}