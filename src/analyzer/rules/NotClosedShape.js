/**
 * Created by dev on 22.03.19.
 */

import Rule from './../Rule';
import RemoveElementSolution from './../solutions/RemoveElement';
import ShapeBuilder from './../ShapeBuilder';
import Exception from "../../Exception";
import LineElement from "../../model/elements/LineElement";
import AddConnectLine from "../solutions/AddConnectLine";
import Line from "../../model/math/Line";

export default class NotClosedShape extends Rule{

    /**
     *
     * @param {Document} document
     */
    constructor(document){
        super(document);
        this.errorMessage = `Error: The indicated shape is not closed.
            Every line you draw must be part of a closed shape will no open ends or gaps. `;
    }


    /**
     * @return {Array.<Solution>}
     */
    createSolutions(){
        let res = super.createSolutions();

        res[0].previewDocument = this.document.getSnapshot();
        let redElements = this.getLineByDocument(res[0].previewDocument);
        for(let redElement of redElements) {
            redElement._renderer.error = true;
        }

        res.push(this.createAddElementSolution());
        res.push(this.createRemoveElementSolution());
        return res;
    }


    /**
     * @return {boolean} - true if the document has an error
     */
    check(){
        this.shapeBuilder = new ShapeBuilder(this.document);
        return this.getLineByDocument(this.document)!=null;
    }

    /**
     * @return {Solution}
     * @private
     */
    createRemoveElementSolution(){
        let elements = this.getLineByDocument(this.document);

        let previewDoc = this.document.getSnapshot();
        let removeElements = this.getLineByDocument(previewDoc);
        for(let removeElement of removeElements) {
            previewDoc.removeElement(removeElement);
        }

        return new RemoveElementSolution(this.document, elements, previewDoc);
    }


    /**
     *
     * @param {Document} document
     * @return {Array.<GraphicElement>|null}
     * @private
     */
    getLineByDocument(document){
        this.shapeBuilder = new ShapeBuilder(document);
        let shapes = this.shapeBuilder.buildShapes();
        if(shapes.length>0){
            for(let shape of shapes){
                if(!shape.isClose()){
                    return shape.elements;
                }
            }
        }
        return null;
    }

    /**
     * @return {Solution}
     * @private
     */
    createAddElementSolution(){
        this.shapeBuilder = new ShapeBuilder(this.document);
        let shapes = this.shapeBuilder.buildShapes().filter(shape=>!shape.isClose());
        if(shapes.length>0){
            if(shapes.length>1){
                let points = [];
                for(let shape of shapes) {
                    points.push(...shape.getExtremePoints());
                }
                let minLength = new Line(points[0], points[1]).length();
                let element = new LineElement(points[0], points[1]);
                for(let i=0; i<points.length-1; i++){
                    for(let j=i+1; j<points.length; j++){
                        let tempLength = new Line(points[i], points[j]).length();
                        if(minLength>tempLength){
                            minLength=tempLength;
                            element = new LineElement(points[i], points[j]);
                        }
                    }
                }
                return new AddConnectLine(this.document, element);
            }else{
                let points = shapes[0].getExtremePoints();
                if(points.length==2){
                    let element = new LineElement(points[0], points[1]);
                    return new AddConnectLine(this.document, element);
                }else{
                    throw new Exception("Shape can't has more then two extreme points!", shape);
                }
            }
        }
        throw new Exception("The document hasn't not closed shapes!", this.document);
    }
}
