class WindowHelper{
    constructor(){
        this.resizeHandlers = [];

        window.onresize = ()=>{
            for(let handler of this.resizeHandlers){
                handler(innerWidth,innerHeight);
            }
        }
    }

    addResizeHandler(handler){
        this.resizeHandlers.push(handler);
    }
}

const Helper = {
    Window:new WindowHelper()
};

window.Helper = Helper;




