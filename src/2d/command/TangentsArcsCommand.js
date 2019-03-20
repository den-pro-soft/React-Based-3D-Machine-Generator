/**
 * Created by dev on 19.03.19.
 */

/**
 * Created by dev on 12.02.19.
 */

import ElementModificationCommand from './ElementModificationCommand';
import Document from './../../model/Document';
import LineElement from './../../model/elements/LineElement';
import Arc from './../../model/elements/Arc';
import Line from './../../model/math/Line';
import Point from './../../model/Point';

import ArcArcIntersector from './../../model/math/algorithms/intersects/ArcArc';
import LineArcIntersector from './../../model/math/algorithms/intersects/LineArc';

let arcArcIntersector = new ArcArcIntersector();
let lineArcIntersector = new LineArcIntersector();

export default class TangentsArcsCommand extends ElementModificationCommand{
    /**
     * @param {Document} document
     * @param {Array.<Element>} elements
     */
    constructor(document, elements){
        super(document, elements);

        this.name = 'TangentsArcsCommand';

        this.newElements = [];

        this.selectOneElement=true;
    }

    /**
     * @inheritDoc
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
        let newEl = TangentsArcsCommand.tangentsArcs(this.elements[0], this.elements[1]);
        this.newElements.push(...newEl);
        for(let el of newEl){
            this._document.addElement(el);
        }

        return true;
    }


    /**
     *
     * @param {Arc} arc1
     * @param {Arc} arc2
     * @return {Array.<LineElement>}
     */
    static tangentsArcs(arc1,arc2){
        let res = [];
        if(arc1.radius==arc2.radius){
            console.log("radiuses are equals");
            //todo: parallel moving of the line o1,o2
        }else{
            //arc1 is smaller arc than arc2
            if(arc1.radius>arc2.radius){
                let temp = arc1;
                arc1=arc2;
                arc2=temp;
            }
            let addArcInCenter = new Arc(arc2.center, arc2.radius-arc1.radius);
            let tempLine = new Line(arc1.center, arc2.center);
            let addArcBetween = new Arc(tempLine.getPointOffset(0.5), tempLine.length()/2);

            let intersectPoints = arcArcIntersector.getIntersectPoints(addArcInCenter, addArcBetween);
            for(let p of intersectPoints){
                let tempLine = new Line(arc2.center.copy(), p.copy());
                tempLine.setLength(arc2.radius+1);

                let lineElement = new LineElement(tempLine._p1, tempLine._p2);

                let intersectPoints = lineArcIntersector.getIntersectPoints(lineElement, arc2);
                if(intersectPoints.length==1){
                    let p1 = intersectPoints[0];

                    lineElement.move(arc1.center.x-arc2.center.x, arc1.center.y-arc2.center.y);

                    intersectPoints = lineArcIntersector.getIntersectPoints(lineElement, arc1);
                    if(intersectPoints.length==1){
                        res.push(new LineElement(p1,intersectPoints[0]));
                    }
                }
            }
        }
        return res;
    }

    /**
     *
     * @param {Arc} arc
     * @param {Point} point
     * @return {Array.<Line>}
     */
    static getTangentByPoint(arc, point){
        let line = new Line(arc.center, point);
        if(line.length()<arc.radius){
            return [];
        }
        let center = line.getPointOffset(0.5);
        
        let tempArc = new Arc(center, line.length()/2);

        let intersectPoints = arcArcIntersector.getIntersectPoints(arc, tempArc);
        let res = [];

        for(let p of intersectPoints){
            res.push(new Line(point.copy(), p.copy()));
        }

        return res;
    }

}


















