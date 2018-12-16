class BlockElement{
    constructor(){
        this.position = {x:0,y:0}; //x is horizontal, y is a vertical
        this.size = {width:0, height:0};

        this.template = document.createElement('div');
        this.setStyle('position', 'absolute');
        this.visible=false;
    }


    setPosition(x,y){
        this.position = {x:x,y:y};
        this.setStyle('left',x + 'px');
        this.setStyle('top',y + 'px');
        return this;
    }

    setSize(width,height){
        this.size = {width:width, height:height};
        this.setStyle('width', width+'px');
        this.setStyle('height', height+'px');
        return this;
    }

    show(){
        if (this.visible == true)
            return this;
        this.visible = true;
        this.setStyle('opacity', 1);
        this.setStyle('display', 'block');
        return this
    }
    
    setListStyle(list){
        for (var key in list){
            this.setStyle(key,list[key]);
        }
        return this;
    }

    hide(){
        this.visible = false;
        this.setStyle('opacity', 0);
        this.setStyle('display', 'none');
        return this;
    }

    addContent(content) {
        this.template.appendChild(content);
        return this;
    }

    clearContent(){
        while (this.template.firstChild) {
            this.template.removeChild(this.template.firstChild);
        }
        return this;
    }

    setContentText(text) {
        this.template.innerHTML = text;
        return this;
    }

    getHtml(){
        return this.template;
    }

    setStyle(styleName, value){
        this.template.style[styleName] = value;
        return this;
    }

}

export {BlockElement};