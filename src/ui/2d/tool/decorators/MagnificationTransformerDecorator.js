/**
 * Created by dev on 14.03.19.
 */


import MagnificationDecorator from './MagnificationDecorator';
import Point from '../../../../model/Point';
import Matrix from '../../../../model/math/Matrix';
import ResizeTransformer from './../transformer/ResizeTransformer';

/**
 * The decorator shows the near points
 */
export default class MagnificationTransformerDecorator extends MagnificationDecorator{

    /**
     * @param document
     * @param {PointerTool} tool
     */
    constructor(document, tool){
        super(document, tool);

        this.magnitPoint = null;

        this.isMouseDown = false;

        /** @type {Point}*/
        this.anotherPoint = null;

        /** @type {Point}*/
        this.selectPoint = null;
        
        this.dx=0;
        this.dy=0;

        this.mousePosition=null;
    }

    /**
     * @inheritDoc
     */
    mouseMove(point, e){
        if(this.isMouseDown && this.tool.transformer  && this.tool.transformer._downPosition){
            this.dx += point.x-this.mousePosition.x;
            this.dy += point.y-this.mousePosition.y;

            this.mousePosition = point.copy();
            let pointPair = this._getPointPair();
            this.selectPoint = pointPair.select;
            this.anotherPoint = pointPair.another;
            if (this.selectPoint && this.anotherPoint) {
                if (this.selectPoint.distanceTo(this.anotherPoint) < this.Eps * 3) {
                    point.x += (this.anotherPoint.x-this.selectPoint.x);
                    point.y += (this.anotherPoint.y-this.selectPoint.y);
                    this.selectPoint=this.anotherPoint;
                }
            }
        }
        return this.tool.mouseMove(point, e);
    }

    /**
     * @inheritDoc
     */
    mouseDbClick(point, e){
        return super.mouseDbClick(point, e);
    }

    /**
     * @inheritDoc
     */
    mouseClick(point, e){
        return super.mouseClick(point, e);
    }

    /**
     * @inheritDoc
     */
    mouseDown(point, e){
        this.mousePosition = point;
        this.isMouseDown = true;
        return super.mouseDown(point, e);
    }

    /**
     * @inheritDoc
     */
    mouseUp(point, e){
        this.isMouseDown = false;
        this.dx=0;
        this.dy=0;
        this.selectPoint=null;
        this.anotherPoint=null;
        return super.mouseUp(point, e);
    }


    /**
     * @inheritDoc
     */
    render(){
        this.tool.render();

        if(this.anotherPoint && this.selectPoint && this.tool.transformer instanceof ResizeTransformer && !this.tool.transformer.activeControllPoint) {
            if (this.selectPoint.compare(this.anotherPoint)) {
                this.renderPoint(this.anotherPoint, '#ff0000',5);
            } else {
                this.renderPoint(this.anotherPoint, '#000000');
                this.renderPoint(this.selectPoint, '#ff641a');
            }
        }


    }

    _getPointPair(){
        if(!this._document){
            return;
        }

        let selectedElements = app.selectElements;
        let anotherElements =[];
        m: for(let el of this._document._elements){
            for(let selectElement of selectedElements){
                if(selectElement.compare(el)){
                    continue m;
                }
            }
            anotherElements.push(el);
        }

        let selectPoints = this.getMagnitPointsForElements(selectedElements);
        let anotherPoints =  this.getMagnitPointsForElements(anotherElements);
        if(selectPoints.length>0 && anotherPoints.length>0) {
            return this._getClosestPairOfPoints(selectPoints, anotherPoints);
        }else{
            return {select:null, another:null};
        }
    }

    /**
     *
     * @param {Array.<Point>} selectPoints
     * @param {Array.<Point>} anotherPoints
     * @return {Array.<{select:Point, another:Point}>}
     * @private
     */
    _getClosestPairOfPoints(selectPoints, anotherPoints){

        let matrix = Matrix.createMoveMatrix(this.dx, this.dy);

        selectPoints = selectPoints.map(point=>{
            let p = point.copy();
            p.changeByMatrix(matrix);
            return p;
        });


        let res = {select:selectPoints[0], another:anotherPoints[0]};

        let minLength = selectPoints[0].distanceTo(anotherPoints[0]);

        for(let i=0; i<selectPoints.length; i++){
            for(let j=0; j<anotherPoints.length; j++){
                let tempLength =selectPoints[i].distanceTo(anotherPoints[j]);
                if(minLength>tempLength){
                    minLength=tempLength;
                    res = {select:selectPoints[i], another:anotherPoints[j]};
                }
            }
        }

        return {select:res.select.copy(), another:res.another.copy()};
    }


    /**
     *
     * @param {Array.<GraphicElement>} elements
     * @return {Array.<Point>}
     */
    getMagnitPointsForElements(elements){
        return elements.reduce((res,el)=>[...res,...el.getMagnificationPoints()],[]);
    }

    selectElement(element, addToApp=true){
        return this.tool.selectElement(element, addToApp);
    }

    setSelectElements(elements){
        return this.tool.setSelectElements(elements);
    }


    clearSelectElements(clearApp=true){
        return this.tool.clearSelectElements(clearApp);
    }

}