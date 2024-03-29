/**
 * Created by dev on 26.03.19.
 */

import Arc from './Arc';
import PolyLine from "../math/PolyLine";
import Triangle from "../math/Triangle";
import Spline from "./Spline";
import Bend from "../line_types/Bend";
import IntersectCalculator from "../math/algorithms/intersects/IntersectCalculator";
import Intersect from "../math/algorithms/intersects/Intersect";


/**
 * The class need for consolidation the operations with shapes.
 */
export default class Shape{


    constructor(){

        /** @type Array.<GraphicElement>} */
        this.elements = [];

        /** @type {Array.<LineElement>}> - elements with bend line type*/
        this.bends=[];

        this.triangles = null; //performance hack
    }


    /**
     * @return {number}
     * @throws Exception - if the list of elements has different height
     */
    get height(){
        let h = this.elements[0].height;

        for(let el of this.elements){
            if(el.height!=h){
                throw new Exception('All elements of shape must have equals height');
            }
        }
        return h;
    }

    addElement(element){
        if(this.isHas(element)){
            return;
        }
        this.elements.push(element);
        this.triangles=null;
    }

    /**
     * @param {LineElement} bend - with Bend line type
     */
    addBend(bend){
        if(bend.lineType instanceof Bend) {
            this.bends.push(bend);
        }
    }


    /**
     * @param {GraphicElement} element
     * @return {boolean}
     */
    isHas(element){
        for(let el of this.elements){
            if(el.compare(element)){
                return true;
            }
        }
        return false;
    }

    isNear(point, eps){
        let res = false;
        for(let el of this.elements){
            res = res||el.isNear(point, eps);
        }
        return res;
    }

    /**
     * @return {boolean}
     * @throws {Exception} - if the shape has less than two elements
     */
    isClose(){
        if(this.elements.length==1){
            if(this.elements[0] instanceof Arc && this.elements[0].incrementAngle==360){
                return true;
            }
        }

        let countPoints = this.groupShapePoint();

        for(let cp of countPoints){
            if(cp.count!=2){
                return false;
            }
        }
        return true;
    }

    /**
     * @returns {Array.<Point>}
     */
    getExtremePoints(){
        let res = [];

        let countPoints = this.groupShapePoint();

        for(let cp of countPoints){
            if(cp.count!=2){
                res.push(cp.point);
            }
        }


        return res;
    }


    /**
     *
     * @param {Array.<GraphicElement>} elements
     * @return {Array.<{point:Point, elements:Array.<GraphicElement>}>}
     * @private
     */
    groupElementsByPoint(elements){
        /** @type {Array.<{point:Point, elements:Array.<GraphicElement>}>} */
        let res = [];

        for(let el of elements){
            let points = el.extremePoints;
            m: for(let point of points){
                for(let cp of res){
                    if(cp.point.compare(point)){
                        cp.elements.push(el);
                        continue m;
                    }
                }
                res.push({point:point, elements:[el]});
            }
        }

        return res;
    }

