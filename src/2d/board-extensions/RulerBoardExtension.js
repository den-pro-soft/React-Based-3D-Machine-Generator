/**
 * Created by dev on 20.02.19.
 */

import BoardExtension from './../BoardExtension';

/**
 * The class renders ruler on the left and top sides, with calculation the bias, scale etc. parameters.
 */
export default class RulerBoardExtension extends BoardExtension{

    /**
     * @inheritDoc
     * @param {Board} board
     */
    constructor(board){
        super(board);

    }

    /**
     * @inheritDoc
     */
    render(){
        let rulerWidth = 20;
        let rulerBackgroundColor = '#efefef';
        let fillColor = '#444444';

        this.board.style('font','400 9px Arial');
        this.board.style('textBaseline','middle');
        this.board.style('textAlign','center');


        this.board._context.fillStyle = fillColor;
        this.board._context.strokeStyle = fillColor;

        this.board.style('fillStyle',rulerBackgroundColor);
        this.board._drawRect({x: rulerWidth, y: 0}, {x: this.board._width, y: rulerWidth}, true);
        this.board.style('fillStyle',fillColor);
        let convertX =x=>x*this.board._pixelPerOne*this.board._scale+this.board._initCenterPosition.x+this.board._bias.x;

        let divider=1;
        // if(this._scale<0.0002)       divider = 7000;
        // else if(this._scale<0.0005) divider = 5E3;
        if(this.board._scale<0.002)  divider = 1E3;
        else if(this.board._scale<0.003)  divider = 500;
        else if(this.board._scale<0.005)  divider = 200;
        else if(this.board._scale<0.01)   divider = 100;
        else if(this.board._scale<0.03)   divider = 50;
        else if(this.board._scale<0.05)   divider = 25;
        else if(this.board._scale<0.2)    divider = 10;
        else if(this.board._scale<1)      divider = 5;
        // else if(this._scale>1000)     divider = 0.002;
        else if(this.board._scale>500)     divider = 0.005;
        else if(this.board._scale>100)     divider = 0.01;
        else if(this.board._scale>15)     divider = 0.05;
        else if(this.board._scale>7)     divider = 0.2;
        else if(this.board._scale>2)      divider = 0.5;

        let drawDivision = (x)=>{
            x=Math.round((x)*1E3)/1E3;
            let localX = convertX(x);
            let l = (x*1E3)%(divider*1E3)==0?10:5;
            if(l==10){
                this.board._context.fillText(x, localX, 6);
            }
            this.board._context.fillRect(localX, rulerWidth-l, 1, l);
        };


        let delta = 1;
        if(divider>5){
            delta = parseInt(divider/5);
        }else {
            delta = divider == 5?1:divider;
        }

        let minX = parseInt(this.board._convertToGlobalCoordinateSystem({x:0,y:0}).x)-1;
        let maxX = parseInt(this.board._convertToGlobalCoordinateSystem({x:this.board._width+rulerWidth,y:0}).x)+1;
        if(maxX<=0 || minX>0){
            for (let x = minX; x < maxX; x+=delta) drawDivision(x);
        }else{
            for (let x = 0; x < maxX; x+=delta) drawDivision(x);
            for (let x = 0; x > minX; x-=delta) drawDivision(x);
        }

        this.board.style('fillStyle',rulerBackgroundColor);
        this.board._drawRect({x: 0, y: 0}, {x: rulerWidth, y: this.board._height}, true);
        this.board.style('fillStyle',fillColor);
        this.board._context.rotate(-Math.PI / 2);

        let convertY =y=>y*this.board._pixelPerOne*this.board._scale+this.board._initCenterPosition.y+this.board._bias.y;


        let drawDivisionY = (x)=>{
            x=Math.round((x)*1E3)/1E3;
            let localX = convertY(-x);
            let l = (x*1E3)%(divider*1E3)==0?10:5;
            if(l==10){
                this.board._context.fillText(x, -localX, 6);
            }
            this.board._context.fillRect(-localX,rulerWidth-l, 1,l);
        };
        let maxY = parseInt(this.board._convertToGlobalCoordinateSystem({x:0,y:rulerWidth}).y)+1;
        let minY = parseInt(this.board._convertToGlobalCoordinateSystem({x:0,y:this.board._height}).y)-1;
        if(maxY<=0 || minX>0){
            for (let y = minY; y < maxY; y+=delta) drawDivisionY(y);
        }else{
            for (let y = 0; y < maxY; y+=delta) drawDivisionY(y);
            for (let y = 0; y > minY; y-=delta) drawDivisionY(y);
        }

        this.board._context.rotate(Math.PI / 2);
    }
}