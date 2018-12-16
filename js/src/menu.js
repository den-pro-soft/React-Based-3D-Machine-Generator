/**
 * Created by dev on 14.12.18.
 */

import {BlockElement} from './modules/dom';
import {Popup} from './popup';

const subImageUrl = "data:image/svg+xml;base64,\n" +
    "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIi" +
    "B2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjQwLjgyMyAyNDAuODIzIiBzdHlsZT0iZW5hY" +
    "mxlLWJhY2tncm91bmQ6bmV3IDAgMCAyNDAuODIzIDI0MC44MjM7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxM" +
    "iIgY2xhc3M9IiI+PGc+PHNjcmlwdCB4bWxucz0iIiBjbGFzcz0iYWN0aXZlLXBhdGgiIHN0eWxlPSJmaWxsOiMwMjAyMDIiIGRhdGEtb2xkX2NvbG" +
    "9yPSIjMDYwNjA2Ij48L3NjcmlwdD48c2NyaXB0IHhtbG5zPSIiIGNsYXNzPSJhY3RpdmUtcGF0aCIgc3R5bGU9ImZpbGw6IzAyMDIwMiIgZGF0YS1" +
    "vbGRfY29sb3I9IiMwNjA2MDYiPjwvc2NyaXB0PjxnPgoJPHBhdGggaWQ9IkNoZXZyb25fUmlnaHRfMV8iIGQ9Ik0xODMuMTg5LDExMS44MTZMNzQuO" +
    "DkyLDMuNTU1Yy00Ljc1Mi00Ljc0LTEyLjQ1MS00Ljc0LTE3LjIxNSwwYy00Ljc1Miw0Ljc0LTQuNzUyLDEyLjQzOSwwLDE3LjE3OSAgIGw5OS43MDc" +
    "sOTkuNjcxbC05OS42OTUsOTkuNjcxYy00Ljc1Miw0Ljc0LTQuNzUyLDEyLjQzOSwwLDE3LjE5MWM0Ljc1Miw0Ljc0LDEyLjQ2Myw0Ljc0LDE3LjIxN" +
    "SwwbDEwOC4yOTctMTA4LjI2MSAgIEMxODcuODgxLDEyNC4zMTUsMTg3Ljg4MSwxMTYuNDk1LDE4My4xODksMTExLjgxNnoiIGRhdGEtb3JpZ2luYWw9" +
    "IiMwMDAwMDAiIGNsYXNzPSJhY3RpdmUtcGF0aCIgc3R5bGU9ImZpbGw6IzAyMDIwMiIgZGF0YS1vbGRfY29sb3I9IiMwNjA2MDYiPjwvcGF0aD4KCTx" +
    "nPgoJPC9nPgoJPGc+Cgk8L2c+Cgk8Zz4KCTwvZz4KCTxnPgoJPC9nPgoJPGc+Cgk8L2c+Cgk8Zz4KCTwvZz4KPC9nPjwvZz4gPC9zdmc+";

class HoverPopup extends Popup{
    constructor(parent, entryPointer){
        super(parent);

        this.entryPointer=entryPointer;

        let ur = this.entryPointer.getBoundingClientRect(); //unclosable rect

        this.temp = element('div').position(ur.left, ur.top).size(ur.width,ur.height)
            .order(parseInt(this.popupContainer.style.zIndex)+5).show();
    }

    show(){
        super.show();
        this.temp.show();
        this.popupContainer.onmouseover = (e)=>{
            if(e.target === this.popupContainer){
                this.hide();
                this.temp.hide();
            }
        };
    }

    hide(){
        super.hide();
        if(this.temp) {
            this.temp.hide();
        }
    }
}


class MenuItem extends BlockElement{
    constructor(name){
        super();
        this.hide();
        this.name = name;
        this.isEnable = true;
        this.isFocuse = false;

        this._stateStyles = [];

        this._executors = [];

        this._handlers = [];

        this.setContentText(name);

        this.setStyle("cursor","pointer");
        this.setStyle("position","unset");

        this.template.onmouseover = ()=>this._mouseOver();
        this.template.onmouseout = ()=>this._mouseOut();
        this.template.onclick= ()=>this._mouseClick();
    }

    //todo: need use getter ang setter
    enable(){
        this.isEnable=true;
        this._changeState();
        return this;
    }

    disable(){
        this.isEnable=false;
        this._changeState();
        return this;
    }

    setExecutor(executor){
        this._executors.push(executor);
        return this;
    }

    setStateStyle(stateStyleList){
        this._stateStyles = stateStyleList;
        this._changeState();
        return this;
    }

    setStyle(styleName, value){
        if(super.setStyle(styleName,value)) {
            console.log(styleName+" "+/padding.*|margin.*/.test(styleName));
            if (/padding.*|margin.*/.test(styleName)) {
                this._resize();
            }
        }
    }

    /**
     * @inheritDoc
     * @param width
     * @param height
     */
    setSize(width, height){
        super.setSize(width,height);
        this._resize();
    }


    addHandler(eventName, handler){
        if(!this._handlers[eventName]){
            this._handlers[eventName]=[];
        }
        this._handlers[eventName].push(handler);
    }

    _notifyHandlers(eventName, data){
        for(let key in this._handlers){
            if(key==eventName){
                for(let handler of this._handlers[key]){
                    handler(data);
                }
            }
        }
    }

