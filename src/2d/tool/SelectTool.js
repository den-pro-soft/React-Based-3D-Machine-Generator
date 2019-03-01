/**
 * Created by dev on 27.02.19.
 */
import Tool from './Tool';

/**
 * The class need for selected elements by click
 */
export default class SelectTool extends Tool{
    constructor(document){
        super(document);

        this.cursor=null;

        /**
         * @type {Array.<GraphicElement>} - the list of current selected elements (references on the document elements)
         */
        this._selectElements = [];
    }

    set document(doc){
        this._document=doc;
    }

    /**
     * The method need for selecting elements without using the tool
     * @param {GraphicElement} element
     */
    selectElement(element){
        this._selectElements.push(element);
    }

    /**
     * @param elements
     * @protected
     */
    addSelectElements(elements){
        if(!Helper.Key.ctrlKey) {
            this.clearSelectElements();
        }
        this._selectElements.push(...elements);
        app.addSelectElements(elements);
    }

    /**
     * @protected
     */
    clearSelectElements(){
        app.clearSelectElements();
        this._selectElements=[];
    }


    mouseMove(point, e){
        return super.mouseMove(point, e);
    }

    mouseDown(point, e){
        let newSelectElements = this.getNearElements(point);

        let newSelected = [];
        let newUnselected = [];

        m: for(let el of newSelectElements) {
            for(let element of app.selectElements){
                if(el.compare(element)){
                    newUnselected.push(el);
                    continue m;
                }
            }
            newSelected.push(el);
        }

        //todo: check if the element is selected remove the element from selected elements list (will not call the addSelectelements method)
        this.addSelectElements(newSelectElements);
        return true;
    }

    mouseUp(point, e){
        return true;
    }

    /**
     * @param {Point} point
     * @return {*|Array.<GraphicElement>}
     * @protected
     */
    getNearElements(point){
        let scale = container.resolve('mainBoard')._scale; //todo: maybe set from the using place
        return this._document.getNearElements(point, (scale>1?0.2:0.05)/scale);
    }
}

