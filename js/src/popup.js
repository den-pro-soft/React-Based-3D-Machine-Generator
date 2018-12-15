

class Popup{
    constructor(parent){
        this.parent = parent;
        this.popupContainer= element('div').classname('popup-container');
        this.popup = element('div',this.popupContainer).classname('popup');
        this.header = element('div',this.popup).background('#bbbbbb');
        this.close = element('img',this.header).size(20,20).cursor('pointer');
        this.close.src="images/Delete.png";

        this.hide();
        if(parent){
            this.popupContainer.background("rgba(0,0,0,0.5)");
            this.popupContainer.order(parent.style.zIndex+50);
            this.popup.order(parent.style.zIndex+100);
        }else{
            this.popupContainer.order(1950);
            this.popup.order(2000);
        }

        this.close.onclick= ()=>this.hide();
        this.popupContainer.onclick = (e)=>{
            if(e.target==this.popupContainer) {
                this.hide();
            }
        };
        Helper.Window.addResizeHandler((w,h)=> {
            this.popupContainer.size(w,h);
            console.log("df");
            this.moveToCenter()
        });
    }


    setSize(width, height){
        this.popup.size(width, height+25);
        this.header.size(width,25);
        this.close.position(this.header.width-23,3);
        return this;
    }


    setPosition(x,y){
        this.popup.position(x, y);
        this.header.position(0,0);

        this.close.position(this.header.width-23,3);
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


    setContent(content){
        content.style.position = 'absolute';
        content.style.left = '0px';
        content.style.top = '25px';
        this.popup.appendChild(content);
        return this;
    }

    hide(){
        this.popupContainer.hide();
        this.popup.hide();
        return this;
    }

    show(){
        this.popupContainer.show();
        this.popup.show();
        return this;
    }

}

class DraggablePopup extends Popup{
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
            this.setPosition(this.position.x+e.clientX-this.mouseDownPosition.x
                ,this.position.y+e.clientY-this.mouseDownPosition.y);
            this.mouseDownPosition.x=e.clientX;
            this.mouseDownPosition.y=e.clientY;
        }
    }
    setPosition(x,y){
        super.setPosition(x,y);
        this.position={x:x,y:y};
        return this;
    }

    setContent(content){
        super.setContent(content);
        content.onmousemove=(e)=>this.drag(e);
        return this;
    }
}

global.Popup = Popup;
global.DraggablePopup = DraggablePopup;