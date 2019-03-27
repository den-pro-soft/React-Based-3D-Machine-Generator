/**
 * Created by dev on 26.03.19.
 */

var chai = require('chai');
var expect = chai.expect;

import ShapeBuilder from './../../src/analyzer/ShapeBuilder';

import Document from './../../src/model/Document';
import Point from './../../src/model/Point';
import LineElement from './../../src/model/elements/LineElement';
import RectElement from './../../src/model/elements/RectElement';


describe('ShapeBuilder', function(){
    it('one line', function () {
        let doc = new Document();
        doc.addElement(new LineElement(new Point(-5,-5), new Point(5, 5)));
        let shapes = new ShapeBuilder(doc).buildShapes();
        return expect(shapes).to.have.lengthOf(1);
    });

    it('two consecutive lines', function () {
        let doc = new Document();
        doc.addElement(new LineElement(new Point(-5,-5), new Point(5, 5)));
        doc.addElement(new LineElement(new Point(5,5), new Point(10, 5)));
        let shapes = new ShapeBuilder(doc).buildShapes();
        return expect(shapes).to.have.lengthOf(1);
    });

    it('rect', function () {
        let doc = new Document();
        doc.addElement(new RectElement(new Point(-5,-5), new Point(5, 5)).toElement());
        let shapes = new ShapeBuilder(doc).buildShapes();
        return expect(shapes).to.have.lengthOf(1);
    });

    it('line with the starting point is the starting point for the other two lines', function () {
        let doc = new Document();
        doc.addElement(new LineElement(new Point(), new Point(0, 5)));
        doc.addElement(new LineElement(new Point(), new Point(0, -5)));
        doc.addElement(new LineElement(new Point(), new Point(5, 0)));
        let shapes = new ShapeBuilder(doc).buildShapes();
        return expect(shapes).to.have.lengthOf(3);
    });

    it('line with the starting point is the starting point for the other two lines', function () {
        let doc = new Document();
        doc.addElement(new LineElement(new Point(), new Point(0, 5)));
        doc.addElement(new LineElement(new Point(), new Point(0, -5)));
        doc.addElement(new LineElement(new Point(), new Point(5, 0)));
        doc.addElement(new LineElement(new Point(5,0), new Point(5, -5)));
        let shapes = new ShapeBuilder(doc).buildShapes();
        return expect(shapes).to.have.lengthOf(3);
    });

    it('line with triangle must build two shapes', function () {
        let doc = new Document();
        doc.addElement(new LineElement(new Point(), new Point(0, 5)));
        doc.addElement(new LineElement(new Point(), new Point(0, -5)));
        doc.addElement(new LineElement(new Point(), new Point(5, 0)));
        doc.addElement(new LineElement(new Point(5,0), new Point(0, 5)));
        let shapes = new ShapeBuilder(doc).buildShapes();
        return expect(shapes).to.have.lengthOf(2);
    });


});