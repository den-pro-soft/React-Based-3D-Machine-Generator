/**
 * Created by dev on 09.01.19.
 */

/**
 *
 */
export default class Render{
    /**
     * @param {Element} element
     */
    constructor(element){
        this._element = element;
    }

    drawElement(){
        throw new Exception("The method doesn't have implementation");
    }
}