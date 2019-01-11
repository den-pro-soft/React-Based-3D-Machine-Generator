/**
 * Created by dev on 04.01.19.
 */
export default class Point{
    constructor(x,y,z){
        this.x=x?x:0;
        this.y=y?y:0;
        this.z=z?z:0;
    }

    compare(point){
        return this.x==point.x && this.y==point.y && this.z==point.z;
    }

    distanceTo(point){
        return Math.sqrt(Math.pow(point.x - this.x,2) + Math.pow(point.y - this.y,2)+ Math.pow(point.z - this.z,2));
    }
}
