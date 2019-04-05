/**
 * Created by dev on 28.03.19.
 */

export default class Confirmation{

    /**
     *
     * @param {String} message
     * @param {function} okCallback
     * @param {function} cancelCallback
     */
    constructor(message, okCallback, cancelCallback){
        container.resolve('confirmChangeArcToSplinesDialog').modalOpenConfirmation(message, okCallback, cancelCallback);
    }

    
    
}