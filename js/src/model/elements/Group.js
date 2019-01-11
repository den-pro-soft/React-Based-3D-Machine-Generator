/**
 * Created by dev on 11.01.19.
 */

import Element from '../Element';
import GroupRenderer from '../../2d/renderer/GroupRenderer';

export default class Group extends Element{
    constructor(){
        super();
        this.elements = [];
        this._renderer = new GroupRenderer(this);
    }

    
    /**
     * @param {Element} element
     */
    addElement(element){
        this.elements.push(element);
    }


    isNear(point, eps){
        let res = false;
        for(let element of this.elements){
            res |= element.isNear(point);
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