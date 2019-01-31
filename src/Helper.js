class WindowHelper{
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
            window.addEventListener(eventName, (e)=>{
                this._notifyHandlers(eventName,e);
            });
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

const Helper = {
    Window:new WindowHelper()
};

window.Helper = Helper;




