/**
 * Created by dev on 09.01.19.
 */

import Line from '../../model/elements/Line';
import Arc from '../../model/elements/Arc';
import Render from './Render';
import Trigonometric from './../../model/math/Trigonometric';

import CommentToSelf from './../../model/line_types/CommentToSelf'

export default class LineRenderer extends Render{
    /**
     * @param {Line} element
     */
    constructor(element){
        if(!element instanceof Line){
            throw new Exception('The renderer can render only Line objects');
        }
        super(element);
    }

    render(){
        this.board.drawLine(this.element.p1, this.element.p2);

        if(this.element.lineType instanceof CommentToSelf) {
            this._renderPointers();
        }
    }
    
    
    _renderPointers(){
        let vector = this.element.copy();

        let center = vector.getCenter();
        vector.rotate(center,90);
        vector.move(-vector.B/2,vector.A/2);

        let circle = new Arc(this.element.p2.copy(), 1);
        let crossPoints = vector.toPolyLines()[0].getCrossPoints(circle.toPolyLines()[0]);

        if(crossPoints.length!=0){
            vector.p1 = crossPoints[0];
            vector.p2 = crossPoints[1];
            this.board.drawLine(vector.p1, vector.p2);
            vector.move(-this.element.A,-this.element.B);
            this.board.drawLine(vector.p1, vector.p2);
            vector.rotate(vector.getCenter(), 65);
            if(this.element.A>0) {
                vector.p2 = vector.getCenter();
            }else{
                vector.p1 = vector.getCenter();
            }
            this.board.drawLine(vector.p1, vector.p2);
            if(this.element.A>0) {
                vector.rotate(vector.p2, 50);
            }else{
                vector.rotate(vector.p1, 50);
            }
            this.board.drawLine(vector.p1, vector.p2);

            vector.move(this.element.A,this.element.B);
            if(this.element.A>0) {
                vector.rotate(vector.p2, 180);
            }else{
                vector.rotate(vector.p1, 180);
            }
            this.board.drawLine(vector.p1, vector.p2);
            if(this.element.A>0) {
                vector.rotate(vector.p2, -50);
            }else{
                vector.rotate(vector.p1, -50);
            }
            this.board.drawLine(vector.p1, vector.p2);

        }
        let grad = Trigonometric.radToGrad(Math.atan(this.element.k));
        let height = 2 * this.board._pixelPerOne*this.board._scale;
        this.board.style('font',height + 'px Arial');
        this.board.style('textAlign','center');
        this.board.style('textBaseline','bottom');

        this.board.drawText(this.element.getCenter(),this.element.length().toFixed(3)+" mm", grad, false);
    }
}