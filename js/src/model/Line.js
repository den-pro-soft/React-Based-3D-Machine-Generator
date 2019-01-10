/**
 * Created by dev on 04.01.19.
 */
import Exception from '../Exception';
import Element from './Element';
import LineRenderer from '../2d/renderer/LineRenderer';

export default class Line extends Element{
    constructor(p1, p2){
        super();
        this.p1=p1;
        this.p2=p2;
        // this._points = [p1,p2];
        // this._constrolPoints = [{x: (p2.x + p1.x) / 2, y: (p2.y + p1.y) / 2},...this._points];
        this._renderer = new LineRenderer(this);
    }

    /**
     * @return {number}
     */
    length(){
        let p1= this.p1;
        let p2= this.p2;
        let z = Math.pow(p1.z-p2.z,2);
        return Math.sqrt(Math.pow(p1.x-p2.x,2)+Math.pow(p1.y-p2.y,2)+z);
    }

}