/**
 * Created by dev on 22.03.19.
 */

import NoChangesSolution from './solutions/NoChanges';


/**
 * The class is class for checking the {@class Document} for the correctness of the model.
 * Main function of the class is generation a {@class Solution} objects for solution the problem.
 * @abstract
 */
export default class Rule{

    /**
     * 
     * @param {Document} document
     */
    constructor(document){
        this.document = document;
    }

    /**
     * @return {boolean} - true if the document has an error
     */
    check(){
        throw new Exception(`The method doesn't have implementation.`);
    }


    /**
     * @return {Array.<Solution>}
     */
    createSolutions(){
        return [
            new NoChangesSolution(this.document)
        ];
    }
}