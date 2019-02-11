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
        
        this.render();
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
     * @protected
     */
    render(){
        throw new Exception("The method doesn't have implementation");
    }
}