/**
 * Created by dev on 14.01.19.
 */
import Render from './Render';

import Line from './../../model/elements/Line';
import Point from './../../model/Point';


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


        /** @var {Spline} */
        let e = this.element;
        let l1 = new Line(e.startPoint, e.controlPoint1);
        let l2 = new Line(e.controlPoint1, e.controlPoint2);
        let l3 = new Line(e.controlPoint2, e.endPoint);
        
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
        this.board.drawPolyLine(polyLine);
        this.board.style('strokeStyle', '#ff0000');
        this.board.drawArc(e.startPoint, 0.02, true);
        this.board.drawArc(e.controlPoint1, 0.02, true);
        this.board.drawArc(e.controlPoint2, 0.02, true);

    }
}