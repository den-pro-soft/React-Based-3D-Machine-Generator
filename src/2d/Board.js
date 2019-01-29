/**
 * Created by dev on 09.01.19.
 */

import LineTool from './tool/LineTool';
import PointerTool from './tool/PointerTool';
import EraserTool from './tool/EraserTool';
import RectTool from './tool/RectTool';
import SplineTool from './tool/SplineTool';
import CircleTool from './tool/CircleTool';
import Document from '../model/Document';
import Point from '../model/Point';

export default class Board {
    /**
     * @param {HTMLCanvasElement} canvas
     */
    constructor(canvas) {
        this._scale = 0.2;
        this._bias = {x: 0, y: 0}; // pixel
        this._initCenterPosition = {x: 0, y: 0}; //pixel

        this._pixelPerOne=50;
        this._document = new Document();

        this.tool = new LineTool(this._document);

        this._context = canvas.getContext('2d');

        this._width = 500;
        this._height = 500;

        this._mouseDown = null;
        this._mousePosition = {x: 0, y: 0};
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
        canvas.addEventListener('click',  e=>this.mouseClick(e));
        canvas.addEventListener('dblclick',  e=>this._mouseDbClick(e));

        setTimeout(()=>{this.renderDocument()}, 100);
    }
    
    set document(doc){
        this._document=doc;
        this.tool.document=doc;
    }

    get document(){
        return this._document;
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
        this.style('fillStyle', color?color:'#ffffff');
        this._drawRect({x: 0, y: 0}, {x: this._width, y: this._height}, true);
    }

    renderDocument() {
        this.clear('#ffffff');
        this.tool.render();
        this._document.render();


        this._drawRulers();
    }

    mouseMove(e) {
        this._document.resetRendererConfig();
        if (!this.tool.mouseMove(this._convertToGlobalCoordinateSystem({x:e.offsetX, y:e.offsetY}))) {
            if (this._mouseDown) {
                this.setBias(this._bias.x - (this._mouseDown.offsetX - e.offsetX)
                            ,this._bias.y - (this._mouseDown.offsetY - e.offsetY));
                this._mouseDown = e;
            }
        }
        this._mousePosition={x:e.offsetX, y:e.offsetY};
        this.renderDocument();
    }

    mouseUp(e) {
        this._document.resetRendererConfig();
        this.tool.mouseUp(this._convertToGlobalCoordinateSystem({x: e.offsetX, y: e.offsetY}));
        this._mouseDown = null;
        this.renderDocument();
    }

    mouseDown(e) {
        this._document.resetRendererConfig();
        this.tool.mouseDown(this._convertToGlobalCoordinateSystem({x: e.offsetX, y: e.offsetY}));
        this._mouseDown = e;
        this.renderDocument();
    }

    mouseClick(e) {
        this._document.resetRendererConfig();
        this.tool.mouseClick(this._convertToGlobalCoordinateSystem({x:e.offsetX, y:e.offsetY}));
    }

    _mouseWheel(e) {
        this._document.resetRendererConfig();
        let dScale = e.deltaY / 500;
        let was = this._convertToGlobalCoordinateSystem({x:e.offsetX, y:e.offsetY});
        if(this.setScale(this._scale*(1+dScale))) {
            let now = this._convertToGlobalCoordinateSystem({x:e.offsetX, y:e.offsetY});
            this.setBias(this._bias.x+((now.x-was.x)*this._pixelPerOne*this._scale)
                        ,this._bias.y-((now.y-was.y)*this._pixelPerOne*this._scale));
        }

        this.renderDocument();
    }

    _mouseDbClick(e) {
        this._document.resetRendererConfig();
        this.tool.mouseDbClick(this._convertToGlobalCoordinateSystem({x: e.offsetX, y: e.offsetY}));
    }

    /**
     *
     * @param {String} name
     */
     setTool(name){
        switch(name){
            case 'Line':
                this.tool = new LineTool(this._document);
                break;
            case 'Rectangle':
                this.tool = new RectTool(this._document);
                break;
            case 'Circle':
                this.tool = new CircleTool(this._document);
                break;
            case 'Spline':
                this.tool = new SplineTool(this._document);
                break;
            case 'Eraser':
                this.tool = new EraserTool(this._document);
                break;
            default:
                this.tool = new PointerTool(this._document);
        }
    }

    setBias(x,y){
        this._bias.x=x;
        this._bias.y=y;

    }

    setScale(scale){
        if(scale>1E4 || scale <1E-4){
            return false;
        }
        this._scale=scale;
        return true;
    }

