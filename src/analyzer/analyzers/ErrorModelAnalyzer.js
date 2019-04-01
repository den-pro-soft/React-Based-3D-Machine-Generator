/**
 * Created by dev on 22.03.19.
 */

import Analyzer from './../Analyzer';

import LineInNoShapeRule from './../rules/LineInNoShape';
import NotClosedShape from './../rules/NotClosedShape';
import DifferentZInShape from './../rules/DifferentZInShape';

export default class ErrorModelAnalyzer extends Analyzer{

    /**
     * @param {Document} document
     */
    constructor(document){
        super(document);

        this.rules.push(new LineInNoShapeRule(document));
        this.rules.push(new NotClosedShape(document));
        this.rules.push(new DifferentZInShape(document));
    }
    
}
