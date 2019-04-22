/**
 * Created by dev on 26.03.19.
 */

import Shape from './../model/elements/Shape';
import IncidenceMatrix from './../model/math/IncidenceMatrix';
import Auto from './../model/line_types/Auto';
import Bend from "../model/line_types/Bend";
import Intersect from "../model/math/algorithms/intersects/Intersect";
import Arc from "../model/elements/Arc";

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

    }

    /**
     * @param {boolean} [withBend = false]
     * @return {Array.<Shape>}
     */
    buildShapes(withBend = false){
        let elements = this.document.getListSimpleElements().filter(el=>{
            return el.lineType.name=='Auto' || (withBend && el.lineType.name=='Bend')
        });
        if(elements.length==0){
            return [];
        }
        return this.buildShapesByElements(elements, [], withBend);
    }

    /**
     * @param {Shape} shape
     * @param {boolean} [withBend=false]
     * @return {Array.<{shape:Shape, sourceElements:Array.<GraphicElement>}>}
     */
    separateShapesByIntersect(shape, withBend=false){
        let intersect = new Intersect(this.document, withBend);

        let intersection = intersect.intersectElements(shape.elements);

        let elements = [];
        for(let i of intersection){
            elements.push(...i.newElements);
        }


        let points = this.getIntersectPoints(shape, intersect);
        let shapes = this.buildShapesByElements(elements, points);

        // let res = [];
        //
        // for(let shape of shapes){
        //     let temp = {shape:shape, sourceElements:[]};
        //     for(let shapeElement of shape.elements){
        //         for(let i of intersection){
        //             for(let iElement of i.newElements){
        //                 if(iElement.compare(shapeElement)){
        //                     temp.sourceElements.push(i.originElement);
        //                 }
        //             }
        //
        //         }
        //     }
        //     res.push(temp);
        // }

        return shapes;
    }

    getIntersectPoints(shape, intersect){
        let points = [];

        let shapePoints = shape.getElementsEndPoints();
        for(let el of shape.elements){
            let temp = intersect.getIntersectPoints(el);
            m: for(let point of temp){
                for(let p of points){
                    if(p.compare(point)){
                        continue m;
                    }
                }
                for(let p of shapePoints){
                    if(p.compare(point)){
                        continue m;
                    }
                }
                points.push(point);
            }
        }

        return points;
    }

    /**
     *
     * @param {Array.<GraphicElement>} elements
     * @param {Array.<Point>} [separatePoints=[]]
     * @param {boolean} [withBend=false]
     * @return {Array.<Shape>}
     */
    buildShapesByElements(elements, separatePoints=[], withBend=false){
        if(elements.length==0){
            return [];
        }
        let res = [];
        let shapePoints=this.fillShapePoints(elements, withBend);

        if(separatePoints.length>0){
            let temp = [];
            m: for(let shapePoint of shapePoints){
                for(let separatePoint of separatePoints){
                    if(shapePoint.point.compare(separatePoint)){
                        for(let element of shapePoint.elements){
                            temp.push(new ShapePoint(shapePoint.point, element));
                        }
                        continue m;
                    }
                }
                temp.push(shapePoint);
            }
            shapePoints=temp;
        }
        
        /** @type {IncidenceMatrix} */
        let incidenceMatrix = this.createIncidenceMatrix(shapePoints);


        /** @type {Array.<Array.<number>>} */
        let connectedComponents = incidenceMatrix.getConnectedComponents();

        for(let i=0; i<connectedComponents.length; i++){
            let tempShape = new Shape();
            for(let j=0; j<connectedComponents[i].length; j++){
                for(let el of shapePoints[connectedComponents[i][j]].elements) {
                    tempShape.addElement(el);
                }
            }
            res.push(tempShape);
        }

        this.addBendsToShapes(res, this.document);
        return res;
    }

    /**
     *
     * @param {Array.<Shape>}shapes
     * @param {Document} doc
     */
    addBendsToShapes(shapes, doc){
        /** @type {Array.<LineElement>} */
        let bends = doc.getListSimpleElements().filter(el=>el.lineType instanceof Bend);
        for(let shape of shapes){
            if(shape.isClose()){
                for(let bend of bends) {
                    //todo: the method adding the bent to a few shapes (can has an error)
                    if (shape.isContain(bend.p1) && shape.isContain(bend.p2)){
                        shape.addBend(bend);
                    }
                }
            }
        }
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
     * @param {Array.<GraphicElement>} simpleElements
     * @param {boolean} [withBend=false]
     * @return {Array.<ShapePoint>}
     * @private
     */
    fillShapePoints(simpleElements, withBend=false){
        let shapePoints = [];
        for(let element of simpleElements){
            if(!(element.lineType.name == "Auto" || (withBend && element.lineType.name != "Bend"))){
                continue;
            }
            let points = element.extremePoints;
            if(points){
                for(let p of points){
                    let shapePoint = new ShapePoint(p,element);
                    shapePoints.push(shapePoint);
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