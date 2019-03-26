/**
 * Created by dev on 11.01.19.
 */

import GraphicElement from '../GraphicElement';
import GroupRenderer from '../../ui/2d/renderer/GroupRenderer';
import Point from '../Point';
import Line from '../math/Line';

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
            for(let polyline of element.toPolyLines()){
                res.push(...polyline.points);
            }
        }
        return res;
    }

    set _points(points){}

    /**
     * @return {null} - group can't have extreme points
     */
    get extremePoints(){
        return null;
    }

    /**
     * Calculates the geometric center of the shape.
     *
     * The center of the group is the center of the line of maximum length obtained from the points of the figure.
     *
     * @return {Point} - center of current element
     */
    getCenter(){
        /** @type {Array.<Point>} points */
        let points = this._points;

        let p1 = points[0];
        let p2 = points[1];
        let length = new Line(p1,p2).length();
        for(let i=0; i<points.length; i++){
            for(let j=i+1; j<points.length; j++){
                let temp = new Line(points[i], points[j]).length();
                if(length<temp){
                    p1=points[i];
                    p2=points[j];
                    length = temp;
                }
            }
        }

        let extr = Point.getExtrenum([p1,p2]);
        return new Point(extr.min.x+(extr.max.x-extr.min.x)/2, extr.min.y+(extr.max.y-extr.min.y)/2);
    }


    /**
     * @inheritDoc
     */
    resize(x, y, point, extrenum){
        for(let element of this.elements){
            element.resize(x,y,point, extrenum);
        }
    }

    /**
     * Moves an item by the specified number of units along the x and y axis
     * @param {number} x - how much to shift by x
     * @param {number} y - how much to shift by x
     */
    move(x,y){
        for(let el of this.elements){
            el.move(x,y);
        }
    }

    /**
     * @inheritDoc
     */
    mirror(axis, center){
        for(let element of this.elements){
            element.mirror(axis, center);
        }
    }

    /**
     * @inheritDoc
     * @param {LineType} lineType
     */
    set lineType(lineType){
        for(let el of this.elements){
            el.lineType = lineType;
        }
        super.lineType = lineType;
    }


    /**
     * @inheritDoc
     * @return {LineType}
     */
    get lineType(){
        return super.lineType;
    }

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
     */
    addElement(element){
        this.elements.push(element);
    }

    /**
     * @param {Element} element
     */
    removeElement(element){
        for(let i=0; i<this.elements.length; i++){
            if(this.elements[i].compare(element)){
                this.elements.splice(i,1);
                return;
            }
        }
    }

    /**
     * @inheritDoc
     */
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

    /**
     * @inheritDoc
     * @return {Group}
     */
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

    /**
     * @inheritDoc
     */
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

    /**
     * @inheritDoc
     * @return {Array.<GraphicElement>}
     */
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

    /**
     * @inheritDoc
     */
    rotate(center,grad){
        for(let el of this.elements){
            el.rotate(center, grad);
        }
    }

    // getCenter(){
    //     let ext = this.getExtrenum();
    //     return new Point(ext.min.x+(ext.max.x-ext.min.x)/2, ext.min.y+(ext.max.y-ext.min.y)/2);
    // }
}