/**
 * Created by dev on 22.03.19.
 */

import Rule from './../Rule';
import RemoveElementSolution from './../solutions/RemoveElement';
import ShapeBuilder from './../ShapeBuilder';

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
}
