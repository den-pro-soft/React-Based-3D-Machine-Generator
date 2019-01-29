/**
 * Created by dev on 14.01.19.
 */

import Tool from './Tool';
import Spline from './../../model/elements/Spline';
import Point from './../../model/Point';
import Line from './../../model/elements/Line';
import AddElementCommand from './../../2d/command/AddElementCommand';

export default class SplineTool extends Tool{

    constructor(document){
        super(document);
        this.cursor.src = 'images/Spline.png';

        /** @var {Spline} */
        this._spline = null;

        this.step = 0;
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
        if(this.step==2) {
            this._spline = null;
        }
    }

    mouseDown(point){
        if(!this._spline){
            this._spline = new Spline(point, point);
            this._setEndSplinePoint(point);
            this._spline._renderer.drawAsNew();
            this.step = 1;
        }else{
            this.step=2;
        }
    }

    mouseUp(point){
        if(this._spline){
            if(this.step ==2) {
                this._setEndSplinePoint(point);
                app.executeCommand(new AddElementCommand(this._document, this._spline));
                this._spline._renderer.new = false;
                this._spline = null;
            }
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
        let line = new Line(this._spline.startPoint.copy(),  point.copy());
        let center = line.getCenter();
        line.rotate(center,65);
        this._spline.controlPoint1 = line.p1;
        this._spline.controlPoint2 = line.p2;
    }
}