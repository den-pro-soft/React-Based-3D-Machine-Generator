/**
 * Created by dev on 04.01.19.
 */


import Exception from '../Exception';
import Element from './Element';

export default class Document{
    constructor(){
        this._elements = [];
    }

    /**
     * @param {Element} element
     */
    addElement(element){
        if(element instanceof Element) {
            this._elements.push(element);
        }else{
            throw new Exception("To document can be added only elements which instances Element class.");
        }
    }

    /**
     * Call render methods for add elements
     */
    render(){
        for(let element of this._elements){
            element.render();
        }
    }

    /**
     * @param {Point} point
     * @param {float} eps
     * @return {Array.<Element>}
     */
    getNearElements(point, eps){
        let res = [];
        for(let element of this._elements){
            if(element.isNear(point, eps)){
                res.push(element);
            }
        }
        return res;
    }

    /**
     * @param {ClosedFigure} figure
     * @return {Array.<Element>}
     */
    getElementsIntoFigure(figure){
        let res = [];
        for(let element of this._elements){
            if(element.isIntoFigure(figure)){
                res.push(element);
            }
        }
        return res;
    }

    resetRendererConfig(){
        for(let element of this._elements) {
            element.resetRendererConfig();
        }
    }

    getSnapshot(){
        throw new Exception("The method doesn't hae implementation");
    }

    load(snapshot){
        throw new Exception("The method doesn't hae implementation");
    }
}