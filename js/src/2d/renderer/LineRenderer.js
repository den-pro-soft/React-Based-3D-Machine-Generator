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
        if(!element instanceof Line){
            throw new Exception('The renderer can render only Line objects');
        }
        super(element);
    }

    drawElement(){
        let dash = [];
        let color = '#222222';
        if(this.new){
            dash = [4, 4];
            color = '#555555';
        }

        if(this.focus){
            color = '#ff641a';
        }

        this.board.drawLine(this.element.p1, this.element.p2,color,1, dash);
    }
}