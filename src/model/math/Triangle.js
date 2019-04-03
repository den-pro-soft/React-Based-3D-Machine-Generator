import Line from "../../ui/3d/model/Line";
//todo: use Line from math package

export default class Triangle {
    constructor(v1, v2, v3) {
        this.v1=v1;
        this.v2=v2;
        this.v3=v3;
        this.l1 = new Line(v1,v2);
        this.l2 = new Line(v2,v3);
        this.l3 = new Line(v3,v1);
    }

    square(){
        let a = this.l1.length();
        let b = this.l2.length();
        let c = this.l3.length();
        let P = (a+b+c)/2;
        return Math.sqrt(P*(P-a)*(P-b)*(P-c));
    }


    /**
     * Heron's algorithm is used
     * @param {Vertex3} vertex
     * @return {boolean}
     */
    contains(vertex){
        let sum = 0;
        sum+=new Triangle(this.v1, this.v2, vertex).square();
        sum+=new Triangle(this.v2, this.v3, vertex).square();
        sum+=new Triangle(this.v1, this.v3, vertex).square();
        return sum<this.square()+1E-4;
    }
}