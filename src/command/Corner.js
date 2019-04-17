
import ElementModificationCommand from './ElementModificationCommand';

import LineElement from '../model/elements/LineElement';
import Trigonometric from '../model/math/Trigonometric';
import Vector from '../model/math/Vector';
import CornerDataValidator from "./behaviors/CornerDataValidator";
import Document from './../model/Document';
import Line from "../model/math/Line";
import Arc from "../model/elements/Arc";
import LineArc from "../model/math/algorithms/intersects/LineArc";
import CornerDialog from "./behaviors/CornerDialog";

let lineArcIntersector = new LineArc();

export default class Corner extends ElementModificationCommand{

    static TYPE_ROUND = "round";

    /**
     * @param {Document} document
     * @param {Array.<Element>} elements
     */
    constructor(document, elements){
        super(document, elements);

        this.name= 'Corner';

        this.type = Corner.TYPE_ROUND;

        this.behaviors.push(new CornerDataValidator(this));
        this.behaviors.push(new CornerDialog(this));

        this.newElements = [];

        /** @type {number} - the radius fo corner. Millimeters */
        this.radius = 5;
    }


    addNewElement(element){
        for(let el of this.newElements){
            if(el.compare(element)){
                return;
            }
        }
        this.newElements.push(element);
    }

    /**
     * The method need for operation witch replacing or adding any elements.
     * For example command copy, the command creates new element so the method will return true.
     * @return {boolean} - return true if the command replacing or adding any elements
     */
    isReplacedElements(){
        return this.newElements.length>0;
    }

    /**
     * The realisation of the  @see {@link isReplacedElements} method.
     * @return {Array.<GraphicElement>|null} - new elements or null
     * @protected
     */
    getReplaceElements(){
        return this.newElements;
    }


    /**
     * @inheritDoc
     */
    executeCommand(){
        let res = false;
        switch (this.type) {
            case Corner.TYPE_ROUND:
                res = this.cornerRound();
                break;
            default:
                console.error("Unsupported corner type.");
        }


        return res;
    }

    cornerRound(){
        let res = false;
        for(let i=0; i<this.elements.length-1; i++){
            for(let j=i+1; j<this.elements.length; j++) {
                res |= this.cornerRoundTwoLines(this.elements[i], this.elements[j]);
            }
        }
        return res;
    }

