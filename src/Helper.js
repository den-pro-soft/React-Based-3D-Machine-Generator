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

class KeyHelper{
    constructor(){
        this.ctrlKey = false;
        this.shiftKey=false;

        window.addEventListener('keydown',(e)=>{
            // console.log(e.keyCode, e.key, e);
            switch(e.keyCode){
                case 49://1
                    if(e.target==document.body) {
                        app.appZoomToActualSize();
                    }
                    break;
                case 46: //delete
                if(e.target==document.body) {
                    app.deleteSelected();
                }
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
                        if(e.shiftKey){
                            app.saveAs('xml');
                        }
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
                    if(e.ctrlKey && e.target==document.body){
                        container.resolve('buffer').paste();
                    }
                    break;
                case 67: //Cc
                    if(e.ctrlKey && e.target==document.body){
                        container.resolve('buffer').copy();
                    }
                    break;
                case 88: //Xx
                    if(e.ctrlKey && e.target==document.body){
                        container.resolve('buffer').cut();
                    }
                    break;
                case 37: //left
                    if(e.target==document.body) {
                        app.moveSelected(-container.resolve('config').moveStep, 0);
                    }
                    break;
                case 38: //up
                    if(e.target==document.body) {
                        app.moveSelected(0, container.resolve('config').moveStep);
                    }
                    break;
                case 39: //right
                    if(e.target==document.body) {
                        app.moveSelected(container.resolve('config').moveStep, 0);
                    }
                    break;
                case 40: //down
                    if(e.target==document.body) {
                        app.moveSelected(0, -container.resolve('config').moveStep);
                    }
                    break;
                case 32: //Space
                    if(e.target==document.body){
                        app.useLastTool();
                    }
                    break;
                case 82: //Rr
                    if(this.ctrlKey) {
                        console.log("sdfsdf");
                        container.resolve('3dView').show3D();
                        e.preventDefault();
                    }else if(e.target==document.body){
                        app.rotateSelected(container.resolve('config').rotateStep);
                    }
                    break;
                case 76:
                    if(e.target==document.body){
                        app.rotateSelected(-container.resolve('config').rotateStep);
                    }
                    break;
                case 17: //Ctrl
                    this.ctrlKey=true;
                    break;
                case 16: //Shift
                    this.shiftKey=true;
                    break;
                case 71: //Gg
                    if(this.ctrlKey) {
                        app.group();
                        e.preventDefault();
                    }
                    break;
                case 85: //Uu
                    if(this.ctrlKey) {
                        app.ungroup();
                        e.preventDefault();
                    }
                    break;
            }
            switch (e.key) {
                case "+":
                    app.board._zoomAroundPoint(1.1,app.board.getCenter());
                    break;
                case "-":
                    app.board._zoomAroundPoint(0.9,app.board.getCenter());
                    break;
                case "=":
                    app.board.zoomToFitScreen();
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

class Request{

    httpGet(theUrl){
        try {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", theUrl, false); // false for synchronous request
            xmlHttp.send(null);
            return xmlHttp.responseText;
        }catch (e) {
            return "none";
        }
    }

    httpPost(URL, data, callback){
        var xhr = new XMLHttpRequest();

        xhr.open("POST", URL, false);
        xhr.setRequestHeader('Content-type', 'application/xml; charset=utf-8');

        xhr.onreadystatechange = callback;

        xhr.send(data);

    }
}

const Helper = {
    Window:new WindowHelper(),
    Text:TextHelper,
    Key:new KeyHelper(),
    Request:new Request()
};

window.Helper = Helper;




