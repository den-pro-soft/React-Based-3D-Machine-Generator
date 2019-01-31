/**
 * Created by dev on 31.01.19.
 */

import CreatorTool from './CreatorTool';
import AddElementCommand from './../../2d/command/AddElementCommand';

export default class CreatorToolsInTwoSteps extends CreatorTool{
    constructor(document){
        super(document);

        this._element = null;
        this.step=0
    }

    get graphicElement(){
        return this._element;
    }

    mouseMove(point, e){
        super.mouseMove(point);
        if(this._element){
            this.setPosition2(point);
            this._selectNear_elements(point);
            return true;
        }
        return false;
    }

    mouseClick(point, e){
        if(this.step==2) {
            this._element = null;
        }
    }

    mouseDown(point, e){
        if(!this._element){
            this._element = this.createElement(point);
            this.graphicElement._renderer.drawAsNew();
            this.step = 1;
        }else{
            this.step=2;
        }
    }

    mouseUp(point, e){
        if(this._element){
            if(this.step ==2) {
                this.setPosition2(point);
                app.executeCommand(new AddElementCommand(this._document, this.graphicElement));
                this.graphicElement._renderer.resetConfig();
                this._element = null;
            }
        }
    }

    render(){
        if(this.graphicElement){
            this.graphicElement.render();
        }
        super.render();
    }

    _selectNear_elements(point){
        let scale = container.board._scale; //todo: container
        let _elements = this.document.getNearElements(point, (scale>1?0.2:0.05)/scale);
        for(let element of _elements){
            element._renderer.setFocus(true);
        }
    }

    setPosition2(point){
        throw new Exception("The method doesn't have implementation");
    }

    createElement(point){
        throw new Exception("The method doesn't have implementation");
    }
}