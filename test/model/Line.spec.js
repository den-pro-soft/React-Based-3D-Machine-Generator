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
    });

    describe('isParallel', function(){
        it('cross by 90 degrees', function(){
            let l1 = new Line(new Point(-5,5), new Point(5,-5));
            let l2 = new Line(new Point(-5,-5), new Point(5,5));

            assert.equal(l1.isParallel(l2), false);
            assert.equal(l2.isParallel(l1), false);
        });
        it('two parallel lines', function(){
            let l1 = new Line(new Point(-5,5), new Point(5,-5));
            let l2 = new Line(new Point(-5,6), new Point(5,-4));

            assert.equal(l1.isParallel(l2), true);
            assert.equal(l2.isParallel(l1), true);
        });
    });
    describe('isOverlapping', function(){
        it('cross by 90 degrees', function(){
            let l1 = new Line(new Point(-5,5), new Point(5,-5));
            let l2 = new Line(new Point(-5,-5), new Point(5,5));

            assert.equal(l1.isOverlapping(l2), false);
            assert.equal(l2.isOverlapping(l1), false);
        });
        it('two parallel lines', function(){
            let l1 = new Line(new Point(-5,5), new Point(5,-5));
            let l2 = new Line(new Point(-5,6), new Point(5,-4));

            assert.equal(l1.isOverlapping(l2), false);
            assert.equal(l2.isOverlapping(l1), false);
        });
        it('one line', function(){
            let l1 = new Line(new Point(-5,5), new Point(5,-5));

            assert.equal(l1.isOverlapping(l1), true);
        });
        it('two overlapping lines', function(){
            let l1 = new Line(new Point(-5,5), new Point(5,-5));
            let l2 = new Line(new Point(), new Point(10,-10));

            assert.equal(l1.isOverlapping(l2), true);
            assert.equal(l2.isOverlapping(l1), true);
        });

        it('two parallel lines with k==0', function(){
            let l1 = new Line(new Point(0,5), new Point(10,5));
            let l2 = new Line(new Point(0,0), new Point(10,0));

            assert.equal(l1.isOverlapping(l2), false);
            assert.equal(l2.isOverlapping(l1), false);
        });

        it('two parallel lines with b==0', function(){
            let l1 = new Line(new Point(5,5), new Point(5,-5));
            let l2 = new Line(new Point(-5,-5), new Point(-5,5));

            assert.equal(l1.isOverlapping(l2), false);
            assert.equal(l2.isOverlapping(l1), false);
        });

        it('two overlapping lines 1', function(){
            let l1 = new Line(new Point(0, -5), new Point(0,5));
            let l2 = new Line(new Point(0, 5), new Point(0,2));

            assert.equal(l1.isOverlapping(l2), true);
            assert.equal(l2.isOverlapping(l1), true);
        });
        it('two overlapping lines 2', function(){
            let y =  -8.673617379884035e-19;
            let l1 = new Line(new Point(-2.5, y), new Point(4,0));
            let l2 = new Line(new Point(-1,0), new Point(-2.5, y));

            assert.equal(l1.isOverlapping(l2), true);
            assert.equal(l2.isOverlapping(l1), true);
        });
    });
});