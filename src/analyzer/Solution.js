/**
 * Created by dev on 22.03.19.
 */

/**
 * The class is need 
 * @abstract
 */
export default class Solution{

    /**
     * @param {Document} document
     */
    constructor(document){
        this.document = document;
        this.name = "Solution name";
    }

    /**
     * The method change the document with using a {@class Command} 
     */
    execute(){
        
    }
}