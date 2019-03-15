/**
 * Created by dev on 14.01.19.
 */

import GraphicElement from '../GraphicElement';
import Point from '../Point';
import Line from './../math/Line';
import Vector from './../math/Vector';
import ArcRenderer from './../../2d/renderer/ArcRenderer';
import PolyLine from './../math/PolyLine';
import Trigonometric from './../math/Trigonometric';
import Matrix from './../math/Matrix';
import Spline from './Spline';

/**
 * startAngle and endAngle are by counterclockwise
 */
export default class Arc extends GraphicElement{
    constructor(center, radius){
        super();
        this._center=center;
        // this._points[0]=center;
        this.radius=radius;
        this._startAngle=0;
        this._endAngle=0;
        
        this._renderer = new ArcRenderer(this);

        this.typeName = 'Arc';
    }

    /**
     * @return {number}
     */
    get startAngle(){
        return this._startAngle;
    }

    /**
     * @param {number} angle
     */
    set startAngle(angle){
        if(angle<0){
            angle+=360;
        }
        if(angle>360){
            angle%=360;
        }
        this._startAngle=angle;
    }

    /**
     * @return {number}
     */
    get endAngle(){
        return this._endAngle;
    }

    /**
     * @param {number} angle
     */
    set endAngle(angle){
        if(angle<0){
            angle+=360;
        }
        if(angle>360){
            angle%=360;
        }
        this._endAngle=angle;
    }

    /**
     * @inheritDoc
     * @return {Array.<Point>|null} - null if the circle
     */
    get extremePoints(){
        if(this.incrementAngle>0) {
            return [
                new Point(
                    this.center.x+this.radius*Math.cos(Trigonometric.gradToRad(this.startAngle)),
                    this.center.y+this.radius*Math.sin(Trigonometric.gradToRad(this.startAngle))
                ),
                new Point(
                    this.center.x+this.radius*Math.cos(Trigonometric.gradToRad(this.endAngle)),
                    this.center.y+this.radius*Math.sin(Trigonometric.gradToRad(this.endAngle))
                )];
        }else{
            return null;
        }
    }
    
    set center(point){
        this._center = point;
        // this._points[0]=point;
    }

    get center(){
        return this._center;
    }

    get _points(){
        let points =  this.toPolyLines()[0].points;
        points.push(this.center);
        return points;
    }

    set _points(points){

    }

    /**
     * @return {number}
     */
    get incrementAngle(){
        if(this.endAngle> this.startAngle)
            return this.endAngle - this.startAngle;
        else
            return this.endAngle+(360-this.startAngle);
    }

    /**
     * @param {number} angle
     */
    set incrementAngle(angle){
        let oldAngle = this.incrementAngle;

        if(oldAngle<angle){
            this.endAngle = (this.endAngle+(angle-oldAngle))%360;
        }else{
            this.endAngle -= oldAngle-angle;
            if(this.endAngle<0){
                this.endAngle+=360;
            }
        }
    }

    /**
     * @inheritDoc
     */
    rotate(center,grad) {
        let rotateMatrix = Matrix.createRotateMatrix(grad);

        let moveMatrix = Matrix.createMoveMatrix(-center.x, -center.y);
        let removeMatrix = Matrix.createMoveMatrix(center.x, center.y);

        if (!this._center.compare(center)) {
            this._center.changeByMatrix(moveMatrix);
            this._center.changeByMatrix(rotateMatrix);
            this._center.changeByMatrix(removeMatrix);
        }
        if (this.startAngle != this.endAngle) {
            this.startAngle-=grad;
            if(this.startAngle<0){
                this.startAngle+=360;
            }
            if(this.startAngle>360){
                this.startAngle%=360;
            }
            this.endAngle-=grad;
            if(this.endAngle<0){
                this.endAngle+=360;
            }
            if(this.endAngle>360){
                this.endAngle%=360;
            }
        }
    }

