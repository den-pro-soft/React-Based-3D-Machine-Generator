/**
 * Created by dev on 17.01.19.
 */

export default class Trigonometric{

    static get axisX(){return 'axisX'; }
    static get axisY(){return 'axisY'; }
    
    static gradToRad(grad){
        return grad*(Math.PI/180);
    }

    static radToGrad(rad){
        return rad*(180/Math.PI);
    }
}