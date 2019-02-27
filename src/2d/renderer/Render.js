/**
 * Created by dev on 09.01.19.
 */

import Renderable from './../Renderable';

/**
 * @inheritDoc
 */
export default class Render extends Renderable{
    /**
     * @param {Element} element
     */
    constructor(element){
        super();
        /** @var {GraphicElement} */
        this.element = element;

        /** @var {Board} */
        this.board = container.resolve('mainBoard'); //todo: maybe set in render method
        this.new=false;
        this.focus = false;
    }

    /**
     * @inheritDoc
     */
    render(){
        let props = this.element.lineType.getLineStyle();
        for(let prop in props){
            this.board.style(prop, props[prop]);
        }

        if(this.new){
            this.board.style('dash', [4, 4]);
            this.board.style('strokeStyle', '#555555');
            this.board.style('fillStyle', '#555555');
        }
        if(this.focus){
            this.board.style('strokeStyle', '#ff641a');
            this.board.style('fillStyle', '#ff641a');
        }
        
        this.drawElement();
    }

    drawAsNew(){
        this.new = true;
    }

    setFocus(focus){
        this.focus=focus;
    }

    resetConfig(){
        this.focus=false;
        this.new=false;
    }

    /**
     * Render the {@class GraphicElement} with using an instance of the {@class Board}
     * @protected
     */
    drawElement(){
        throw new Exception("The method doesn't have implementation");
    }
}