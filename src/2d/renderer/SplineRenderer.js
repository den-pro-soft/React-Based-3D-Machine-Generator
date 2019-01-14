/**
 * Created by dev on 14.01.19.
 */
import Render from './Render';

export default class SplineRenderer extends Render{
    constructor(element){
        super(element);
    }

    drawElement(){
        throw new Exception("The method doesn't have implementation");
    }
}