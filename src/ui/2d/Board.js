/**
 * Created by dev on 09.01.19.
 */



import Point from '../../model/Point';
import Observable from '../../Observable';
import Trigonometric from '../../model/math/Trigonometric';
import Tool from './tool/Tool';

import RulerBoardExtension from './board-extensions/RulerBoardExtension'
import MousePointerBoardExtension from './board-extensions/MousePointerBoardExtension'
import InteractiveBoardExtension from './board-extensions/InteractiveBoardExtension'

/**
 * The class need for drawing simple graphic elements with using abstract coordinate system (not in pixel).
 * The class is a virtual canvas. The class provides the ability to move and scale the
 * canvas with using the virtual coordinate system (not in pixels).
 */
class Board extends Observable{
    constructor() {
        super();
        this._scale = 1;
        this._bias = {x: 0, y: 0}; // pixel
        this._initCenterPosition = {x: 0, y: 0}; //pixel

        this._pixelPerOne=50;

        this._canvas= document.createElement('canvas');
        this._context = this._canvas.getContext('2d');

        this._width = 500;
        this._height = 500;
    }

    get canvas(){
        return this._canvas;
    }

    /**
     * Use the method when init and resize the canvas. To display the correct proportions.
     * @param {number} width - in pixel
     * @param {number} height - in pixel
     */
    setSize(width, height) {
        this._width = width;
        this._height = height;
        this._initCenterPosition.x=width/2;
        this._initCenterPosition.y=height/2;
    }

    /**
     * The method of sketching the entire canvas given colors
     * @param {string} color - clean color
     */
    clear(color) {
        this.style('fillStyle', color?color:'#ffffff');
        this._drawRect({x: 0, y: 0}, {x: this._width, y: this._height}, true);
    }

    /**
     * Method sets styles for drawing elements.
     * @see(https://www.w3.org/TR/2dcontext/#line-styles) - for example
     * @param {string} property -  <code>fillStyle</code> - is example
     * @param {string|number} value - <code>#664334</code> - is example
     */
    style(property, value){
        switch(property){
            case 'dash':
                this._context.setLineDash(value);
                break;
            default:
                this._context[property]=value;
        }

    }

    /**
     * @return {{x: number, y: number}} - pixel center
     */
    getCenter(){
       return {x: this._width/2, y: this._height/2};
    }

    /**
     * @param {Point} point
     * @return {{x: number, y: number}}
     * @private
     */
    _convertToLocalCoordinateSystem(point){
        let multiplier = this._pixelPerOne*this._scale;
        return {x:point.x*multiplier+this._initCenterPosition.x+this._bias.x
            , y:-point.y*multiplier+this._initCenterPosition.y+this._bias.y};
    }

    /**
     * @param {{x: number, y: number}} point
     * @return {Point}
     * @private
     */
    _convertToGlobalCoordinateSystem(point){
        let divider = this._pixelPerOne*this._scale;
        return new Point((point.x-this._initCenterPosition.x-this._bias.x)/divider
            ,-(point.y-this._initCenterPosition.y-this._bias.y)/divider,0);
    }

    /**
     * @param {{x: number, y: number}} point
     * @param {number} dZoom -  0..1..*
     * @private
     */
    _zoomAroundPoint(dZoom, point){
        let was = this._convertToGlobalCoordinateSystem(point);
        if(this._setScale(this._scale*dZoom)) {
            let now = this._convertToGlobalCoordinateSystem(point);
            this._setBias(this._bias.x+((now.x-was.x)*this._pixelPerOne*this._scale)
                ,this._bias.y-((now.y-was.y)*this._pixelPerOne*this._scale));
        }
        this.renderDocument();
    }

    //<editor-fold desc="methods for drawing simple elements">
    
    /**
     * @param {Point} p1
     * @param {Point} p2
     */
    drawLine(p1,p2){
        this._drawLine(this._convertToLocalCoordinateSystem(p1), this._convertToLocalCoordinateSystem(p2));
    }

    /**
     * counterclockwise angle
     * @param {Point} center
     * @param {number} radius - in global coordinate system
     * @param {number} startAngle - in degrees
     * @param {number} endAngle - in degrees
     * @param {boolean} fill
     */
    drawArc(center, radius, startAngle, endAngle, fill){
        let start = 0;
        let end = 2*Math.PI;
        if((startAngle!=0 || endAngle!=0) && startAngle!=endAngle){
            start = Trigonometric.gradToRad(startAngle);
            end = Trigonometric.gradToRad(endAngle);
        }
        center = this._convertToLocalCoordinateSystem(center);
        radius = radius*this._pixelPerOne*this._scale;
        this._drawArc(center,radius, start, end, fill);
    }

