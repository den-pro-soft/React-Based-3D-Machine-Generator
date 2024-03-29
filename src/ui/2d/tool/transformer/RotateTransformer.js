/**
 * Created by dev on 15.01.19.
 */

import Transformer from './Transformer';
import Point from '../../../../model/Point';
import Line from '../../../../model/math/Line';
import Group from '../../../../model/elements/Group';
import Trigonometric from '../../../../model/math/Trigonometric';

/**
 *  rotate elements
 */
export default class RotateTransformer extends Transformer{
    constructor(document){
        super(document);

        this._downPosition = null;
        this.grad=0;
        this.Dgrad=0;
        this._createGroup();
        this.center=null;
        // this._calculateRadius();
    }

    /**
     * @param {Point} point
     * @return {boolean} - false if transformer do some work
     */
    mouseDown(point){
        if(this.group){
            let scale = this.board._scale;
            let r = (scale * this.board._pixelPerOne * this.radius + 10+4)/(this.board._pixelPerOne*scale);

            if(r> new Line(this.center,point).length()){ //into transformer
                this._downPosition = point;
                // this._createGroup();
                // this._calculateRadius();
            }else{
                return true;
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
        if(this.Dgrad!=0) {
            app.rotateSelected(this.Dgrad);
            this.Dgrad = 0;
        }
        return super.mouseUp(point);
    }

    /**
     * @param {Point} point
     * @return {boolean} - false if transformer do some work
     */
    mouseMove(point){
        if(this._downPosition) {

            let center = this.center;

            var delt_x1 = this._downPosition.x  - center.x ;
            var delt_y1 = center.y  - this._downPosition.y ;

            var delt_x2 = point.x  - center.x ;
            var delt_y2 = center.y  - point.y ;
            //
            var angle1 = Math.atan2(delt_x1, delt_y1) * 180 / Math.PI ;
            var angle2 = Math.atan2(delt_x2, delt_y2) * 180 / Math.PI ;

            var angleDelta = angle1 - angle2;

            this.grad+=angleDelta;
            this.Dgrad+=angleDelta;
            this.group.rotate(center,angleDelta);
            this._downPosition= point;
        }

        return super.mouseMove(point);
    }

    render(){
        super.render();
        if(this.group) {
            let centerPoint = this.board._convertToLocalCoordinateSystem(this.center);

            let localRadius = this._localRadius();
            this.board.style('strokeStyle', '#000000');
            this.board.style('lineWidth', 1);   //todo: use theme
            this.board.style('dash', [4, 4]);

            this.board._drawArc(centerPoint, localRadius, 0, 2*Math.PI);
            let grad45 = Trigonometric.gradToRad(45 + this.grad);
            this.board.style('fillStyle', '#000000');
            this.board.style('lineWidth', 1);   //todo: use theme
            this.board.style('dash', []);
            this.board._drawArc({
                x: centerPoint.x + localRadius * Math.sin(grad45),
                y: centerPoint.y - localRadius * Math.cos(grad45)
            }, 4, 0, 2*Math.PI, true);
            this.board._drawArc({
                x: centerPoint.x - localRadius * Math.sin(grad45),
                y: centerPoint.y + localRadius * Math.cos(grad45)
            }, 4, 0, 2*Math.PI, true);
            this.board._drawArc({
                x: centerPoint.x - localRadius * Math.cos(grad45),
                y: centerPoint.y - localRadius * Math.sin(grad45)
            }, 4, 0, 2*Math.PI, true);


            this.board._drawArc({
                x: centerPoint.x + localRadius * Math.cos(grad45),
                y: centerPoint.y + localRadius * Math.sin(grad45)
            }, 4, 0, 2*Math.PI, true);
            this.board._drawArc(centerPoint, 8, 0, 2*Math.PI, true);
            this.board.style('fillStyle', '#ffffff');
            this.board._drawArc(centerPoint, 6, 0, 2*Math.PI, true);
            this.board.style('fillStyle', '#000000');
            this.board._drawArc(centerPoint, 2, 0, 2*Math.PI, true);
        }
    }

    addElements(element){
        super.addElements(element);
        this._createGroup();
        this._calculateRadius();
    }

    _createGroup(){
        this.group = new Group(this.document);
        for (let el of this._elements) {
            this.group.addElement(el);
        }
    }

    _calculateRadius(){
        this.center = this.group.getCenter();
        this.radius = 0;
        for(let p of this.group._points){
            let temp = new Line(this.center, p).length();
            if(temp>this.radius){
                this.radius = temp;
            }
        }
    }

    _localRadius(){
        return this.board._scale * this.board._pixelPerOne * this.radius + 10;
    }
}