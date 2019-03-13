/**
 * Created by dev on 06.03.19.
 */

var assert = require('assert');

import IntersectElementsCommand from './../src/2d/command/IntersectElementsCommand';

import Document from './../src/model/Document';
import LineElement from './../src/model/elements/LineElement';
import Arc from './../src/model/elements/Arc';
import Point from './../src/model/Point';

import RectElement from './../src/model/elements/RectElement';


describe('Intersect', function() {
    describe('Line', function() {
        describe('intersect with Line', function() {
            /**
             * the result must be -  Line(Point(-10, -10), Point(10, 10))  Line(Point(-10, 10), Point(0, 0))  Line(Point(0, 0), Point(10, -10))
             */
            it(`after intersect the Line(Point(-10, -10), Point(10, 10)) with the Line(Point(-10, 10), Point(10,-10)) 
                    document must contain 3 lines`, function () {
                let line1  = new LineElement(new Point(-10,-10), new Point(10,10));
                let line2  = new LineElement(new Point(-10,10), new Point(10,-10));

                let doc = new Document();
                doc.addElement(line1);
                doc.addElement(line2);

                let command = new IntersectElementsCommand(doc, [line2]);
                command.executeCommand();

                assert.equal(doc._elements.length, 3);
            });
        });

        describe('intersect with Group of lines', function() {
            it(`after intersect the Line(Point(-10, -10), Point(10, 10)) with the Rect(Point(-10, 5), Point(10,-5)) 
                    document must contain 4 elements`, function () {
                let line1  = new LineElement(new Point(-10,-10), new Point(10,10));
                let rect  = new RectElement(new Point(-10,5), new Point(10,-5));

                let doc = new Document();
                doc.addElement(line1);
                doc.addElement(rect.toElement());

                let command = new IntersectElementsCommand(doc, [line1]);
                command.executeCommand();

                assert.equal(doc._elements.length, 4);
            });
        });

        describe('intersect with Circle', function() {
            describe('_intersectPointsLineArc', function () {
                it(`intersect Line(Point(-10, -10), Point(10, 10)) with the Arc(Point(0,0), 5) is two points`, function () {
                    let line  = new LineElement(new Point(-10,-10), new Point(10,10));
                    let circle = new Arc(new Point(), 5);

                    let points = IntersectElementsCommand._intersectPointsLineArc(line, circle);

                    assert.equal(points.length, 2);

                    assert.equal(points[0].x.toFixed(8),(5*Math.cos(Math.PI/4)).toFixed(8));
                    assert.equal(points[0].y.toFixed(8),(5*Math.sin(Math.PI/4)).toFixed(8));

                    assert.equal(points[1].x.toFixed(8),(-5*Math.cos(Math.PI/4)).toFixed(8));
                    assert.equal(points[1].y.toFixed(8),(-5*Math.sin(Math.PI/4)).toFixed(8));
                });

                it(`intersect Line(Point(0, -10), Point(0, 10)) with the Arc(Point(0,0), 3) is two points`, function () {
                    let line  = new LineElement(new Point(0,-10), new Point(0,10));
                    let circle = new Arc(new Point(), 3);

                    let points = IntersectElementsCommand._intersectPointsLineArc(line, circle);

                    assert.equal(points.length, 2);

                    assert.equal(points[0].x.toFixed(8),0);
                    assert.equal(points[0].y.toFixed(8),3);

                    assert.equal(points[1].x.toFixed(8),0);
                    assert.equal(points[1].y.toFixed(8),-3);
                });

                it(`intersect Line(Point(-10, 0), Point(10, 0)) with the Arc(Point(0,0), 3) is two points`, function () {
                    let line  = new LineElement(new Point(-10,0), new Point(10,0));
                    let circle = new Arc(new Point(), 3);

                    let points = IntersectElementsCommand._intersectPointsLineArc(line, circle);

                    assert.equal(points.length, 2);

                    assert.equal(points[0].x.toFixed(8),3);
                    assert.equal(points[0].y.toFixed(8),0);

                    assert.equal(points[1].x.toFixed(8),-3);
                    assert.equal(points[1].y.toFixed(8),0);
                });

                it(`intersect Line(Point(5, 5), Point(-5, -5)) witch moved on the radius with the Arc(Point(0,0), 5) is one points`, function () {
                    let line  = new LineElement(new Point(5,5), new Point(-5,-5));
                    line.move(3*Math.cos(Math.PI*0.75), 3*Math.sin(Math.PI*0.75));

                    let circle = new Arc(new Point(), 3);

                    let points = IntersectElementsCommand._intersectPointsLineArc(line, circle);
                    assert.equal(points.length, 1);
                    assert.equal(points[0].x.toFixed(8),(3*Math.cos(Math.PI*0.75)).toFixed(8));
                    assert.equal(points[0].y.toFixed(8),(3*Math.sin(Math.PI*0.75)).toFixed(8));

                });

                it(`intersect Line(Point(6, 1), Point(4, 7)) witch the Arc(Point(5,4), sqrt(10)) is two points`, function () {
                    let line  = new LineElement(new Point(6,1), new Point(4,7));
                    let circle = new Arc(new Point(5,4), Math.sqrt(10));

                    let points = IntersectElementsCommand._intersectPointsLineArc(line, circle);
                    assert.equal(points.length, 2);
                    assert.equal(points[0].x.toFixed(8),6);
                    assert.equal(points[0].y.toFixed(8),1);

                    assert.equal(points[1].x.toFixed(8),4);
                    assert.equal(points[1].y.toFixed(8),7);

                });

                it(`intersect Line(Point(5, -5), Point(5, 5)) with the Arc(Point(0,0), 3) is 0 points`, function () {

                    let line  = new LineElement(new Point(5,-5), new Point(5,5));
                    let circle = new Arc(new Point(), 3);

                    let points = IntersectElementsCommand._intersectPointsLineArc(line, circle);

                    assert.equal(points.length, 0);
                });

                it(`intersect Line(Point(5, -5), Point(6, 5)) with the Arc(Point(0,0), 3) is 0 points`, function () {

                    let line  = new LineElement(new Point(5,-5), new Point(6,5));
                    let circle = new Arc(new Point(), 3);

                    let points = IntersectElementsCommand._intersectPointsLineArc(line, circle);

                    assert.equal(points.length, 0);
                });

                it(`t1 intersect Line with the Arc is two points`,function(){
                    let line = new LineElement(new Point(-81.05284090254102, -2.6849626246029494),
                        new Point(-30.271783528768225, -2.6849626246029494));
                    let arc = new Arc(new Point(-55.550459666373186, -17.561351679034182), 26.84670898092727);

                    let points = IntersectElementsCommand._intersectPointsLineArc(line,arc);
                    assert.equal(points.length, 2);

                    assert.equal(points[0].x.toFixed(4),(-33.2023).toFixed(4));
                    assert.equal(points[0].y.toFixed(4),(-2.685).toFixed(4));

                    assert.equal(points[1].x.toFixed(4),(-77.8986).toFixed(4));
                    assert.equal(points[1].y.toFixed(3),(-2.685).toFixed(3));
                });

            });
        });

        describe('intersect with Arc', function() {
            describe('_intersectPointsLineArc', function () {
                it(`intersect Line(Point(-10, -10), Point(10, 10)) with the Arc(Point(0,0), 5) startAngle 0 and increment is 90 degrees is one points`, function () {
                    let line = new LineElement(new Point(-10, -10), new Point(10, 10));
                    let arc = new Arc(new Point(), 5);
                    arc.startAngle = 0;
                    arc.incrementAngle = 90;
                    let points = IntersectElementsCommand._intersectPointsLineArc(line, arc);

                    assert.equal(points.length, 1);
                    assert.equal(points[0].x.toFixed(8), (5 * Math.cos(Math.PI / 4)).toFixed(8));
                    assert.equal(points[0].y.toFixed(8), (5 * Math.sin(Math.PI / 4)).toFixed(8));
                });
            });

            it(`after intersect the  Line(Point(-10, -10), Point(10, 10)) with the Arc(Point(0,0), 5) startAngle 0 and increment is 90 degrees 
                    document must contain 2 lines and 1 arc`, function () {
                let line = new LineElement(new Point(-10, -10), new Point(10, 10));
                let arc = new Arc(new Point(), 5);
                arc.startAngle = 0;
                arc.incrementAngle = 90;

                let doc = new Document();
                doc.addElement(line);
                doc.addElement(arc);

                let command = new IntersectElementsCommand(doc, [line]);
                command.executeCommand();

                assert.equal(doc._elements.length, 3);
            });

            it(`after intersect Line & Arc document must contain 4 elements`,function(){
                let line = new LineElement(new Point(-81.05284090254102, -2.6849626246029494),
                                           new Point(-30.271783528768225, -2.6849626246029494));
                let arc = new Arc(new Point(-55.550459666373186, -17.561351679034182), 26.84670898092727);

                let doc = new Document();
                doc.addElement(line);
                doc.addElement(arc);

                let command = new IntersectElementsCommand(doc,[line]);
                command.executeCommand();

                assert.equal(doc._elements.length, 4);
            });

        });
        
    });

    describe('Arc',function(){
        describe('Line',function(){
            it(`after intersect the  Line(Point(-10, -10), Point(10, 10)) with the Arc(Point(0,0), 5) startAngle 0 and increment is 90 degrees 
                    document must contain 1 line and 2 arcs`, function () {
                let line = new LineElement(new Point(-10, -10), new Point(10, 10));
                let arc = new Arc(new Point(), 5);
                arc.startAngle = 0;
                arc.incrementAngle = 90;

                let doc = new Document();
                doc.addElement(line);
                doc.addElement(arc);

                let command = new IntersectElementsCommand(doc, [arc]);
                command.executeCommand();

                assert.equal(doc._elements.length, 3);
            });
        });
        describe('Arc', function(){
            describe('_intersectPointsArcArc',function() {
                it('Arc(Point(6,2),5) & Arc(Point(-3,2),5) intersection in the points Point(1.5, 4.1794), Point(1.5, -0.1794)', function () {
                    let circle1 = new Arc(new Point(6, 2), 5);
                    let circle2 = new Arc(new Point(-3,2), 5);

                    let points = IntersectElementsCommand._intersectPointsArcArc(circle1, circle2);

                    assert.equal(points.length, 2);

                    assert.equal(points[0].x.toFixed(4),(1.5).toFixed(4));
                    assert.equal(points[0].y.toFixed(4),(4.1794).toFixed(4));

                    assert.equal(points[1].x.toFixed(4),(1.5).toFixed(4));
                    assert.equal(points[1].y.toFixed(4),(-0.1794).toFixed(4));

                });
                it('Arc(Point(6,6),5) & Arc(Point(-3,5),5) intersection in the points Point(1.7343, 8.6083), Point(1.2657, 7.6083)', function () {
                    let circle1 = new Arc(new Point(6, 6), 5);
                    let circle2 = new Arc(new Point(-3,5), 5);

                    let points = IntersectElementsCommand._intersectPointsArcArc(circle2, circle1);

                    assert.equal(points.length, 2);

                    assert.equal(points[1].x.toFixed(4),(1.7343).toFixed(4));
                    assert.equal(points[1].y.toFixed(4),(3.3917).toFixed(4));

                    assert.equal(points[0].x.toFixed(4),(1.2657).toFixed(4));
                    assert.equal(points[0].y.toFixed(4),(7.6083).toFixed(4));

                });
                it('Arc(Point(0,0),5) & Arc(Point(5, 5),5) intersection in the points Point(0, 5), Point(5, 0)', function () {
                    let circle1 = new Arc(new Point(0, 0), 5);
                    let circle2 = new Arc(new Point(5, 5), 5);

                    let points = IntersectElementsCommand._intersectPointsArcArc(circle2, circle1);
                    assert.equal(points.length, 2);

                    assert.equal(points[0].x.toFixed(4),(0).toFixed(4));
                    assert.equal(points[0].y.toFixed(4),(5).toFixed(4));

                    assert.equal(points[1].x.toFixed(4),(5).toFixed(4));
                    assert.equal(points[1].y.toFixed(4),(0).toFixed(4));

                });
            });

            it('after intersection 3 Circles document must contain 12 elements', function () {
                let circle1 = new Arc(new Point(0, 0), 5);
                let circle2 = new Arc(new Point(0, 5), 5);
                let circle3 = new Arc(new Point(5, 5), 5);

                let doc = new Document();
                doc.addElement(circle1);
                doc.addElement(circle2);
                doc.addElement(circle3);

                let command = new IntersectElementsCommand(doc, [circle1,circle2, circle3]);
                command.executeCommand();

                assert.equal(doc._elements.length, 12);

            });
        });
    });

    describe('Group & Arc', function(){
        it('after intersect Rect(Point(-4,4),Point(4,-4)) & Arc(Point(0,0), 5 document must have 20 elements', function(){
            let arc  = new Arc(new Point(), 5);
            let rect  = new RectElement(new Point(-4,4), new Point(4,-4)).toElement();

            let doc = new Document();
            doc.addElement(arc);
            doc.addElement(rect);

            let command = new IntersectElementsCommand(doc, [arc, rect]);
            command.execute();

            assert.equal(doc._elements.length, 20);
        });

        it('after intersect Rect & Arc document must have 20 elements', function(){
            let arc  = new Arc(new Point(-12.859033711811408,4.293780907986459), 3.825238131061844);
            let rect  = new RectElement(new Point(-16.398512488754154, 7.189718089121433),
                                        new Point(-9.319554934868663, 1.3978437268514852)).toElement();

            let doc = new Document();
            doc.addElement(arc);
            doc.addElement(rect);

            let command = new IntersectElementsCommand(doc, [arc, rect]);
            command.executeCommand();

            assert.equal(doc._elements.length, 20);
        });
    });

    it(`after intersect the Line(Point(-10, -10), Point(10, 10)) and the Rect(Point(-10, 5), Point(10,-5)) 
                    document must contain 9 elements`, function () {
        let line1  = new LineElement(new Point(-10,-10), new Point(10,10));
        let rect  = new RectElement(new Point(-10,5), new Point(10,-5)).toElement();

        let doc = new Document();
        doc.addElement(line1);
        doc.addElement(rect);

        let command = new IntersectElementsCommand(doc, [line1, rect]);
        command.executeCommand();

        assert.equal(doc._elements.length, 9);
    });
});