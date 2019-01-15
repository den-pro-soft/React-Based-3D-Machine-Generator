/**
 * Created by dev on 14.01.19.
 */

import Tool from './Tool';
import Spline from './../../model/elements/Spline';
import Point from './../../model/Point';
import Line from './../../model/elements/Line';

export default class SplineTool extends Tool{

    constructor(document){
        super(document);
        this.cursor.src = 'images/Spline.png';

        /** @var {Spline} */
        this._spline = null;
    }

    mouseMove(point){
        super.mouseMove(point);
        if(this._spline){
            this._setEndSplinePoint(point);
            return true;
        }
        return false;
    }

    mouseDbClick(point){
        this._line=null;
    }

    mouseClick(point){
        this._line=null;
    }

    mouseDown(point){
        if(!this._spline){
            this._spline = new Spline(point, point);
            this._setEndSplinePoint(point);
            this._spline._renderer.drawAsNew();
        }
    }

    mouseUp(point){
        if(!point.compare(this._spline.startPoint)){
            this._setEndSplinePoint(point);
            this.document.addElement(this._spline);
            this._spline._renderer.new=false;
            this._spline=null;
        }
    }

    render(){
        if(this._spline){
            this._spline.render();
        }
        super.render();
    }

    _setEndSplinePoint(point){
        this._spline.endPoint=point;
        let line = new Line(this._spline.startPoint, point);

        let length = line.length();
        let t = line.getPointOffset(0.5);

        let dx = point.x-this._spline.startPoint.x;
        let dy = point.y-this._spline.startPoint.y;
        let delta = dx/dy;
        this._spline.controlPoint1 = new Point(t.x-(length/4)*(1/delta),t.y-(length/4)*(1-1/delta));
        this._spline.controlPoint2 = new Point(t.x+(length/4)*(1/delta),t.y+(length/4)*(1-1/delta));
    }
}