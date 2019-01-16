/**
 * Created by dev on 04.01.19.
 */
import Render from './../2d/renderer/Render';
import Matrix from "../model/math/Matrix";
import Point from "./Point";

let id = 0;

export default class Element{
    constructor(){
        this.id=id++;
     
        /** @var {Array.<Point>} */
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
        return Point.getExtrenum(this._points);
    }

    /**
     * @param {number} x
     * @param {number} y
     */
    move(x,y){
        let moveMatrix = this.createMoveMatrix(x,y);
        for(let point of this._points){
            point.changeByMatrix(moveMatrix);
        }
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

    /**
     * @return {Point}
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

        let resizeMatrix = this.createResizeMatrix(dx,dy); //todo: move the method to Matrix class, and change it to static


        let moveMatrix = this.createMoveMatrix(-tempP.x, -tempP.y);
        let removeMatrix = this.createMoveMatrix(tempP.x, tempP.y);

        for(let point of this._points){
            point.changeByMatrix(moveMatrix);
            point.changeByMatrix(resizeMatrix);
            point.changeByMatrix(removeMatrix);
        }
    }


    /**
     * @param {number} x
     * @param {number} y
     * @return {Matrix}
     * @protected
     */
    createMoveMatrix(x,y){
        return new Matrix([[1,0,0,0],[0,1,0,0],[0,0,1,0],[x,y,0,1]]);
    }

    /**
     * @param {number} x
     * @param {number} y
     * @return {Matrix}
     * @protected
     */
    createResizeMatrix(x,y){
        return new Matrix([[1+x,0,0,0],[0,1+y,0,0],[0,0,1,0],[0,0,0,1]])
    }
    
}