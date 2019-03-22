/**
 * Created by dev on 07.02.19.
 */

import GraphicElement  from '../GraphicElement';
import TextRenderer from '../../ui/2d/renderer/TextRenderer'
import Point from '../Point';

import Rect from '../math/Rect';
import Matrix from '../math/Matrix';
import RectElement from './RectElement';
import PolyLine from '../math/PolyLine';
import CommentToSelf from '../line_types/CommentToSelf';

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

    /**
     * @inheritDoc
     */
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
     * The method need for magnification mode
     * @return {Array.<Point>} - points that can be magnetised
     */
    getMagnificationPoints(){
        let l = window.Helper.Text.textWidth(this.text,'Arial', this.fontSize);
        let rect = new RectElement(new Point(this.position.x, this.position.y+this.fontSize),
            new Point(this.position.x+l, this.position.y)).toElement();
        rect.rotate(this.position,-this.angle);

        return rect.getMagnificationPoints();
    }

    /**
     * @inheritDoc
     */
    getExtrenum(){
        let l = window.Helper.Text.textWidth(this.text,'Arial', this.fontSize);
        let rect = new RectElement(new Point(this.position.x, this.position.y+this.fontSize),
                                   new Point(this.position.x+l, this.position.y)).toElement();
        rect.rotate(this.position,-this.angle);
        return rect.getExtrenum();
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

    /**
     * @inheritDoc
     */
    isNear(point, eps){
        let ext = this.getExtrenum();
        return new Rect(new Point(ext.min.x, ext.max.y), new Point(ext.max.x, ext.min.y)).contain(point);
    }

    /**
     * @inheritDoc
     * @return {Text}
     */
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

    /**
     * @inheritDoc
     */
    toPolyLines(){
        //todo: need use font module

        let res = new PolyLine(this._points);
        return [res];
    }
}

