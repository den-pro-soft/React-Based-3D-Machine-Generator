
import Processing from './../Processing';

export default class Bend extends Processing{

    constructor(){
        super();

        this.angle = 90;
        this.radius = 0.1;
    }

    copy(){
        let res = new Bend();
        res.angle=this.angle;
        res.radius=this.radius;
        return res;
    }
}