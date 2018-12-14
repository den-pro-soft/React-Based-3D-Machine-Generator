/**
 * Created by dev on 14.12.18.
 */


var BlockElement = function () {
    this.position = {x:0,y:0}; //x is horizontal, y is a vertical
    this.size = {width:0, height:0};

    this.template = document.createElement('div');
    this.template.style.position = 'absolute';
    this.visible=false;

    this.setPosition = function(x,y){
        this.position = {x:x,y:y};
        this.template.style.left = x + 'px';
        this.template.style.top = y + 'px';
        return this;
    };

    this.setSize = function(width,height){
        this.size = {width:width, height:height};
        this.template.style.width = width + 'px';
        this.template.style.height = height + 'px';
        return this;
    };

    this.show = function(){
        if (this.visible == true)
            return this;
        this.visible = true;
        this.template.style.opacity = 1;
        this.template.style.display = 'block';

        return this
    };

    this.hide = function(){
        this.visible = false;
        this.template.style.opacity = 0;
        this.template.style.display = 'none';
    };

    this.setContent = function (content) {
        this.template.appendChild(content);
    };

    this.setText = function (text) {
        this.template.innerHTML = text;
    };

    this.getHtml = function(){
        return this.template;
    };

};

var Menu = function (name) {
    BlockElement.call(this);
    this.hide();
    this.name = name;



    this.menuItems = [];

    this.addMenuItem = function(item){
        this.menuItems.push(item);

        return this;
    };

    this.setItemSize = function(width, height){
        for(var i=0; i<this.menuItems.length; i++){
            this.menuItems[i].setSize(width,height);
        }
        return this;
    };


    this.getHtml = function(){
        this.repositionChildren();
        for(var i=0; i<this.menuItems.length; i++){
            this.setContent(this.menuItems[i].getHtml());
        }
        return this.template;
    };

    this.repositionChildren = function(){
        var bais = {x:0,y:0};
        for(var i=0; i<this.menuItems.length; i++){
            this.menuItems[i].setPosition(bais.x);
            bais.x+=this.menuItems[i].size.width;
        }
    };


    this.showItems = function(){

    };

    this.template.style.backgroundColor = "white";
    this.mouseOver = function(){
        this.template.style.backgroundColor = "red";
    };
    this.mouseOut = function(){
        this.template.style.backgroundColor = "white";
    };

    this.initMenu = function(){
        var self = this;
        this.setText(this.name);
        this.template.onmouseover = function () {
            self.mouseOver();
        };
        this.template.onmouseout = function () {
            self.mouseOut();
        }
    };
    this.initMenu();
};

var MenuItem = function(name){
    Menu.call(this,name);

    this.init = function(){
        var self = this;
        // this.template.onmouseover = function(){
        //    self.template.style.color="red";
        // }
    };

    this.init();
};