    _drawRulers() {
        let rulerWidth = 20;
        let rulerBackgroundColor = '#efefef';
        let fillColor = '#444444';

        this._context.font = "400 9px Arial";
        this._context.textBaseline = "middle";
        this._context.textAlign = "center";
        this._context.fillStyle = fillColor;
        this._context.strokeStyle = fillColor;

        this.style('fillStyle',rulerBackgroundColor);
        this._drawRect({x: rulerWidth, y: 0}, {x: this._width, y: rulerWidth}, true);
        this.style('fillStyle',fillColor);
        let convertX =x=>x*this._pixelPerOne*this._scale+this._initCenterPosition.x+this._bias.x;

        let divider=1;
        // if(this._scale<0.0002)       divider = 7000;
        // else if(this._scale<0.0005) divider = 5E3;
        if(this._scale<0.002)  divider = 1E3;
        else if(this._scale<0.003)  divider = 500;
        else if(this._scale<0.005)  divider = 200;
        else if(this._scale<0.01)   divider = 100;
        else if(this._scale<0.03)   divider = 50;
        else if(this._scale<0.05)   divider = 25;
        else if(this._scale<0.2)    divider = 10;
        else if(this._scale<1)      divider = 5;
        // else if(this._scale>1000)     divider = 0.002;
        else if(this._scale>500)     divider = 0.005;
        else if(this._scale>100)     divider = 0.01;
        else if(this._scale>15)     divider = 0.05;
        else if(this._scale>7)     divider = 0.2;
        else if(this._scale>2)      divider = 0.5;

        let drawDivision = (x)=>{
            x=Math.round((x)*1E3)/1E3;
            let localX = convertX(x);
            let l = (x*1E3)%(divider*1E3)==0?10:5;
            if(l==10){
                this._context.fillText(x, localX, 6);
            }
            this._context.fillRect(localX, rulerWidth-l, 1, l);
        };


        let delta = 1;
        if(divider>5){
            delta = parseInt(divider/5);
        }else {
            delta = divider == 5?1:divider;
        }

        let minX = parseInt(this._convertToGlobalCoordinateSystem({x:0,y:0}).x)-1;
        let maxX = parseInt(this._convertToGlobalCoordinateSystem({x:this._width+rulerWidth,y:0}).x)+1;
        if(maxX<=0 || minX>0){
            for (let x = minX; x < maxX; x+=delta) drawDivision(x);
        }else{
            for (let x = 0; x < maxX; x+=delta) drawDivision(x);
            for (let x = 0; x > minX; x-=delta) drawDivision(x);
        }

        this.style('fillStyle',rulerBackgroundColor);
        this._drawRect({x: 0, y: 0}, {x: rulerWidth, y: this._height}, true);
        this.style('fillStyle',fillColor);
        this._context.rotate(-Math.PI / 2);

        let convertY =y=>y*this._pixelPerOne*this._scale+this._initCenterPosition.y+this._bias.y;


        let drawDivisionY = (x)=>{
            x=Math.round((x)*1E3)/1E3;
            let localX = convertY(-x);
            let l = (x*1E3)%(divider*1E3)==0?10:5;
            if(l==10){
                this._context.fillText(x, -localX, 6);
            }
            this._context.fillRect(-localX,rulerWidth-l, 1,l);
        };
        let maxY = parseInt(this._convertToGlobalCoordinateSystem({x:0,y:rulerWidth}).y)+1;
        let minY = parseInt(this._convertToGlobalCoordinateSystem({x:0,y:this._height}).y)-1;
        if(maxY<=0 || minX>0){
            for (let y = minY; y < maxY; y+=delta) drawDivisionY(y);
        }else{
            for (let y = 0; y < maxY; y+=delta) drawDivisionY(y);
            for (let y = 0; y > minY; y-=delta) drawDivisionY(y);
        }

        this._context.rotate(Math.PI / 2);



        this.style('fillStyle','rgba(200, 100, 50, 1.0)');
        this._context.beginPath();
        this._context.moveTo(this._mousePosition.x, 20);
        this._context.lineTo(this._mousePosition.x - 3, 20 - 9);
        this._context.lineTo(this._mousePosition.x + 3, 20 - 9);
        this._context.lineTo(this._mousePosition.x, 20);
        this._context.fill();


        this._context.beginPath();
        this._context.moveTo(20, this._mousePosition.y);
        this._context.lineTo(20 - 9, this._mousePosition.y - 3);
        this._context.lineTo(20 - 9, this._mousePosition.y + 3);
        this._context.lineTo(20,this._mousePosition.y);
        this._context.fill();

        this.style('fillStyle',rulerBackgroundColor);
        this._drawRect({x: 0, y: 0}, {x: rulerWidth+5, y: rulerWidth+5}, true);
    }


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
     * @param {Point} p1
     * @param {Point} p2
     * @param {string} color
     * @param {int} width
     * @param {Array.<number>} dash
     */
    drawLine(p1,p2){
        this._drawLine(this._convertToLocalCoordinateSystem(p1), this._convertToLocalCoordinateSystem(p2));
    }

    /**
     * @param {Point} center
     * @param {number} radius - in global coordinate system
     * @param {boolean} fill
     */
    drawArc(center, radius, fill){
        this._drawArc(this._convertToLocalCoordinateSystem(center),radius*this._pixelPerOne*this._scale,fill);
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
     * @param {{x: number, y: number}} center
     * @param {number} radius - in pixel
     * @param {boolean} fill
     */
    _drawArc(center, radius, fill){
        this._context.beginPath();
        this._context.arc(center.x, center.y, radius, 0, 2* Math.PI);

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
}

// global.Board2 = Board;
window.Board2 = Board;
