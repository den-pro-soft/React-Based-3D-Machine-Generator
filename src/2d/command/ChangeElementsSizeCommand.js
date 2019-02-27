/**
 * Created by dev on 21.02.19.
 */

import ElementModificationCommand from './ElementModificationCommand';

import Group from './../../model/elements/Group';
import Arc from './../../model/elements/Arc';
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
     * @param {boolean} convertCircleToSplines - if is true all Ars will be transformation to list of splines,
     *     if is false and selected some Arc then will be throw Exception
     */
    constructor(document, elements, vector , controlPointX, controlPointY, convertCircleToSplines=false){
        super(document, elements);

        /** @type {string} */
        this.controlPointX = controlPointX;

        /** @type {string} */
        this.controlPointY = controlPointY;

        /** @type {Vector} */
        this._vector=vector;

        /** @type {boolean} */
        this.convertCircleToSplines = convertCircleToSplines;

        this.newElements = [];

        this.name= 'ChangeElementsHeightCommand';
    }


    /**
     * @inheritDoc
     */
    isReplacedElements(){
        return true;
    }

    /**
     * @inheritDoc
     */
    getReplaceElements(){
        return this.newElements;
    }



    /**
     * @inheritDoc
     */
    executeCommand(){
        let dx = this._vector.x;
        let dy = this._vector.y;

        let elements = this._changeArcsToSplines();

        this.newElements = elements;

        if(this.controlPointX == ChangeElementsSizeCommand.CONTROL_POINT_X.left){
            dx = -dx;
        }

        if(this.controlPointY == ChangeElementsSizeCommand.CONTROL_POINT_Y.bottom){
            dy = -dy;
        }

        if(this.controlPointX == ChangeElementsSizeCommand.CONTROL_POINT_X.canter){
            dx=0;
        }
        if(this.controlPointY == ChangeElementsSizeCommand.CONTROL_POINT_Y.center){
            dy=0;
        }

        let group = new Group();

        for(let element of elements){
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

    _changeArcsToSplines(){
        let res = [];

        let isChanged=false;

        for(let el of this.elements){
            if(el instanceof Arc){
                if(!this.convertCircleToSplines){
                    throw new Exception('You cannot perform this operation with the Arc highlighted and the ' +
                        'convertCircleToSplines flag cleared.', this);
                }
                this._document.removeElement(el);
                let group = new Group();
                let splines = el.convertToSplines();
                for(let spline of splines){
                    group.addElement(spline);
                }
                el=group;
                this._document.addElement(el);
                isChanged=true;
            }else if(el instanceof Group){
                 isChanged|=this._changeArcsToSplinesInGroup(el);
            }
            res.push(el);
        }

        return res;
    }

    /**
     * @param {Group} group
     * @private
     */
    _changeArcsToSplinesInGroup(group){

        //todo: the code has a bug. If use it for group -> group -> element
        let res = false;
        for(let el of group.elements){
            if(el.typeName == 'Arc'){
                if(!this.convertCircleToSplines){
                    throw new Exception('You cannot perform this operation with the Arc highlighted and the ' +
                        'convertCircleToSplines flag cleared.', this);
                }
                console.log(group, 'before er');
                group.removeElement(el);
                let group = new Group();
                let splines = el.convertToSplines();
                for(let spline of splines){
                    group.addElement(spline);
                }
                el=group;
                group.addElement(el);
                res=true;
            }else {
                if (el.typeName == 'Group') {
                    console.log("s group");
                    res|=this._changeArcsToSplinesInGroup(el);
                }
            }
        }
        return res;
    }
}