/**
 * Created by dev on 27.02.19.
 */

import DynamicChangeTool from './DynamicChangeTool';

import Document from './../../model/Document';
import Vector from './../../model/math/Vector';
import MoveBasePointsCommand from './../command/MoveBasePointsCommand';
import Point from './../../model/Point';


export default class EditLineTool extends DynamicChangeTool{
    constructor(document){
        super(document);

        this.cursor=null;

        this.doc = new Document();

        let scale = container.resolve('mainBoard')._scale; //todo: maybe set from the using place
        this.Eps = (scale>1?0.2:0.05)/scale;

        this.editVector = new Vector();
    }


    /**
     * @param {Point} point
     * @param {MouseEvent} e
     * @return {boolean} false if not changing any GraphicElement
     */
    mouseMove(point, e){
        let oldPosition = this.mousePosition;
        super.mouseMove(point, e);
        this.editVector.x+=this.dx;
        this.editVector.y+=this.dy;
        if(!this.mouseDownPosition || !this.edited) {
            this.selectNearElements(point);
        }
        return true;
    }

    /**
     * @param {Point} point
     * @param {MouseEvent} e
     * @return {boolean} false if not changing anyGraphicElement GraphicElement
     */
    mouseDown(point, e){
        this.mouseDownPosition=point;
        this.editVector = new Vector();
        let res = true;
        if(!this._isNearMagnitPoint(point)) {
            res = super.mouseDown(point, e);
            if(res){
                this.edited = true;
            }
        }else{
            this.edited = true;
        }
        return res;
    }

    /**
     * @param {Point} point
     * @param {MouseEvent} e
     * @return {boolean} false if not changing any GraphicElement
     */
    mouseUp(point, e){
        app.board._canvas.style.cursor = "default";
        if((this.editVector.x!=0 || this.editVector.y!=0) && this.edited){
            let command = new MoveBasePointsCommand(this._document, this.selectElementsPair.map(e=>e.original)
                , this.mouseDownPosition, this.editVector);
            app.executeCommand(command);
            this.edited=false;
            return true;
        }
        this.edited=false;
        return super.mouseUp(point,e);
    }

    /**
     * @param {Point} point
     * @param {MouseEvent} e
     * @return {boolean} false if not changing any GraphicElement
     */
    mouseDbClick(point, e){
        return true;
    }

    /**
     * @param {Point} point
     * @param {MouseEvent} e
     * @return {boolean} false if not changing any GraphicElement
     */
    mouseClick(point, e){
        return true;
    }


    /**
     * @inheritDoc
     */
    render(){
        for(let el of this.selectElementsPair){
            el.copy = el.original.copy();
        }

        new MoveBasePointsCommand(this.doc, this.selectElementsPair.map(e=>e.copy)
            , this.mouseDownPosition, this.editVector).executeCommand();
        super.render();
    }


    _isNearMagnitPoint(pointArg){
        let simpleElements = Document.toSimpleListElements(this.selectElementsPair.map(e=>e.copy));
        let scale = container.resolve('mainBoard')._scale; //todo: maybe set from the using place
        let Eps = (scale>1?0.2:0.05)/scale;

        for(let element of simpleElements){
            let points = element.getMagnificationPoints();
            for(let point of points){
                if(point.isNear(pointArg, Eps)){
                    return true;
                }
            }
        }
        return false;
    }
}