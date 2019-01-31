/**
 * Created by dev on 29.01.19.
 */

import Line from './../elements/Line';

export default class PolyLine{
    constructor(points=[]){

        /**
         * @type {Array.<Point>}
         */
        this.points = points;
    }


    /**
     * @param {Array.<Point>} points
     */
    addPoints(points){
        for(let p of points){
            this.addPoint(p);
        }
    }

    /**
     * @param {Point} point
     */
    addPoint(point){
        this.points.push(point);
    }

    /**
     * @param {PolyLine} polyLine
     * @return {Array.<Point>|null}
     */
    getCrossPoints(polyLine){
        let res = [];
        for(let i=1; i<this.points.length; i++){
            let l1 = new Line(this.points[i-1], this.points[i]);
            for(let j=1; j<polyLine.points.length; j++){
                let l2 = new Line(polyLine.points[j-1], polyLine.points[j]);
                let crossPoint = l1.getCrossPoint(l2)
                if(crossPoint){
                    res.push(crossPoint);
                }
            }
        }
        return res;
    }
    
}