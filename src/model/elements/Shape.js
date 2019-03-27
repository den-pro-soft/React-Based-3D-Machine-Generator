/**
 * Created by dev on 26.03.19.
 */


/**
 * The class need for consolidation the operations with shapes.
 */
export default class Shape{


    constructor(){

        /** @type Array.<GraphicElement>} */
        this.elements = [];

    }

    addElement(element){
        for(let el of this.elements){
            if(el.compare(element)){
                return;
            }
        }

        this.elements.push(element);
    }


    /**
     * @param {GraphicElement} element
     * @return {boolean}
     */
    isHas(element){
        for(let el of this.elements){
            if(el.compare(element)){
                return true;
            }
        }
        return false;
    }

    /**
     * @return {boolean}
     * @throws {Exception} - if the shape has less than two elements
     */
    isClose(){
        if(this.elements.length<2){
            throw new Exception("Shape can'\t has less than two elements!", this);
        }


    }


}