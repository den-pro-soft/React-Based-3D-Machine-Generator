/**
 * Created by dev on 15.01.19.
 */

import Transformer from './Transformer';
import Point from './../../../model/Point';
import Line from './../../../model/elements/Line';
import Group from './../../../model/elements/Group';
import Trigonometric from './../../../model/math/Trigonometric';

/**
 *  rotate elements
 */
export default class RotateTransformer extends Transformer{
    constructor(document){
        super(document);

        this._downPosition = null;
        this.grad=0;
    }

    /**
     * @param {Point} point
     * @return {boolean} - false if transformer do some work
     */
    mouseDown(point){
        this._downPosition = point;

        this.group = new Group(this.document);
        for (let el of this._elements) {
            this.group.addElement(el);
        }
        let center = this.group.getCenter();



        this.radius = 0;

        for(let p of this.group._points){
            let temp = new Line(center, p).length();
            if(temp>this.radius){
                this.radius = temp;
            }
        }

        return super.mouseDown(point);
    }

    /**
     * @param {Point} point
     * @return {boolean} - false if transformer do some work
     */
    mouseUp(point){
        this._downPosition = null;
        return super.mouseUp(point);
    }

    /**
     * @param {Point} point
     * @return {boolean} - false if transformer do some work
     */
    mouseMove(point){
        if(this._downPosition) {


            let center = this.group.getCenter();

            console.log(center);
            let grad = new Line(center, this._downPosition).getAngle(new Line(center, point));
            this.grad+=grad;
            this.group.rotate(center,-grad);
            this._downPosition= point;
        }

        return super.mouseMove(point);
    }

    render(){
        let center = this.group.getCenter();
        
        let centerPoint = this.board._convertToLocalCoordinateSystem(center);
        let localRadius = this.board._scale*this.board._pixelPerOne*this.radius+10;

        this.board.style('strokeStyle', '#000000');
        this.board.style('lineWidth', 1);   //todo: use theme
        this.board.style('dash', [4,4]);
        this.board._drawArc(centerPoint, localRadius);

        let grad45 = Trigonometric.gradToRad(45+this.grad);
        this.board.style('fillStyle', '#000000');
        this.board.style('lineWidth', 1);   //todo: use theme
        this.board.style('dash', []);
        this.board._drawArc({x:centerPoint.x+localRadius*Math.cos(grad45),y:centerPoint.y-localRadius*Math.sin(grad45)}, 4, true);
        this.board._drawArc({x:centerPoint.x-localRadius*Math.cos(grad45),y:centerPoint.y+localRadius*Math.sin(grad45)}, 4, true);
        this.board._drawArc({x:centerPoint.x-localRadius*Math.sin(grad45),y:centerPoint.y-localRadius*Math.cos(grad45)}, 4, true);
        this.board._drawArc({x:centerPoint.x+localRadius*Math.sin(grad45),y:centerPoint.y+localRadius*Math.cos(grad45)}, 4, true);


        this.board._drawArc(centerPoint, 8, true);
        this.board.style('fillStyle', '#ffffff');
        this.board._drawArc(centerPoint, 6, true);
        this.board.style('fillStyle', '#000000');
        this.board._drawArc(centerPoint, 2, true);

    }

}