    /**
     * @inheritDoc
     */
    getMagnificationPoints(){
        if(this.incrementAngle!=360){
            //todo: add center of arc point
            return [this.center,...this.extremePoints];
        }
        return [this.center,
            new Point(this._center.x+this.radius, this._center.y),
            new Point(this._center.x, this._center.y+this.radius),
            new Point(this._center.x-this.radius, this._center.y),
            new Point(this._center.x, this._center.y-this.radius)
        ];
    }

    /**
     * @inheritDoc
     */
    getExtrenum(){
        let points = this.toPolyLines()[0].points;
        return Point.getExtrenum(points);
    }

    /**
     * @inheritDoc
     */
    getCenter(){
        return this._center;
    }

    /**
     * @inheritDoc
     */
    isBelongsToTheElement(point){
        let l = Math.pow(point.x-this.center.x,2)+Math.pow(point.y-this.center.y,2);
        let r = Math.pow(this.radius, 2);
        let inTheCircle = l-1e-8<r && l+1E-8>r;

        let inTheArc = false;
        if(this.incrementAngle!=360) {
            let line = new Line(this.center, point);
            let angle = new Vector(1).getAngle(line.toVector());
            if (this.endAngle > this.startAngle) {
                inTheArc = angle >= this.startAngle && angle <= this.endAngle;
            } else {
                if (angle > this.startAngle || angle < this.endAngle) {
                    inTheArc = true;
                }
            }
        }else{
            inTheArc=true;
        }
        return inTheCircle && inTheArc;
    }
    
    /**
     * @inheritDoc
     */
    isNear(point, eps){
        let points = this.toPolyLines()[0].points;

        let res = false;
        for(let i=1; i<points.length; i++){
            res|=new Line(points[i-1], points[i]).isNear(point,eps);
        }
        return res;
    }


    /**
     * @inheritDoc
     */
    isIntoFigure(figure){
        let points = this.toPolyLines()[0].points;
        let res = true;
        for(let p of points){
            res &= figure.contain(p);
        }
        return res;
    }

    /**
     * @inheritDoc
     * @return {Arc}
     */
    copy(){
        let arc = new Arc(this.center.copy(), this.radius);
        arc.height=this.height;
        arc.id=this.id;
        arc.startAngle=this.startAngle;
        arc.endAngle=this.endAngle;
        arc.lineType = this.lineType.copy();
        return arc;
    }

    /**
     * @inheritDoc
     */
    toPolyLines(){
        let res = new PolyLine();

        var start = this.startAngle;
        var end = this.endAngle;

        if(start!=0){
            start = Trigonometric.gradToRad(start);
        }
        if(end!=0){
            end = Trigonometric.gradToRad(end);
        }else{
            end=2 * Math.PI;
        }
        var a = start;
        if(this.startAngle>this.endAngle){
            for (; a<=(2*Math.PI); a += Math.PI / 100) {
                let p = new Point(this._center.x + this.radius * Math.cos(a), this._center.y + this.radius * Math.sin(a));
                res.addPoint(p);
            }
            a=0;
        }
        for (; a <= end; a += Math.PI / 100) {
            let p = new Point(this._center.x + this.radius * Math.cos(a), this._center.y + this.radius * Math.sin(a));
            res.addPoint(p);
        }

        return [res];
    }

    /**
     * The method return list of elements which was made by intersection current element
     * @param {Array.<Point>} points  - the points must be in current element
     * @return {Array.<GraphicElement>}
     */
    intersectByPoints(points){
        if(this.incrementAngle!=360){
            let baseVector = new Vector(Math.cos(Trigonometric.gradToRad(this.startAngle)), Math.sin(Trigonometric.gradToRad(this.startAngle)));
            points = points.sort((a, b)=>{
                let angle1 = baseVector.getAngle(new Line(this.center,a).toVector());
                let angle2 = baseVector.getAngle(new Line(this.center,b).toVector());
                return angle1-angle2;
            });
            let res = [];
            let tempAngle = this.startAngle;

            for(let i=0; i<points.length; i++){
                let temp = this.copy();
                temp.startAngle = tempAngle;
                temp.endAngle = new Vector(1).getAngle(new Line(this.center,points[i]).toVector());
                temp.generateNewId();
                res.push(temp);
                tempAngle=temp.endAngle;
            }
            let temp = this.copy();
            temp.startAngle = tempAngle;
            temp.endAngle = this.endAngle;
            temp.generateNewId();
            res.push(temp);
            return res;
        }


        let startPoint = points[0];

        points = this.sortPointByTheArc(points);

        let baseVector = new Vector(1,0,0);

        let res = [];
        let temp = this.copy();
        for(let i=0; i<points.length; i++){
            temp = this.copy();
            temp.startAngle = baseVector.getAngle(new Line(this.center,points[i]).toVector());
            temp.endAngle = baseVector.getAngle(new Line(this.center,startPoint).toVector());
            temp.generateNewId();
            res.push(temp);
            startPoint=points[i];
        }
        return res;
    }

