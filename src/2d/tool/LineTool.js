/**
 * Created by dev on 09.01.19.
 */

import Tool from './Tool';
import Line from '../../model/elements/Line';
import AddElementCommand from './../../2d/command/AddElementCommand';

export default class LineTool extends Tool{
    constructor(document){
        super(document);

        this._line = null;

        this.cursor.src = 'images/Line.png';
        this.step = 0;
    }

    mouseMove(point){
        super.mouseMove(point);
        if(this._line){
            this._line.p2=point;
            this._selectNearElements(point);
            return true;
        }
        return false;
    }

    mouseClick(point){
        if(this.step==2) {
            this._line = null;
        }
    }

    mouseDown(point){
        if(!this._line){
            this._line = new Line(point, point);
            this._line._renderer.drawAsNew();
            this.step = 1;
        }else{
            this.step=2;
        }
    }

    mouseUp(point){
        if(this._line){
            if(this.step ==2) {
                this._line.p2 = point;
                app.executeCommand(new AddElementCommand(this._document, this._line));
                this._line._renderer.new = false;
                this._line = null;
            }
        }
    }

    render(){
        if(this._line){
            this._line.render();
        }
        super.render();
    }
    
    
    _selectNearElements(point){
        let scale = container.board._scale; //todo: container
        let elements = this.document.getNearElements(point, (scale>1?0.2:0.05)/scale);
        for(let element of elements){
            element._renderer.setFocus(true);
        }
    }
}