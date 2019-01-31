/**
 * Created by dev on 04.01.19.
 */
import Exception from './../../Exception';
import GraphicElement from './../GraphicElement';
import LineRenderer from './../../2d/renderer/LineRenderer';
import Point from "../Point";
import PolyLine from '../math/PolyLine';
import Trigonometric from './../math/Trigonometric'

export default class Line extends GraphicElement{
    constructor(p1, p2){
        super();
        this._p1=p1;
        this._p2=p2;
        this._points=[p1,p2];
        this._renderer = new LineRenderer(this);

        this.typeName = 'Line';
    }

    set p1(point){
        this._points[0]=point;
        this._p1=point;
    }
    get p1(){
        return this._p1;
    }

    set p2(point){
        this._points[1]=point;
        this._p2=point;
    }
    get p2(){
        return this._p2;
    }

    /**
     * return {number}
     */
    get k(){
        return (this.p2.x-this.p1.x)/(this.p2.y-this.p1.y);
    }

    /**
     * @return {number}
     */
    length(){
        let p1= this._p1;
        let p2= this._p2;
        let z = Math.pow(p1.z-p2.z,2);
        return Math.sqrt(Math.pow(p1.x-p2.x,2)+Math.pow(p1.y-p2.y,2)+z);
    }

    /**
     * http://www.cat-in-web.ru/notebook/rasstoyanie-ot-tochki-do-otrezka/
     */
    _isObtuseAngle( oppositeLine,  a,  b){
        var cos = (a*a + b*b - oppositeLine*oppositeLine) / (2 * a * b);
        return cos < 0;
    }

    /**
     * http://www.cat-in-web.ru/notebook/rasstoyanie-ot-tochki-do-otrezka/
     */
    distanceTo(point){
        let p1=this._p1;
        let p2=this._p2;
        if (p1.compare(point) || p2.compare(point))
            return 0;

        var AB = p1.distanceTo(p2);
        var AC = p1.distanceTo(point);

        if (AB == 0)
            return AC;

        var BC = p2.distanceTo(point);

        if (this._isObtuseAngle(AC, BC, AB))
            return BC;
        if (this._isObtuseAngle(BC, AC, AB))
            return AC;

        var p = (AC + BC + AB) / 2;
        return 2 * Math.sqrt(p * (p - AB) * (p - BC) * (p - AC)) / AB;
    }

    /**
     * @inheritDoc
     */
    isIntoFigure(figure){
        return figure.contain(this._p1) && figure.contain(this._p2);
    }

    isNear(point, eps){
        return this.distanceTo(point)<eps;
    }

    /**
     * @param {Line} line
     * @return {number} - angle between current line and line in parameter
     */
    getAngle(line){
        if(!line instanceof Line){
            throw new Exception('Parameter must be Line type!');
        }

        let m1 = this._p2.x - this._p1.x;
        let n1 = this._p2.y - this._p1.y;
        let m2 = line._p2.x - line._p1.x;
        let n2 = line._p2.y - line._p1.y;

        let cos = (m1*m2+n1*n2)/(this.length()*line.length());
        

        return Trigonometric.radToGrad(Math.acos(cos));
    }

    getCenter(){
        return this.getPointOffset(0.5);
    }

    /**
     * Return point which offset is the size of crop number(presented by fraction)
     * Start is p1
     * @param {number} offset - 0..1
     * @return {Point}
     */
    getPointOffset(offset){
        return new Point(this._p1.x +(this._p2.x-this._p1.x)*offset, this._p1.y +(this._p2.y-this._p1.y)*offset);
    }

    copy(){
        let line = new Line(this._p1.copy(), this._p2.copy());
        line.height=this.height;
        return line;
    }

    toPolyLines(){
        return [new PolyLine(this._points)];
    }

    /**
     * @param {Line} line
     * @return {Point|null}
     */
    getCrossPoint(line){
        let x1 = this.p1.x;
        let y1 = this.p1.y;
        let x2 = this.p2.x;
        let y2 = this.p2.y;
        let x3 = line.p1.x;
        let y3 = line.p1.y;
        let x4 = line.p2.x;
        let y4 = line.p2.y;

        if(this.k == line.k){
            return null;
        }

        let a1 = y1 - y2;
        let b1 = x2 - x1;
        let a2 = y3 - y4;
        let b2 = x4 - x3;

        let d = a1 * b2 - a2 * b1;
        if( d != 0 ){
            let c1 = y2 * x1 - x2 * y1;

            let c2 = y4 * x3 - x4 * y3;
            let x = ((b1 * c2 - b2 * c1) / d).toFixed(4);
            let y = ((a2 * c1 - a1 * c2) / d).toFixed(4);
            if((((x<=x1 && x>=x2) || (x>=x1 && x<=x2)) && ((x<=x3 && x>=x4) || (x>=x3 && x<=x4)))) {
                return new Point(x, y, 0);
            }else{
                return null;
            }
        }
        return null;
    }
}