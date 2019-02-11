/**
 * Created by dev on 14.01.19.
 */

import Render from './Render';
import Arc from './../../model/elements/Arc';

export default class ArcRenderer extends Render{
    /**
     * @param {Arc} element
     */
    constructor(element) {
        if(!element instanceof Arc){
            throw new Exception('The renderer can render only Arc objects');
        }
        super(element);
    }

    drawElement(){
        if(this.new){
            this.board.style('dash', [4,4]);
            this.board.style('strokeStyle', '#555555');
        }  else{
            this.board.style('dash', []);
            this.board.style('strokeStyle', '#222222');
        }

        if(this.focus){
            this.board.style('strokeStyle', '#ff641a');
        }

        
        this.board.style('lineWidth', 1);   //todo: use theme
        
        
        /** @var {Arc} */
        let e = this.element;
        this.board.drawArc(e.center, e.radius, e.startAngle, e.endAngle);
    }
}
