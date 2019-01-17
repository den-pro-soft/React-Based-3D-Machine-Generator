/**
 * Created by dev on 04.01.19.
 */


import Exception from '../Exception';
import Element from './Element';

export default class Document{
    constructor(){
        /** @var {Array.<Element>} */
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
     * Call render methods for all elements
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
     * @deprecated  The method can have an error if the figure is a concave element
     *
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

    /**
     * @param {Array.<Element>|Element} elements
     * @returns {{max:{x:number, y:number}, min:{x:number, y:number}}}
     */
    getExtrenum(elements){
        if(elements instanceof Array){
            if(!elements[0] instanceof Element){
                throw new Exception('Array have not Element object', element);
            }
            //todo: copy of the algorithm in @see{model/elements/Group} class
            let extrenum = elements[0].getExtrenum();
            for(let i=1; i<elements.length; i++){
                if(!elements[i] instanceof Element){
                    throw new Exception('Array have not Element object', element);
                }
                let ext = elements[i].getExtrenum();
                if(ext.max.x>extrenum.max.x){
                    extrenum.max.x = ext.max.x;
                }
                if(ext.min.x<extrenum.min.x){
                    extrenum.min.x = ext.min.x;
                }
                if(ext.max.y>extrenum.max.y){
                    extrenum.max.y = ext.max.y;
                }
                if(ext.min.y<extrenum.min.y){
                    extrenum.min.y = ext.min.y;
                }
            }
            return extrenum;
        }else{
            if(elements instanceof Element){
                return elements.getExtrenum();
            }else{
                throw new Exception('Excepted object of Element class', elements);
            }
        }
    }

    resetRendererConfig(){
        for(let element of this._elements) {
            element.resetRendererConfig();
        }
    }

    getSnapshot(){
        let sn = new Document();
        for(let el of this._elements){
            sn.addElement(el.copy());
        }
        return sn;
    }

    load(snapshot){
        this._elements = snapshot._elements;
    }
}