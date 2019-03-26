/**
 * Created by dev on 26.02.19.
 */


var assert = require('assert');

import Arc from '../../src/model/elements/Arc';
import Trigonometric from '../../src/model/math/Trigonometric';
import Point from '../../src/model/Point';

import ChangeArcAngleCommand from '../../src/command/ChangeArcAngleCommand';

describe('Arc', function() {
    describe('set inside angle', function() {
        it('arc start 0, end 45 after setting inside angle to 90 must be started 0 and ended 90', function() {
            let arc = new Arc(new Point(10,10), 5);
            arc.startAngle=0;
            arc.endAngle=45;

            let command = new ChangeArcAngleCommand(null, [arc],90, null);
            command.executeCommand();

            assert.equal(arc.startAngle, 0);
            assert.equal(arc.endAngle, 90);
        });

    });

    describe('isBelongsToTheElement', function(){
        it('Point(0,5) is belong to the Circle(new Point(0,0), 5)', function () {
            let circle  = new Arc(new Point(), 5);
            assert(circle.isBelongsToTheElement(new Point(0,5)));
        });
        it('Point(0,5) is belong to the Circle(new Point(0,0), 5)', function () {
            let circle  = new Arc(new Point(), 5);
            assert(circle.isBelongsToTheElement(new Point(Math.cos(Math.PI/4)*5,Math.sin(Math.PI/4)*5)));
        });
    });

    describe('sortPointByTheArc', function(){
       it(`t1`, function(){
           let points = [
               new Point(33.77920006066877, -40.56882737176237),   //00
               new Point(33.77920006066877, -46.69500072876092),   //11
               new Point(32.36289005878956, -48.481914050261636),  //22
               new Point(22.379200060668776, -46.69500072876099),  //43
               new Point(22.379200060668776, -40.568827371762296), //54
               new Point(23.795510062547983, -38.78191405026163),  //65
               new Point(23.79551006254797, -48.481914050261636),  //36
               new Point(32.362890058789546,-38.78191405026163)    //77
           ];

           let sort = [
               new Point(33.77920006066877, -46.69500072876092),
               new Point(32.36289005878956, -48.481914050261636),
               new Point(23.79551006254797, -48.481914050261636),
               new Point(22.379200060668776, -46.69500072876099),
               new Point(22.379200060668776, -40.568827371762296),
               new Point(23.795510062547983, -38.78191405026163),
               new Point(32.362890058789546,-38.78191405026163),
               new Point(33.77920006066877, -40.56882737176237)
           ];
           let arc = new Arc(new Point(28.079200060668764, -43.63191405026164), 6.4708963830369015);

           let sortPoints = arc.sortPointByTheArc(points);

           for(let i=0; i<points.length; i++) {
               assert.equal(sortPoints[i].compare(sort[i]), true, `element ${i} isn't correct must be: ${sort[i].x}:${sort[i].y} but it:${sortPoints[i].x}:${sortPoints[i].y}`);
           }
       });
    });


    describe('mirror', function(){
        it('Arc(new Point(0,0), 5) start angle=45, increment 45 after mirror by OX must be start angle=90, increment 45', function () {
            let arc  = new Arc(new Point(), 5);
            arc.startAngle=45;
            arc.incrementAngle=45;

            arc.mirror(Trigonometric.axisX, arc.center);

            assert.equal(arc.startAngle,90);
            assert.equal(arc.incrementAngle,45);
        });
        it('Arc(new Point(0,0), 5) start angle=0, increment 45 after mirror by OX must be start angle=135, increment 45', function () {
            let arc  = new Arc(new Point(), 5);
            arc.startAngle=0;
            arc.incrementAngle=45;

            arc.mirror(Trigonometric.axisX, arc.center);

            assert.equal(arc.startAngle,135);
            assert.equal(arc.incrementAngle,45);
        });

        it('Arc(new Point(0,0), 5) start angle=45, increment 45 after mirror by OY must be start angle=270, increment 45', function () {
            let arc  = new Arc(new Point(), 5);
            arc.startAngle=45;
            arc.incrementAngle=45;

            arc.mirror(Trigonometric.axisY, arc.center);

            assert.equal(arc.startAngle,270);
            assert.equal(arc.incrementAngle,45);
        });
        it('Arc(new Point(0,0), 5) start angle=0, increment 45 after mirror by OY must be start angle=315, increment 45', function () {
            let arc  = new Arc(new Point(), 5);
            arc.startAngle=0;
            arc.incrementAngle=45;

            arc.mirror(Trigonometric.axisY, arc.center);

            assert.equal(arc.startAngle,315);
            assert.equal(arc.incrementAngle,45);
        });
    })
});
