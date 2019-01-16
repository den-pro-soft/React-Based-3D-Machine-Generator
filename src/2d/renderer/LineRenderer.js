/**
 * Created by dev on 09.01.19.
 */

import Render from './Render';
import Line from '../../model/elements/Line';

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
        if(this.new){
            this.board.style('dash', [4, 4]);
            this.board.style('strokeStyle', '#555555');
        }else{
            this.board.style('dash', []);
            this.board.style('strokeStyle', '#222222');
        }

        if(this.focus){
            this.board.style('strokeStyle', '#ff641a');
        }
        this.board.style('lineWidth', 1);
        this.board.drawLine(this.element.p1, this.element.p2);
    }
}