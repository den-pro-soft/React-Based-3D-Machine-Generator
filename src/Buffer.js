/**
 * Created by dev on 11.02.19.
 */

export default class Buffer{
    constructor(app){
        this.buffer;

        this.app=app;
        this.countPastOperation = 0;

        //todo use clipboard module
    }

    copy(){
        this.buffer = [];
        for(let el of this.app.selectElements){
            this.buffer.push(el.copy());
        }
        this.countPastOperation=0;
    }

    paste(){
        if(this.buffer){
            this.countPastOperation++;
            this.app.pasteElements(this.buffer, this.app.config.moveStep*this.countPastOperation, 0);
        }
    }

    cut(){
        this.buffer = [];
        for(let el of this.app.selectElements){
            this.buffer.push(el.copy());
        }
        this.countPastOperation=0;
        this.app.deleteSelected();
    }
}