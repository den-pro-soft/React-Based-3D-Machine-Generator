/**
 * Created by dev on 22.03.19.
 */

var chai = require('chai');
var expect = chai.expect;

var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

import ErrorModelAnalyzer from './../../src/analyzer/analyzers/ErrorModelAnalyzer';

import Document from './../../src/model/Document';



describe('ErrorModelAnalyzer', function(){
    it('first test', function () {
        let doc = new Document();
        let analyzer = new ErrorModelAnalyzer(doc);

        let result = analyzer.analyze();

        return expect(result).to.eventually.equal(true);
    });

});