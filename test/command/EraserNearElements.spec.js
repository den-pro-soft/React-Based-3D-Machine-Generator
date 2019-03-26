/**
 * Created by dev on 26.03.19.
 */

var chai = require('chai');
var expect = chai.expect;

import EraserNearElementsCommand from './../../src/command/EraserNearElements';

import Document from './../../src/model/Document';
import Point from './../../src/model/Point';
import LineElement from './../../src/model/elements/LineElement';
import RectElement from './../../src/model/elements/RectElement';


const eps = 0.0001;

describe('EraserNearElements', function(){
    describe('remove single elements', function(){
        it('remove one line', function () {
            let doc = new Document();
            doc.addElement(new LineElement(new Point(-5,-5), new Point(5, 5)));
            let point = new Point();
            let command = new EraserNearElementsCommand(doc, point, eps);
            command.executeCommand();
            return expect(doc._elements).to.be.empty;
        });

        it('try remove element not near line', function () {
            let doc = new Document();
            doc.addElement(new LineElement(new Point(-5,-5), new Point(5, 5)));
            let point = new Point(10,10);
            let command = new EraserNearElementsCommand(doc, point, eps);
            command.executeCommand();
            return expect(doc._elements).to.have.lengthOf(1);
        });
    });

    describe('remove shapes', function(){
        it('delete two consecutive lines', function () {
            let doc = new Document();
            doc.addElement(new LineElement(new Point(-5,-5), new Point(5, 5)));
            doc.addElement(new LineElement(new Point(5,5), new Point(10, 5)));
            let point = new Point();
            let command = new EraserNearElementsCommand(doc, point, eps);
            command.executeCommand();
            return expect(doc._elements).to.be.empty;
        });

        it('delete rect (shape in group)', function () {
            let doc = new Document();
            doc.addElement(new RectElement(new Point(-5,-5), new Point(5, 5)).toElement());
            let point = new Point(0,5);
            let command = new EraserNearElementsCommand(doc, point, eps);
            command.executeCommand();
            return expect(doc._elements).to.be.empty;
        });

        it('delete the line with the starting point is the starting point for the other two lines', function () {
            let doc = new Document();
            doc.addElement(new LineElement(new Point(), new Point(0, 5)));
            doc.addElement(new LineElement(new Point(), new Point(0, -5)));
            doc.addElement(new LineElement(new Point(), new Point(5, 0)));
            let point = new Point(2.5,0);
            let command = new EraserNearElementsCommand(doc, point, eps);
            command.executeCommand();
            return expect(doc._elements).to.have.lengthOf(2);
        });

    });

});