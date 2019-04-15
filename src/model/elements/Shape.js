/**
 * Created by dev on 26.03.19.
 */

import Arc from './Arc';
import PolyLine from "../math/PolyLine";
import Triangle from "../math/Triangle";
import Spline from "./Spline";
import Bend from "../line_types/Bend";


/**
 * The class need for consolidation the operations with shapes.
 */
export default class Shape{


    constructor(){

        /** @type Array.<GraphicElement>} */
        this.elements = [];

        /** @type {Array.<LineElement>}> - elements with bend line type*/
        this.bends=[];
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
     * @return {Array.<Point>} - the list of points
     */
    getConsistentlyPoints(){
        if(this.elements.length==1){
            if(this.elements[0].typeName == 'Arc'){
                return this.elements[0].toPolyLines()[0].points;
            }
        }

        /** @type {Array.<{point:Point, elements:Array.<GraphicElement>}>} */
        let pointsByElement = [];

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


        for(let el of this.elements){
            let points = el.extremePoints;
            m: for(let point of points){
                for(let cp of pointsByElement){
                    if(cp.point.compare(point)){
                        cp.elements.push(el);
                        continue m;
                    }
                }
                pointsByElement.push({point:point, elements:[el]});
            }
        }

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
            if(currentElement instanceof Arc || currentElement instanceof Spline){
                let temp = [points[0]];
                let i=0;
                for(i=1; i<points.length-1; i+=10){
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
                }else{
                    res.push(...points.reverse());
                }
            }else {
                res.push(currentPoint.point);
            }

            nextPoint = findPointWithElement(currentElement, currentPoint);
        }while(nextPoint!=null && !nextPoint.point.compare(startPoint.point));
        return res;
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
        let triangles = triangulation.getTriangles(pointsCurrentShape).map(triangle=>new Triangle(pointsCurrentShape[triangle[0]], pointsCurrentShape[triangle[1]], pointsCurrentShape[triangle[2]]));

        if(element instanceof Shape){
            let points = element.getConsistentlyPoints();
            for(let point of points){
                if(!this.isContainPoint(point, triangles)){
                    return false;
                }
            }
            return true;
        }else {
            return this.isContainPoint(element, triangles);
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

    /**
     * @param {Shape} shape
     * @return {Array.<Point>}
     */
    getCrossPoint(shape){
        
    }
}