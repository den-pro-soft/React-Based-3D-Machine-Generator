/**
 * Created by dev on 09.01.19.
 */

import Document from '../../model/Document';
import Point from '../../model/Point';
import Cursor from './cursor/Cursor';

export default class Tool{
    /**
     * @param {Document} document
     */
    constructor(document){
        this.document = document;
        this.cursor = new Cursor();

        this.mousePosition = new Point(0,0,0);
    }

    /**
     * @param {Point} point
     * @return {boolean} false if not changing any Elements
     */
    mouseMove(point){
        this.mousePosition=point;
        return false;
    }

    /**
     * @param {Point} point
     * @return {boolean} false if not changing any Elements
     */
    mouseDbClick(point){
        throw new Exception("The method doesn't have implementation");
    }

    /**
     * @param {Point} point
     * @return {boolean} false if not changing any Elements
     */
    mouseClick(point){
        throw new Exception("The method doesn't have implementation");
    }

    /**
     * @param {Point} point
     * @return {boolean} false if not changing any Elements
     */
    mouseDown(point){
        throw new Exception("The method doesn't have implementation");
    }

    /**
     * @param {Point} point
     * @return {boolean} false if not changing any Elements
     */
    mouseUp(point){
        throw new Exception("The method doesn't have implementation");
    }

    /**
     *
     */
    render(){
        if(this.cursor) {
            this.cursor.render(this.mousePosition);
        }
    }
}