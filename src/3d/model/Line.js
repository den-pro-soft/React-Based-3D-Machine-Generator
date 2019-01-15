/**
 * Created by dev on 21.12.18.
 */
import {Vertex3} from './Vertex';


export default class Line{
    constructor(v1,v2){
        this.v1=v1;
        this.v2=v2;
    }

    /**
     * @param {Line} line
     * @return {boolean}
     */
    isParalel(line){
        return false;
    }

    /**
     * @param {Line} line
     * @return {boolean}
     */
    compare(line){
        if(line instanceof Line){
            return this.v1.compare(line.v1) && this.v2.compare(line.v2);
        }
        return false;
    }

    /**
     * @param {Line} line
     * @return {boolean}
     */
    opposite(line){
        if(line instanceof Line){
            return this.v2.compare(line.v1) && this.v1.compare(line.v2);
        }
        return false;
    }

    /**
     * @return {number}
     */
    length(){
        let v1= this.v1;
        let v2= this.v2;
        let z = Math.pow(v1.z-v2.z,2);
        let rez = Math.sqrt(Math.pow(v1.x-v2.x,2)+Math.pow(v1.y-v2.y,2)+z);
        return rez;
    }

    /**
     * the method work only for 2D space
     * if this.v1==line.v1 then isn't cross
     * @param line
     * @return {Vertex3|null}
     */
    isCross(line){
        //todo: modify for 3D space
        let p1= this.v1;
        let p2= this.v2;
        let p3= line.v1;
        let p4= line.v2;

        let d = (p1.x-p2.x)*(p3.y-p4.y)-(p1.y-p2.y)*(p3.x-p4.x);
        if(d==0){
            return false;
        }
        let x = ((p1.x*p2.y-p1.y*p2.x)*(p3.x-p4.x) - (p1.x-p2.x)*(p3.x*p4.y-p3.y*p4.x))/d;
        let y = ((p1.x*p2.y-p1.y*p2.x)*(p3.y-p4.y) - (p1.y-p2.y)*(p3.x*p4.y-p3.y*p4.x))/d;

        if(Math.max(p1.x, p2.x)<=x || Math.min(p1.x, p2.x)>=x || Math.max(p3.x, p4.x)<=x || Math.min(p3.x, p4.x)>=x
            || Math.max(p1.y, p2.y)<=y || Math.min(p1.y, p2.y)>=y || Math.max(p3.y, p4.y)<=y || Math.min(p3.y, p4.y)>=y) {
            return false;
        }
        return new Vertex3(x, y, this.v1.z);
    }

}