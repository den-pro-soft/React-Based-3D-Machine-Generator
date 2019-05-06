/**
 * Created by dev on 11.03.19.
 */

import Behavior from '../Behavior';
import Document from '../../model/Document';
import Arc from '../../model/elements/Arc';
import Text from '../../model/elements/Text';
import LineElement from "../../model/elements/LineElement";

export default class ChangeLineTypeDataValidator extends Behavior{

    /**
     * The method is main method of behavior. It's execute the operation
     * @param {ChangeLineTypeCommand} command - the parameter need for edition the command state
     * @return {Promise} - the promise in resolve send result of execution behavior {true|false}
     */
    execute(command){
        return new Promise((resolve, reject)=>{
            if(this.isHasNotLineElements(command)){
                container.resolve('confirmChangeArcToSplinesDialog').modalNonWorkFeature("Use only straight segments for Bend lines");
                resolve(false)
            }else{
                resolve(true);
            }
        });
    }


    /**
     * @param {ChangeLineTypeCommand} command
     * @return {boolean}
     * @private
     */
    isHasNotLineElements(command){
        let elements = command.elements;
        for(let el of elements) {
            if (!(el instanceof LineElement)) {
                return true;
            }
        }
        return false;
    }


}