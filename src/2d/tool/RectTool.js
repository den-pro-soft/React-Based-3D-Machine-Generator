/**
 * Created by dev on 11.01.19.
 */

import Tool from './Tool'
import RectElementController from './RectElementControler'
import AddElementCommand from './../../2d/command/AddElementCommand';

export default class RectTool extends Tool{
    constructor(document){
        super(document);
        
        this._rect = null;

        this.cursor.src = 'images/Rectangle.png';
    }

    mouseMove(point){
        super.mouseMove(point);
        if(this._rect){
            this._rect.p2=point;
            return true;
        }
    }

    mouseDbClick(point){
    }

    mouseClick(point){
    }

    mouseDown(point){
        if(!this._rect){
            this._rect = new RectElementController(point, point);
            this._rect.toElement()._renderer.drawAsNew();
        }
    }

    mouseUp(point){
        if(this._rect) {
            this._rect.p2=point;
            let element = this._rect.toElement();
            app.executeCommand(new AddElementCommand(this._document, element));
            this._rect = null;
        }
    }

    render(){
        if(this._rect) {
            this._rect.toElement().render();
        }
        super.render();
    }
}