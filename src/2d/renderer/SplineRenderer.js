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
        /** @var {Spline} */
        let e = this.element;
        let l1 = new Line(e.startPoint, e.controlPoint1);
        let l2 = new Line(e.controlPoint1, e.controlPoint2);
        let l3 = new Line(e.controlPoint2, e.endPoint);
        
        let x=l1.p1.x;
        let y=l1.p1.y;
        let discret = 100;
        for(let t=1; t<=discret; t++){
            let p1 = l1.getPointOffset(t/discret);
            let p2 = l2.getPointOffset(t/discret);
            let pt1 = new Line(p1,p2).getPointOffset(t/discret);

            p1 = l2.getPointOffset(t/discret);
            p2 = l3.getPointOffset(t/discret);
            let pt2 = new Line(p1,p2).getPointOffset(t/discret);

            let pt = new Line(pt1, pt2).getPointOffset(t/discret);

            let xt = pt.x;
            let yt = pt.y;
            this.board.drawLine(new Point(x,y), new Point(xt,yt),'#00ff00',1);
            x=xt;
            y=yt;
        }

        this.board.drawArc(e.startPoint, 0.02, '#ff0000');
        this.board.drawArc(e.controlPoint1, 0.02, '#00ff00');
        this.board.drawArc(e.controlPoint2, 0.02, '#0000ff');

    }
}