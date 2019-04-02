/**
 * Created by dev on 26.03.19.
 */
import Document from "../../src/model/Document";

var chai = require('chai');
var expect = chai.expect;

import PolyLine from "../../src/model/math/PolyLine";
import Point from "../../src/model/Point";


describe("PolyLine", function(){
    it("getCrossPoints", function () {
        let p1 = new PolyLine([
            new Point(5,-5),
            new Point(-5,-5),
            new Point(),
        ]);

        let p2 = new PolyLine([
            new Point(8,-3),
            new Point(-2,-3),
            new Point(3,2),
        ]);

        let points = p1.getCrossPoints(p2);

        expect(points).to.has.lengthOf(2);
    });

});