
import Behavior from '../Behavior';
import Document from '../../model/Document';
import LineElement from "../../model/elements/LineElement";

export default class CornerDataValidator extends Behavior{

    /**
     * The method is main method of behavior. It's execute the operation
     * @param {Corner} command - the parameter need for edition the command state
     * @return {Promise} - the promise in resolve send result of execution behavior {true|false}
     */
    execute(command){
        return new Promise((resolve, reject)=>{
            if(!this.isOnlyLines(command)){
                container.resolve('confirmChangeArcToSplinesDialog').modalNonWorkFeature("Filleting of unconnected lines is not permitted.");
                resolve(false)
            }else{
                resolve(true);
            }
        });
    }


    /**
     * @param {Corner} command
     * @return {boolean}
     * @private
     */
    isOnlyLines(command){
        let elements = Document.toSimpleListElements(command.elements);
        for(let el of elements) {
            if (!(el instanceof LineElement)) {
                return false;
            }
        }
        return true;
    }

}