    _resize(){
        console.log("resize of "+JSON.stringify(this.getFullSize()));
        this._notifyHandlers('resize',this.getFullSize());
    }
    _mouseOver(){
        this.isFocuse = true;
        this._changeState();
    }

    _mouseOut(){
        this.isFocuse=false;
        this._changeState();
    }

    _mouseClick(){
        for(let exec of this._executors){
            exec(this);
        }
    }

    _changeState(){
        for(let state of this._stateStyles){
            if(state.isActive(this)){
                this.setListStyle(state.style);
            }
        }
    }
}

class Menu extends MenuItem{
    constructor(name){
        super(name);
        this._menuItems = [];

        /** @var {Popup}*/
        this._popup;

        /** @var {Menu} */
        this._parent;

        this._itemSize = {width:0,height:0};
    }

    /**
     * @public
     * The method adding menu item to menu
     * @param {MenuItem|Menu} item
     * @returns {Menu}
     */
    addMenuItem(item){
        if(item instanceof  Menu){
            item._parent=this;
        }
        this._menuItems.push(item);
        item.show();
        return this;
    }

    /**
     * @public
     * The method sets size for all children block
     * @param width
     * @param height
     * @returns {Menu}
     */
    setItemSize(width, height){
        this._itemSize = {width:width,height:height};
        for(let menuItem of this._menuItems){
            menuItem.setSize(width,height);
        }
        return this;
    }


    /**
     * @inheritDoc
     * @returns {HTMLElement}
     */
    getHtml(){

        /**if the element is part of menu then add pointer to the HTML*/
        if(!this.subImg && this._parent) {
            this.subImg = element('img').position(this.size.width - this.size.height, this.size.height*0.25)
                .size(this.size.height/1.5, this.size.height/1.5).pic(subImageUrl);
            this.subImg.setAttribute('id', "some");
            this.subImg.setAttribute('width', this.size.height/1.25);
            this.subImg.setAttribute('height', this.size.height/1.25);
            this.addContent(this.subImg);
        }
        return super.getHtml();
    }

    _mouseOver(){
        if(this.isEnable) {
            if (!this._popup) {
                this._createPopup();
            }
            if (!this._popup.isShow()) {
                this._popup.show();
            }
        }
        super._mouseOver();
    }
    _mouseOut(){
        if(this._popup && this._popup.isShow()){
            return;
        }
        super._mouseOut();
    }



    _createPopup(){
        /** @var {Popup}*/
        this._popup = new HoverPopup(this._parent?this._parent._popup:undefined,this.getHtml())
            .setShadow(false)
            .setSize(this._itemSize.width,this._itemSize.height*this._menuItems.length);

        let menuPosition = this.template.getBoundingClientRect();
        if(!this._parent){
            this._popup.setPosition(menuPosition.left,menuPosition.top+this.size.height)
        }else{
            this._popup.setPosition(menuPosition.left+this.size.width,menuPosition.top)
        }

        let contetn = new BlockElement();
        let y=0;


        for(let item of this._menuItems) {
            item.setExecutor(()=>{
                if(this._popup) {
                    this._popup.hide();
                }
            });
            item.addHandler('resize',(size)=>{
                this._popup.setSize(size.width);
            });
            item.setPosition(0,y);
            y+=item.size.height;
            contetn.addContent(item.getHtml());
        }
        this._popup.addContent(contetn.getHtml());

        this._popup.addHandler("hide", ()=>{
            this._mouseOut();
        });
    }

    _resize(){
        super._resize();
        console.log("resize of "+this.name);
        let size = this.getFullSize();
        console.log(size);
        if(this._popup){
            for(let item of this._menuItems){
                item.setSize(this._popup.size.width);
            }
        }
        // this._itemSize.width=size.width;
        //
        //     this._popup.setSize(size.width);
        //     if(!this._parent){
        //         let menuPosition = this.template.getBoundingClientRect();
        //         this._popup.setPosition(menuPosition.left+size.width,menuPosition.top)
        //     }
        // }
        // console.log(this.subImg);
        // if(this.subImg){
        //     this.subImg.position(size.width - this.size.height, this.size.height*0.25);
        // }
    }
    setStateStyle(style){
        super.setStateStyle(style);
        let menuPosition = this.template.getBoundingClientRect();
        if(this._popup) {
            if (!this._parent) {
                this._popup.setPosition(menuPosition.left, menuPosition.top + this.size.height)
            } else {
                this._popup.setPosition(menuPosition.left + this.size.width, menuPosition.top)
            }
        }
        return this;
    }

    setItemStyle(style){
        for(let item of this._menuItems){
            item.setStateStyle(style);
        }
        return this;
    }
}

class MenuBar extends BlockElement{
    constructor(){
        super();
        this.menuLish = [];
    }

    addMenu(menu){
        this.menuLish.push(menu);
        menu.show();
        return this;
    }

    getHtml(){
        this.clearContent();
        let x=0;
        for(let menu of this.menuLish){
            menu.setPosition(x,0);
            x+=menu.size.width;
            this.addContent(menu.getHtml());
        }
        return this.template;
    }

    setItemSize(width, height){
        for(let menu of this.menuLish){
            menu.setSize(width,height);
        }
        return this;
    }

    setItemStyle(style){
        for(let menu of this.menuLish){
            menu.setStateStyle(style);
        }
        return this;
    }
}


global.MenuBar = MenuBar;
global.MenuItem = MenuItem;
global.Menu = Menu;