/**
 * Created by dev on 15.01.19.
 */

import Transformer from './Transformer';
import Point from './../../../model/Point';
import Line from './../../../model/elements/Line';

export default class RotateTransformer extends Transformer{
    constructor(document){
        super(document);

    }

    /**
     * @param {Point} point
     * @return {boolean} - false if transformer do some work
     */
    mouseDown(point){
        return false;
    }

    /**
     * @param {Point} point
     * @return {boolean} - false if transformer do some work
     */
    mouseUp(point){
        return super.mouseUp(point);
    }

    /**
     * @param {Point} point
     * @return {boolean} - false if transformer do some work
     */
    mouseMove(point){
        return true;
    }

    render(){
        let center = new Point(0,0);

        for(let p of this._elements){
            let c = p.getCenter();
            center.x+=c.x;
            center.y+=c.y;
            center.z+=c.z;
        }
        center.x/=this._elements.length;
        center.y/=this._elements.length;
        center.z/=this._elements.length;
        
        let extr = this.document.getExtrenum(this._elements);

        let line = new Line(center, new Point(extr.max.x, extr.max.y));
        let radius = line.length();

        this.board.drawArc(center, radius+0.1, '#ff0000',1,[4,4]);


    }
}