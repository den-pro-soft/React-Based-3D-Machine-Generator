/**
 * Created by dev on 14.01.19.
 */
import CreatorToolsInTwoSteps from './CreatorToolsInTwoSteps';
import Arc from './../../model/elements/Arc'
import Line from './../../model/math/Line'

export default class CircleTool extends CreatorToolsInTwoSteps{
    constructor(document){
        super(document);
        this.cursor.src = 'images/Circle.png';
    }

    /**
     * @return {Arc}
     */
    get circle(){
        return this._element;
    }

    setPosition2(point){
        this.circle.radius=new Line(this.circle.center, point).length();
    }

    createElement(point){
        return new Arc(point, 0);
    }
}