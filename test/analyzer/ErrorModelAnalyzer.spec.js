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



describe('ErrorModelAnalyzer', function(){
    it('first test', function () {
        let doc = new Document();
        doc.addElement(new RectElement(new Point(-5,5), new Point(5, -5)).toElement());
        let analyzer = new ErrorModelAnalyzer(doc);

        let result = analyzer.analyze();

        return expect(result).to.eventually.equal(true);
    });

});