/**
 * Created by dev on 29.01.19.
 */

import Line from './../math/Line';

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
        for(let i=1; i<=this.points.length; i++){
            let icalc = i;

            let l1 = null;
            if(i!=this.points.length){
                l1=new Line(this.points[i-1], this.points[i]);
            }else{
                l1=new Line(this.points[this.points.length-1], this.points[0]);
                icalc=0;
            }
            for(let j=1; j<=polyLine.points.length; j++){
                let l2=null;
                if(j!=polyLine.points.length){
                    l2=new Line(polyLine.points[j-1], polyLine.points[j]);
                }else{
                    l2=new Line(polyLine.points[polyLine.points.length-1], polyLine.points[0]);
                }
                let crossPoint = l1.getCrossPoint(l2);
                if(crossPoint && this.points[i-1].distanceTo(crossPoint)>1E-5 && this.points[icalc].distanceTo(crossPoint)>1E-5){
                    res.push(crossPoint);
                }
            }
        }
        return res;
    }
    
}