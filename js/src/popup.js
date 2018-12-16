

class Popup{
    constructor(parent){
        this.parent = parent;
        this.popupContainer= element('div').classname('popup-container');
        this.popup = element('div',this.popupContainer).classname('popup');

        this.handlers = [];

        this.size = {width:0,height:0};
        this.position = {x:0,y:0};
        this.visible=false;
        this.hide();
        if(parent){
            this.popupContainer.order(parseInt(parent.popup.style.zIndex)+50);
            this.popup.order(parseInt(parent.popup.style.zIndex)+100);
        }else{
            this.popupContainer.order(1950);
            this.popup.order(2000);
        }

        this.popupContainer.onclick = (e)=>{
            if(e.target==this.popupContainer) {
                this.hide();
            }
        };
    }

    setShadow(value){
        if(value){
            this.popupContainer.background("rgba(0,0,0,0.5)");
        }else{
            this.popupContainer.background("rgba(0,0,0,0)");
        }
        return this;
    }

    setSize(width, height){
        if(!width){
            width = this.size.width;
        }
        if(!height){
            height = this.size.height;
        }
        this.size = {width:width,height:height};
        this.popup.size(width, height);
        return this;
    }


    setPosition(x,y){
        this.position = {x:x,y:y};
        this.popup.position(x, y);
        return this;
    }

    moveToCenter(){
        let top = innerHeight/2-this.popup.height/2;
        top=top<0?0:top;

        let left = innerWidth/2-this.popup.width/2;
        left=left<0?0:left;
        this.setPosition(left,top);
        return this;
    }


    /**
     * @public
     * The method adding some content to the popup block
     * @param {HTMLElement} content
     * @returns {Popup}
     */
    addContent(content){
        content.style.position = 'absolute';
        content.style.left = '0px';
        content.style.top = '0px';
        this.popup.appendChild(content);
        return this;
    }

    hide(){
        this.visible=false;
        this.popupContainer.hide();
        this.notifyHandlers("hide");
        return this;
    }

    show(){
        this.visible=true;
        this.popupContainer.show();
        return this;
    }

    isShow(){
        return this.visible;
    }

    addHandler(eventName, handler){
        if(!this.handlers[eventName]){
            this.handlers[eventName]=[];
        }
        this.handlers[eventName].push(handler);
    }

    notifyHandlers(eventName, data){
        if(this.handlers[eventName]) {
            for(let handler of this.handlers[eventName]){
                handler(data);
            }
        }
    }
}

class DialogPopup extends Popup{
    constructor(){
        super();

        this.header = element('div',this.popup).background('#bbbbbb');
        this.close = element('img',this.header).size(20,20).cursor('pointer');
        this.close.src="images/Delete.png";
        this.close.onclick= ()=>this.hide();

        Helper.Window.addResizeHandler((w,h)=> {
            this.popupContainer.size(w,h);
            this.moveToCenter()
        });
    }

    setPosition(x,y){
        super.setPosition(x,y);
        this.header.position(0,0);

        this.close.position(this.header.width-23,3);
        return this;
    }

    setSize(width, height){
        super.setSize(width,height+25);
        this.header.size(width,25);
        this.close.position(this.header.width-23,3);
        return this;
    }

    addContent(content){
        super.addContent(content);
        content.style.top = '25px';
    }
}

class DraggablePopup extends DialogPopup{
    constructor(parent){
        super(parent);
        this.position={x:0,y:0};

        this.mouseDownPosition = undefined;

        this.header.onmousedown = (e)=>{
            if(e.target==this.header) {
                this.mouseDownPosition = {x: e.clientX, y: e.clientY};
            }
        };

        this.header.onmousemove = (e)=>this.drag(e);
        this.popupContainer.onmousemove = (e)=>this.drag(e);
        this.onmousemove = (e)=>this.drag(e);

        this.header.onmouseup= ()=> {
            this.mouseDownPosition=undefined;
        };

    }

    drag(e){
        if(this.mouseDownPosition){
            let x=this.position.x+e.clientX-this.mouseDownPosition.x;
            let y=this.position.y+e.clientY-this.mouseDownPosition.y;
            this.setPosition(x,y<0?0:y);
            this.mouseDownPosition.x=e.clientX;
            this.mouseDownPosition.y=e.clientY;
        }
    }

    addContent(content){
        super.addContent(content);
        content.onmousemove=(e)=>this.drag(e);
        return this;
    }
}

global.Popup = Popup;
global.DraggablePopup = DraggablePopup;

export {Popup, DialogPopup, DraggablePopup};