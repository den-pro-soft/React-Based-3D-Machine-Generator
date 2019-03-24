/**
 * Created by dev on 08.02.19.
 */

import CreatorTool from '../CreatorTool';
import Text from '../../../../model/elements/Text';

export default class TextTool extends CreatorTool{
    constructor(document){
        super(document);

        this.cursor.src = 'resources/images/Text.png';
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
        
    }

    /**
     * @param {Point} point
     * @param {MouseEvent} e
     * @return {boolean} false if not changing anyGraphicElement GraphicElement
     */
    mouseDown(point, e){
        return true;
    }

    /**
     * @param {Point} point
     * @param {MouseEvent} e
     * @return {boolean} false if not changing any GraphicElement
     */
    mouseUp(point, e){
        this.addElementToDocument(new Text(point, ""));
        return true;
    }
    
}