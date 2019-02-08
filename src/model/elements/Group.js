/**
 * Created by dev on 11.01.19.
 */

import GraphicElement from '../GraphicElement';
import GroupRenderer from './../../2d/renderer/GroupRenderer';
import Exception from "../../Exception";
import Point from './../Point';

export default class Group extends GraphicElement{
    constructor(){
        super();
        this.elements = [];
        this._renderer = new GroupRenderer(this);

        this.typeName = 'Group';
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
     * @inheritDoc
     */
    getMagnificationPoints(){
        let res = [];
        for(let el of this.elements){
            res.push(...el.getMagnificationPoints());
        }
        res.push(this.getCenter());
        return res;
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

    isNear(point, eps){
        let res = false;
        for(let element of this.elements){
            res |= element.isNear(point, eps);
        }

        return res;
    }

    /**
     * @inheritDoc
     */
    isIntoFigure(figure){
        let res = true;
        for(let i=0; res && i<this.elements.length; i++){
            res &= this.elements[i].isIntoFigure(figure);
        }
        return res;
    }

    copy(){
        let res = new Group();
        for(let element of this.elements){
            res.addElement(element.copy());
        }
        res.height=this.height;
        res.id=this.id;
        res.lineType = this.lineType.copy();
        return res;
    }

    toPolyLines(){
        let res = [];
        for(let element of this.elements){
            let polyLines = element.toPolyLines();
            for(let polyLine of polyLines){
                res.push(polyLine);
            }
        }
        return res;
    }

    toSimpleElements(){
        let res = [];
        for(let el of this.elements){
            if(el.typeName == 'Group'){
                res.push(...el.toSimpleElements());
            }else{
                res.push(el);
            }
        }
        return res;
    }

    rotate(center,grad){
        for(let el of this.elements){
            el.rotate(center, grad);
        }
    }

    getCenter(){
        let ext = this.getExtrenum();
        return new Point(ext.min.x+(ext.max.x-ext.min.x)/2, ext.min.y+(ext.max.y-ext.min.y)/2);
    }
}