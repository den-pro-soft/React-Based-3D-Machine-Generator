/**
 * Created by dev on 06.03.19.
 */
var assert = require('assert');

import Line from '../../src/model/math/Line';
import Point from '../../src/model/Point';

describe('Line', function() {
    describe('getCrossPoint with Line', function() {
        it('Line(Point(-10, -10), Point(10, 10))   is cross the Line(Point(-10, 10), Point(10,-10)) in the Point(0,0)', function () {
            let line1  = new Line(new Point(-10,-10), new Point(10,10));
            let line2  = new Line(new Point(-10,10), new Point(10,-10));

            let crossPoint = line1.getCrossPoint(line2);
            assert(crossPoint.compare(new Point()));
        });

        it('Line(Point(-10, -10), Point(10, 10)) is cross the Line(Point(0, 5), Point(5,0)) in the Point(2.5,2.5)', function () {
            let line1  = new Line(new Point(-10,-10), new Point(10,10));
            let line2  = new Line(new Point(0,5), new Point(5,0));

            let crossPoint = line1.getCrossPoint(line2);
            assert(crossPoint.compare(new Point(2.5,2.5)));
        });

        it('Line(Point(-10, -10), Point(10, 10)) isn\'t cross the Line(Point(0, 50), Point(50,0))', function () {
            let line1  = new Line(new Point(-10,-10), new Point(10,10));
            let line2  = new Line(new Point(0,50), new Point(50,0));

            let crossPoint = line1.getCrossPoint(line2);
            assert.ifError(crossPoint); //true if crossPint is null
        });

        it('Line(Point(-10, -10), Point(10, 10)) is cross the Line(Point(10, 10), Point(50,0)) in the Point(10,10)', function () {
            let line1  = new Line(new Point(-10,-10), new Point(10,10));
            let line2  = new Line(new Point(10,10), new Point(50,0));

            let crossPoint = line1.getCrossPoint(line2);
            assert(crossPoint.compare(new Point(10,10)));
        });

    });

    describe('A', function(){
        it('for Line(Point(6, 1), Point(4, 7)) A is 6', function () {
            let line  = new Line(new Point(6, 1), new Point(4, 7));
            assert.equal(line.A, 6);
        });
    });

    describe('B', function(){
        it('for Line(Point(6, 1), Point(4, 7)) B is -2', function () {
            let line  = new Line(new Point(6, 1), new Point(4, 7));
            assert.equal(line.B, -2);
        });
    });

    describe('C', function(){
        it('for Line(Point(6, 1), Point(4, 7)) C is 38', function () {
            let line  = new Line(new Point(6, 1), new Point(4, 7));
            assert.equal(line.C, 38);
        });
    });

    describe('b', function(){
        it('for Line(Point(6, 1), Point(4, 7)) b is 38', function () {
            let line  = new Line(new Point(6, 1), new Point(4, 7));
            assert.equal(line.b, 19);
        });
    })
});