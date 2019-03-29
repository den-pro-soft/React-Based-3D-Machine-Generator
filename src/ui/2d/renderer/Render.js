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

        this.error = false;
        this.renderMagnificationPoint=true;
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
        if(this.error){
            this.board.style('strokeStyle', '#ff0000');
            this.board.style('fillStyle', '#ff0000');
            this.board.style('lineWidth', 2);
        }
        
        this.drawElement();
        if(this.renderMagnificationPoint && this.focus){
            this.drawMagnificationPoints();
        }
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
        this.error=false;
        this.renderMagnificationPoint=true;
    }

    /**
     * Render the {@class GraphicElement} with using an instance of the {@class Board}
     * @protected
     */
    drawElement(){
        throw new Exception("The method doesn't have implementation");
    }

    /**
     * Render the {@class GraphicElement} control points with using an instance of the {@class Board}
     * @protected
     */
    drawMagnificationPoints(){
        let points = this.element.getMagnificationPoints();
        for(let p of points){
            this.drawControlPoint(p);
        }
    }

    /**
     * Draw a control point on a board
     * @param {Point} point
     * @protected
     */
    drawControlPoint(point){
        point = this.board._convertToLocalCoordinateSystem(point);

        this.board.style('fillStyle', '#000000');
        this.board._drawArc(point, 3, 0, 2*Math.PI, true);
        this.board.style('fillStyle', '#ffffff');
        this.board._drawArc(point, 2, 0, 2*Math.PI, true);
    }
}