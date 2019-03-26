/**
 * Created by dev on 26.02.19.
 */



/**
 * The class used for generate new unique Id`s.
 */
export default class IdGenerator{
    constructor(){
        this.id=0;
    }

    /**
     * The method generate new id
     * @return {number}
     */
    generateId(){
        return this.id++;
    }
}