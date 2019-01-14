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

    /**
     * The method sets size for internal part of block
     * @param width
     * @param height
     * @returns {BlockElement}
     */
    setSize(width,height){
        if(!width){
            width = this.size.width;
        }
        if(!height){
            height = this.size.height;
        }
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

    /**
     * The method removing all children elements of the block
     * @returns {BlockElement}
     */
    clearContent(){
        while (this.template.firstChild) {
            this.template.removeChild(this.template.firstChild);
        }
        return this;
    }

    /**
     * @public
     * The method sets content text on the block
     *
     * Warning: the method can remove all children of ht block
     *
     * @param text
     * @returns {BlockElement}
     */
    setContentText(text) {
        this.template.innerHTML = text;
        return this;
    }

    /**
     * @public
     * The method returns an HTML element that can be manipulated using this object
     * @returns {HTMLElement}
     */
    getHtml(){
        return this.template;
    }

    setStyle(styleName, value){
        this.template.style[styleName] = value;
        return this.template.style[styleName] != value;
    }

    getFullSize(){
        return {width:this.template.clientWidth, height:this.template.clientWidth};
    }

}

export {BlockElement};