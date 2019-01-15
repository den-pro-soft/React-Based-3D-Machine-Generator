/**
 * Created by dev on 15.01.19.
 */

import Transformer from './Transformer';
import RectElementController from './../RectElementControler';
import Point from './../../../model/Point';
import Rect from "./../../../model/Rect";


class ResizeRect extends RectElementController{
    constructor(p1,p2){
        super(p1,p2);
        this.board = container.board;

        this.pointPadding = 4;
        this.activeCP = false;

    }

    haveActiveControlPoint(){
        return this.activeCP;
    }

    /**
     * @param {Point} point
     */
    contain(point){
        let res = super.contain(point);
        let cPoints = this.getListControllPoints();
        point = this.board._convertToLocalCoordinateSystem(point);

        for(let i=0; i<cPoints.length; i++){
            let p = this.board._convertToLocalCoordinateSystem(cPoints[i]);
            let rect = new Rect(new Point(p.x-this.pointPadding,p.y+this.pointPadding),
                new Point(p.x+this.pointPadding,p.y-this.pointPadding));
            let con = rect.contain(point);
            if(con){
                this.activeCP=i;
            }
            res |=rect.contain(point);
        }

        if(!res){
            this.activeCP=false;
        }
        return res;
    }

    getListControllPoints(){
        let res = [];
        let element = this.toElement();
        let ext = element.getExtrenum();
        let px1 = ext.min.x+this.l1.length()/2;
        let py1 = ext.min.y+this.l2.length()/2;

        res.push(new Point(px1, ext.min.y,0));      //center-bottom
        res.push(new Point(px1, ext.max.y,0));      //center-top
        res.push(new Point(ext.min.x, py1, 0));     //left-center
        res.push(new Point(ext.max.x, py1, 0));     //right-center
        res.push(new Point(ext.min.x, ext.min.y,0));//left-bottom
        res.push(new Point(ext.max.x, ext.min.y,0));//right-bottom
        res.push(new Point(ext.min.x, ext.max.y,0));//left-top
        res.push(new Point(ext.max.x, ext.max.y,0));//right-top
        return res;
    }

    render(){
        let element = this.toElement();
        element._renderer.drawAsNew();
        element.render();

        let points = this.getListControllPoints();
        for(let point of points){
            let p = this.board._convertToLocalCoordinateSystem(point);
            this._drawControlPoint(p);
        }
    }

    move(x,y){
        this.toElement().move(x,y);
        this._p1.x+=x;
        this._p1.y+=y;

        this._p2.x+=x;
        this._p2.y+=y;
    }

    resize(x,y){
        this.toElement().resize(x,y);

    }


    _drawControlPoint(p){

        this.board._drawRect({x:p.x-this.pointPadding,y:p.y+this.pointPadding}
            ,{x:p.x+this.pointPadding,y:p.y-this.pointPadding},'#000000',true);
    }

    // tightenElements(elements){
    //     let ext = container.board.document.getExtrenum(elements); //todo: container
    //
    //     this.p1=new Point(ext.max.x, ext.min.y);
    //     this.p2=new Point(ext.min.x, ext.max.y);
    // }
}




/**
 * If resize a circle the circle translates to group with four splines (ask user)
 *
 * Barycenter x = sum(x)/n
 *
 * 3. resize elements
 * 4. rotate elements
 * 5. move elements on board
 */
export default class ResizeTransformer extends Transformer{
    constructor(document){
        super(document);

        /** @var {ResizeRect} */
        this.resizeRect = null;
            
        this._downPosition = null;

    }

    addElements(elements){
        super.addElements(elements);
        if(!this.resizeRect){
            this._createResizeRect();
        }else{
            this._calculateResizeRectPoints();
        }
    }

    /**
     * @param {Point} point
     * @return {boolean} - false if transformer do some work
     */
    mouseDown(point){
        super.mouseDown();
        this._downPosition = point;
        if(this.resizeRect){
            if(this.resizeRect.contain(point)){
                return false;
            }else{
                return true;
            }
        }
    }

    /**
     * @param {Point} point
     * @return {boolean} - false if transformer do some work
     */
    mouseUp(point){
        this._downPosition = null;
        if(this.resizeRect) {
            return super.mouseUp(point) && this.resizeRect.contain(point);
        }else{
            return super.mouseUp(point);
        }
    }
    
    mouseMove(point){
        super.mouseMove(point);
        if(this._downPosition){
            if(this.resizeRect.contain(this._downPosition)) {
                let dx = point.x - this._downPosition.x;
                let dy = point.y - this._downPosition.y;

                if (this.resizeRect.haveActiveControlPoint()) {
                    for (let element of this._elements) {
                        element.resize(dx, dy);
                    }
                    this.resizeRect.resize(dx,dy);
                } else {
                    for (let element of this._elements) {
                        element.move(dx, dy);
                    }
                }
                this.resizeRect.move(dx,dy);
                this._downPosition = point;
                return false;
            }
        }

        return true;
    }

    render(){
        console.log("resize");
        if(this.resizeRect){
            this._calculateResizeRectPoints();
            this.resizeRect.render();
        }
    }

    _createResizeRect(){
        let scale = container.board._scale; //todo: container
        let paddingSelectedRect = 0.3 / scale;
        let extrenum = this.document.getExtrenum(this._elements);
        this.resizeRect = new ResizeRect(new Point(extrenum.min.x - paddingSelectedRect, extrenum.max.y + paddingSelectedRect)
            , new Point(extrenum.max.x + paddingSelectedRect, extrenum.min.y - paddingSelectedRect));
    }

    _calculateResizeRectPoints(){
        let scale = container.board._scale; //todo: container
        let paddingSelectedRect = 0.3 / scale;
        let extrenum = this.document.getExtrenum(this._elements);
        this.resizeRect.p1 = new Point(extrenum.min.x - paddingSelectedRect, extrenum.max.y - paddingSelectedRect);
        this.resizeRect.p2 = new Point(extrenum.max.x + paddingSelectedRect, extrenum.min.y + paddingSelectedRect);
    }
}
