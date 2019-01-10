/**
 * Created by dev on 09.01.19.
 */

import Document from './../../model/Document';
import Point from './../../model/Point';

export default class Tool{
    /**
     * @param {Document} document
     */
    constructor(document){
        this._document = document;
    }

    /**
     * @param {Point} point
     * @return {boolean} false if not changing any Elements
     */
    mouseMove(point){
        // throw new Exception("The method doesn't have implementation");
        return false;
    }

    /**
     *
     */
    renderElement(){
        // throw new Exception("The method doesn't have implementation");
    }
}