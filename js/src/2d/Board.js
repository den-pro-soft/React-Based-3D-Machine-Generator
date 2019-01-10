/**
 * Created by dev on 09.01.19.
 */

import LineTool from './tool/LineTool';
import Document from './../model/Document';
import Point from './../model/Point';
import Line from './../model/Line';

export default class Board {
    /**
     * @param {HTMLCanvasElement} canvas
     */
    constructor(canvas) {
        this._scale = 1;
        this._bias = {x: 0, y: 0}; // pixel
        this._initCenterPosition = {x: 0, y: 0}; //pixel

        this._pixelPerOne=50;
        this.document = new Document();

        this.tool = new LineTool(this.document);

        this._context = canvas.getContext('2d');

        this._width = 500;
        this._height = 500;

        this._mouseDown = null;
        canvas.addEventListener('mousemove', e=>this.mouseMove(e));
        canvas.addEventListener('mousedown', e=>this.mouseDown(e));
        canvas.addEventListener('mouseup', e=>this.mouseUp(e));
        if (canvas.addEventListener) {
            if ('onwheel' in document) {
                canvas.addEventListener("wheel", e=>this._mouseWheel(e));
            } else if ('onmousewheel' in document) {
                this.canvas.addEventListener("mousewheel", e=>this._mouseWheel(e));
            } else {
                this.canvas.addEventListener("MozMousePixelScroll", e=>this._mouseWheel(e));
            }
        } else {
            this.canvas.attachEvent("onmousewheel", e=>this._mouseWheel(e));
        }

        this.renderDocument();
    }

    setSize(width, height) {
        this._width = width;
        this._height = height;
        this._initCenterPosition.x=width/2;
        this._initCenterPosition.y=height/2;
    }

    /**
     * @param {string|undefined} color
     */
    clear(color) {
        this._drawRect({x: 0, y: 0}, {x: this._width, y: this._height}, '#ffffff', true);
    }

    renderDocument() {
        this.clear('#ffffff');
        this._drawRulers();
        //
        // this.document.render();
        // this.tool.renderElement();
    }

    mouseMove(e) {
        if (!this.tool.mouseMove()) { //todo: create point for tool
            if (this._mouseDown) {
                this.setBias(this._bias.x - (this._mouseDown.offsetX - e.offsetX)
                            ,this._bias.y - (this._mouseDown.offsetY - e.offsetY));
                this._mouseDown = e;
            }
        }
        this.renderDocument();
    }

    mouseUp(e) {
        this._mouseDown = null;
        this.renderDocument();
    }

    mouseDown(e) {
        this._mouseDown = e;
        this.renderDocument();
    }

    mouseClick(e) {
        throw new Exception("The method doesn't have implementation");
    }

    _mouseWheel(e) {
        let dScale = e.deltaY / 500;
        let was = this._convertToGlobalCoordinateSystem({x:e.offsetX, y:e.offsetY});
        if(this.setScale(this._scale - dScale)) {
            let now = this._convertToGlobalCoordinateSystem({x:e.offsetX, y:e.offsetY});
            this.setBias(this._bias.x+((now.x-was.x)*this._pixelPerOne*this._scale)
                        ,this._bias.y-((now.y-was.y)*this._pixelPerOne*this._scale));
        }

        this.renderDocument();
    }

    setBias(x,y){
        this._bias.x=x;
        this._bias.y=y;

    }

    setScale(scale){
        if(scale>10 || scale <0.1){
            return false;
        }
        this._scale=scale;
        return true;
    }

    _drawRulers() {
        let rulerWidth = 20;
        let rulerBackgroundColor = '#efefef';
        let fillColor = '#000000';

        this._drawRect({x: rulerWidth, y: 0}, {x: this._width, y: rulerWidth}, rulerBackgroundColor, true);


        for (let x = 0; x < 10; x ++) { //if x<0
            this.drawLine({x: x, y: 0}, {x: x, y: -1}, fillColor, 1);
        }
        this.drawLine({x: 0, y: 0}, {x: 10, y: 0}, fillColor, 1);

    }

    /**
     * @param {Point} p1
     * @param {Point} p2
     * @param {string} color
     * @param {int} width
     */
    drawLine(p1,p2,color,width){
        this._drawLine(this._convertToLocalCoordinateSystem(p1), this._convertToLocalCoordinateSystem(p2), color, width);
    }

    _drawLine(p1, p2, color, width) {
        let oldColor = this._context.strokeStyle;
        let oldLineWidth = this._context.lineWidth;

        if (color) {
            this._context.strokeStyle = color;
        }
        if (width) {
            this._context.lineWidth = width;
        }

        this._context.beginPath();
        this._context.moveTo(parseInt(p1.x), parseInt(p1.y));
        this._context.lineTo(parseInt(p2.x), parseInt(p2.y));
        this._context.stroke();

        this._context.strokeStyle = oldColor;
        this._context.lineWidth = oldLineWidth;
    }

    /**
     * @param p1
     * @param p2
     * @param color
     * @param {boolean} fill
     * @param {int} lineWidth
     * @private
     */
    _drawRect(p1, p2, color, fill, lineWidth) {
        let oldColor = fill ? this._context.fillStyle : this._context.strokeStyle;
        let oldLineWidth = this._context.lineWidth;
        if (color) {
            this._context.fillStyle = color;
        }
        if (lineWidth) {
            this._context.lineWidth = lineWidth;
        }
        this._context.beginPath();
        this._context.moveTo(p1.x, p1.y);
        this._context.lineTo(p2.x, p1.y);
        this._context.lineTo(p2.x, p2.y);
        this._context.lineTo(p1.x, p2.y);
        if (fill) {
            this._context.fill();
            this._context.fillStyle = oldColor;
        } else {
            this._context.stroke();
            this._context.strokeStyle = oldColor;
        }
        this._context.lineWidth = oldLineWidth;
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
                        ,-(point.y-this._initCenterPosition.y-this._bias.y)/divider);
    }
}

global.Board2 = Board;