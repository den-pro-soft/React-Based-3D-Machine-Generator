/**
 * Created by dev on 26.02.19.
 */


var assert = require('assert');

import Arc from './../src/model/elements/Arc';
import Point from './../src/model/Point';



import ChangeArcAngleCommand from './../src/2d/command/ChangeArcAngleCommand';
//todo: separate config ang app
import Application from './../src/Application';

describe('Arc', function() {
    describe('set inside angle', function() {
        it('arc start 0, end 45 after set inside angle to 90 must be start 0, end 90', function() {
            let arc = new Arc(new Point(10,10), 5);
            arc.startAngle=0;
            arc.endAngle=45;

            let command = new ChangeArcAngleCommand(null, [arc],90, null);
            command.executeCommand();
            assert(arc.startAngle==0 && arc.endAngle==90);
        });

        // it('matrix add [[2,4,5]] add 5 must be [[7,9,10]]', function() {
        //     let m1 = new Matrix([[2,4,5]]);
        //
        //     let expected = new Matrix([[7,9,10]]);
        //     let res = m1.add(5);
        //     assert(res.compare(expected));
        // });
    });

});
