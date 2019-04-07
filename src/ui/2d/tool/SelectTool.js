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
     * @param {boolean} [addToApp=true]  
     */
    selectElement(element, addToApp=true){
        this._selectElements.push(element);
        if(addToApp) {
            app.addSelectElements([element]);
        }
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
    clearSelectElements(clearApp=true){
        if(clearApp) {
            app.clearSelectElements();
        }
        this._selectElements=[];
    }


    mouseMove(point, e){
        return super.mouseMove(point, e);
    }

    /**
     *
     * @param point
     * @param e
     * @return {boolean} true if was selected any element
     */
    mouseDown(point, e){
        let res = this.selectElementByMouseDown(point);
        if(!res){
            if(!Helper.Key.ctrlKey) {
                this.clearSelectElements();
            }
        }

        return res;
    }

    selectElementByMouseDown(point){
        let newSelectElements = this.getNearElements(point);

        if(newSelectElements.length!=0) {
            let newSelected = [];
            let newUnselected = [];

            m: for (let el of newSelectElements) {
                for (let element of app.selectElements) {
                    if (el.compare(element)) {
                        newUnselected.push(el);
                        continue m;
                    }
                }
                newSelected.push(el);
            }

            //todo: check if the element is selected remove the element from selected elements list (will not call the addSelectelements method)
            if (newSelected.length > 0) {
                this.addSelectElements(newSelected);
                return true;
            }
        }
        return false;
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

