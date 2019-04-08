import Group from "../../../elements/Group";
import LineElement from "../../../elements/LineElement";
import Arc from "../../../elements/Arc";
import Spline from "../../../elements/Spline";
import LineArcIntersector from "./LineArc";
import ArcArcIntersector from "./ArcArc";


let lineArcIntersector = new LineArcIntersector();
let arcArcIntersector = new ArcArcIntersector();

export default class Intersect{

    /**
     * @param {Document} document
     */
    constructor(document){

        this.document = document;

        this.simpleElements = document.getListSimpleElements();
    }


    /**
     *
     * @param {GraphicElement} element
     * @return {Array.<Point>}
     */
    getIntersectPoints(element){
        let points = [];
        if(element instanceof LineElement) {
            for(let el of this.simpleElements){
                if(el.compare(element)){
                    continue;
                }else if(el instanceof LineElement) {
                    points.push(...Intersect._intersectPointsLineLine(element, el));
                }else if(el instanceof Arc){
                    points.push(...lineArcIntersector.getIntersectPoints(element, el));
                }else if(el instanceof Spline){
                    points.push(...Intersect._intersectPointsLineSpline(element, el));
                }
            }
        }else if(element instanceof Arc) {
            for(let el of this.simpleElements){
                if(el.compare(element)){
                    continue;
                }else if(el instanceof LineElement) {
                    points.push(...lineArcIntersector.getIntersectPoints(el, element));
                }else if(el instanceof Arc){
                    points.push(...arcArcIntersector.getIntersectPoints(element, el));
                }else if(el instanceof Spline){
                    points.push(...Intersect._intersectPointsArcSpline(element, el));
                }
            }
        }else if(element instanceof Spline) {
            for(let el of this.simpleElements){
                if(el.compare(element)){
                    continue;
                }else if(el instanceof LineElement) {
                    points.push(...Intersect._intersectPointsLineSpline(el, element));
                }else if(el instanceof Arc){
                    points.push(...Intersect._intersectPointsArcSpline(el, element));
                }else if(el instanceof Spline){
                    points.push(...Intersect._intersectPointsSplineSpline(element, el));
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
        return temp;
    }


    /**
     * @param elements
     * @return {Array.<{originElement:GraphicElement, newElements:Array.<GraphicElement>}>}
     */
    intersectElements(elements){
        let res = [];
        for(let el of elements){
            let newElements = this.intersectElement(el);
            if(newElements && newElements.length>0){
                res.push({originElement:el, newElements:newElements});
            }
        }
        return res;
    }

    /**
     * This method intersects the elements. To improve the accuracy of the system composed of a pair of equations
     * for each type of primitive.
     * @param {GraphicElement} element
     * @return {Array.<GraphicElement>|null}
     */
    intersectElement(element){
        if(element instanceof Group) {
            return this._intersectGroup(element);
        }

        let points = this.getIntersectPoints(element);

        return element.intersectByPoints(points);
    }


    /**
     * @param {Group} element
     * @return {Array.<GraphicElement>|null}
     * @private
     */
    _intersectGroup(element){
        let res = null;
        for(let el of element.elements){
            let newElements = this.intersectElement(el);
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