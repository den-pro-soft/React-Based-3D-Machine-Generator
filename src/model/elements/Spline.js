/**
 * Created by dev on 14.01.19.
 */

import GraphicElement from '../GraphicElement';
import Point from '../Point';
import SplineRenderer from '../../ui/2d/renderer/SplineRenderer';
import Line from '../math/Line';
import PolyLine from '../math/PolyLine';

import Matrix from '../math/Matrix';
import LineElement from "./LineElement";
import Bend from "../line_types/Bend";
import CommentToMachine from "../line_types/CommentToMachine";
import CommentToSelf from "../line_types/CommentToSelf";

export default class Spline extends GraphicElement{
    constructor(startPoint, endPoint){
        super();
        this._points = [startPoint, endPoint, null, null];
        this._renderer = new SplineRenderer(this);

        this.typeName= 'Spline';
    }

    set startPoint(p){
        this._points[0]=p;
    }
    get startPoint(){
        return this._points[0];
    }


    set endPoint(p){
        this._points[1]=p;
    }
    get endPoint(){
        return this._points[1];
    }


    set controlPoint1(p){
        this._points[2]=p;
    }
    get controlPoint1(){
        return this._points[2];
    }


    set controlPoint2(p){
        this._points[3]=p;
    }
    get controlPoint2(){
        return this._points[3];
    }

    /**
     * @return {Array.<Point>} - the points are end points in a contour.
     */
    get extremePoints(){
        return [this.startPoint.copy(), this.endPoint.copy()];
    }

    /**
     * @param {number} [step=1E-2]
     * @inheritDoc
     */
    toPolyLines(step=1E-2){
        let res = new PolyLine();
        let point = this.startPoint.copy();

        for(let t=0; t<1; t+=step){
            res.addPoint(point);
            point = this.getPointOffset(t);
        }
        res.addPoint(this.endPoint.copy());
        return [res];
    }

    /**
     * @inheritDoc
     */
    resize(x, y, point, extr){

        let wX = Math.abs(extr.max.x-extr.min.x);

        let wY = Math.abs(extr.max.y-extr.min.y);

        let dx = 0;
        let dy = 0;
        if(wX!=0){
            dx = (wX+x)/wX-1;
        }

        if(wY!=0){
            dy = (wY+y)/wY-1;
        }

        let resizeMatrix = Matrix.createResizeMatrix(dx,dy);


        let moveMatrix = Matrix.createMoveMatrix(-point.x, -point.y);
        let removeMatrix = Matrix.createMoveMatrix(point.x, point.y);

        for(let point of this._points){
            point.changeByMatrix(moveMatrix);
            point.changeByMatrix(resizeMatrix);
            point.changeByMatrix(removeMatrix);
        }
    }


    /**
     * @inheritDoc
     */
    getExtrenum(){
        return Point.getExtrenum(this.toPolyLines()[0].points);
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
        for(let i=1; i<points.length; i++){
            res&=figure.contain(points[i-1]) && figure.contain(points[i]);
        }
        return res;
    }

    /**
     * @inheritDoc
     * @return {Spline}
     */
    copy(){
        let res = new Spline(this._points[0].copy(),this._points[1].copy());
        res.controlPoint1 = this._points[2].copy();
        res.controlPoint2 = this._points[3].copy();
        res.hight=this.height;
        res.id=this.id;
        res.lineType = this.lineType.copy();
        return res;
    }

    /**
     * Calculate point by parameter
     * @see(https://en.wikipedia.org/wiki/B%C3%A9zier_curve)
     * @param {number} offset - In which part to determine the point. 0 ... 1 where 0 is the beginning of the curve and 1 is the end
     * @return {Point}
     */
    getPointOffset(offset){
        let l1 = new Line(this.startPoint, this.controlPoint1);
        let l2 = new Line(this.controlPoint1, this.controlPoint2);
        let l3 = new Line(this.controlPoint2, this.endPoint);

        let p1 = l1.getPointOffset(offset);
        let p2 = l2.getPointOffset(offset);

        let pt1 = new Line(p1,p2).getPointOffset(offset);
        p1 = l2.getPointOffset(offset);
        p2 = l3.getPointOffset(offset);

        let pt2 = new Line(p1,p2).getPointOffset(offset);
        return new Line(pt1, pt2).getPointOffset(offset);


        // /** @var {Array.<Matrix>} */
        // let p = this._points.map(p=>p.toVector().toMatrixRow());
        // let res = p[0].multiply(Math.pow(1 - offset, 3))
        //         .add(p[2].multiply(3 * offset * Math.pow(1 - offset, 2)))
        //         .add(p[3].multiply(3 * Math.pow(offset, 2) * (1 - offset)))
        //         .add(p[1].multiply(Math.pow(offset, 3)));
        //     return new Point(res[0][0],res[0][1]);
    }

    /**
     * @inheritDoc
     */
    getCenter(){
        return this.getPointOffset(0.5);
    }

    /**
     * The method return list of elements which was made by intersection current element
     * @param {Array.<Point>} points  - the points must be in current element
     * @return {Array.<GraphicElement>}
     */
    intersectByPoints(points){
        let eps = 0.003;
        let tStep = 0.00001;
        let splinePoints = this.toPolyLines(tStep)[0].points;


        let checkPoints = new Array(points.length);
        for(let i=0; i<points.length; i++){
            checkPoints[i]=true;
        }

        let t = [];
        for(let i=1; i<splinePoints.length; i++){
            let line = new Line(splinePoints[i-1], splinePoints[i]);
            for(let j=0; j<points.length; j++){
                if(checkPoints[j] && line.isNear(points[j], eps)){
                    t.push(tStep*i);
                    checkPoints[j]=false;
                    console.log(j, tStep*i);
                }
            }
        }

        if(t.length==0){
            return [this];
        }
        let res = [];
        let currentSpline = this;
        let ti = [t[0]];
        for(let i=1; i<t.length; i++){
            ti[i]=(t[i]-t[i-1])/(1-t[i-1]);
        }
        for(let i=0; i<ti.length; i++){
            let splines = currentSpline.intersectByT(ti[i]);
            res.push(splines[0]);
            currentSpline=splines[1];
        }
        res.push(currentSpline);
        return res;
    }

    /**
     *
     * @param {number} tIntersection - 0..1
     * @return {Array.<Spline>}
     */
    intersectByT(tIntersection){
        let t=[0,tIntersection,1];
        let l1 = new Line(this.startPoint, this.controlPoint1);
        let l2 = new Line(this.controlPoint1, this.controlPoint2);
        let l3 = new Line(this.controlPoint2, this.endPoint);

        let res = [];
        for(let i=1; i<t.length; i++){
            let newStart = this.getPointOffset(t[i-1]);
            let newEnd = this.getPointOffset(t[i]);
            let spline = new Spline(newStart, newEnd);
            spline.lineType=this.lineType.copy();
            if(i-1==0){
                spline.controlPoint1= l1.getPointOffset(t[i]);
            }else{
                let p2 = l2.getPointOffset(t[i-1]);
                let p3 = l3.getPointOffset(t[i-1]);
                spline.controlPoint1 = new Line(p2,p3).getPointOffset(t[i-1]);

            }

            if(i==t.length-1){
                spline.controlPoint2= l3.getPointOffset(t[i-1]);
            }else{
                let p1 = l1.getPointOffset(t[i]);
                let p2 = l2.getPointOffset(t[i]);
                spline.controlPoint2 = new Line(p1,p2).getPointOffset(t[i]);
            }
            res.push(spline);
        }
        return res;
    }
}