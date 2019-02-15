/**
 * Created by dev on 09.01.19.
 */

import CreatorToolsInTwoSteps from './CreatorToolsInTwoSteps';
import LineElement from '../../model/elements/LineElement';
import Line from '../../model/math/Line';
import Matrix from './../../model/math/Matrix';

export default class LineTool extends CreatorToolsInTwoSteps{
    constructor(document){
        super(document);
        
        this.cursor.src = 'images/Line.png';
    }

    /**
     * @return {Line}
     */
    get line(){
        return this._element;
    }

    setPosition2(point){
        if(Helper.Key.ctrlKey) {
            point = this._discreteBy15Degrees(point);
        }
        this.line.p2=point;
    }

    /**
     * @param {Point} point
     * @return {Point}
     * @private
     */
    _discreteBy15Degrees(point){
        let tempPoint = this._element.p1.copy();
        tempPoint.x += 1;
        let baseLine = new Line(this._element.p1.copy(), tempPoint);

        let tempLine = new LineElement(this._element.p1.copy(), point);
        
        let angle = baseLine.toVector().getAngle(tempLine._line.toVector());

        if(angle%15>7.5){
            tempLine.rotate(tempLine.p1, -(15-(angle%15)));
        }else {
            tempLine.rotate(tempLine.p1, angle % 15);
        }
        
        return tempLine.p2;
    }

    /**
     * @param point
     * @return {Line}
     */
    createElement(point){
        return new LineElement(point, point);
    }
}