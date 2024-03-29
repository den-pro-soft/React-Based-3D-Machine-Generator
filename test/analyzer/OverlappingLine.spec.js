/**
 * Created by dev on 22.03.19.
 */
import RectElement from "../../src/model/elements/RectElement";

var chai = require('chai');
var expect = chai.expect;

var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

import ErrorModelAnalyzer from './../../src/analyzer/analyzers/ErrorModelAnalyzer';

import Document from './../../src/model/Document';
import Point from "../../src/model/Point";
import LineElement from "../../src/model/elements/LineElement";
import OverlappingLine from "../../src/analyzer/rules/OverlappingLine";



describe('OverlappingLine', function(){
    it('parallel lines on one line without overlapping', function () {
        let doc = new Document();

        doc.addElement(new LineElement(new Point(-5,-5), new Point()));
        doc.addElement(new LineElement(new Point(1,1), new Point(5,5)));

        let rule = new OverlappingLine(doc);

        let res = rule.check();

        return expect(res).to.be.false;
    });

});