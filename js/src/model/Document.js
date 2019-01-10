/**
 * Created by dev on 04.01.19.
 */


import Exception from '../Exception';
import Element from './Element';

export default class Document{
    constructor(){
        this._elements = [];
    }

    /**
     * @param {Element} element
     */
    addElement(element){
        if(element instanceof Element) {
            this._elements.push(element);
        }else{
            throw new Exception("To document can be added only elements which instances Element class.");
        }
    }

    /**
     * Call render methods for add elements
     */
    render(){
        for(let element of this._elements){
            element.render();
        }
    }

    getSnapshot(){
        throw new Exception("The method doesn't hae implementation");
    }

    load(snapshot){
        throw new Exception("The method doesn't hae implementation");
    }
}