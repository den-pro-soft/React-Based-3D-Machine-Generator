/**
 * Created by dev on 14.12.18.
 */


class BlockElement{
    constructor(){
        this.position = {x:0,y:0}; //x is horizontal, y is a vertical
        this.size = {width:0, height:0};

        this.template = document.createElement('div');
        this.template.style.position = 'absolute';
        this.visible=false;

        Helper.Window.addResizeHandler((w,h)=>{
            this.setSize(w-this.position.x*2,this.size.height);
        });
    }


    setPosition(x,y){
        this.position = {x:x,y:y};
        this.template.style.left = x + 'px';
        this.template.style.top = y + 'px';
        return this;
    }

    setSize(width,height){
        this.size = {width:width, height:height};
        this.template.style.width = width + 'px';
        this.template.style.height = height + 'px';
        return this;
    }

    show(){
        if (this.visible == true)
            return this;
        this.visible = true;
        this.template.style.opacity = 1;
        this.template.style.display = 'block';

        return this
    }

    hide(){
        this.visible = false;
        this.template.style.opacity = 0;
        this.template.style.display = 'none';
    }

    setContent(content) {
        this.template.appendChild(content);
    }

    setText(text) {
        this.template.innerHTML = text;
    }

    getHtml(){
        return this.template;
    }

}

class Menu extends BlockElement{
    constructor(name){
        super();
        this.hide();
        this.name = name;

        this.menuItems = [];

        this.template.style.backgroundColor = "white";


        this.setText(name);
        this.template.onmouseover = ()=>this.mouseOver();
        this.template.onmouseout = ()=>this.mouseOut();

    }


    addMenuItem(item){
        this.menuItems.push(item);

        return this;
    }

    setItemSize(width, height){
        for(let menuItem of this.menuItems){
            menuItem.setSize(width,height);
        }
        return this;
    }


    getHtml(){
        this.repositionChildren();
        for(let menuItem of this.menuItems){
            this.setContent(menuItem.getHtml());
        }
        return this.template;
    }

    repositionChildren(){
        var bais = {x:0,y:0};
        for(let menuItem of this.menuItems){
            menuItem.setPosition(bais.x);
            bais.x+=menuItem.size.width;
        }
    }


    showItems(){

    }


    mouseOver(){
        this.template.style.backgroundColor = "red";
    }
    mouseOut(){
        this.template.style.backgroundColor = "white";
    }

}

class MenuItem extends Menu{
    constructor(name){
        super(name);

    }
}

global.MenuItem = MenuItem;
global.Menu = Menu;