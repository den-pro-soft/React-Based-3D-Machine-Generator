/**
 * Created by dev on 12.02.19.
 */

import ElementModificationCommand from './ElementModificationCommand';
import Document from './../../model/Document';
import Group from './../../model/elements/Group';
import LineElement from './../../model/elements/LineElement';
import Arc from './../../model/elements/Arc';
import Spline from './../../model/elements/Spline';

import Line from './../../model/math/Line';
import Point from './../../model/Point';

export default class IntersectElementsCommand extends ElementModificationCommand{
    /**
     * @param {Document} document
     * @param {Array.<Element>} elements
     */
    constructor(document, elements){
        super(document, elements);

        this.name = 'IntersectElementsCommand';

        this.newElements = [];

        this.selectOneElement=true;
    }

    /**
     * @inheritDoc
     * @return {boolean} - return true if the command replacing or adding any elements
     */
    isReplacedElements(){
        return true;
    }

    /**
     * The realisation of the  @see {@link isReplacedElements} method.
     * @return {Array.<GraphicElement>|null} - new elements or null
     * @protected
     */
    getReplaceElements(){
        return this.newElements;
    }

    /**
     * @inheritDoc
     */
    executeCommand(){
        let simpleElements = this._document.getListSimpleElements();

        for(let el of this.elements){
            let newElements = this.intersectElement(el, simpleElements);
            if(newElements && newElements.length>0){
                for(let newElement of newElements){
                    this.newElements.push(newElement);
                    this._document.addElement(newElement);
                }
                this._document.removeElement(el);
            }
        }
        return true;
    }


    /**
     * This method intersects the elements. To improve the accuracy of the system composed of a pair of equations
     * for each type of primitive.
     * @param {GraphicElement} element
     * @return {Array.<GraphicElement>|null}
     */
    intersectElement(element, simpleElements){
        if(element instanceof Group) {
            return this._intersectGroup(element, simpleElements);
        }

        let points = [];
        if(element instanceof LineElement) {
            for(let el of simpleElements){
                if(el.compare(element)){
                    continue;
                }else if(el instanceof LineElement) {
                    points.push(...IntersectElementsCommand._intersectPointsLineLine(element, el));
                }else if(el instanceof Arc){
                    points.push(...IntersectElementsCommand._intersectPointsLineArc(element, el));
                }else if(el instanceof Spline){
                    points.push(...IntersectElementsCommand._intersectPointsLineSpline(element, el));
                }
            }
        }else if(element instanceof Arc) {
            for(let el of simpleElements){
                if(el.compare(element)){
                    continue;
                }else if(el instanceof LineElement) {
                    points.push(...IntersectElementsCommand._intersectPointsLineArc(el, element));
                }else if(el instanceof Arc){
                    points.push(...IntersectElementsCommand._intersectPointsArcArc(element, el));
                }else if(el instanceof Spline){
                    points.push(...IntersectElementsCommand._intersectPointsArcSpline(element, el));
                }
            }
        }else if(element instanceof Spline) {
            for(let el of simpleElements){
                if(el.compare(element)){
                    continue;
                }else if(el instanceof LineElement) {
                    points.push(...IntersectElementsCommand._intersectPointsLineSpline(el, element));
                }else if(el instanceof Arc){
                    points.push(...IntersectElementsCommand._intersectPointsArcSpline(el, element));
                }else if(el instanceof Spline){
                    points.push(...IntersectElementsCommand._intersectPointsSplineSpline(element, el));
                }
            }
        }else{
            throw new Exception('The elements doesn\'t support intersection!', element);
        }

        let temp = [];

        m: for(let i=0; i<points.length; i++){
            for(let j=0; j<temp.length; j++){
                if(points[i].compare(temp[j])){
                    continue m;
                }
            }
            temp.push(points[i]);
        }

        return element.intersectByPoints(temp);
    }

    /**
     * @param {Group} element
     * @return {Array.<GraphicElement>|null}
     * @private
     */
    _intersectGroup(element, simpleElements){
        let res = null;
        for(let el of element.elements){
            let newElements = this.intersectElement(el, simpleElements);
            if(newElements){
                if(!res) {
                    res = newElements;
                }else{
                    res.push(...newElements);
                }
            }
        }
        return res;
    }

    /**
     *
     * @param {LineElement} line1
     * @param {LineElement} line2
     * @return {Array.<Point>}
     * @private
     */
    static _intersectPointsLineLine(line1, line2){
        let res = line1._line.getCrossPoint(line2._line);
        if(!res){
            return [];
        }
        return [res];
    }

