/**
 * Created by dev on 26.03.19.
 */

import Shape from './../model/elements/Shape';


class ShapePoint{
    /**
     *
     * @param {Point} point
     * @param {GraphicElement} element
     */
    constructor(point, element){
        this.point=point;

        /** @type Array.<GraphicElement> }*/
        this.elements = [element];

        this.isCrossPoint=false;
    }

    removeElement(element){
        for(let i=0; i<this.elements.length; i++){
            if(this.elements[i].compare(element)){
                this.elements.splice(i,1);
                return;
            }
        }
    }

}


/**
 * The class need for building the {@class Shape}`s by the {@class Document} data structure
 */
export default class ShapeBuilder{
    /**
     * @param {Document} document
     */
    constructor(document){
        this.document=document;

        /**  @type Array.<ShapePoint>} */
        this.shapePoints= [];
    }

    /**
     * @return {Array.<Shape>}
     */
    buildShapes(){
        let res = [];

        this.shapePoints=[];
        this.fillShapePoints();
        res.push(...this.getHangingShapes());
        this.shapePoints = this.shapePoints.filter(point=>point.elements.length>1);

        //todo: there only circular shapePoints


        return res;
    }


    getHangingShapes(){
        let endPoints = this.getEndPoints();
        let res = [];
        for(let endPoint of endPoints){
            let tempShape = new Shape();
            this.buildShapeByHandingPoint(endPoint, tempShape);
            res.push(tempShape);
        }
        res = res.filter(shape=>shape.elements.length>0);
        return res;
    }


    removeShapePoint(shapePoint){
        for(let i=0; i<this.shapePoints.length; i++){
            if(this.shapePoints[i]==shapePoint){
                this.shapePoints.splice(i,1);
                return;
            }
        }
    }

    /**
     *
     * @param {ShapePoint} shapePoint
     * @param {Shape} shape
     */
    buildShapeByHandingPoint(shapePoint, shape){

        let element = shapePoint.elements[0];
        if(!element){
            return;
        }
        shape.addElement(element);

        let points = element.extremePoints;

        if(shapePoint.point.compare(points[0])){
            this.removeShapePoint(shapePoint);
            shapePoint = this.getShapePointByPoint(points[1]);
        }else{
            shapePoint = this.getShapePointByPoint(points[0]);
        }
        shapePoint.removeElement(element);
        if(shapePoint.elements.length==1 && !shapePoint.isCrossPoint){
            this.buildShapeByHandingPoint(shapePoint, shape);
        }else{
            shapePoint.isCrossPoint = true;
        }

    }



    /***
     * @return {Array.<ShapePoint>}
     * @private
     */
    getEndPoints(){
        return this.shapePoints.filter(shapePoint=>shapePoint.elements.length==1);
    }

    /**
     * @private
     */
    fillShapePoints(){
        let simpleElements = this.document.getListSimpleElements();

        for(let element of simpleElements){
            let points = element.extremePoints;
            if(points){
                for(let p of points){
                    let shapePoint = this.getShapePointByPoint(p);
                    if(shapePoint){
                        shapePoint.elements.push(element);
                    }else{
                        shapePoint = new ShapePoint(p,element);
                        this.shapePoints.push(shapePoint);
                    }
                }
            }else {
                //todo: check type of element
            }
        }
    }

    /**
     * @param {Point} point
     * @return {ShapePoint| null} - null if the builder doesn't have the ShapePint
     * @private
     */
    getShapePointByPoint(point){
        for(let p of this.shapePoints){
            if(point.compare(p.point)){
                return p;
            }
        }
        return null;
    }
}