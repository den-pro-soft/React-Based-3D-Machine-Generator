import Observable from './Observable';
import config from './Config';

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

class KeyHelper{
    constructor(){
        this.ctrlKey = false;
        this.shiftKey=false;

        window.addEventListener('keydown',(e)=>{
            console.log(e.keyCode);
            switch(e.keyCode){
                case 46: //delete
                    app.deleteSelected();
                    break;
                case 65: //Aa
                    if(e.ctrlKey && e.target==document.body){
                        app.selectAll();
                        e.preventDefault();
                    }
                    break;
                case 73: //Ii
                    if(e.ctrlKey && e.target==document.body){
                        app.intersectSelectedElements();
                        e.preventDefault();
                    }
                    break;
                case 83: //Ss
                    if(e.ctrlKey){
                        app.saveAs('xml');
                        e.preventDefault();
                    }
                    break;
                case 79: //Oo
                    if(e.ctrlKey){
                        //todo: the code have copy in File->Open menu handler
                        var newInput = document.createElement('input');
                        newInput.setAttribute('type','file');
                        // newInput.setAttribute('accept',this.accept);
                        newInput.onchange = function(e){
                            //todo: check count files
                            app.open(this.files[0]);
                            newInput.remove();
                        };
                        newInput.click();
                        e.preventDefault();
                    }
                    break;
                case 90: //Zz
                    if(e.ctrlKey){
                        if(e.shiftKey){
                            app.redo();
                        }else {
                            app.undo();
                        }
                    }
                    break;
                case 86: //Vv
                    if(e.ctrlKey){
                        app.buffer.paste();
                    }
                    break;
                case 67: //Cc
                    if(e.ctrlKey){
                        app.buffer.copy();
                    }
                    break;
                case 88: //Xx
                    if(e.ctrlKey){
                        app.buffer.cut();
                    }
                    break;
                case 37: //left
                    if(e.target==document.body) {
                        app.moveSelected(-config.moveStep, 0);
                    }
                    break;
                case 38: //up
                    if(e.target==document.body) {
                        app.moveSelected(0, config.moveStep);
                    }
                    break;
                case 39: //right
                    if(e.target==document.body) {
                        app.moveSelected(config.moveStep, 0);
                    }
                    break;
                case 40: //down
                    if(e.target==document.body) {
                        app.moveSelected(0, -config.moveStep);
                    }
                    break;
                case 32: //Space
                    if(e.target==document.body){
                        app.useLastTool();
                    }
                    break;
                case 17: //Ctrl
                    this.ctrlKey=true;
                    break;
                case 16: //Shift
                    this.shiftKey=true;
                    break;
            }
        });

        window.addEventListener('keyup',(e)=>{
            switch(e.keyCode) {
                case 17: //Ctrl
                    this.ctrlKey=false;
                    break;
                case 16: //Shift
                    this.shiftKey=false;
                    break;
            }

        });

    }
}

const Helper = {
    Window:new WindowHelper(),
    Text:TextHelper,
    Key:new KeyHelper()
};

window.Helper = Helper;




