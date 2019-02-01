import Observable from './Observable';

class WindowHelper extends Observable{

    addHandler(eventName, handler){
        if(!this.handlers[eventName]){
            window.addEventListener(eventName, (e)=>{
                this._notifyHandlers(eventName,e);
            });
        }
        super.addHandler(eventName,handler);
    }
}

const Helper = {
    Window:new WindowHelper()
};

window.Helper = Helper;




