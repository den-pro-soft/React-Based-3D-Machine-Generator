/**
 * Created by dev on 14.01.19.
 */
import Tool from './Tool'
import Arc from './../../model/elements/Arc'
import Line from './../../model/elements/Line'
import AddElementCommand from './../../2d/command/AddElementCommand';

export default class CircleTool extends Tool{
    constructor(document){
        super(document);

        this._circle = null;

        this.cursor.src = 'images/Circle.png';
    }

    mouseMove(point){
        super.mouseMove(point);
        if(this._circle){
            this._circle.radius = new Line(this._circle.center, point).length();
            this._selectNearElements(point);
            return true;
        }
        return false;
    }

    mouseClick(point){
        this._circle=null;
    }

    mouseDown(point){
        if(!this._circle){
            this._circle = new Arc(point, 0);
            this._circle._renderer.drawAsNew();
        }
    }

    mouseUp(point){
        if(!point.compare(this._circle.center)){
            this._circle.radius=new Line(this._circle.center, point).length();;
            app.executeCommand(new AddElementCommand(this._document, this._circle));
            this._circle=null;
        }
    }

    render(){
        if(this._circle){
            this._circle.render();
        }
        super.render();
    }


    _selectNearElements(point){
        let scale = container.board._scale; //todo: container
        let elements = this._document.getNearElements(point, (scale>1?0.2:0.05)/scale);
        for(let element of elements){
            element._renderer.setFocus(true);
        }
    }
}