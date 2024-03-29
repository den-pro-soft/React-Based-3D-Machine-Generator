/**
 * Created by dev on 30.01.19.
 *
 */

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
export default class Config extends Observable{
    constructor(){
        super();

        /** @type {number} */
        this._moveStep = 1;

        /** @type {number} */
        this._rotateStep = 15;

        /** @type {string} [Millimeters|Inches]*/
        this._dimension= localStorage.getItem('dimension');
        if(!this._dimension){
            this._dimension='Inches';
        }
   
        // for transfer state between lifecycles in React - CircleType.js  //todo: must be remove
        this.diameter = '';
        // for transfer state between lifecycles in React - InputSelect.js //todo: must be remove
        this.indexZ = 0; //todo: must be remove

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
        localStorage.setItem('dimension', this._dimension);
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

    /**
     * @return {number[]}
     */
    get defaultZValues(){
        return [0.050, 0.080, 0.130, 0.250, 0.510, 0.790, 1.140, 1.590, 2.360, 3.170, 4.750, 6.350, 9.520, 10.000,
            12.700, 19.050, 25.400, 31.750, 38.100, 50.800, 63.500, 76.200
        ];
    }

    get fontSize(){return this._fontSize};

    get magnificationMode(){
        let color = localStorage.getItem("bgColorSnapToLines"); //todo: save as boolean

        if (color === "#fff") {
            return true;
        } else {
            return false;
        }
    }

    get userInfo(){
        return JSON.parse(localStorage.getItem('userInfo'));
    }
    set userInfo(user){
        localStorage.setItem('userInfo', JSON.stringify(user));
    }
}