/**
 * Created by dev on 12.02.19.
 */

import ElementModificationCommand from './ElementModificationCommand';
import Document from '../model/Document';
import Group from '../model/elements/Group';
import LineElement from '../model/elements/LineElement';
import Arc from '../model/elements/Arc';
import Spline from '../model/elements/Spline';

import Point from '../model/Point';

import LineArcIntersector from '../model/math/algorithms/intersects/LineArc';
import ArcArcIntersector from '../model/math/algorithms/intersects/ArcArc';

let lineArcIntersector = new LineArcIntersector();
let arcArcIntersector = new ArcArcIntersector();

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
        return this.newElements.length>0;
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
                    points.push(...lineArcIntersector.getIntersectPoints(element, el));
                }else if(el instanceof Spline){
                    points.push(...IntersectElementsCommand._intersectPointsLineSpline(element, el));
                }
            }
        }else if(element instanceof Arc) {
            for(let el of simpleElements){
                if(el.compare(element)){
                    continue;
                }else if(el instanceof LineElement) {
                    points.push(...lineArcIntersector.getIntersectPoints(el, element));
                }else if(el instanceof Arc){
                    points.push(...arcArcIntersector.getIntersectPoints(element, el));
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
     * @param {Spline} spline
     * @return {Array.<Point>}
     * @private
     */
    static _intersectPointsLineSpline(line, spline){
        //todo: can have the errors in polygon discretization
        return line.toPolyLines()[0].getCrossPoints(spline.toPolyLines()[0]);
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
