/**
 * Created by dev on 14.01.19.
 */
import Render from './Render';

export default class SplineRenderer extends Render{
    constructor(element){
        super(element);
    }

    drawElement(){
        if(this.new){
            this.board.style('dash', [4, 4]);
            this.board.style('strokeStyle', '#555555');
        }else{
            this.board.style('dash', []);
            this.board.style('strokeStyle', '#222222');
        }

        if(this.focus){
            this.board.style('strokeStyle', '#ff641a');
        }

        this.board.style('lineWidth', 1);

        this.board.drawPolyLine(this.element.toPolyLines()[0].points);
        // this.board.style('fillStyle', '#ff0000');
        // this.board.drawArc(this.element.startPoint, 0.2, true);
        // this.board.drawArc(this.element.endPoint, 0.2, true);
        // this.board.drawArc(this.element.controlPoint1, 0.2, true);
        // this.board.drawArc(this.element.controlPoint2, 0.2, true);
    }
}