    /**
     *
     * @param {LineElement} line1
     * @param {LineElement} line2
     * @return {boolean}
     */
    cornerRoundTwoLines(line1, line2){
        let intersectPoint  = line1._line.getCrossPoint(line2._line);
        if(!intersectPoint){
            console.log("The line isn't intersecting");
            return false;
        }
        let baseVector = new Vector(1);

        let newArc = null;
        let startAngle = 0;
        let endAngle = 0;
        if(line1.p1.compare(intersectPoint) && line2.p1.compare(intersectPoint)){
            console.log("1");
            let angle = new Line(intersectPoint, line1.p2).toVector().getAngle(new Line(intersectPoint, line2.p2).toVector());
            console.log(angle);
            if(angle<180){
                let medianaElement = new LineElement(intersectPoint, line2.p2.copy());
                medianaElement.rotate(intersectPoint, angle/2);

                medianaElement._line.setLength(this.radius/Math.sin(Trigonometric.gradToRad(angle/2)));

                newArc = new Arc(medianaElement.p2, this.radius);
                let points = lineArcIntersector.getIntersectPoints(line2, newArc);
                let p1 = points[0];

                startAngle = baseVector.getAngle(new Line(newArc.center, points[0]).toVector());

                points = lineArcIntersector.getIntersectPoints(line1, newArc);

                endAngle = baseVector.getAngle(new Line(newArc.center, points[0]).toVector());

                line2.p1=p1;
                line1.p1=points[0];

            }else {
                let medianaElement = new LineElement(intersectPoint, line2.p2.copy());
                medianaElement.rotate(intersectPoint, -(360-angle)/2);
                medianaElement._line.setLength(-this.radius/Math.sin(Trigonometric.gradToRad(-(360-angle)/2)));

                newArc = new Arc(medianaElement.p2, this.radius);

                let points = lineArcIntersector.getIntersectPoints(line2, newArc);
                let p1 = points[0];

                endAngle = baseVector.getAngle(new Line(newArc.center, points[0]).toVector());

                points = lineArcIntersector.getIntersectPoints(line1, newArc);

                startAngle = baseVector.getAngle(new Line(newArc.center, points[0]).toVector());

                line2.p1=p1;
                line1.p1=points[0];
            }
        }else if(line1.p1.compare(intersectPoint) && line2.p2.compare(intersectPoint)){
            console.log("2");
            let angle = new Line(intersectPoint, line1.p2).toVector().getAngle(new Line(intersectPoint, line2.p1).toVector());
            console.log(angle);
            if(angle<180){
                let medianaElement = new LineElement(intersectPoint, line2.p1.copy());
                medianaElement.rotate(intersectPoint, angle/2);

                medianaElement._line.setLength(this.radius/Math.sin(Trigonometric.gradToRad(angle/2)));
                newArc = new Arc(medianaElement.p2, this.radius);
                let points = lineArcIntersector.getIntersectPoints(line2, newArc);
                let p1 = points[0];

                let startAngle = baseVector.getAngle(new Line(newArc.center, points[0]).toVector());

                points = lineArcIntersector.getIntersectPoints(line1, newArc);

                endAngle = baseVector.getAngle(new Line(newArc.center, points[0]).toVector());

                line2.p2=p1;
                line1.p1=points[0];

            }else {
                let medianaElement = new LineElement(intersectPoint, line2.p1.copy());
                medianaElement.rotate(intersectPoint, -(360-angle)/2);
                medianaElement._line.setLength(-this.radius/Math.sin(Trigonometric.gradToRad(-(360-angle)/2)));
                newArc = new Arc(medianaElement.p2, this.radius);
                let points = lineArcIntersector.getIntersectPoints(line2, newArc);
                let p1 = points[0];

                endAngle = baseVector.getAngle(new Line(newArc.center, points[0]).toVector());

                points = lineArcIntersector.getIntersectPoints(line1, newArc);

                startAngle = baseVector.getAngle(new Line(newArc.center, points[0]).toVector());

                line2.p2=p1;
                line1.p1=points[0];
            }
        }else if(line1.p2.compare(intersectPoint) && line2.p1.compare(intersectPoint)){
            console.log("3");
            let angle = new Line(intersectPoint, line1.p1).toVector().getAngle(new Line(intersectPoint, line2.p2).toVector());
            console.log(angle);
            if(angle<180){
                let medianaElement = new LineElement(intersectPoint, line2.p2.copy());
                medianaElement.rotate(intersectPoint, angle/2);

                medianaElement._line.setLength(this.radius/Math.sin(Trigonometric.gradToRad(angle/2)));

                newArc = new Arc(medianaElement.p2, this.radius);
                let points = lineArcIntersector.getIntersectPoints(line2, newArc);
                let p1 = points[0];

                startAngle = baseVector.getAngle(new Line(newArc.center, points[0]).toVector());

                points = lineArcIntersector.getIntersectPoints(line1, newArc);

                endAngle = baseVector.getAngle(new Line(newArc.center, points[0]).toVector());

                line2.p1=p1;
                line1.p2=points[0];

            }else {
                let medianaElement = new LineElement(intersectPoint, line2.p2.copy());
                medianaElement.rotate(intersectPoint, -(360-angle)/2);
                medianaElement._line.setLength(-this.radius/Math.sin(Trigonometric.gradToRad(-(360-angle)/2)));

                newArc = new Arc(medianaElement.p2, this.radius);

                let points = lineArcIntersector.getIntersectPoints(line2, newArc);
                let p1 = points[0];

                endAngle = baseVector.getAngle(new Line(newArc.center, points[0]).toVector());

                points = lineArcIntersector.getIntersectPoints(line1, newArc);

                startAngle = baseVector.getAngle(new Line(newArc.center, points[0]).toVector());

                line2.p1=p1;
                line1.p2=points[0];
            }
        }else if(line1.p2.compare(intersectPoint) && line2.p2.compare(intersectPoint)){
            console.log("4");
            let angle = new Line(intersectPoint, line1.p1).toVector().getAngle(new Line(intersectPoint, line2.p1).toVector());
            console.log(angle);
            if(angle<180){
                let medianaElement = new LineElement(intersectPoint, line2.p1.copy());
                medianaElement.rotate(intersectPoint, angle/2);

                medianaElement._line.setLength(this.radius/Math.sin(Trigonometric.gradToRad(angle/2)));

                newArc = new Arc(medianaElement.p2, this.radius);
                let points = lineArcIntersector.getIntersectPoints(line2, newArc);
                let p1 = points[0];

                startAngle = baseVector.getAngle(new Line(newArc.center, points[0]).toVector());

                points = lineArcIntersector.getIntersectPoints(line1, newArc);

                endAngle = baseVector.getAngle(new Line(newArc.center, points[0]).toVector());

                line2.p2=p1;
                line1.p2=points[0];

            }else {
                let medianaElement = new LineElement(intersectPoint, line2.p1.copy());
                medianaElement.rotate(intersectPoint, -(360-angle)/2);
                medianaElement._line.setLength(-this.radius/Math.sin(Trigonometric.gradToRad(-(360-angle)/2)));

                newArc = new Arc(medianaElement.p2, this.radius);

                let points = lineArcIntersector.getIntersectPoints(line2, newArc);
                let p1 = points[0];

                endAngle = baseVector.getAngle(new Line(newArc.center, points[0]).toVector());

                points = lineArcIntersector.getIntersectPoints(line1, newArc);

                startAngle = baseVector.getAngle(new Line(newArc.center, points[0]).toVector());

                line2.p2=p1;
                line1.p2=points[0];
            }
        }

        if(newArc){
            newArc.startAngle=startAngle;
            newArc.endAngle=endAngle;
            this.document.addElement(newArc);
            this.addNewElement(newArc);
            this.addNewElement(line1);
            this.addNewElement(line2);
            return true;
        }
        console.log("palundra");


    }

}