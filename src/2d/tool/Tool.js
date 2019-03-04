/**
 * Created by dev on 09.01.19.
 */

import Renderable from './../Renderable';
import Document from '../../model/Document';
import Point from '../../model/Point';
import Cursor from './Cursor';



export default class Toll extends Renderable{
    /**
     * @param {Document} document
     */
    constructor(document){
        super();
        this._document = document;
        this.cursor = new Cursor();

        this.mousePosition = new Point(0,0,0);
    }

    set document(doc){
        this._document=doc;
    }

    get document(){
        return this._document;
    }

    /**
     * @param {Point} point
     * @param {MouseEvent} e
     * @return {boolean} false if not changing any GraphicElement
     */
    mouseMove(point, e){
        this.mousePosition=point;
        return false;
    }

    /**
     * @param {Point} point
     * @param {MouseEvent} e
     * @return {boolean} false if not changing any GraphicElement
     */
    mouseDbClick(point, e){
        throw new Exception("The method doesn't have implementation");
    }

    /**
     * @param {Point} point
     * @param {MouseEvent} e
     * @return {boolean} false if not changing any GraphicElement
     */
    mouseClick(point, e){
        throw new Exception("The method doesn't have implementation");
    }

    /**
     * @param {Point} point
     * @param {MouseEvent} e
     * @return {boolean} false if not changing anyGraphicElement GraphicElement
     */
    mouseDown(point, e){
        throw new Exception("The method doesn't have implementation");
    }

    /**
     * @param {Point} point
     * @param {MouseEvent} e
     * @return {boolean} false if not changing any GraphicElement
     */
    mouseUp(point, e){
        throw new Exception("The method doesn't have implementation");
    }

    //todo: remove. because the method contain only in SelectTool
    selectElement(element){
        throw new Exception("The selectElement method doesn't have implementation");
    }

    //todo: remove. because the method contain only in SelectTool
    setSelectElements(elements){
        throw new Exception("The setSelectElements method doesn't have implementation");
    }

    /**
     * @inheritDoc
     */
    render(){
        if(this.cursor) {
            this.cursor.render(this.mousePosition);
        }
    }
}