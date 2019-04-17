
import Behavior from '../Behavior';


export default class CornerDialog extends Behavior{

    /**
     * The method is main method of behavior. It's execute the operation
     * @param {Corner} command - the parameter need for edition the command state
     * @return {Promise} - the promise in resolve send result of execution behavior {true|false}
     */
    execute(command){
        return new Promise((resolve, reject)=>{
            //todo: add data changer
            resolve(true);
        });
    }

}