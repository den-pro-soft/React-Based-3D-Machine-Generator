/**
 * Created by dev on 07.02.19.
 */

import Render from './Render';

export default class TextRenderer extends Render{
    /**
     * @param {Text} element
     */
    constructor(element){
        if(!element instanceof Text){
            throw new Exception('The renderer can render only Text objects');
        }
        super(element);
    }

    /**
     * @inheritDoc
     */
    drawElement(){
        let height = this.element.fontSize * this.board._pixelPerOne*this.board._scale;
        this.board.style('font',height + 'px Arial');
        this.board.style('textAlign','start');
        this.board.style('textBaseline','bottom');
        this.board.drawText(this.element.position,this.element.text, this.element.angle, true);
    }
}