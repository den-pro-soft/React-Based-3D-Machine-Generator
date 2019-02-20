/**
 * Created by dev on 09.01.19.
 */

import LineElement from '../../model/elements/LineElement';
import Arc from '../../model/elements/Arc';
import Render from './Render';
import Trigonometric from './../../model/math/Trigonometric';

import CommentToSelf from './../../model/line_types/CommentToSelf'

export default class LineRenderer extends Render{
    /**
     * @param {LineElement} element
     */
    constructor(element){
        if(!element instanceof LineElement){
            throw new Exception('The renderer can render only LineElement objects');
        }
        super(element);
    }

    /**
     * @inheritDoc
     */
    drawElement(){
        this.board.drawLine(this.element.p1, this.element.p2);

        if(this.element.lineType instanceof CommentToSelf) {
            this._renderPointers();
        }
    }
    
    
    _renderPointers(){
        let vector = this.element.copy();

        let center = vector.getCenter();
        vector.rotate(center,90);
        vector.move(-vector._line.B/2,vector._line.A/2);

        let circle = new Arc(this.element.p2.copy(), 1);
        let crossPoints = vector.toPolyLines()[0].getCrossPoints(circle.toPolyLines()[0]);
        //todo: fix horizontal and vertical line
        if(crossPoints.length==2){
            vector.p1 = crossPoints[0];
            vector.p2 = crossPoints[1];
            this.board.drawLine(vector.p1, vector.p2);
            vector.move(-this.element._line.A,-this.element._line.B);
            this.board.drawLine(vector.p1, vector.p2);
            vector.rotate(vector.getCenter(), 65);
            if(this.element._line.A>0) {
                vector.p2 = vector.getCenter();
            }else{
                vector.p1 = vector.getCenter();
            }
            this.board.drawLine(vector.p1, vector.p2);
            if(this.element._line.A>0) {
                vector.rotate(vector.p2, 50);
            }else{
                vector.rotate(vector.p1, 50);
            }
            this.board.drawLine(vector.p1, vector.p2);

            vector.move(this.element._line.A,this.element._line.B);
            if(this.element._line.A>0) {
                vector.rotate(vector.p2, 180);
            }else{
                vector.rotate(vector.p1, 180);
            }
            this.board.drawLine(vector.p1, vector.p2);
            if(this.element._line.A>0) {
                vector.rotate(vector.p2, -50);
            }else{
                vector.rotate(vector.p1, -50);
            }
            this.board.drawLine(vector.p1, vector.p2);

        }
        let grad = Trigonometric.radToGrad(Math.atan(this.element._line.k));
        let height = 2 * this.board._pixelPerOne*this.board._scale;
        this.board.style('font',height + 'px Arial');
        this.board.style('textAlign','center');
        this.board.style('textBaseline','bottom');

        this.board.drawText(this.element.getCenter(),this.element.length().toFixed(3)+" mm", grad, false);
    }
}