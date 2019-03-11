/**
 * Created by dev on 07.03.19.
 */

var assert = require('assert');

import LineElement from './../src/model/elements/LineElement';
import Point from './../src/model/Point';

describe('LineElement', function() {
    describe('angle', function(){
        it('LineElement(new Point(0,-10), new Point(0,10)) must have angle 90', function () {
            let line  = new LineElement(new Point(0,-10), new Point(0,10));

            let angle = line.angle;

            assert.equal(angle, 90);
        });
    });

    describe('isBelongsToTheElement', function(){
        it('Point(0,3) is belong LineElement(new Point(0,-10), new Point(0,10))', function () {
            let line  = new LineElement(new Point(0,-10), new Point(0,10));
            assert(line.isBelongsToTheElement(new Point(0,3)));
        });

        it('Point(0,30) isn\'t belong LineElement(new Point(0,-10), new Point(0,10))', function () {
            let line  = new LineElement(new Point(0,-10), new Point(0,10));
            assert(!line.isBelongsToTheElement(new Point(0,30)));
        });
    });

});