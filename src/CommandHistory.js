/**
 * Created by dev on 17.01.19.
 */

import Command from './2d/command/Command';

export default class CommandHistory{
    constructor(){
        this.history = [];
    }

    /**
     * @param {Command} command
     */
    push(command){
        this.history.push(command);
    }

    /**
     * @return {Command|null}
     */
    pop(){
        return this.history.pop();
    }

}