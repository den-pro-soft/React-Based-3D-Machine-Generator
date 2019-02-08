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


class TextHelper{
    static textWidth(text, font, height){
        var c = document.createElement("canvas");
        var ctx = c.getContext("2d");
        ctx.font = (app.board._pixelPerOne*app.board._scale*height)+"px "+font;
        return  ctx.measureText(text).width/(app.board._pixelPerOne*app.board._scale);
    }
}

const Helper = {
    Window:new WindowHelper(),
    Text:TextHelper
};

window.Helper = Helper;




