/**
 * Created by dev on 09.01.19.
 */

import LineElement from '../../../model/elements/LineElement';
import Arc from '../../../model/elements/Arc';
import Render from './Render';
import Trigonometric from '../../../model/math/Trigonometric';

import CommentToSelf from '../../../model/line_types/CommentToSelf'
import LineArc from "../../../model/math/algorithms/intersects/LineArc";
import Comment from "../../../model/line_types/Comment";

let lineArcIntersector = new LineArc();

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

        if(this.element.lineType instanceof Comment && (this.element.lineType.type== Comment.TYPE_DIMENSION || this.element.lineType.type== Comment.TYPE_ARROW)) {
            this._renderPointers();
        }
    }
    
    
    _renderPointers(){
        if(this.element.length()<2){
            return;
        }

        let circleRadius = 14/(this.board._pixelPerOne*this.board._scale);
        if(this.element.length()/2<circleRadius){
            return;
        }
        switch (this.element.lineType.type) {
            case Comment.TYPE_DIMENSION:
                this.drawDimensionText();

                let vector = this.element.copy();
                vector.rotate(vector.p2, 35);
                let circle = new Arc(vector.p2, circleRadius);
                let crossPoint = lineArcIntersector.getIntersectPoints(vector, circle);
                if (crossPoint) {
                    this.board.drawLine(vector.p2, crossPoint[0]);
                }

                vector = this.element.copy();
                vector.rotate(vector.p2, -35);
                circle = new Arc(vector.p2, circleRadius);
                crossPoint = lineArcIntersector.getIntersectPoints(vector, circle);
                if (crossPoint) {
                    this.board.drawLine(vector.p2, crossPoint[0]);
                }

                vector = this.element.copy();
                vector.rotate(vector.p2, -89.9);
                circle = new Arc(vector.p2, circleRadius);
                crossPoint = lineArcIntersector.getIntersectPoints(vector, circle);
                if (crossPoint) {
                    this.board.drawLine(vector.p2, crossPoint[0]);
                }


                vector = this.element.copy();
                vector.rotate(vector.p2, 89.9);
                circle = new Arc(vector.p2, circleRadius);
                crossPoint = lineArcIntersector.getIntersectPoints(vector, circle);
                if (crossPoint) {
                    this.board.drawLine(vector.p2, crossPoint[0]);
                }


                vector = this.element.copy();
                vector.rotate(vector.p1, -89.9);
                circle = new Arc(vector.p1, circleRadius);
                crossPoint = lineArcIntersector.getIntersectPoints(vector, circle);
                if (crossPoint) {
                    this.board.drawLine(vector.p1, crossPoint[0]);
                }

                vector = this.element.copy();
                vector.rotate(vector.p1, 89.9);
                circle = new Arc(vector.p1, circleRadius);
                crossPoint = lineArcIntersector.getIntersectPoints(vector, circle);
                if (crossPoint) {
                    this.board.drawLine(vector.p1, crossPoint[0]);
                }


            case Comment.TYPE_ARROW:
                let vector1 = this.element.copy();
                vector1.rotate(vector1.p1, 35);
                let circle1 = new Arc(vector1.p1, circleRadius);
                let crossPoint1 = lineArcIntersector.getIntersectPoints(vector1, circle1);
                if (crossPoint1) {
                    this.board.drawLine(vector1.p1, crossPoint1[0]);
                }

                vector1 = this.element.copy();
                vector1.rotate(vector1.p1, -35);
                circle1 = new Arc(vector1.p1, circleRadius);
                crossPoint1 = lineArcIntersector.getIntersectPoints(vector1, circle1);
                if (crossPoint1) {
                    this.board.drawLine(vector1.p1, crossPoint1[0]);
                }
        }
    }


    /**
     * @private
     */
    drawDimensionText(){
        let grad = Trigonometric.radToGrad(Math.atan(this.element._line.k));
        let height = 14 ;//3.53 * this.board._pixelPerOne*this.board._scale;
        this.board.style('font',height + 'px Arial');
        this.board.style('textAlign','center');
        this.board.style('textBaseline','bottom');

        let dimension = 'mm';
        let length = this.element.length();
        if(app.config.dimension == 'Inches'){
            dimension = "''";
            length/=25.4;
        }
        let text = length.toFixed(3)+" "+dimension;
        this.board.drawText(this.element.getCenter(),text, grad, false);
    }
}