/**
 * Created by dev on 11.01.19.
 */

import Element from '../Element';
import GroupRenderer from '../../2d/renderer/GroupRenderer';
import Exception from "../../Exception";
import Matrix from "../math/Matrix";

export default class Group extends Element{
    constructor(){
        super();
        this.elements = [];
        this._renderer = new GroupRenderer(this);
    }

    
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


    getExtrenum(){
        let elements = this.elements;
        let extrenum = elements[0].getExtrenum();
        for(let i=1; i<elements.length; i++){
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

    move(x,y){
        for(let element of this.elements){
            element.move(x, y);
        }
    }
}