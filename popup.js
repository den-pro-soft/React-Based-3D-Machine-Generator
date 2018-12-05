/**
 * Created by dev on 04.12.18.
 */

var Popup = function(parent){
    this.parent = parent;
    this.popup = element('div').classname('popup');
    this.header = element('div',this.popup).background('#bbbbbb');
    this.close = element('img',this.header).size(20,20).cursor('pointer');
    this.close.src="images/Delete.png";

    

    this.setSize = function(width, height){
        this.popup.size(width, height+25);
        this.header.size(width,25);
        this.close.position(this.header.width-23,3);
        return this;
    };


    this.setPosition = function(x,y){
        this.popup.position(x, y);
        this.header.position(0,0);

        this.close.position(this.header.width-23,3);
        return this;
    };

    this.moveToCenter = function(){
        this.setPosition(innerWidth/2-this.popup.width/2,innerHeight/2-this.popup.height/2);
        return this;
    };


    this.setContent = function(content){
        content.style.position = 'absolute';
        content.style.left = '0px';
        content.style.top = '25px';
        this.popup.appendChild(content);
        return this;
    };

    this.hide = function(){
        this.popup.hide();
        return this;
    };

    this.show = function(){
        this.popup.show();
        return this;
    };
    
    this.init = function(){
        this.hide();
        if(this.parent){
            this.popup.order(parent.style.zIndex+100);
        }else{
            this.popup.order(2000);
        }

        var self = this;
        this.close.onclick= function(){
            self.hide();
        };
    };
    
    this.init();
};