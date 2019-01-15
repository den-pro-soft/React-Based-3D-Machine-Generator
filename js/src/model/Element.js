/**
 * Created by dev on 04.01.19.
 */
import Render from '../2d/renderer/Render'

export default class Element{
    constructor(){
        this._constrolPoints = [];
        this._points = [];

        /** @var {Render} */
        this._renderer = null; //todo: transfer the creation of a new sample from Element classes to a IOC container
    }

    render(){
        this._renderer.drawElement();
    }

    resetRendererConfig(){
        this._renderer.resetConfig();
    }

    /**
     * @returns {{max:{x:number, y:number}, min:{x:number, y:number}}}
     */
    getExtrenum(){
        throw new Exception('The method doesn\'n have implementation.');
    }

    /**
     * @param {number} x
     * @param {number} y
     */
    move(x,y){
        throw new Exception('The method doesn\'n have implementation.');
    }

    /**
     * @param {number} x
     * @param {number} y
     */
    resize(x, y){
        throw new Exception('The method doesn\'n have implementation.');
    }

    /**
     * @param {Point} point
     * @param {float} eps
     * @return {boolean}
     */
    isNear(point, eps){
        throw new Exception('The method doesn\'n have implementation.');
    }


    /**
     * @deprecated The method can have an error if the figure is a concave element
     *
     * @param {ClosedFigure} figure
     * @return {boolean} - true if current elements into figure.
     */
    isIntoFigure(figure){
        throw new Exception('The method doesn\'n have implementation.');
    }
}