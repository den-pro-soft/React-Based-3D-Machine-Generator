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
        let dash = [];
        let color = '#222222';
        if(this.new){
            dash = [4, 4];
            color = '#555555';
        }

        if(this.focus){
            color = '#ff641a';
        }

        /** @var {Arc} */
        let e = this.element;
        this.board.drawArc(e.center, e.radius , color, 1, dash);
    }
}
