/**
 * Created by dev on 28.02.19.
 */

import SelectTool from './SelectTool';

/**
 * @inheritDoc
 */
export default class DynamicChangeTool extends SelectTool{
    constructor(document){
        super(document);

        /** @type {Array.<{original:GraphicElement, copy:GraphicElement}>}*/
        this.selectElementsPair = [];

        /** @type {number} - the delta changing. */
        this.dx = 0;

        /** @type {number} - the delta changing */
        this.dy = 0;

        /** @type {Point|null} - the position when mouse was done, null if mouse was up */
        this.mouseDownPosition = null;
    }

    /**
     * The method need for selecting elements without using the tool
     * @param {GraphicElement} element
     * @return {{original:GraphicElement, copy:GraphicElement}}
     */
    selectElement(element, addToApp=true){
        super.selectElement(element, addToApp);
        this.selectElementsPair.push({original:element, copy:element.copy()});
    }

    /**
     *
     * @param {Array.<GraphicElement>} elements
     * @protected
     */
    addSelectElements(elements){
        super.addSelectElements(elements);
        for(let element of elements) {
            this.selectElementsPair.push({original: element, copy: element.copy()});
        }
    }

    /**
     * @protected
     */
    clearSelectElements(clearApp=true){
        super.clearSelectElements(clearApp);
        this.selectElementsPair=[];
    }

    /**
     * 
     * @param {Point} point
     * @protected
     */
    selectNearElements(point){
        for(let element of this.getNearElements(point)){
            element._renderer.setFocus(true);
        }
    }

    /**
     * @param {Point} point
     * @param {MouseEvent} e
     * @return {boolean} false if not changing any GraphicElement
     */
    mouseMove(point, e){
        this.dx= point.x - this.mousePosition.x;
        this.dy= point.y - this.mousePosition.y;
        super.mouseMove(point, e);
        return true;
    }

    /**
     * @inheritDoc
     */
    mouseUp(point, e){
        this.dx = 0;
        this.dy = 0;
        this.mouseDownPosition=0;
        return super.mouseUp(point, e);
    }

    /**
     * @inheritDoc
     */
    mouseDown(point, e){
        this.mouseDownPosition=point;
        return super.mouseDown(point, e);
    }

    /**
     * @inheritDoc
     */
    render(){
        for(let element of this.selectElementsPair){
            let el = element.copy;
            el._renderer.setFocus(true);
            el.render();
        }
        super.render();
    }
}