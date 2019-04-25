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
import ShapeSize from "../rules/ShapeSize";
import ShapeBuilder from "../ShapeBuilder";
import Group from "../../model/elements/Group";
import SelectTool from "../../ui/2d/tool/SelectTool";
import MagnificationDecorator from "../../ui/2d/tool/decorators/MagnificationDecorator";
import CrossItself from "../rules/CrossItself";
import OverlappingLine from "../rules/OverlappingLine";

export default class ErrorModelAnalyzer extends Analyzer{

    /**
     * @param {Document} document
     */
    constructor(document){
        super(document);

        this.rules.push(new OverlappingLine(document));
        this.rules.push(new LineInNoShapeRule(document));
        this.rules.push(new NotClosedShape(document));
        this.rules.push(new CrossItself(document));
        this.rules.push(new DifferentZInShape(document));
        this.rules.push(new ShapeCrossing(document));
        this.rules.push(new ZValueOfOuterShape(document));
        this.rules.push(new ZValueOfInnerShape(document));
        this.rules.push(new HoleInsideAnotherHole(document));
        this.rules.push(new ShapeSize(document));
        this.rules.push(new SameZValue(document));
    }


    /**
     * @inheritDoc
     * @return {Promise.<boolean>}
     */
    analyze(){
        return new Promise((resolve, reject)=>{
            super.analyze().then((res)=>{
                if(res) {
                    this.groupShapes();
                }
                resolve(res);
            }).catch(error=>{
                reject(error);
            });
        });
    }

    /**
     * @private
     */
    groupShapes(){
        let vasGroup = false;

        let shapeBuilder = new ShapeBuilder(this.document);
        let shapes = shapeBuilder.buildShapes();

        for(let shape of shapes){
            let elements = shape.elements;
            if(elements.length<2){
                continue;
            }
            let group = new Group();
            for(let el of elements){
                this.document.removeElement(el);
                group.addElement(el);
            }
            vasGroup=true;
            this.document.addElement(group);
        }
        if(vasGroup){
            let board = container.resolve('mainBoard');
            let isSelectedTool = board.tool instanceof SelectTool || (board.tool instanceof MagnificationDecorator && board.tool._tool instanceof SelectTool);
            if(isSelectedTool){
                board.tool.clearSelectElements();
            }
        }
    }
}
