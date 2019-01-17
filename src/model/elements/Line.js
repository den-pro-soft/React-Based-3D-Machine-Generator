/**
 * Created by dev on 04.01.19.
 */
import Exception from '../../Exception';
import Element from '../Element';
import LineRenderer from './../../2d/renderer/LineRenderer';
import Point from "../Point";
import Trigonometric from './../math/Trigonometric';


export default class Line extends Element{
    constructor(p1, p2){
        super();
        this._p1=p1;
        this._p2=p2;
        this._points=[p1,p2];
        this._renderer = new LineRenderer(this);
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
}