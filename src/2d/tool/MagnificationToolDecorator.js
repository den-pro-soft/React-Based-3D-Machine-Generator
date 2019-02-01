/**
 * Created by dev on 31.01.19.
 */

import CreatorTool from './CreatorTool';

export default class MagnificationToolDecorator extends CreatorTool{

    /**
     * @param document
     * @param {CreatorTool} creatorTool
     */
    constructor(document, creatorTool){
        super(document);
        this._tool = creatorTool;
        this.magnitPoint = null;
    }

    set document(doc){
        this._tool.document=doc;
    }

    get document(){
        return this._tool.document;
    }

    /**
     * @inheritDoc
     */
    mouseMove(point, e){
        point = this.magnificPoint(point);
        this._selectNearElements(point);
        return this._tool.mouseMove(point, e);
    }

    /**
     * @inheritDoc
     */
    mouseDbClick(point, e){
        return this._tool.mouseDbClick(this.magnificPoint(point), e);
    }

    /**
     * @inheritDoc
     */
    mouseClick(point, e){
        return this._tool.mouseClick(this.magnificPoint(point), e);
    }

    /**
     * @inheritDoc
     */
    mouseDown(point, e){
        return this._tool.mouseDown(this.magnificPoint(point), e);
    }

    /**
     * @inheritDoc
     */
    mouseUp(point, e){
        return this._tool.mouseUp(this.magnificPoint(point), e);
    }

    render(){
        if(this.magnitPoint){
            let p = app.board._convertToLocalCoordinateSystem(this.magnitPoint);
            let d = 4;
            let p1 = {x:p.x-d,y:p.y-d};
            let p2 = {x:p.x+d,y:p.y+d};
            app.board.style('fillStyle','#000000');
            app.board._drawRect(p1,p2,true);
        }
        return this._tool.render();
    }

    selectElement(element){
        return this._tool.selectElement(element);
    }


    setSelectElements(elements){
        return this._tool.setSelectElements(elements);
    }

    magnificPoint(point){
        let nearPoint = this._getNearPoint(point);
        this.magnitPoint=nearPoint;
        if(nearPoint && point.distanceTo(nearPoint)<this.Eps*3){
            point = nearPoint.copy();
        }
        return point
    }

    /**
     * @param {Point} point
     * @private
     */
    _getNearPoint(point){
        let elements = app.currentDocument.getListSimpleElements();
        let polyLines = elements.reduce((res,el)=>[...res,...el.toPolyLines()],[]);
        let points = polyLines.reduce((res,el)=>[...res,...el.points],[]);
        if(points.length>0) {
            let min = points[0];
            let mind = point.distanceTo(min);
            for(let i=1; i<points.length; i++){
                let d = point.distanceTo(points[i]);
                if(mind>d){
                    min=points[i];
                    mind=d;
                }
            }
            return min;
        }
        return null;
    }
    
    _selectNearElements(point){
        let _elements = this._document.getNearElements(point, this.Eps);
        for(let element of _elements){
            element._renderer.setFocus(true);
        }
    }

    get Eps(){
        let scale = container.board._scale; //todo: container
        return (scale>1?0.2:0.05)/scale;
    }
}