    /**
     * @return {Array.<Point>} - the list of points
     */
    getConsistentlyPoints(){
        if(this.elements.length==1){
            if(this.elements[0].typeName == 'Arc'){
                return this.elements[0].toPolyLines()[0].points;
            }
        }

        /** @type {Array.<{point:Point, elements:Array.<GraphicElement>}>} */
        let pointsByElement = this.groupElementsByPoint(this.elements);

        let findPointWithElement = (element, currentPoint)=>{
            for(let point of pointsByElement){
                if(point!=currentPoint){
                    for(let el of point.elements){
                        if(el.compare(element)){
                            return point;
                        }
                    }
                }
            }
            return null;
        };


        let res = [];

        let startPoint = pointsByElement[0];
        let nextPoint = pointsByElement[0];
        let currentPoint = pointsByElement[0];
        let currentElement = currentPoint.elements[0];
        do{
            currentPoint=nextPoint;
            if(currentPoint.elements[0].compare(currentElement)){
                currentElement=currentPoint.elements[1];
                if(!currentElement){
                    res.push(currentPoint.point);
                    break;
                }
            }else{
                currentElement=currentPoint.elements[0];
            }
            let points = currentElement.toPolyLines()[0].points;
            if(currentElement instanceof Spline){
                let temp = [points[0]];
                let i=0;
                for(i=1; i<points.length-1; i+=2){
                    temp.push(points[i]);
                }
                if(i!=points.length-1) {
                    temp.push(points[points.length - 1]);
                }
                points=temp;
            }

            if(points.length>2){
                if(points[0].compare(currentPoint.point)) {
                    res.push(...points);
                    // res.splice(res.length-2,1);
                }else{
                    // if(points[points.length-1].compare(currentPoint.point)) {
                        res.push(...points.reverse());
                        // res.splice(res.length-2,1);
                    // }else{
                    //     console.error("The points is not extreme point!");
                    // }
                }
            }else {
                res.push(currentPoint.point);
            }
            nextPoint = findPointWithElement(currentElement, currentPoint);
        }while(nextPoint!=null && !nextPoint.point.compare(startPoint.point));


        let temp = [];
        m: for(let i=0; i<res.length; i++){
            for(let j=i; j<res.length-1; j++){
                if(res[i].compare(res[j+1])){
                    continue m;
                }
            }
            temp.push(res[i]);
        }

        return temp;
    }

    getElementsEndPoints(){
        let res = [];

        for(let el of this.elements){
            let points = el.extremePoints;
            if(!points){
                continue;
            }
            res.push(...points);
        }
        return res;
    }


    /**
     * @returns {Array<{point: Point, count: number}>}
     * @private
     */
    groupShapePoint(){
        let countPoints = [];

        for(let el of this.elements){
            let points = el.extremePoints;
            m: for(let point of points){
                for(let cp of countPoints){
                    if(cp.point.compare(point)){
                        cp.count++;
                        continue m;
                    }
                }
                countPoints.push({point:point, count:1});
            }
        }
        return countPoints;
    }

    toPolyLine(){
        return new PolyLine(this.getConsistentlyPoints());
    }

    /**
     * @param {Point|Shape} element
     * @return {boolean} - true is the point is into the shape or if all points of shape into the shape
     */
    isContain(element){
        /** @type {TriangulationAlgorithm} */
        let triangulation = container.resolve('triangulation');


        let pointsCurrentShape = this.getConsistentlyPoints();
        if(pointsCurrentShape.length>2) {
            if(!this.triangles) {
                this.triangles = triangulation.getTriangles(pointsCurrentShape).map(triangle => new Triangle(pointsCurrentShape[triangle[0]], pointsCurrentShape[triangle[1]], pointsCurrentShape[triangle[2]]));
            }
            if (element instanceof Shape) {
                let points = element.getConsistentlyPoints();
                for (let point of points) {
                    if (!this.isContainPoint(point, this.triangles)) {
                        return false;
                    }
                }
                return true;
            } else {
                return this.isContainPoint(element, this.triangles);
            }
        }
        return false;
    }

    /**
     * @param {Point} point
     * @param triangles
     * @return {boolean}
     * @private
     */
    isContainPoint(point, triangles){
        for (let triangle of triangles) {
            if (triangle.contains(point)) {
                return true;
            }
        }
        return false;
    }

    isCrossesItself(){
        let elements = this.elements;
        for(let i=0; i< elements.length; i++){
            let points = Intersect.getIntersectPointsWithElements(elements[i], elements);
            if(!points){
                return false;
            }
            m: for(let point of points){
                for(let el of this.elements){
                    let elPoints = el.extremePoints;
                    for(let elPoint of elPoints){
                        if(elPoint.compare(point)){
                            continue m;
                        }
                    }
                }
                return true;
            }
        }
        return false;
    }
}