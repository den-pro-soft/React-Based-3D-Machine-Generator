/**
 * The interface is describe the single progress bar object.
 * @abstract
 */
export default class ProgressBar{
    constructor(){
        this._value=10;
    }

    /**
     * @param {text} message
     * @abstract
     */
    show(message=""){
        console.log("show progress bar", message);
    }

    /**
     * @abstract
     */
    hide(){
        console.log("hide progress bar");
    }

    setValue(value){
        console.log("progress", value);
        this._value=value;
    }
}