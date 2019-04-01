/**
 * Created by dev on 26.03.19.
 */

import Shape from './../model/elements/Shape';
import IncidenceMatrix from './../model/math/IncidenceMatrix';
import Auto from './../model/line_types/Auto';

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

        this.isColapsed=false;
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

        this.shapePoints=this.fillShapePoints(this.document);

        /** @type {IncidenceMatrix} */
        let incidenceMatrix = this.createIncidenceMatrix(this.shapePoints);

        /** @type {Array.<Array.<number>>} */
        let connectedComponents = incidenceMatrix.getConnectedComponents();

        for(let i=0; i<connectedComponents.length; i++){
            let tempShape = new Shape();
            for(let j=0; j<connectedComponents[i].length; j++){
                for(let el of this.shapePoints[connectedComponents[i][j]].elements) {
                    tempShape.addElement(el);
                }
            }
            res.push(tempShape);
        }
        return res;
    }

    /**
     * @param {Array.<ShapePoint>} shapePoints
     * @return {IncidenceMatrix}
     */
    createIncidenceMatrix(shapePoints){
        let res = new Array(shapePoints.length);

        for (let i=0; i<shapePoints.length; i++){
            res[i] = new Array(shapePoints.length);
            for (let j=0; j<shapePoints.length; j++){
                res[i][j]=false;
            }
            for(let el of shapePoints[i].elements){
                let exPoints = el.extremePoints;
                let anotherPoint = exPoints[0];
                if(anotherPoint.compare(shapePoints[i].point)){
                    anotherPoint = exPoints[1];
                }

                for (let j=0; j<shapePoints.length; j++){
                    if(shapePoints[j].point.compare(anotherPoint)){
                        for(let anotherElement of shapePoints[j].elements){
                            if(anotherElement.compare(el)){
                                res[i][j]=true;
                            }
                        }
                    }
                }


            }
        }
        return new IncidenceMatrix(res);
    }

    /**
     * @param {Document} doc
     * @return {Array.<ShapePoint>}
     * @private
     */
    fillShapePoints(doc){
        let simpleElements = doc.getListSimpleElements();
        let shapePoints = [];
        for(let element of simpleElements){
            if(element.lineType.name != "Auto"){
                continue;
            }
            let points = element.extremePoints;
            if(points){
                for(let p of points){
                    shapePoints.push(new ShapePoint(p,element));
                }
            }else {
                //todo: check type of element
            }
        }
        let tempShapePoints = [];
        for(let i=0; i<shapePoints.length; i++){
            if(shapePoints[i].isColapsed){
                continue;
            }
            let countPoint = 0;
            for(let j=0; j<shapePoints.length; j++){
                if(shapePoints[i].point.compare(shapePoints[j].point)){
                    countPoint++;
                }
            }
            if(countPoint==2){
                let indexAnotherPoint = -1;
                for(let j=0; j<shapePoints.length; j++){
                    if(shapePoints[i].point.compare(shapePoints[j].point) && j!=i){
                        indexAnotherPoint=j;
                    }
                }
                shapePoints[i].elements.push(shapePoints[indexAnotherPoint].elements[0]);
                shapePoints[indexAnotherPoint].isColapsed = true;
                shapePoints[i].isColapsed = true;
            }
            tempShapePoints.push(shapePoints[i]);
        }
        return tempShapePoints;
    }

}