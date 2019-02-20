/**
 * Created by dev on 11.01.19.
 */

import Render from './Render';

export default class GroupRenderer extends Render{
    constructor(element){
        super(element);
    }

    /**
     * @inheritDoc
     */
    drawElement(){
        for(let element of this.element.elements){
            element.render();
        }
        // let center = this.element.getCenter();
        // this.board.style('fillStyle', '#ff0000');
        // this.board.drawArc(center, 0.2, true);
    }

    drawAsNew(){
        for(let element of this.element.elements){
            element._renderer.drawAsNew();
        }
    }

    setFocus(focus){
        for(let element of this.element.elements){
            element._renderer.setFocus(focus);
        }
    }

    resetConfig(){
        for(let element of this.element.elements){
            element.resetRendererConfig();
        }
    }
}