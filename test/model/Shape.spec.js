import Document from "../../src/model/Document";
import RectElement from "../../src/model/elements/RectElement";
import Point from "../../src/model/Point";
import ShapeBuilder from "../../src/analyzer/ShapeBuilder";
import Shape from "../../src/model/elements/Shape";
import Arc from "../../src/model/elements/Arc";
import LineElement from "../../src/model/elements/LineElement";

var chai = require('chai');
var expect = chai.expect;

describe('Shape', function() {
    describe('isContain', function() {
        describe('Point', function(){
            it('Point in rect', function() {
                let doc = new Document();
                doc.addElement(new RectElement(new Point(-5,5), new Point(5, -5)).toElement());

                let shape = new ShapeBuilder(doc).buildShapes()[0];

                let res = shape.isContain(new Point());

                expect(res).to.be.true;
            });
            it('Point out rect', function() {
                let doc = new Document();
                doc.addElement(new RectElement(new Point(-5,5), new Point(5, -5)).toElement());

                let shape = new ShapeBuilder(doc).buildShapes()[0];

                let res = shape.isContain(new Point(10,10));

                expect(res).to.be.false;
            });
        });

        describe('Shape', function(){
            it('rect in rect', function(){
                let shape1 = new Shape();
                let elements = new RectElement(new Point(-5,5), new Point(5, -5)).toElement().toSimpleElements();
                for(let element of elements){
                    shape1.addElement(element);
                }

                let shape2 = new Shape();
                elements = new RectElement(new Point(-2,2), new Point(2, -2)).toElement().toSimpleElements();
                for(let element of elements){
                    shape2.addElement(element);
                }

                expect(shape1.isContain(shape2)).to.be.true;
                expect(shape2.isContain(shape1)).to.be.false;
            });

            it('rect into shape with arc', function(){
                let shape1 = new Shape();
                let elements = new RectElement(new Point(-2,2), new Point(2, -2)).toElement().toSimpleElements();
                for(let element of elements){
                    shape1.addElement(element);
                }

                let shape2 = new Shape();
                let arc = new Arc(new Point(5),5);
                arc.startAngle=270;
                arc.endAngle=90;
                shape2.addElement(arc);
                shape2.addElement(new LineElement(new Point(5,5), new Point(-5,5)));
                shape2.addElement(new LineElement(new Point(5,-5), new Point(-5,-5)));
                shape2.addElement(new LineElement(new Point(-5,5), new Point(-5,-5)));

                expect(shape2.isContain(shape1)).to.be.true;
                expect(shape1.isContain(shape2)).to.be.false;

            });

            it('shape with arc into arc', function(){
                let shape1 = new Shape();
                let element = new Arc(new Point(), 15);
                shape1.addElement(element);

                let shape2 = new Shape();
                let arc = new Arc(new Point(5),5);
                arc.startAngle=270;
                arc.endAngle=90;
                shape2.addElement(arc);
                shape2.addElement(new LineElement(new Point(5,5), new Point(-5,5)));
                shape2.addElement(new LineElement(new Point(5,-5), new Point(-5,-5)));
                shape2.addElement(new LineElement(new Point(-5,5), new Point(-5,-5)));

                expect(shape1.isContain(shape2)).to.be.true;
                expect(shape2.isContain(shape1)).to.be.false;

            });
        });

    });

});