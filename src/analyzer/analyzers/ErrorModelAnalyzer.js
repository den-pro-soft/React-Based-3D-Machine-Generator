/**
 * Created by dev on 22.03.19.
 */

import Analyzer from './../Analyzer';

import LineInNoShapeRule from './../rules/LineInNoShape';
import NotClosedShape from './../rules/NotClosedShape';
import DifferentZInShape from './../rules/DifferentZInShape';
import ZValueOfOuterShape from "../rules/ZValueOfOuterShape";
import ShapeCrossing from "../rules/ShapeCrossing";
import ZValueOfInnerShape from "../rules/ZValueOfInnerShape";
import HoleInsideAnotherHole from "../rules/HoleInsideAnotherHole";
import SameZValue from "../rules/SameZValue";

export default class ErrorModelAnalyzer extends Analyzer{

    /**
     * @param {Document} document
     */
    constructor(document){
        super(document);

        this.rules.push(new LineInNoShapeRule(document));
        this.rules.push(new NotClosedShape(document));
        this.rules.push(new DifferentZInShape(document));
        this.rules.push(new ShapeCrossing(document));
        this.rules.push(new ZValueOfOuterShape(document));
        this.rules.push(new ZValueOfInnerShape(document));
        this.rules.push(new HoleInsideAnotherHole(document));
        this.rules.push(new SameZValue(document));
    }
    
}
