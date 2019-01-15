/**
 * Created by dev on 15.01.19.
 */

import Element from './../../../model/Element';

export default class Transformer{
    constructor(document){
        this.document = document;
        this._elements = [];

        this.board = container.board; //todo: container

        this._drag = false;
    }

    /**
     * @param {Array.<Element>} elements
     */
    addElements(elements){
        for(let element of elements) {
            this._elements.push(element);
        }
    }

    /**
     * @param {Element} element
     */
    removeElement(element){
        for(let i=0; i<this._elements.length; i++){
            if(this._elements[i].compare(element)){
                this._elements.splice(i,1);
                return ;
            }
        }
    }

    /**
     * @param {Point} point
     * @return {boolean} - false if transformer do some work
     */
    mouseDown(point){
        this._drag=false;
    }

    /**
     * @param {Point} point
     * @return {boolean} - false if transformer do some work
     */
    mouseUp(point){
        return !this._drag;
    }

    /**
     * @param {Point} point
     * @return {boolean} - false if transformer do some work
     */
    mouseMove(point){
        this._drag = true;
    }

    render(){

    }
}