/**
 * Created by dev on 14.01.19.
 */
import Render from './Render';

export default class SplineRenderer extends Render{
    constructor(element){
        super(element);
    }

    /**
     * @inheritDoc
     */
    drawElement(){
        this.board.drawPolyLine(this.element.toPolyLines()[0].points);
        // this.board.style('fillStyle', '#ff0000');
        // this.board.drawArc(this.element.startPoint, 0.2, 0,0, true);
        // this.board.drawArc(this.element.endPoint, 0.2,0,0, true);
        // this.board.drawArc(this.element.controlPoint1, 0.2, 0,0,true);
        // this.board.drawArc(this.element.controlPoint2, 0.2, 0,0,true);
    }

    drawMagnificationPoints(){
        this.board.style('dash', [5, 5]);
        this.board.style('strokeStyle', '#555555');
        this.board.drawLine(this.element.startPoint, this.element.controlPoint1);
        this.board.drawLine(this.element.endPoint, this.element.controlPoint2);
        super.drawMagnificationPoints();
    }
}