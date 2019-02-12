/**
 * Created by dev on 07.02.19.
 */

import GraphicElement  from './../GraphicElement';
import TextRenderer from './../../2d/renderer/TextRenderer'
import Point from './../Point';

import Rect from '../math/Rect';
import Matrix from './../math/Matrix';
import Trigonometric from './../math/Trigonometric';
import PolyLine from './../math/PolyLine';
import CommentToSelf from './../line_types/CommentToSelf';

/**
 * @inheritDoc
 */
export default class Text extends GraphicElement{
    constructor(position, text){
        super();
        this.position=position;
        this.angle = 0; //degrees
        this.text = text;
        this._renderer = new TextRenderer(this);
        this.fontSize = app.config.fontSize;
        this.typeName = 'Text';

        /** @var {LineType} */
        this.lineType=new CommentToSelf();
    }


    get _points(){
        let ext = this.getExtrenum();
        return [this.position, new Point(ext.min.x, ext.max.y), new Point(ext.max.x, ext.max.y), new Point(ext.max.x, ext.min.y)];
    }

    set _points(points){

    }

    rotate(center,grad){
        let rotateMatrix = Matrix.createRotateMatrix(grad);

        let moveMatrix = Matrix.createMoveMatrix(-center.x, -center.y);
        let removeMatrix = Matrix.createMoveMatrix(center.x, center.y);

        this.position.changeByMatrix(moveMatrix);
        this.position.changeByMatrix(rotateMatrix);
        this.position.changeByMatrix(removeMatrix);


        this.angle-=grad;
    }

    /**
     * @returns {{max:{x:number, y:number}, min:{x:number, y:number}}}
     */
    getExtrenum(){
        let l = window.Helper.Text.textWidth(this.text,'Arial', this.fontSize);
        let s1 = l * Math.cos(Trigonometric.gradToRad(this.angle));
        let s2 = this.fontSize * Math.cos(Trigonometric.gradToRad(90-this.angle));
        let s3 = l * Math.sin(Trigonometric.gradToRad(this.angle));
        let s4 = this.fontSize * Math.sin(Trigonometric.gradToRad(90-this.angle));

        return {max:{x:this.position.x+s1, y:this.position.y+s3+s4}, min:{x:this.position.x-s2, y:this.position.y}};
    }

    /**
     * @inheritDoc
     */
    isIntoFigure(figure){
        let res = true;
        for(let p of this._points){
            res &= figure.contain(p);
        }
        return res;
    }

    isNear(point, eps){
        let ext = this.getExtrenum();
        return new Rect(new Point(ext.min.x, ext.max.y), new Point(ext.max.x, ext.min.y)).contain(point);
    }


    copy(){
        let res = new Text(this.position.copy(), this.text);
        res.height=this.height;
        res.id=this.id;
        res.lineType = this.lineType.copy();
        res.angle=this.angle;
        res.text=this.text;
        res.position = this.position.copy();
        res.fontSize = this.fontSize;
        return res;
    }

    toPolyLines(){
        //todo: need use font module

        let res = new PolyLine(this._points);
        return [res];
    }
}

