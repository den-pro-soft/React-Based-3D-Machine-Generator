
import Tool from './Tool';
import Line from '../../model/elements/Line';
import Point from '../../model/Point';
import Group from '../../model/elements/Group';
import Rect from '../../model/Rect';

class RectElementController extends Rect{
    constructor(p1,p2){
        super(p1,p2);
        this.group = new Group();
        this.l1 = new Line(p1, new Point(p2.x, p1.y));
        this.l2 = new Line(new Point(p2.x, p1.y), p2);
        this.l3 = new Line(p2, new Point(p1.x, p2.y));
        this.l4 = new Line(new Point(p1.x, p2.y),p1);

        this.group.addElement(this.l1);
        this.group.addElement(this.l2);
        this.group.addElement(this.l3);
        this.group.addElement(this.l4);
    }

    set p1(p1){
        this.l1.p1=p1;
        this.l1.p2.y=p1.y;
        this.l2.p2.y=p1.y;
        this.l3.p2.x=p1.x;
        this.l4.p1.x=p1.x;
        this.l4.p2=p1;
        this._p1=p1;
    }

    set p2(p2){
        this.l1.p2.x=p2.x;
        this.l2.p1.x=p2.x;
        this.l2.p2=p2;
        this.l3.p1=p2;
        this.l3.p2.y=p2.y;
        this.l4.p1.y=p2.y;
        this._p2=p2;
    }

    /**
     * @return {Group}
     */
    toElement(){
        return this.group;
    }
}


export default class PointerTool extends Tool{
    constructor(document){
        super(document);

        this._mouseDown = false;
                
        this._selectElements = [];

        /** @var {Element} */
        this.selectRect = null;
        
        this._selectMode = true;
    }

    mouseMove(point){
        if(this.selectRect){
            this.selectRect.p2=point;
        }else {
            if (!this._mouseDown && this._selectMode) {
                this._selectNearElements(point);
            }
        }

        return this._selectMode;
    }

    mouseDbClick(point){
        this._selectMode=!this._selectMode;
    }


    mouseClick(point){
        // let scale = container.board._scale; //todo: container
        // this._selectElements = [...this._selectElements, ...this.document.getNearElements(point, (scale>1?0.2:0.05)/scale)];
    }

    mouseDown(point){
        if(this._selectMode) {
            this.selectRect = new RectElementController(point, point);
        }
        this._mouseDown=true;
    }

    mouseUp(point){
        if(this.selectRect) {
            this._selectElements = this.document.getElementsIntoFigure(this.selectRect);
            this.selectRect = null;
        }
        this._mouseDown=false;
    }


    renderElement(){
        if(this.selectRect){
            let element = this.selectRect.toElement();
            element._renderer.drawAsNew();
            element.render();
        }
        for(let element of this._selectElements){
            element._renderer.setFocus(true);
        }
    }

    _selectNearElements(point){
        let scale = container.board._scale; //todo: container
        let elements = this.document.getNearElements(point, (scale>1?0.2:0.05)/scale);
        for(let element of elements){
            element._renderer.setFocus(true);
        }
    }
}