/**
 * Created by dev on 09.01.19.
 */

import LineTool from './tool/LineTool';
import Document from './../model/Document';
import Point from './../model/Point';

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
        if (!this.tool.mouseMove(this._convertToGlobalCoordinateSystem({x:e.offsetX, y:e.offsetY}))) {
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
        if(this.setScale(this._scale*(1+dScale))) {
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
        if(scale>1000 || scale <0.001){
            return false;
        }
        this._scale=scale;
        return true;
    }

    _drawRulers() {

        this.drawLine({x: 0, y: 0}, {x: 10, y: 0}, '#00ff00', 1);


        let rulerWidth = 20;
        let rulerBackgroundColor = '#efefef';
        let fillColor = '#000000';

        this._context.font = "400 9px Arial";
        this._context.textBaseline = "middle";
        this._context.textAlign = "center";
        this._context.fillStyle = 'rgba(50, 50, 50, 1.0)';
        this._context.strokeStyle = 'rgba(125, 125, 125, 0.5)';


        console.log(this._scale);

        this._drawRect({x: rulerWidth, y: 0}, {x: this._width, y: rulerWidth}, rulerBackgroundColor, true);
        let convertX =x=>x*this._pixelPerOne*this._scale+this._initCenterPosition.x+this._bias.x;
        for (let x = 0; x < 100/this._scale; x++) {
            let localX = convertX(x);
            let l = 1;
            l = x%(this._scale<1?10:l)==0? 10:5;
            l = x%(this._scale<=0.1?20:l)==0? 10:5;
            l = x%(this._scale<=0.05?50:l)==0? 10:5;

            if(l==10){
                this._context.fillText(x, localX, 6);
            }
            this._context.fillRect(localX, rulerWidth-l, 1, l);
        }
        for (let x = 0; x>-100; x--) {
            let localX = convertX(x);
            let l = x%(this._scale>1?1:10)==0? 10:5;


            if(x%10==0){
                this._context.fillText(x, localX, 6);
            }
            this._context.fillRect(localX, rulerWidth-l, 1, l);
        }









        //********************************** coordinates *********************
        var len = 50 * this._scale;

        len = Math.round(len / 50 + 1) * 50;

        var step = len * this._scale;
        if (step < 30) {len = (len * 2 / 100 + 1) * 100;
            if (len > 1000) len = (len * 2 / 1000 + 1) * 1000; if (len > 3000)
                len = (len * 2 / 1000 + 1) * 1000; step = len * this._scale}

        for (var n = 0; n < 5; n++){
            if (step > 80) if (len == 5) {len = 2; step = len * this._scale}
            if (step > 80) if (len == 10) {len = 5; step = len * this._scale}
            if (step > 80) if (len == 15) {len = 10; step = len * this._scale}
            if (step > 80) if (len == 25) {len = 10; step = len * this._scale}
            if (step > 80) if (len == 50) {len = 20; step = len * this._scale}
            if (step > 80) if (len == 100) {len = 50; step = len * this._scale}
            if (step > 80) if (len == 150) {len = 100; step = len * this._scale}
            if (step > 80) if (len == 200) {len = 100; step = len * this._scale}
            if (step > 80) if (len == 250) {len = 200; step = len * this._scale}
            if (step > 80) if (len == 300) {len = 150; step = len * this._scale}
            if (step > 80) if (len == 350) {len = 250; step = len * this._scale}
            if (step > 80) if (len == 400) {len = 200; step = len * this._scale}
            if (step > 80) if (len == 450) {len = 200; step = len * this._scale}
            if (step > 80) if (len == 500) {len = 200; step = len * this._scale}
            if (step > 80) if (len == 550) {len = 200; step = len * this._scale}
            if (step > 80) if (len == 600) {len = 200; step = len * this._scale}
            if (step > 80) if (len == 650) {len = 200; step = len * this._scale}
            if (step > 80) if (len == 700) {len = 500; step = len * this._scale}
            if (step > 80) if (len == 750) {len = 500; step = len * this._scale}
        }
















        this._drawRect({x: 0, y: 0}, {x: rulerWidth, y: this._height}, rulerBackgroundColor, true);
        let convertY =y=>y*this._pixelPerOne*this._scale+this._initCenterPosition.y+this._bias.y;
        for (let y = 0; y < 100; y++) {
            this._drawLine({x:rulerWidth-5, y: convertY(y)}, {x: rulerWidth, y: convertY(y)}, fillColor, 1);
        }
        for (let y = 0; y>-100; y--) {
            this._drawLine({x:rulerWidth-5, y: convertY(y)}, {x: rulerWidth, y: convertY(y)}, fillColor, 1);
        }


        this._drawRect({x: 0, y: 0}, {x: rulerWidth+5, y: rulerWidth+5}, rulerBackgroundColor, true);
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