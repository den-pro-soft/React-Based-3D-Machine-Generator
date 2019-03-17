/**
 * Created by dev on 30.01.19.
 *
 */

import { Injectable} from 'container-ioc';
import AutoLineType from './model/line_types/Auto';
import CommentToSelfLineType from './model/line_types/CommentToSelf';
import BendLineType from './model/line_types/Bend';
import CommentToMachineLineType from './model/line_types/CommentToMachine';

import Observable from './Observable';

/**
 * You should not use this class for data exchange between modules.
 * The class need only for saving the global config.
 *
 * The config will be used for saving and reproducing user context.
 *
 * Maybe in perspective it will be Redux storage
 *
 * Provides events:
 * 1. change - when change some property, data is propertyName
 */
@Injectable()
export default class Config extends Observable{
    constructor(){
        super();

        /** @type {number} */
        this._moveStep = 10;

        /** @type {number} */
        this._rotateStep = 15;

        /** @type {string} [Millimeters|Inches]*/
        this._dimension= 'Millimeters';
   
        // for transfer state between lifecycles in CircleType.js 
        this.diameter = '';

        /** @type {LineType} - the default line type*/
        this._lineType = new AutoLineType();

        /** @type {LineType} - the default font size
         * @deprecated - font size depends on board scale
         * */
        this._fontSize = 3;
    }

    get moveStep(){return this._moveStep};
    set moveStep(value){
        this._moveStep=value;
        this._notifyHandlers('change', 'moveStep');
    };
    get rotateStep(){return this._rotateStep};
    set rotateStep(value){
        this._rotateStep=value;
        this._notifyHandlers('change', 'rotateStep');
    };

    get dimension(){return this._dimension};

    get demensions(){return this._dimension};
    set demensions(value){
        this._dimension=value;
        this._notifyHandlers('change', 'dimension');
    };


    get lineType(){return this._lineType};
    set lineType(value){
        this._lineType=value;
        this._notifyHandlers('change', 'lineType');
    };

    /**
     * @return {Array.<LineType>} -  default line types (used for the line type dropdown)
     */
    get defaultLineTypes(){
        return [
            new AutoLineType(),
            new CommentToSelfLineType(),
            new BendLineType(),
            new CommentToMachineLineType()
        ];
    }

    get fontSize(){return this._fontSize};
}