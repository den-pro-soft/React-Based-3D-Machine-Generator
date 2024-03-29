/**
 * Created by dev on 14.03.19.
 */

import Tool from './../Tool';

/**
 * The class need for preprocessing tool mouse events. The class can transformation mouse position and
 * rendering of the tool.
 */
export default class MagnificationDecorator extends Tool{

    /**
     * @param document
     * @param {Tool} tool
     */
    constructor(document, tool){
        super(document);

        /** @type {Tool} */
        this._tool = tool;
    }


    /**
     * @param {Document} doc
     */
    set document(doc){
        this._tool.document=doc;
    }

    /**
     * @return {Document}
     */
    get document(){
        return this._tool.document;
    }

    /**
     * @return {Tool}
     */
    get tool(){
        return this._tool;
    }

    /**
     * @param {Tool} tool
     */
    set tool(tool){
        this._tool = tool;
    }


    /**
     * @inheritDoc
     */
    mouseMove(point, e){
        super.mouseMove(point,e);
        return this.tool.mouseMove(point, e);
    }

    /**
     * @inheritDoc
     */
    mouseDbClick(point, e){
        return this.tool.mouseDbClick(point, e);
    }

    /**
     * @inheritDoc
     */
    mouseClick(point, e){
        return this.tool.mouseClick(point, e);
    }

    /**
     * @inheritDoc
     */
    mouseDown(point, e){
        return this.tool.mouseDown(point, e);
    }

    /**
     * @inheritDoc
     */
    mouseUp(point, e){
        return this.tool.mouseUp(point, e);
    }


    /**
     * @inheritDoc
     */
    render(){
        return this.tool.render();
    }

    /**
     * @param {Point} point
     * @param {string} color - the canvas style color
     * @param {number} [diameter=4] - the diameter of point
     */
    renderPoint(point, color, diameter=4){
        let board = container.resolve('mainBoard');

        let p = board._convertToLocalCoordinateSystem(point);
        let p1 = {x:p.x-diameter,y:p.y-diameter};
        let p2 = {x:p.x+diameter,y:p.y+diameter};
        board.style('fillStyle',color);
        board._drawRect(p1,p2,true);
    }


    /**
     * @return {number}
     */
    get Eps(){
        let scale = container.resolve('mainBoard')._scale; //todo: maybe set from the using place
        return (scale>1?0.2:0.05)/scale;
    }
}