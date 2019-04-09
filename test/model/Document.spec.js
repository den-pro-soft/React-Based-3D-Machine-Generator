/**
 * Created by dev on 26.03.19.
 */

var chai = require('chai');
var expect = chai.expect;

import EraserNearElementsCommand from './../../src/command/EraserNearElements';

import Document from './../../src/model/Document';
import Point from './../../src/model/Point';
import LineElement from './../../src/model/elements/LineElement';


const eps = 0.0001;

describe('Document', function(){
    describe('mergeLines', function(){
        it('remove one line', function () {
            // let doc = new Document();
            // doc.addElement(new LineElement(new Point(-5,-5), new Point(5, 5)));
            // doc.addElement(new LineElement(new Point(-5,-5), new Point(5, 5)));
            // expect(doc._elements).to.have.lengthOf(2);
            // doc.mergeLines();
            //
            // return expect(doc._elements).to.have.lengthOf(1);
        });

    });
});