/**
 * Created by dev on 09.01.19.
 */

import Render from './Render';
import Line from './../../model/Line';

export default class LineRenderer extends Render{
    /**
     *
     * @param {Line} element
     */
    constructor(element){
        super(element);
    }

    drawElement(){
        throw new Exception("The method doesn't hae implementation");
    }
}