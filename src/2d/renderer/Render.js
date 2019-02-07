/**
 * Created by dev on 09.01.19.
 */


/**
 *
 */
export default class Render{
    /**
     * @param {Element} element
     */
    constructor(element){

        /** @var {GraphicElement} */
        this.element = element;

        /** @var {Board} */
        this.board = container.board; //todo: container
        this.new=false;
        this.focus = false;
    }

    drawElement(){
        throw new Exception("The method doesn't have implementation");
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
}