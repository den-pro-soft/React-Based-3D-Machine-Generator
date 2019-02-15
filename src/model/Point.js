import GraphicElement from "./GraphicElement";
import Exception from "../Exception";
import Matrix from "./math/Matrix";


let id=0;
/**
 * Created by dev on 04.01.19.
 */
export default class Point{
    constructor(x=0,y=0,z=0){
        this.id=id++;
        this.x=x;
        this.y=y;
        this.z=z;
    }

    compare(point){
        return this.x==point.x && this.y==point.y && this.z==point.z;
    }

    distanceTo(point){
        return Math.sqrt(Math.pow(point.x - this.x,2) + Math.pow(point.y - this.y,2)+ Math.pow(point.z - this.z,2));
    }

    /**
     * @param {Matrix} matrix
     */
    changeByMatrix(matrix){
        let vector = new Matrix([[this.x, this.y, this.z, 1]]);
        let res = vector.multiply(matrix).array;
        this.x=res[0][0];
        this.y=res[0][1];
        this.z=res[0][2];
    }

    /**
     * Find and return max and min values by x and y in all points
     * @param {Array.<Point>} points
     * @returns {{max:{x:number, y:number}, min:{x:number, y:number}}}
     */
    static getExtrenum(points){
        let extrenum = {max:{x:points[0].x, y:points[0].y}, min:{x:points[0].x, y:points[0].y}};
        for(let i=1; i<points.length; i++){
            if(!points[i] instanceof Point){
                throw new Exception('Array have not Point object', points[i]);
            }
            if(points[i].x>extrenum.max.x){
                extrenum.max.x = points[i].x;
            }
            if(points[i].x<extrenum.min.x){
                extrenum.min.x = points[i].x;
            }
            if(points[i].y>extrenum.max.y){
                extrenum.max.y = points[i].y;
            }
            if(points[i].y<extrenum.min.y){
                extrenum.min.y = points[i].y;
            }
        }
        return extrenum;
    }

    copy(){
        let p = new Point(this.x, this.y, this.z);
        p.id=this.id;
        return p;
    }
}
