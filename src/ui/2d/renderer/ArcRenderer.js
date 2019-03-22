/**
 * Created by dev on 14.01.19.
 */

import Render from './Render';
import Arc from '../../../model/elements/Arc';

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

    /**
     * @inheritDoc
     */
    drawElement(){
        /** @var {Arc} */
        let e = this.element;
        this.board.drawArc(e.center, e.radius, e.startAngle, e.endAngle);
    }
}
