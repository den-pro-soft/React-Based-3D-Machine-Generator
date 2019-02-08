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

    drawElement(){
        if(this.new){
            this.board.style('dash', [4, 4]);
            this.board.style('fillStyle', '#555555');
        }else{
            this.board.style('dash', []);
            this.board.style('fillStyle', '#222222');
        }

        if(this.focus){
            this.board.style('fillStyle', '#ff641a');
        }

        let height = this.element.fontSize * this.board._pixelPerOne*this.board._scale;
        this.board.style('font',height + 'px Arial');
        this.board.style('textAlign','start');
        this.board.style('textBaseline','bottom');
        this.board.style('lineWidth',1);

        this.board.drawText(this.element.position,this.element.text, this.element.angle, true);
    }
}