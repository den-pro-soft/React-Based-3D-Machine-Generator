/**
 * Created by dev on 21.12.18.
 */

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
        return Math.sqrt(Math.pow(v2.x-v1.x,2)+Math.pow(v2.y-v1.y,2)+Math.pow(v2.z-v1.z,2));
    }
}