    /**
     * @param {Array.<Point>} points
     */
    drawPolyLine(points){
        let localPoints = [];
        for(let p of points){
            localPoints.push(this._convertToLocalCoordinateSystem(p));
        }
        this._drawPolyLine(localPoints);
    }

    /**
     * @param {Point} position
     * @param {string} text
     * @param {number} angle - in degrees.
     * @param {boolean} fill
     */
    drawText(position,text, angle, fill){
        this._drawText(this._convertToLocalCoordinateSystem(position), text, angle, fill);
    }

    /**
     * @param {{x: number, y: number}} position
     * @param {string} text
     * @param {number} angle - in degrees.
     * @param {boolean} fill
     */
    _drawText(position,text, angle, fill){
        let radianAngle = Trigonometric.gradToRad(angle);

        this._context.save();
        this._context.translate(position.x, position.y);
        this._context.rotate(-radianAngle);

        if(fill) {
            this._context.fillText(text, 0, 0);
        }else {
            this._context.strokeText(text, 0, 0);
        }
        this._context.restore();
    }

    /**
     * @param {Array.<{x: number, y: number}>}points
     * @private
     */
    _drawPolyLine(points){
        this._context.beginPath();
        this._context.moveTo(parseInt(points[0].x), parseInt(points[0].y));
        for(let i=1; i<points.length; i++) {
            this._context.lineTo(points[i].x, points[i].y);
        }
        this._context.stroke();
    }

    /**
     * counterclockwise angle
     * @param {{x: number, y: number}} center
     * @param {number} radius - in pixel
     * @param {number} startAngle - in radians  * 0 is by Ox axis
     * @param {number} endAngle - in radians
     * @param {boolean} fill
     */
    _drawArc(center, radius, startAngle, endAngle, fill){
        this._context.beginPath();
        this._context.arc(center.x, center.y, radius, -endAngle, -startAngle);

        if(fill){
            this._context.fill();
        }else {
            this._context.stroke();
        }
    }

    _drawLine(p1, p2) {
        this._context.beginPath();
        this._context.moveTo(parseInt(p1.x), parseInt(p1.y));
        this._context.lineTo(parseInt(p2.x), parseInt(p2.y));
        this._context.stroke();
    }

    /**
     * @param {{x:number,y:number}} p1
     * @param {{x:number,y:number}} p2
     * @param {boolean} fill
     * @private
     */
    _drawRect(p1, p2, fill) {
        this._context.beginPath();
        this._context.moveTo(p1.x, p1.y);
        this._context.lineTo(p2.x, p1.y);
        this._context.lineTo(p2.x, p2.y);
        this._context.lineTo(p1.x, p2.y);
        if (fill) {
            this._context.fill();
        } else {
            this._context.stroke();
        }
    }

    //</editor-fold>
    
    //<editor-fold desc="private methods">

    _setBias(x,y){
        this._bias.x=x;
        this._bias.y=y;

    }

    _setScale(scale){
        if(scale>1E4 || scale <1E-4){
            return false;
        }
        this._scale=scale;
        return true;
    }
    //</editor-fold>
}



/**
 * The class is interactive board. It's mean that class can processing mouse events. 
 * For example: move the board with using mouse. 
 *
 * The class have render cycle.
 *
 * 1. some event (for example mouse move)
 * 2. the event redirects the event to {@class Toll}
 * 3. render the tool and document if those properties was set
 * 4. render board extensions
 *  
 *  
 *  
 * Event names:
 *
 * 1. mouseMove - data is {Point} current mouse position (in virtual coordinate system)
 */
class InteractiveBoard extends Board{
    /**
     * @inheritDoc
     */
    constructor(){
        super();

        this._mouseDown = null;

        /**
         * It's abstraction with data structure and implementation the {@class Renderable}.
         * @type {Renderable}
         * @private
         */
        this._document = null;

        /**
         *
         * @type {Tool}
         */
        this.tool = null;

        /** @type {Array.<BoardExtension>} */
        this.boardExtensions = [new RulerBoardExtension(this), new MousePointerBoardExtension(this)];
        
        setTimeout(()=>{
            try{
                this.renderDocument()
            }catch (e) {
                console.warn(e);
            }}, 100);


        this._canvas.addEventListener('mousemove', e=>this.mouseMove(e));
        this._canvas.addEventListener('mousedown', e=>this.mouseDown(e));
        this._canvas.addEventListener('mouseup', e=>this.mouseUp(e));
        if (this._canvas.addEventListener) {
            if ('onwheel' in document) {
                this._canvas.addEventListener("wheel", e=>this.mouseWheel(e));
            } else if ('onmousewheel' in document) {
                this._canvas.addEventListener("mousewheel", e=>this.mouseWheel(e));
            } else {
                this._canvas.addEventListener("MozMousePixelScroll", e=>this.mouseWheel(e));
            }
        } else {
            this._canvas.attachEvent("onmousewheel", e=>this.mouseWheel(e));
        }
        this._canvas.addEventListener('click',  e=>this.mouseClick(e));
        this._canvas.addEventListener('dblclick',  e=>this.mouseDbClick(e));

        container.resolve('config').addHandler('change', (e)=>{
            if(e=='dimension'){
                this.renderDocument();
            }
        });
    }

