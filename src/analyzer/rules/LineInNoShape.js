/**
 * Created by dev on 22.03.19.
 */

import Rule from './../Rule';
import RemoveElementSolution from './../solutions/RemoveElement';
import ShapeBuilder from './../ShapeBuilder';

export default class LineInNoShape extends Rule{

    /**
     *
     * @param {Document} document
     */
    constructor(document){
        super(document);
    }


    /**
     * @return {Array.<Solution>}
     */
    createSolutions(){
        let res = super.createSolutions();
        res.push(this.createRemoveElementSolution());
        return res;
    }


    /**
     * @return {boolean} - true if the document has an error
     */
    check(){
        this.shapeBuilder = new ShapeBuilder(this.document);
        let shapes = this.shapeBuilder.buildShapes();
        for(let shape of shapes){
            if(shape.elements.length==1){
                return true;
            }
        }
        return false;
    }

    /**
     * @return {Solution}
     * @private
     */
    createRemoveElementSolution(){
        let line = this.getLineByDocument(this.document);

        let previewDoc = this.document.getSnapshot();
        let line2 = this.getLineByDocument(previewDoc);
        previewDoc.removeElement(line2);

        return new RemoveElementSolution(this.document, line, previewDoc);
    }


    /**
     *
     * @param {Document} document
     * @return {GraphicElement|null}
     * @private
     */
    getLineByDocument(document){
        this.shapeBuilder = new ShapeBuilder(document);
        let shapes = this.shapeBuilder.buildShapes();
        for(let shape of shapes){
            if(shape.elements.length==1){
                return shape.elements[0];
            }
        }
        return null;
    }
}
