/**
 * Created by dev on 12.02.19.
 */

import Trigonometric from './Trigonometric'
import Point from "./../Point";
import Exception from './../../Exception';
import Vector from './Vector';
import Matrix from './Matrix';

export default class Line{
    /**
     * @param {Point} p1
     * @param {Point} p2
     */
    constructor(p1, p2){
        this._p1=p1;
        this._p2=p2;
    }

    /**
     * @return {number} - the A coefficient in [  Ax+By+C=0  ]
     * @constructor
     */
    get A(){
        return this._p2.x-this._p1.x;
    }

    /**
     * @return {number} - the B coefficient in [  Ax+By+C=0  ]
     * @constructor
     */
    get B(){
        return this._p2.y-this._p1.y;
    }

    /**
     * @return {number} - the angle coefficient in  [  y=k*x+b  ]
     * @constructor
     */
    get k(){
        if(this.A==0 || this.B==0){
            return 0;
        }
        return this.B/this.A;
    }

    /**
     * @return {number}
     */
    length(){
        let p1= this._p1;
        let p2= this._p2;
        let z = Math.pow(p1.z-p2.z,2);
        return Math.sqrt(Math.pow(this.A,2)+Math.pow(this.B,2)+z);
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
     * @return {number} - distance to current segment
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

    perpendicularPoint(point){
        let tempLine = new Line(this._p1, point);
        let l = tempLine.length();
        let alfa = tempLine.toVector().getAngle(this.toVector())%90;
        let A = l*Math.cos(Trigonometric.gradToRad(alfa));

        let bettaRad = Math.atan(this.k);
        let dx = A*Math.cos(bettaRad);
        let dy = A*Math.sin(bettaRad);

        let res = this._p1.copy();
        res.changeByMatrix(Matrix.createMoveMatrix(dx,dy));
        return res;
    }

    /**
     * @param {Line} line
     * @return {number} - angle between current line and line in parameter
     */
    getAngle(line){
        if(!line instanceof Line){
            throw new Exception('Parameter must be Line type!');
        }
        let cos = (this.A*line.A+this.B*line.B)/(this.length()*line.length());
        return Trigonometric.radToGrad(Math.acos(cos));
    }

    /**
     * Return point which offset is the size of crop number(presented by fraction)
     * Start is p1
     * @param {number} offset - 0..1
     * @return {Point}
     */
    getPointOffset(offset){
        return new Point(this._p1.x + this.A*offset, this._p1.y + this.B*offset);
    }

    copy(){
        return new Line(this._p1.copy(), this._p2.copy());
    }

    isNear(point, eps){
        return this.distanceTo(point)<eps;
    }

    /**
     * @return {Vector}
     */
    toVector(){
        return new Vector(this.A, this.B, 0);
    }

    /**
     * @param {Line} line
     * @return {Point|null}
     */
    getCrossPoint(line){
        let x1 = this._p1.x;
        let y1 = this._p1.y;
        let x2 = this._p2.x;
        let y2 = this._p2.y;
        let x3 = line._p1.x;
        let y3 = line._p1.y;
        let x4 = line._p2.x;
        let y4 = line._p2.y;

        let a1 = y1 - y2;
        let b1 = x2 - x1;
        let a2 = y3 - y4;
        let b2 = x4 - x3;

        let d = a1 * b2 - a2 * b1;
        if( d != 0 ){
            let c1 = y2 * x1 - x2 * y1;

            let c2 = y4 * x3 - x4 * y3;
            let x = (b1 * c2 - b2 * c1) / d;
            let y = (a2 * c1 - a1 * c2) / d;
            if(this.between(x,x1,x2) && this.between(x,x3,x4) && this.between(y,y1,y2) && this.between(y,y3,y4)) {
                return new Point(x, y, 0);
            }else{
                return null;
            }
        }
        return null;
    }

    between(value, a, b) {
        var min = Math.min.apply(Math, [a, b]),
            max = Math.max.apply(Math, [a, b]);
        return value+1E-5 > min && value < max+1E-5;
    };
}