    /**
     * @param {LineElement} line
     * @param {Arc} arc
     * @return {Array.<Point>}
     * @private
     */
    static _intersectPointsLineArc(line, arc){
        let res = [];
        let l=line._line;
        let k = l.k;

        if(k!=0) {
            let t = l.b - arc.center.y;
            let a = k*k + 1;
            let b = 2 * k * t-2 * arc.center.x;
            let c = Math.pow(arc.center.x, 2) + (t * t) - (arc.radius * arc.radius);
            let D = b * b - 4 * a * c;
            D = (Math.abs(D) > 0 && (Math.abs(D) - 1E-8) < 0) ? 0 : D;
            if (D == 0) {
                let x = -b / (2 * a);
                res = [new Point(x, k*x-(l.C/l.B))];
            }else if(D>0) {

                let x1 = (-b + Math.sqrt(D)) / (2 * a);
                let x2 = (-b - Math.sqrt(D)) / (2 * a);
                res = [new Point(x1, k * x1 - (l.C / l.B)), new Point(x2, k * x2 - (l.C / l.B))];
            }
        }else{
            let angle = line.angle;
            if(angle==90 || angle==270){
                let x = l._p1.x;
                let a=1;
                let b = -2*arc.center.y;
                let c = Math.pow(x,2)-2*x*arc.center.x+Math.pow(arc.center.x,2)+Math.pow(arc.center.y,2)-Math.pow(arc.radius,2);

                let D = b * b - 4 * a * c;

                D = (Math.abs(D) > 0 && (Math.abs(D) - 1E-8) < 0) ? 0 : D;
                
                if (D == 0) {
                    let y = -b / (2 * a);
                    res = [new Point(x, y)];
                }else if(D>0) {

                    let y1 = (-b + Math.sqrt(D)) / (2 * a);
                    let y2 = (-b - Math.sqrt(D)) / (2 * a);
                    res = [new Point(x, y1), new Point(x, y2)];
                }
            }else{
                let y = l._p1.y;
                let a=1;
                let b = -2*arc.center.x;
                let c =Math.pow(y-arc.center.y,2)+Math.pow(arc.center.x,2)-Math.pow(arc.radius,2);

                let D = b * b - 4 * a * c;
                D = (Math.abs(D) > 0 && (Math.abs(D) - 1E-8) < 0) ? 0 : D;
                if (D == 0) {
                    let x = -b / (2 * a);
                    res= [new Point(x, y)];
                }else if(D>0) {
                    let x1 = (-b + Math.sqrt(D)) / (2 * a);
                    let x2 = (-b - Math.sqrt(D)) / (2 * a);
                    res = [new Point(x1, y), new Point(x2, y)];
                }
            }

        }
        return res.filter(point => line.isBelongsToTheElement(point) && arc.isBelongsToTheElement(point));
    }

    /**
     * @param {LineElement} line
     * @param {Spline} spline
     * @return {Array.<Point>}
     * @private
     */
    static _intersectPointsLineSpline(line, spline){
        //todo: can have the errors in polygon discretization
        return line.toPolyLines()[0].getCrossPoints(spline.toPolyLines()[0]);
    }


    /**
     * @param {Arc} arc1
     * @param {Arc} arc2
     * @return {Array.<Point>}
     * @private
     */
    static _intersectPointsArcArc(arc1, arc2){
        let y = (x, neg=1)=> {
            return neg * Math.sqrt(Math.pow(arc1.radius, 2) - Math.pow(x - arc1.center.x, 2)) + arc1.center.y;
        };

        let res = [];
        let distance = new Line(arc1.center, arc2.center).length();
        if(distance>arc1.radius+arc2.radius){
            return [];
        }

        if(arc1.center.y==arc2.center.y){
            let x = (Math.pow(arc2.radius,2)-Math.pow(arc2.center.x,2)-Math.pow(arc1.radius,2)+Math.pow(arc1.center.x,2))/(2*(arc1.center.x-arc2.center.x));
            let resY1 = y(x);
            let resY2 = y(x,-1);

            res.push(new Point(x,resY1));
            if(resY1!=resY2){
                res.push(new Point(x,resY2));
            }
        }else{
            let t = (Math.pow(arc2.radius,2)-Math.pow(arc2.center.x,2)-Math.pow(arc1.radius,2)+Math.pow(arc1.center.x,2)
                -Math.pow(arc1.center.y,2)+2*arc1.center.y*arc2.center.y-Math.pow(arc2.center.y,2)
                )/(2*(arc1.center.y-arc2.center.y));
            let t1 = (arc1.center.x-arc2.center.x)/(arc1.center.y-arc2.center.y);

            let a = t1*t1+1;
            let b = -2*t*t1-2*arc1.center.x;
            let c = t*t+Math.pow(arc1.center.x,2)-Math.pow(arc1.radius,2);

            let D = b*b-4*a*c;
            if (D == 0) {
                let x = -b / (2 * a);
                res = [new Point(x, y(x)),
                    new Point(x, y(x,-1))
                ];
            }else if(D>0) {

                let x1 = (-b + Math.sqrt(D)) / (2 * a);
                let x2 = (-b - Math.sqrt(D)) / (2 * a);
                res = [
                    new Point(x1, y(x1)),
                    new Point(x2, y(x2)),
                    new Point(x1, y(x1,-1)),
                    new Point(x2, y(x2,-1))
                ];
            }
        }
        res = res.filter(point => arc1.isBelongsToTheElement(point) && arc2.isBelongsToTheElement(point));

        let temp = [];

        m: for(let i=0; i<res.length; i++){
            for(let j=0; j<temp.length; j++){
                if(res[i].compare(temp[j])){
                    continue m;
                }
            }
            temp.push(res[i]);
        }
        return temp;
    }

    /**
     * @param {Arc} arc
     * @param {Spline} spline
     * @return {Array.<Point>}
     * @private
     */
    static _intersectPointsArcSpline(arc, spline){
        //todo: can have the errors in polygon discretization
        return arc.toPolyLines()[0].getCrossPoints(spline.toPolyLines()[0]);
    }

    /**
     * @param {Spline} spline1
     * @param {Spline} spline2
     * @return {Array.<Point>}
     * @private
     */
    static _intersectPointsSplineSpline(spline1, spline2){
        throw new Exception('The _intersectPointsSplineSpline method doesn\'t have implementation!', this);
    }
}


















