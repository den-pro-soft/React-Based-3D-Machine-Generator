/**
 * Created by dev on 31.01.19.
 */

export default class Observable{
    constructor(){
        this.handlers = [];
    }

    /**
     * @param {string} eventName
     * @param handler
     */
    addHandler(eventName, handler){
        if(!this.handlers[eventName]){
            this.handlers[eventName]=[];
        }
        this.handlers[eventName].push(handler);
    }

    _notifyHandlers(eventName,data){
        if(this.handlers[eventName]){
            for(let handler of this.handlers[eventName]){
                handler(data);
            }
        }
    }

}