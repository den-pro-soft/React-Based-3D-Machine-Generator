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

        this.popup.style.borderRadius="0px 3px 3px 3px";
        this.popup.style.overflow="hidden";
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


        this.setStyle('padding','0 0 0 5px');

        this.template.onmouseover = ()=>this._mouseOver();
        this.template.onmouseout = ()=>this._mouseOut();
        this.template.onclick= ()=>this._mouseClick();
    }

    //todo: need use getter ang setter
    enable(){
        this.isEnable=true;
        this._changeState();
        this._notifyHandlers('enable',this);
        return this;
    }

    disable(){
        this._notifyHandlers('disable',this);
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
        return this;
    }


    addHandler(eventName, handler){
        if(!this._handlers[eventName]){
            this._handlers[eventName]=[];
        }
        this._handlers[eventName].push(handler);
        return this;
    }

    /**
     * @private
     * handler can reject event if returns false
     * @param eventName
     * @param data
     * @return {boolean}
     * @private
     */
    _notifyHandlers(eventName, data){
        var res = true;
        for(let key in this._handlers){
            if(key==eventName){
                for(let handler of this._handlers[key]){
                    res &=handler(data);
                }
            }
        }
        return res;
    }

    _resize(){
        this._notifyHandlers('resize',this.getFullSize());
    }
    _mouseOver(){
        this._notifyHandlers('hover',this);
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
        item.addHandler('resize',(size)=>{
            if(this._popup) {
                this._popup.setSize(size.width);
            }
        });
        item.addHandler('hover',(data)=>{
            this._notifyHandlers('hover',data)
        });
        item.addHandler('enable', ()=>{
            if(!this.isEnable){
                this.enable();
            }
        });
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
        for(let menuItem of this._menuItems){
            menuItem.setSize(width,height);
        }
        this._itemSize = {width:width+5,height:height};
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
            this._popup.setPosition(menuPosition.left+5+this.size.width,menuPosition.top)
        }
        this._popup.popup.style.position = "relative";

        let contetn = new BlockElement();
        let y=0;


        for(let item of this._menuItems) {
            item.setExecutor(()=>{
                if(this._popup) {
                    this._popup.hide();
                }
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
        let size = this.getFullSize();
        if(this._popup){
            for(let item of this._menuItems){
                item.setSize(this._popup.size.width);
            }
        }
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

    getItem(name){
        if(this.name==name){
            return this;
        }
        for(let item of this._menuItems){
            if(item instanceof Menu) {
                let res = item.getItem(name);
                if(res) {
                    return res;
                }
            }else{
                if(item.name==name){
                    return item;
                }
            }
        }
        return null;
    }

    disableAllItem(){
        for(let item of this._menuItems){
            item.disable();
        }
    }
}

class MenuBar extends BlockElement{
    constructor(){
        super();
        this.menuLish = [];
        this._handlers = [];
    }

    addMenu(menu){
        this.menuLish.push(menu);
        menu.show();
        menu.addHandler('click',(data)=>{
            return this._notifyHandlers('click',data)
        });
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

    /**
     * Return menu item by name
     * @param name
     * @return {MenuItem}
     */
    getItem(name){
        for(let menu of this.menuLish){
            let res = menu.getItem(name);
            if(res){
                return res;
            }
        }
        return null;
    }

    addHandler(eventName, handler){
        if(!this._handlers[eventName]){
            this._handlers[eventName]=[];
        }
        this._handlers[eventName].push(handler);
        return this;
    }

    _notifyHandlers(eventName, data){
        var res=true;
        for(let key in this._handlers){
            if(key==eventName){
                for(let handler of this._handlers[key]){
                    res |=handler(data);
                }
            }
        }
        return res;
    }
}


global.MenuBar = MenuBar;
global.MenuItem = MenuItem;
global.Menu = Menu;