/**
 * Created by dev on 21.02.19.
 */

import ElementModificationCommand from './ElementModificationCommand';

import Group from './../../model/elements/Group';
import Point from './../../model/Point';
/**
 * The resizing command. 
 * If resize a circle the circle translates to group with four splines (ask user)
 */
export default class ChangeElementsSizeCommand extends ElementModificationCommand{

    /**
     * The list of constants for resizing by OX
     * @return {{canter: string, left: string, right: string}}
     */
    static get CONTROL_POINT_X(){
        return {
            canter:'Not resizing',
            left:"left",
            right:"right"
        };
    }

    /**
     * The list of constants for resizing by OY
     * @return {{center: string, top: string, bottom: string}}
     */
    static get CONTROL_POINT_Y(){
        return {
            center:"Not resizing",
            top: "top",
            bottom: "bottom"
        };
    }

    /**
     * @param {Document} document
     * @param {Array.<Element>} elements
     * @param {Vector} vector - the vector of bias the control point
     * @param {string} controlPointX - this is the control point position, use the ChangeElementsSizeCommand.CONTROL_POINT_X
     *     for get list of value
     * @param {string} controlPointY - this is the control point position, use the ChangeElementsSizeCommand.CONTROL_POINT_Y
     *     for get list of value
     */
    constructor(document, elements, vector , controlPointX, controlPointY){
        super(document, elements);

        /** @type {string} */
        this.controlPointX = controlPointX;

        /** @type {string} */
        this.controlPointY = controlPointY;

        /** @type {Vector} */
        this._vector=vector;

        this.name= 'ChangeElementsHeightCommand';
    }

    /**
     * @inheritDoc
     */
    executeCommand(){
        console.log(this._vector);
        let dx = this._vector.x;
        let dy = this._vector.y;


        if(this.controlPointX == ChangeElementsSizeCommand.CONTROL_POINT_X.left){
            dx = -dx;
        } else if(this.controlPointX == ChangeElementsSizeCommand.CONTROL_POINT_X.canter){
            dx=0;
        }

        if(this.controlPointY == ChangeElementsSizeCommand.CONTROL_POINT_Y.bottom){
            dy = -dy;
        } else if(this.controlPointY == ChangeElementsSizeCommand.CONTROL_POINT_Y.center){
            dy=0;
        }

        let group = new Group();

        for(let element of this.elements){
            group.addElement(element);
        }

        let center = group.getCenter();

        group.resize(dx,dy, center, group.getExtrenum());

        let dxDelta =dx/2;
        let dyDelta =dy/2;
        if(this.controlPointX == ChangeElementsSizeCommand.CONTROL_POINT_X.left){
            dxDelta = -dxDelta;
        }
        if(this.controlPointY == ChangeElementsSizeCommand.CONTROL_POINT_Y.bottom){
            dyDelta = -dyDelta;
        }
        group.move(dxDelta, dyDelta);

        
        return true;
    }
}