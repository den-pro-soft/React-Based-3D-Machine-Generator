/**
 * Created by dev on 19.03.19.
 */
/**
 * Created by dev on 06.03.19.
 */

var assert = require('assert');

import TangentsArcsCommand from './../src/2d/command/TangentsArcsCommand';

import Document from './../src/model/Document';
import LineElement from './../src/model/elements/LineElement';
import Arc from './../src/model/elements/Arc';
import Point from './../src/model/Point';

import RectElement from './../src/model/elements/RectElement';


describe('Tangents', function() {
    describe('equals arcs', function() {
        it('Arc(Point(-5),3) & Arc(Point(5),4) must have 4 tangent lines', function(){
            let arc1 = new Arc(new Point(-5),3);
            let arc2 = new Arc(new Point(5),4);

            let lines = TangentsArcsCommand.tangentsArcs(arc1, arc2);
            assert.equal(lines.length,4);
        });
    });

    describe('tangent by Point', function(){
        it('tangent Arc(Point(0,0), 5) and Point(10,5) must return two points', function(){
            let arc = new Arc(new Point(), 5);
            let point = new Point(10,5);

            let lines = TangentsArcsCommand.getTangentByPoint(arc, point);

            assert.equal(lines.length, 2);
        });
    });

});