    mouseMove(e) {
        this._document.resetRendererConfig();
        let globalPoint = this._convertToGlobalCoordinateSystem({x:e.offsetX, y:e.offsetY});
        if (!this.tool.mouseMove(globalPoint, e)) {
            if (this._mouseDown) {
                this._setBias(this._bias.x - (this._mouseDown.offsetX - e.offsetX)
                    ,this._bias.y - (this._mouseDown.offsetY - e.offsetY));
                this._mouseDown = e;
            }
        }

        for(let extension of this.boardExtensions){
            if(extension instanceof InteractiveBoardExtension) {
                extension.mouseMove({x:e.offsetX, y:e.offsetY});
            }
        }
        
        this.renderDocument();
        this._notifyHandlers('mouseMove',globalPoint);
    }

    mouseUp(e) {
        this._document.resetRendererConfig();
        this.tool.mouseUp(this._convertToGlobalCoordinateSystem({x: e.offsetX, y: e.offsetY}), e);
        this._mouseDown = null;
        this.renderDocument();
    }

    mouseDown(e) {
        this._document.resetRendererConfig();
        this.tool.mouseDown(this._convertToGlobalCoordinateSystem({x: e.offsetX, y: e.offsetY}), e);
        this._mouseDown = e;
        this.renderDocument();
    }

    mouseClick(e) {
        this._document.resetRendererConfig();
        this.tool.mouseClick(this._convertToGlobalCoordinateSystem({x:e.offsetX, y:e.offsetY}), e);
    }

    mouseWheel(e) {
        this._document.resetRendererConfig();
        let dScale = e.deltaY / 500;
        this._zoomAroundPoint(1+dScale,{x:e.offsetX, y:e.offsetY});
    }

    mouseDbClick(e) {
        this._document.resetRendererConfig();
        this.tool.mouseDbClick(this._convertToGlobalCoordinateSystem({x: e.offsetX, y: e.offsetY}), e);
    }

    zoomToFitScreen(){
        if(this.document._elements.length==0){
            return;
        }
        let ext = this._document.getExtrenum();
        let width = ext.max.x-ext.min.x;
        let height = ext.max.y-ext.min.y;

        let O = this._convertToGlobalCoordinateSystem({x:0,y:0});
        let wh = this._convertToGlobalCoordinateSystem({x:this._width-25,y:this._height-25});

        let localWidth = wh.x-O.x;
        let localHeight = O.y-wh.y;

        let zoom = Math.min(localWidth/width,localHeight/height);

        let coef = 1.2;
        if(zoom!=localWidth/width){
            coef=1.5;
        }

        this._setScale((this._scale*zoom)/coef);


        let leftUpPoint = this._convertToLocalCoordinateSystem(new Point(ext.min.x, ext.max.y));
        let rightDownPoint = this._convertToLocalCoordinateSystem(new Point(ext.max.x, ext.min.y));
        this._bias.x-=leftUpPoint.x-this._width/2+(rightDownPoint.x-leftUpPoint.x)/2+10;
        this._bias.y-=leftUpPoint.y-this._height/2+(rightDownPoint.y-leftUpPoint.y)/2+50;

        this.renderDocument();
    }

    /**
     * @param PPI
     */
    zoomToActualSize(PPI){
        let ppm = PPI/25.4;

        let zoom = ppm/this._pixelPerOne;
        this._setScale(zoom);
        this.renderDocument();
    }

    /**
     * @inheritDoc
     */
    setSize(width, height){
        super.setSize(width, height);
        this.renderDocument();
    }

    /**
     * @param {Tool} tool
     */
    setTool(tool){
        this.tool=tool;
    }

    renderDocument() {
        this.clear('#ffffff');

        if(this.document){
            this.document.render();
        }
        if(this.tool) {
            this.tool.render();
        }

        for(let extension of this.boardExtensions){
            extension.render();
        }

    }

    set document(doc){
        this._document=doc;
        this.tool.document=doc;
    }

    get document(){
        return this._document;
    }
}

export {Board, InteractiveBoard};

