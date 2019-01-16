/**
 * Created by dev on 11.01.19.
 */

import Element from '../Element';
import Point from '../Point';
import GroupRenderer from './../../2d/renderer/GroupRenderer';
import Exception from "../../Exception";

export default class Group extends Element{
    constructor(){
        super();
        this.elements = [];
        this._renderer = new GroupRenderer(this);
    }

    get _points(){
        let res = [];
        for(let element of this.elements){
            res = [...res, ...element._points];
        }
        return res;
    }

    set _points(points){}
    
    /**
     * @param {Element} element
     * @throws Exception if element isn't object of Element class
     */
    addElement(element){
        if(!element instanceof Element){
            throw new Exception("Expected Element object type.", element);
        }
        this.elements.push(element);
    }

    isNear(point, eps){
        let res = false;
        for(let element of this.elements){
            res |= element.isNear(point, eps);
        }

        return res;
    }

    isIntoFigure(figure){
        let res = true;
        for(let i=0; res && i<this.elements.length; i++){
            res &= this.elements[i].isIntoFigure(figure);
        }
        return res;
    }

}