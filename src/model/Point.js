import Exception from "../Exception";
import Matrix from "./math/Matrix";
import Vector from "./math/Vector";
import Cloneable from './../Cloneable';

/**
 * @type {number} - need for generation unique identifier
 */
let id=0;
/**
 * Created by dev on 04.01.19.
 *
 * The class is a mathematical abstraction of Points.
 *
 * The class using for mathematical operations.
 */
export default class Point extends Cloneable{
    
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


    /**
     * @param {number} [x=0]
     * @param {number} [y=0]
     * @param {number} [z=0]
     */
    constructor(x=0,y=0,z=0){
        super();
        /** @var {number} - is unique identifier */
        this.id=id++;

        /** @var {number} - is position on OX axis */
        this.x=x;

        /** @var {number} - is position on OY axis */
        this.y=y;

        /** @var {number} - is position on OZ axis */
        this.z=z;
    }

    /**
     * Compares two points
     * @param {Point} point
     * @return {boolean} - true if position of the points are equals
     */
    compare(point){
        return this.isNear(point, 1E-3);
    }

    /**
     * Calculating distance to another point
     * @param {Point} point
     * @return {number}
     */
    distanceTo(point){
        return parseFloat(Math.sqrt(Math.pow(point.x - this.x,2) + Math.pow(point.y - this.y,2)+ Math.pow(point.z - this.z,2)).toFixed(7));
    }

    /**
     * The method change position of current point by change matrix
     * @param {Matrix} matrix - transformation matrix
     */
    changeByMatrix(matrix){
        let vector = new Matrix([[this.x, this.y, this.z, 1]]);
        let res = vector.multiply(matrix).array;
        this.x=res[0][0];
        this.y=res[0][1];
        this.z=res[0][2];
    }

    /**
     * @inheritDoc
     * @return {Point}
     */
    copy(){
        let p = new Point(this.x, this.y, this.z);
        p.id=this.id;
        return p;
    }

    /**
     * @abstract
     * Check if the point is near current point by Eps.
     * @param {Point} point
     * @param {float} eps
     * @return {boolean} - true if the point is near
     */
    isNear(point, eps){
        return Helper.Math.equals(this.x, point.x, eps) && Helper.Math.equals(this.y, point.y, eps) && Helper.Math.equals(this.z, point.z, eps);
    }

    /**
     * The method transform current point to {Vector}
     * @return {Vector}
     */
    toVector(){
        return new Vector(this.x, this.y, this.z);
    }
}
