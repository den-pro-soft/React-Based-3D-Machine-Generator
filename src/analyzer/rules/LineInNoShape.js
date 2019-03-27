/**
 * Created by dev on 22.03.19.
 */

import Rule from './../Rule';
import RemoveElementSolution from './../solutions/RemoveElement';
import ShapeBuilder from './../ShapeBuilder';


let id=0;

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
        this.shapeBuilder = new ShapeBuilder(this.document);
        let shapes = this.shapeBuilder.buildShapes();
        for(let shape of shapes){
            if(shape.elements.length==1){
                res.push(new RemoveElementSolution(this.document, shape.elements[0]));
            }
        }

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
}
