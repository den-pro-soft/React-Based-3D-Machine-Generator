/**
 * Created by dev on 11.01.19.
 */

import Point from './Point';
import ClosedFigure from './ClosedFigure';

/**
 * @warning The class works only in 2 dimensions x and y.
 */
export default class Rect extends ClosedFigure{
    /**
     * @param {Point} p1
     * @param {Point} p2
     */
    constructor(p1,p2){
        super();
        this._p1=p1;
        this._p2=p2;
    }

    contain(point){
        return this._contain(this._p1, this._p2, point) || this._contain(this._p2, this._p1, point)
            || this._contain(new Point(this._p2.x, this._p1.y), new Point(this._p1.x, this._p2.y), point)
            || this._contain(new Point(this._p1.x, this._p2.y), new Point(this._p2.x, this._p1.y), point);
    }

    /**
     * @param {Point} p1 top-left
     * @param {Point} p2 buttom-right
     * @param {Point} p
     * @return {boolean}
     * @private
     */
    _contain(p1,p2,p){
        return p1.x<p.x && p2.x> p.x && p1.y>p.y && p2.y<p.y;
    }

}