    convertToSplines(){
        let res = [];
        if(this.incrementAngle==360){
            let k = (4*(Math.sqrt(2)-1))/3;
            let r = k*this.radius;
            let spline =  new Spline(
                new Point(this.center.x+this.radius, this.center.y),
                new Point(this.center.x, this.center.y+this.radius)
                );
            spline.controlPoint2=new Point(this.center.x+r, this.center.y+this.radius);
            spline.controlPoint1=new Point(this.center.x+this.radius, this.center.y+r);
            res.push(spline);


            spline =  new Spline(
                new Point(this.center.x-this.radius, this.center.y),
                new Point(this.center.x, this.center.y-this.radius)
            );
            spline.controlPoint2=new Point(this.center.x-r, this.center.y-this.radius);
            spline.controlPoint1=new Point(this.center.x-this.radius, this.center.y-r);
            res.push(spline);


            spline =  new Spline(
                new Point(this.center.x, this.center.y+this.radius),
                new Point(this.center.x-this.radius, this.center.y)
            );
            spline.controlPoint1=new Point(this.center.x-r, this.center.y+this.radius);
            spline.controlPoint2=new Point(this.center.x-this.radius, this.center.y+r);
            res.push(spline);


            spline =  new Spline(
                new Point(this.center.x, this.center.y-this.radius),
                new Point(this.center.x+this.radius, this.center.y)
            );
            spline.controlPoint1=new Point(this.center.x+r, this.center.y-this.radius);
            spline.controlPoint2=new Point(this.center.x+this.radius, this.center.y-r);
            res.push(spline);

        }else{
            throw new Exception("The method doesn't have implementation!");
        }

        return res;
    }


    /**
     * It's work only for circle
     * @param {Array.<Point>} points
     * @return {Array.<Point>}
     * @private
     */
    sortPointByTheArc(points){
        let startPoint = points[0];
        points.splice(0,1);

        let baseVector = new Line(this.center,startPoint).toVector();
        let res = points.sort((a, b)=>{
            let angle1 = baseVector.getAngle(new Line(this.center,a).toVector());
            let angle2 = baseVector.getAngle(new Line(this.center,b).toVector());
            return angle2-angle1;
        });
        res.push(startPoint);
        return res;
    }

    /**
     * Mirrors the element relative to the selected axis
     * @param axis - the constant from {@class Trigonometric} class. [axisX|axisY]
     * @param center {Point} 
     */
    mirror(axis, center){
        let mirrorMatrix = Matrix.createMirrorMatrix(axis);

        let moveMatrix = Matrix.createMoveMatrix(-center.x, -center.y);
        let removeMatrix = Matrix.createMoveMatrix(center.x, center.y);

        this.center.changeByMatrix(moveMatrix);
        this.center.changeByMatrix(mirrorMatrix);
        this.center.changeByMatrix(removeMatrix);

        let oldStart = this.startAngle;
        let oldEnd = this.endAngle;
        if(axis==Trigonometric.axisX){
            this.endAngle=180-oldStart;
            this.startAngle=180-oldEnd;
        }else{
            this.endAngle=360-oldStart;
            this.startAngle=360-oldEnd;
        }
    }
}