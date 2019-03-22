/**
 * Created by dev on 22.03.19.
 */

import Rule from './../Rule';
import RemoveElementSolution from './../solutions/RemoveElement';


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
        res.push(new RemoveElementSolution(this.document));
        return res;
    }


    /**
     * @return {boolean} - true if the document has an error
     */
    check(){
        return this.document._elements.length==0;
    }
}
