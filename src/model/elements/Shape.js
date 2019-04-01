/**
 * Created by dev on 26.03.19.
 */

import Arc from './Arc';


/**
 * The class need for consolidation the operations with shapes.
 */
export default class Shape{


    constructor(){

        /** @type Array.<GraphicElement>} */
        this.elements = [];

    }

    addElement(element){
        for(let el of this.elements){
            if(el.compare(element)){
                return;
            }
        }

        this.elements.push(element);
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
            res|=el.isNear(point, eps);
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

}