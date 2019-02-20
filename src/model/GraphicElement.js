/**
 * Created by dev on 04.01.19.
 */
import Matrix from "../model/math/Matrix";
import Point from "./Point";
import Cloneable from './../Cloneable';

/**
 * The class is abstraction of graphic elements.
 *
 * An implementation of this class is used to represent the data structure of the document.
 *
 * The class implemented {@class Cloneable} and {@class Renderable}
 *
 * @abstract
 */
export default class GraphicElement extends Cloneable{
    

    constructor(){
        super();
        
        /** @var {number} - is unique identifier */
        this.id=app.elementIdGenerator.generateId();

        this.height = 10;

        /** @var {Array.<Point>} */
        this._points = [];

        /** @var {Render} */
        this._renderer = null; //todo: transfer the creation of a new sample from GraphicElement classes to a IOC container

        /** @var {LineType} */
        this._lineType=app.config.lineType.copy();
        
        this.typeName= "Element"; //todo: understand  instanceof and remove this shit
    }

    /**
     * @abstract
     * @return {Array.<Point>|null} - the points are end points in a contour.
     * For example: for {@class Arc} the point is the start point of the arc and the end point of the arc
     * null - if the element doesn't have extreme any points
     */
    get extremePoints(){
        throw new Exception('The method doesn\'t have implementation.');
    }

    /**
     * @param {LineType} lineType
     */
    set lineType(lineType){
        console.log(lineType);
        this._lineType = lineType.copy();
    }

    /**
     * @return {LineType}
     */
    get lineType(){
        return this._lineType;
    }


    /**
     * The method renders some data structure using an instance of the {@class Render} class.
     */
    render(){
        this._renderer.render();
    }

    resetRendererConfig(){
        this._renderer.resetConfig();
    }

    /**
     * The method regenerate ID for current element.
     * This may be necessary when we create an item based on a copy.
     */
    generateNewId(){
        this.id=app.elementIdGenerator.generateId();
    }

    /**
     * The method need for magnification mode
     * @return {Array.<Point>} - points that can be magnetised
     */
    getMagnificationPoints(){
        return [...this._points,this.getCenter()];
    }

    /**
     * Find max and min values by x and y for current element
     * @returns {{max:{x:number, y:number}, min:{x:number, y:number}}}
     */
    getExtrenum(){
        return Point.getExtrenum(this._points);
    }

    /**
     * Moves an item by the specified number of units along the x and y axis
     * @param {number} x - how much to shift by x
     * @param {number} y - how much to shift by x
     */
    move(x,y){
        let moveMatrix = Matrix.createMoveMatrix(x,y);
        for(let point of this._points){
            point.changeByMatrix(moveMatrix);
        }
    }

    /**
     * @abstract
     * Check if the point is near the elements by Eps.
     * @param {Point} point
     * @param {float} eps
     * @return {boolean} - true if the point is near
     */
    isNear(point, eps){
        throw new Exception('The method doesn\'n have implementation.');
    }

    /**
     * @abstract
     * The method using for cross calculation.
     *
     * The method calculation of cross can hav error. The error depends on the level of discretization.
     * @return {Array.<PolyLine>} - array for group element
     */
    toPolyLines(){
        throw new Exception('The method doesn\'t have implementation.');
    }

    /**
     * @abstract
     * @deprecated The method can have an error if the figure is a concave element
     *
     * @param {ClosedFigure} figure
     * @return {boolean} - true if current elements into figure.
     */
    isIntoFigure(figure){
        throw new Exception('The method doesn\'n have implementation.');
    }

    /**
     * Calculates the geometric center of the shape.
     * @return {Point} - center of current element
     */
    getCenter(){

        let res = new Point(0,0);
        for(let p of this._points){
            res.x+=p.x;
            res.y+=p.y;
            res.y+=p.z;
        }
        res.x/=this._points.length;
        res.y/=this._points.length;
        res.z/=this._points.length;
        return res;
    }

    /**
     * @param {number} x
     * @param {number} y
     */
    resize(x, y){
        let tempP = this.getCenter();
        let extr = this.getExtrenum();

        let wX = Math.abs(extr.max.x-extr.min.x);

        let wY = Math.abs(extr.max.y-extr.min.y);

        let dx = 0;
        let dy = 0;
        if(wX!=0){
            dx = (wX+x)/wX-1;
        }

        if(wY!=0){
            dy = (wY+y)/wY-1;
        }

        let resizeMatrix = Matrix.createResizeMatrix(dx,dy); //todo: move the method to Matrix class, and change it to static


        let moveMatrix = Matrix.createMoveMatrix(-tempP.x, -tempP.y);
        let removeMatrix = Matrix.createMoveMatrix(tempP.x, tempP.y);

        for(let point of this._points){
            point.changeByMatrix(moveMatrix);
            point.changeByMatrix(resizeMatrix);
            point.changeByMatrix(removeMatrix);
        }
    }

    /**
     * Rotate an element around a given center, a predetermined number of degrees
     * @param {Point} center - rotation center
     * @param {number} grad - rotation angle
     */
    rotate(center,grad){
        let rotateMatrix = Matrix.createRotateMatrix(grad);

        let moveMatrix = Matrix.createMoveMatrix(-center.x, -center.y);
        let removeMatrix = Matrix.createMoveMatrix(center.x, center.y);

        for(let point of this._points){
            point.changeByMatrix(moveMatrix);
            point.changeByMatrix(rotateMatrix);
            point.changeByMatrix(removeMatrix);
        }
    }

    /**
     * Mirrors the element relative to the selected axis
     * @param axis - the constant from {@class Trigonometric} class. [axisX|axisY]
     */
    mirror(axis){
        let center = this.getCenter();

        let mirrorMatrix = Matrix.createMirrorMatrix(axis);

        let moveMatrix = Matrix.createMoveMatrix(-center.x, -center.y);
        let removeMatrix = Matrix.createMoveMatrix(center.x, center.y);

        for(let point of this._points){
            point.changeByMatrix(moveMatrix);
            point.changeByMatrix(mirrorMatrix);
            point.changeByMatrix(removeMatrix);
        }
    }

    /**
     * @abstract
     * The method return list of elements which was made by intersection current element
     * @param {Array.<Point>} points  - the points must be in current element
     * @return {Array.<GraphicElement>}
     */
    intersectByPoints(points){
        throw new Exception('The method doesn\'n have implementation.');
    }

    /**
     * Compares two elements
     * @param {GraphicElement} element
     * @return {boolean} - true if id's of the elements are equals
     */
    compare(element){
        return this.id==element.id;
    }

    /**
     * The method is used to get rid of the data hierarchy.
     * @return {Array.<GraphicElement>}
     */
    toSimpleElements(){
        return [this];
    }
}