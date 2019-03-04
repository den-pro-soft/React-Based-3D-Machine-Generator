/**
 * Created by dev on 28.02.19.
 */

import ElementModificationCommand from './ElementModificationCommand';

import Document from './../../model/Document';

import Matrix from './../../model/math/Matrix';

import Spline from './../../model/elements/Spline';
import Arc from './../../model/elements/Arc';
import Point from './../../model/Point';
import Trigonimetric from './../../model/math/Trigonometric';
import Line from './../../model/math/Line';

/**
 * @inheritDoc
 */
export default class MoveBasePointsCommand extends ElementModificationCommand{
    /**
     * @param {Document} document
     * @param {Array.<Element>} elements - list of
     * @param {Point} point
     * @param {Vector} vector
     */
    constructor(document, elements, point, vector){
        super(document, elements);

        this.point=point;

        this.vector=vector;
        this.name='MoveBasePointsCommand';

        let scale = container.resolve('mainBoard')._scale; //todo: maybe set from the using place
        this.Eps = (scale>1?0.2:0.05)/scale;
    }

    /**
     * @inheritDoc
     */
    executeCommand(){
        /** @type {Array.<{element:GraphicElement, point:Point}>} */
        let movePoints = this._reduceElementsWithPoints();

        if(movePoints.length==0) {
            return false;
        }

        let moveMatrix = Matrix.createMoveMatrix(this.vector.x, this.vector.y);
        for(let {point, element} of movePoints) {
            if(element instanceof Spline){
                this._changeSpline(element, point, moveMatrix);
            }else if(element instanceof Arc){
                this._changeArc(element, point, moveMatrix);
            }else {
                point.changeByMatrix(moveMatrix);
            }
        }
        return true;
    }

    /**
     * @param {Arc} arc
     * @param {Point} point
     * @param {Matrix} matrix
     * @private
     */
    _changeArc(arc, point, matrix){
        let startPoint = new Point();
        startPoint.x = arc.center.x + arc.radius * Math.cos(Trigonimetric.gradToRad(arc.startAngle));
        startPoint.y = arc.center.y + arc.radius * Math.sin(Trigonimetric.gradToRad(arc.startAngle));
        let newPoint = point.copy();

        newPoint.changeByMatrix(matrix);

        if(point.isNear(startPoint, this.Eps)){
            let l1 = new Line(arc.center, startPoint);
            let l2 = new Line(arc.center, newPoint);

            let angle = l1.toVector().getAngle(l2.toVector());

            console.log(angle);

            arc.startAngle=arc.startAngle+angle;

            return;
        }
        let endPoint = new Point();
        endPoint.x = arc.center.x + arc.radius * Math.cos(Trigonimetric.gradToRad(arc.endAngle));
        endPoint.y = arc.center.y + arc.radius * Math.sin(Trigonimetric.gradToRad(arc.endAngle));



    }


    _changeSpline(element, point, matrix){
        if(point.compare(element.startPoint)){
            element.controlPoint1.changeByMatrix(matrix);
        }else if(point.compare(element.endPoint)){
            element.controlPoint2.changeByMatrix(matrix);
        }
        point.changeByMatrix(matrix);
    }

    /**
     * @return {Array.<{element:GraphicElement, point:Point}>}
     * @private
     */
    _reduceElementsWithPoints(){
        let simpleElements = Document.toSimpleListElements(this.elements);


        let movePoints = [];

        for(let element of simpleElements){
            let points = element.getMagnificationPoints();
            if(element instanceof Arc){
                points = element.extremePoints;
                if(!points){
                    continue;
                }
            }
            for(let point of points){
                if(point.isNear(this.point, this.Eps)){
                    movePoints.push({element:element, point:point});
                }
            }
        }
        return movePoints;
    }
}