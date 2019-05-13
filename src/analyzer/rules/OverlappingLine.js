/**
 * Created by dev on 25.04.19.
 */

import Rule from './../Rule';
import RemoveElementSolution from './../solutions/RemoveElement';
import ShapeBuilder from './../ShapeBuilder';

import Arc from './../../model/elements/Arc';
import LineElement from "../../model/elements/LineElement";
import Merge from "../solutions/Merge";
import Vector from "../../model/math/Vector";
import Auto from "../../model/line_types/Auto";

export default class OverlappingLine extends Rule{

    /**
     *
     * @param {Document} document
     */
    constructor(document){
        super(document);
        this.errorMessage = `Message: The highlighted lines are colinear and overlapping. Correct automatically?`;
    }


    /**
     * @return {Array.<Solution>}
     */
    createSolutions(){
        let res = super.createSolutions();

        res[0].previewDocument = this.document.getSnapshot();
        let elements = this.getOverlappingLineByDocument(res[0].previewDocument);
        for(let el of elements){
            el._renderer.error = true;

        }

        res.push(this.createMergeSolution());

        return res;
    }


    /**
     * @return {boolean} - true if the document has an error
     */
    check(){
        return this.getOverlappingLineByDocument(this.document)!=null;
    }


    createMergeSolution(){
        let lines = this.getOverlappingLineByDocument(this.document);
        let res = new Merge(this.document, lines);

        res.previewDocument = this.document.getSnapshot();
        let elements = this.getOverlappingLineByDocument(res.previewDocument);
        for(let el of elements){
            el._renderer.error = true;

        }
        return res;
    }


    /**
     *
     * @param {Document} document
     * @return {Array.<GraphicElement>|null}
     * @private
     */
    getOverlappingLineByDocument(document){
        let lines = document.getListSimpleElements().filter((el)=>(el instanceof LineElement) && (el.lineType instanceof Auto));

        for(let i=0; i<lines.length; i++){
            for(let j=0; j<lines.length; j++){
                if(i!=j && lines[i].isOverlapping(lines[j])){
                    return [lines[i], lines[j]];
                }
            }
        }

        return null;
    }
}
